import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, setIsTyping } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [typing, setTyping] = useState();
  const { postMessage, otherUser, conversationId, user, setIsTyping } = props;
  
  const handleChange = (event) => {
    setText(event.target.value);
    
    if (event.target.value.length > 0) {
      if (!typing) {
        setTyping(true);
        setIsTyping({ typing: true , conversationId });
      }
    } else {
      setTyping(false);
      setIsTyping({typing: false, conversationId});
    }
    
  };

  const handleBlur = (e) => {
    setTyping(false);
    setIsTyping({typing: false, conversationId});
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
    setIsTyping: (data) => {
      dispatch(setIsTyping(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
