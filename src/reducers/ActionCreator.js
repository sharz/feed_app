import * as ActionTypes from "./ActionTypes";

export const addFeedData = feedData => ({
  type: ActionTypes.FEED_CREATED,
  payload: feedData
});

export const getRssFeedData = url => dispatch => fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`, {
  method: "GET"
})
  .then(response => {
    if (response.ok) {
      return response;
    }
    const error = new Error(`Error ${response.status}: ${response.statusText}`);
    error.response = response;
    throw error;
  },
  error => {
    throw error;
  })
  .then(response => response.json())
  .then(response => dispatch(addFeedData(response)))
  .catch(error => {
    console.log("Get Feed", error.message); alert(`Your Url could not be get Data\nError: ${error.message}`);
  });

export const deleteSingleFeed = id => ({
  type: ActionTypes.DELETE_FEED,
  payload: id
});

export const deleteFeed = id => dispatch => {
  dispatch(deleteSingleFeed(id));
};
