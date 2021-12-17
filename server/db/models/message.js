const Sequelize = require("sequelize");
const db = require("../db");
const { Op } = require("sequelize");

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
    allowNull: true,
  }
});

Message.updateMessages = async function (messages) {
  const ids = messages.map((msg => msg.id))
  const updatedMessages = await Message.update(
    {
      isRead: true
    },
    {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
  )
  return updatedMessages;
}

module.exports = Message;
