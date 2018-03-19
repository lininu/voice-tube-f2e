import { VIDEOS_READY, VIDEOS_INIT_SORT_READY, VIDEOS_INIT_FILTER_READY } from '../constants/ActionTypes'

const status = (state = { pageTimeout: '' }, action) => {
  switch(action.type) {
    case VIDEOS_READY:
      return {
        ...state,
        videosReady: true
      }
    case VIDEOS_INIT_SORT_READY:
      return {
        ...state,
        videosInitSortReady: action.status
      }
    case VIDEOS_INIT_FILTER_READY:
      return {
        ...state,
        videosInitFilterReady: action.status
      }
    default:
      return state
  }
}

export default status