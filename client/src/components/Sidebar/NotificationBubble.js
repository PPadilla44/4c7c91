import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        background: "#3F92FF",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "30px",
        alignSelf: "center"
    },
    circle : {
        maxWidth: "30px",
        borderRadius: "50%",
    },
    oval: {
        maxWidth: "45px",
        height: "28px",
        borderRadius: "50px",
    },
    text: {
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: "bold",
        padding: 3
    },

}));

const NotificationBubble = (props) => {
    const classes = useStyles();
    const { text } = props;

    return (
        <Box className={ `${classes.root} ${text < 10 ? classes.circle : classes.oval}` } >
            <Typography className={classes.text}>{text}</Typography>
        </Box>
    );
};

export default NotificationBubble;
