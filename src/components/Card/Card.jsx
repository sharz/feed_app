import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import parser from "html-react-parser";

const styles = theme => ({
  card: {
    display: "flex",
    marginBottom: "20px"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 500
  }
});

function CustomCard(props) {
  const {classes} = props;
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.title}-{props.date}
          </Typography>
          <br/>
          <div className="content">{parser(props.news)}</div>
        </CardContent>
      </div>
    </Card>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  feedData: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.string,
  news: PropTypes.string
};

export default withStyles(styles, {withTheme: true})(CustomCard);
