import * as AT from '../constants/ActionTypes'

export const videosReady = () => ({
  type: AT.VIDEOS_READY
})

export const videosInitSortReady = (status=false) => ({
  type: AT.VIDEOS_INIT_SORT_READY,
  status
})

export const videosInitFilterReady = (status=false) => ({
  type: AT.VIDEOS_INIT_FILTER_READY,
  status
})

export const getVideos = (videos) => ({
  type: AT.INIT_VIDEOS,
  videos
})

export const sortVideos = (sortType) => ({
  type: AT.SORT_VIDEOS,
  sortType
})

export const filterVideosLength = (lengthOfVideo) => ({
  type: AT.FILTER_VIDEOS_LENGTH,
  lengthOfVideo
})