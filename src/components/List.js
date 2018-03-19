import React, { Component } from 'react'
import classnames from 'classnames'
import SortVideo from './SortVideo'
import FilterVideo from './FilterVideo'
import Video from './Video'
import './List.scss'
import './global/recommend.scss'

export default class List extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { pageStatus, videos, actions, match, location, recommend } = this.props
    const search = location.search; // could be '?foo=bar'
    const params = new URLSearchParams(search);
    const videoSort = params.get('videoSort');
    const filterLength = params.get('filterLength');
    const videoShowLength = (videos) => {
      let videoCounts = 0;
      Array.isArray(videos) ?
        videos.forEach(video=>{
          (video.show === undefined || video.show === true) ?
            videoCounts++ : ''
        }) : ''
      return videoCounts;
    }
    return (
      <div className={classnames({ recommend: recommend })}>
        <div className="container">
          <div className="tool">
            <SortVideo {...this.props} videoSort={videoSort} />
            <FilterVideo {...this.props} filterLength={filterLength} />
          </div>
          <div className="video-list">
            {videos.map(video => 
              (video.show !== false) ?
              [<Video key={video.id} actions={actions} pageStatus={pageStatus} {...video}/>, ' '] : ''
            )}
          </div>
          {videoShowLength(videos) == 0 ? <div className="empty-note">沒有相關影片，請重新篩選！</div> : ''}
        </div>
      </div>
    )
  }
}