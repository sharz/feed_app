import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

import CustomCard from "../components/Card/Card";


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {feed} = this.props;
    return (
      <React.Fragment>
        <div><h1>{feed ? this.props.feed.feed.title : null}</h1></div>
        {feed ? this.props.feed.items.map(feedDetails => (
          <CustomCard
            key={feedDetails.key}
            title={feedDetails.title}
            date=""
            news={feedDetails.description}
          />)) : <div>No Feeds Results avaliable</div> }
      </React.Fragment>
    );
  }
}

Feed.defaultProps = {

};

Feed.propTypes = {
  feed: PropTypes.object
};

export default withRouter(Feed);
