const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// 创建通知
router.post('/notifications', notificationController.createNotification);

// 获取用户的通知列表
router.get('/notifications/:userId', notificationController.getUserNotifications);

module.exports = router;
