import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex"
    },
    avatar: {
        height: 30,
        width: 30,
        marginRight: 11,
        marginTop: 6
    },
    bubble: {
        marginTop: 15,
        backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
        borderRadius: "0 10px 10px 10px",
        display: "flex",
        padding: 10,
    },
    "@keyframes blinker" : {
        from: { opacity: 1 },
        to: { opacity: 0.3 },
    },
    dots: {
        height: 8,
        width: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: "50%",
        margin: "0 1px",
        animationName: '$blinker',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationTimingFunction: 'ease-in-out',
        "&:nth-child(1)": {
            animationDelay: "0s"
        },
        "&:nth-child(2)": {
            animationDelay: ".2s"
        },
        "&:nth-child(3)": {
            animationDelay: ".4s"
        }
    },
}));

const TypingBubble = (props) => {
    const classes = useStyles();
    const { otherUser } = props;

    
    return (
        <Box className={classes.root}>
            <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
            <Box>
                <Box className={classes.bubble}>
                    <Box className={classes.dots}/>
                    <Box className={classes.dots}/>
                    <Box className={classes.dots}/>
                </Box>
            </Box>
        </Box>
    );
};

export default TypingBubble;
