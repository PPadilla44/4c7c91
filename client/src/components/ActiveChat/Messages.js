import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { updateMessages } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { messages, otherUser, userId, updateMessages } = props;

  useEffect(() => {
      updateMessages(messages, userId)
  }, [updateMessages, messages, userId])


  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
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
