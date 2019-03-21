import * as ActionTypes from "./ActionTypes";

export const Feeds = (state = {isLoading: true,
  errMess: null,
  FeedList: []}, action) => {
  switch (action.type) {
    case ActionTypes.FEED_CREATED:
      const id = state.FeedList.length + 1;
      action.payload.feed.feedId = id;
      return {...state, isLoading: false, errMess: null, FeedList: [action.payload, ...state.FeedList]
      };
    case ActionTypes.DELETE_FEED:
      const updatedFeed = state.FeedList.filter(feedData => feedData.feed.feedId !== action.payload);
      return {...state, isLoading: false, errMess: null, FeedList: updatedFeed};
    default:
      return state;
  }
};
