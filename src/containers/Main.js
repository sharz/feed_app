import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

// import "./Main.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbars/Navbar";
import Feed from "./Feed";
import {getRssFeedData, deleteFeed} from "../reducers/ActionCreator";

import {withStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";


const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      searchUrl: "",
      selectedFeed: ""
    };
  }
  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen});
  };

  changeSearchUrl = name => event => {
    this.setState({[name]: event.target.value});
  };

  getFeedData = () => {
    this.props.getRssFeedData(this.state.searchUrl);
  }

  handleDeleteFeed = id => {
    this.props.deleteFeed(id);
  }

  render() {
    const {classes, Feeds} = this.props;

    const FeedWithId = ({match}) => (
      <Feed feed={this.props.Feeds.FeedList.filter(feed => feed.feed.feedId === parseInt(match.params.feedId, 10))[0]}
      />
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Navbar
          handleDrawerToggle={this.handleDrawerToggle}
        />
        <Sidebar
          routes={this.props.Feeds.FeedList}
          open={this.state.mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          searchUrl={this.state.searchUrl}
          handleInputChange={this.changeSearchUrl("searchUrl")}
          handleSubmit={this.getFeedData}
          handleDeleteFeed={this.handleDeleteFeed}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/Feed" component={() => <Feed feed={this.props.Feeds.FeedList[0]}/>}/>
            <Route path='/Feed/:feedId' component={FeedWithId} />
            <Redirect to="/Feed" />
          </Switch>
          {/* <CustomCard /> */}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object,
  container: PropTypes.object,
  theme: PropTypes.object,
  getRssFeedData: PropTypes.func,
  Feeds: PropTypes.object,
  deleteFeed: PropTypes.func
};

const mapStateToProps = state => ({
  Feeds: state.Feeds
});

const mapDispatchToProps = dispatch => ({
  getRssFeedData: url => dispatch(getRssFeedData(url)),
  deleteFeed: id => dispatch(deleteFeed(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(Main)));
