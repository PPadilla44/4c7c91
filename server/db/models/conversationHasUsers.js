const db = require("../db");

const ConversationHasUsers = db.define("conversation_has_users", {});

module.exports = ConversationHasUsers;
