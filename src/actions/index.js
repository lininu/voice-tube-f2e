import * as task from './task'
import * as api from '../api/init'

export const videosReady = () => {
  return dispatch => {
    dispatch(task.videosReady())
  }
}

export const videosInitSortReady = (status) => {
  return dispatch => {
    dispatch(task.videosInitSortReady(status))
  }
}

export const videosInitFilterReady = (status) => {
  return dispatch => {
    dispatch(task.videosInitFilterReady(status))
  }
}

export const getVideos = () => {
  return (dispatch) => {
    api
      .fetchVideos()
      .then(res=>{
        // console.log(res)
        dispatch(task.getVideos(res.data))
        // return res.data
      })
  }
}

export const sortVideos = (sortType) => {
  return (dispatch) => {
    dispatch(task.sortVideos(sortType))
  }
}

export const filterVideosLength = (lengthOfVideo) => {
  return (dispatch) => {
    dispatch(task.filterVideosLength(lengthOfVideo))
  }
}