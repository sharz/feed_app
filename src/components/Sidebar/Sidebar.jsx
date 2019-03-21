import React from "react";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";

import "../../App.css";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  search: {
    display: "inline-flex",
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const Sidebar = ({...props}) => {
  const {classes, theme} = props;

  const drawer = (
    <div>
      <div className={classes.search}>
        <TextField
          id="outlined-with-placeholder"
          label="URL"
          placeholder="Input Url"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={props.searchUrl}
          onChange={props.handleInputChange}
        />
        <IconButton aria-label="Delete" className={classes.margin} onClick={props.handleSubmit}>
          <SearchIcon fontSize="large" />
        </IconButton>
      </div>
      <Divider />
      {props.routes ? <List>
        {props.routes.map((text, index) => (
          <React.Fragment>
            <ListItem button key={text.feed.feedId} >
              <NavLink to={`/Feed/${text.feed.feedId}`} activeClassName="active"exact><ListItemText primary={text.feed.title} /></NavLink>
              <ListItemIcon onClick={() => props.handleDeleteFeed(text.feed.feedId)}>
                <DeleteIcon />
              </ListItemIcon>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List> : null }
    </div>
  );

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.open}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  handleDeleteFeed: PropTypes.func,
  searchUrl: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  routes: PropTypes.array
};

export default withStyles(styles, {withTheme: true})(Sidebar);
