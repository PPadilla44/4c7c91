const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationHasUsers = require("./conversationHasUsers")

// associations

User.belongsToMany(Conversation, {through: ConversationHasUsers});
Conversation.belongsToMany(User, { as: "users", through: ConversationHasUsers });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
