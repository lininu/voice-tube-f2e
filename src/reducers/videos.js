import { INIT_VIDEOS, SORT_VIDEOS, SORT_VIDEOS_PUBLISH, SORT_VIDEOS_VIEWS, SORT_VIDEOS_COLLECTCOUNT, FILTER_VIDEOS_LENGTH, LENGTH_ALL, LENGTH_LESS_THEN_FOUR_MINS, LENGTH_LESS_THEN_FIVE_MINS, LENGTH_FIVE_TO_TEN_MINS, LENGTH_MORE_THEN_TEN_MINS } from '../constants/ActionTypes'

const videos = ( state=[], action ) => {
  switch(action.type) {
    case INIT_VIDEOS:
      // Object.assign([], state, action.videos)
      return state.concat(action.videos)

    // sort
    case SORT_VIDEOS:
      switch(action.sortType) {
        case SORT_VIDEOS_PUBLISH:
          return [...state.sort((a, b) => b.publish - a.publish)]
        case SORT_VIDEOS_VIEWS:
          return [...state.sort((a, b) => b.views - a.views)]
        case SORT_VIDEOS_COLLECTCOUNT:
          return [...state.sort((a, b) => b.collectCount - a.collectCount)] 
        default:
          return state
      }
      return state

    // filter
    case FILTER_VIDEOS_LENGTH:
      switch(action.lengthOfVideo) {
        case LENGTH_ALL:
          return [...state.map(video => {
            video.show = true
            return video
          })]
        case LENGTH_LESS_THEN_FOUR_MINS:
          return [...state.map(video => {
            video.show = (video.duration <= 60 * 4) ? true : false
            return video
          })]
        case LENGTH_LESS_THEN_FIVE_MINS:
          return [...state.map(video => {
            video.show = (video.duration < 60 * 5) ? true : false
            return video
          })]
        case LENGTH_FIVE_TO_TEN_MINS:
          return [...state.map(video => {
            video.show = 
              (video.duration >= 60 * 5 && video.duration < 60 * 10) ? true : false
            return video
          })]
        case LENGTH_MORE_THEN_TEN_MINS:
          return [...state.map(video => {
            video.show = (video.duration >= 60 * 10) ? true : false
            return video
          })]
        default:
          return state        
      }
      return state

    default:
      return state  
  }
}

export default videos