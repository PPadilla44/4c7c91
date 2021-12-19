const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Message.updateMessages = async function ({ conversationId }) {

  const updatedMessages = await Message.update(
    {
      isRead: true
    },
    {
      where: {
        conversationId: conversationId
      }
    }
  )

  return updatedMessages;
}

module.exports = Message;
