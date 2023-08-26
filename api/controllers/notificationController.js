const Notification = require("../models/notification"); // 导入通知模型

// 创建通知
const createNotification = async (req, res) => {
  try {
    const { recipientId, senderId, type, recipeId, message } = req.body;

    // 创建通知
    const notification = new Notification({
      recipientId,
      senderId,
      type,
      recipeId,
      message,
      isRead: false, // 默认设置为未读
      createdAt: new Date(),
    });

    // 保存通知到数据库
    await notification.save();

    return res.status(201).json(notification);
  } catch (error) {
    return res.status(500).json({ error: "通知创建失败" });
  }
};

// 获取用户的通知列表
const getUserNotifications = async (req, res) => {
  try {
    const recipientId = req.params.userId; // 从路由参数中获取用户ID

    // 查询该用户的未读通知
    const notifications = await Notification.find({
      recipientId,
      isRead: false,
    });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ error: "获取通知失败" });
  }
};

// Controller function to mark notifications as read
const setNotificationsAsRead = async (req, res) => {
  try {
    // Get the notification IDs to mark as read from the request body
    const { notificationIds } = req.body;

    // Update the notifications in the database to mark them as read
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { isRead: true } }
    );

    // Respond with a success message
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  setNotificationsAsRead,
};
