const Notification = require('../models/notificationModel');

const getNotifications = async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
};

const createNotification = async (req, res) => {
  const { title, message } = req.body;
  const newNotif = await Notification.create({ title, message });
  res.json(newNotif);
};

const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notification deleted' });
};

module.exports = { getNotifications, createNotification, deleteNotification };
