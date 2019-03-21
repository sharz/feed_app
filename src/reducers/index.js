import {combineReducers} from "redux";

import {Feeds} from "./feed";
const initial = {
  searchUrl: ""
};
export default combineReducers({
  initial: initial,
  Feeds: Feeds
});
