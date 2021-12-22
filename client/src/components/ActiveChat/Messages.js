import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { updateMessages } from "../../store/utils/thunkCreators";
import TypingBubble from "./TypingBubble";

const Messages = (props) => {

  const { messages, otherUser, userId, updateMessages, isTyping } = props;
  const [latestRead, setLatestRead] = useState({});

  useEffect(() => {

    if (messages.length > 0) {

      updateMessages(messages[messages.length - 1], userId)

      for (let i = messages.length - 1; i >= 0; i--) {
        let tempLatestMessage = messages[i];
        if (tempLatestMessage.senderId === userId && tempLatestMessage.isRead) {
          setLatestRead(tempLatestMessage);
          break;
        }
      }

    }

  }, [updateMessages, messages, userId, latestRead])


  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          message === latestRead
            ?
            <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
            :
            <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
      {isTyping && <TypingBubble otherUser={otherUser} />}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (lastMessage, userId) => {
      dispatch(updateMessages(lastMessage, userId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
