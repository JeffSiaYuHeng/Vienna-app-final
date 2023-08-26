const Notification = require('../models/notification'); // 导入通知模型

// 创建通知
exports.createNotification = async (req, res) => {
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
    return res.status(500).json({ error: '通知创建失败' });
  }
};

// 获取用户的通知列表
exports.getUserNotifications = async (req, res) => {
  try {
    const recipientId = req.params.userId; // 从路由参数中获取用户ID

    // 查询该用户的未读通知
    const notifications = await Notification.find({ recipientId, isRead: false });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ error: '获取通知失败' });
  }
};
