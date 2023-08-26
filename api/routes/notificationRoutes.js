const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// 创建通知
router.post("/", notificationController.createNotification);
router.post("/markAsRead", notificationController.setNotificationsAsRead);

// 获取用户的通知列表
router.get(
  "/notifications/:userId",
  notificationController.getUserNotifications
);


module.exports = router;
