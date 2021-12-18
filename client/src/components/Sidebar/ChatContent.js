import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationBubble from "./NotificationBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const { messages } = conversation;
  const lastMessage = messages[messages.length - 1] || false;


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {lastMessage.senderId === otherUser.id && !lastMessage.isRead ?

          <Typography className={classes.username}>
            {latestMessageText}
          </Typography>
          :
          <Typography className={classes.previewText}>
            {  conversation.isTyping ? "Typing..." : latestMessageText}
          </Typography>

        }
      </Box>
      {lastMessage.senderId === otherUser.id && !lastMessage.isRead && <NotificationBubble messages={messages} />}
    </Box>
  );
};

export default ChatContent;
