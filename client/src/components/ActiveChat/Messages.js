import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { updateMessages } from "../../store/utils/thunkCreators";

const Messages = (props) => {

  const { messages, otherUser, userId, updateMessages } = props;
  const [latestRead, setLatestRead] = useState({});

  useEffect(() => {

    updateMessages(messages, userId)

    for (let i = messages.length - 1; i >= 0; i--) {
      let tempLatestMessage = messages[i];
      if (tempLatestMessage.senderId === userId && tempLatestMessage.isRead) {
        setLatestRead(tempLatestMessage);
        break;
      }
    }
    
  }, [updateMessages, messages, userId])


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
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (messages, userId) => {
      dispatch(updateMessages(messages, userId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
