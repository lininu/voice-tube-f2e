import React, { Component } from 'react'
import { SORT_VIDEOS_PUBLISH, SORT_VIDEOS_VIEWS, SORT_VIDEOS_COLLECTCOUNT } from '../constants/ActionTypes'
import classnames from 'classnames'

export default class SortVideo extends Component {
  constructor(props) {
    super(props)
    this.sortChange = this.sortChange.bind(this)
  }
  componentDidMount() {
    this.initSort()
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateSort(prevProps)
  }

  // while componentDidMount, the page will init sort.
  initSort() {
    let t = setInterval(()=>{
      const { pageStatus, location, actions, videoSort } = this.props
      const search = new URLSearchParams(location.search)
      if(pageStatus.videosReady) {
        clearInterval(t)
        search.get("videoSort") ? actions.sortVideos(videoSort) : ''
      }
    }, 100)
  }

  // while componentDidUpdate, the page will re sort.
  updateSort(prevProps) {
    const { history, location, pageStatus, actions, videoSort } = this.props
    const search = new URLSearchParams(location.search)
    const prevSearch = new URLSearchParams(prevProps.location.search)

    if(pageStatus.videosReady && search.get("videoSort") !== prevSearch.get("videoSort")) {
      actions.sortVideos(videoSort)
    }
  }

  // default checked
  sortChecked(value) {
    const { videoSort } = this.props
    const targetValue = value.trim()

    return (videoSort && videoSort === targetValue) ? true : false
  }

  // client trigger change
  sortChange(e) {
    const { actions } = this.props
    const targetValue = e.target.value.trim()
    this.changeUrlState(targetValue)
  }

  // while cilent change, the history of react-router will be changed. And then see componentDidUpdate. If videoSort in prevProps and now props is not equal, we'll sort these videos.
  changeUrlState(videoSort) {
    const { history, location, actions } = this.props
    let search = new URLSearchParams(location.search)
        search.set("videoSort", videoSort)

    history.push({
      pathname: location.pathname,
      search: `?${search.toString()}`,
      state: this.state
    })
  }

  render() {
    const { pageStatus, actions, videoSort } = this.props

    return (
      <div className="tool__box">
        <div className="tool__title">排序</div>
        <div className="tool__type">
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.sortChecked(SORT_VIDEOS_PUBLISH)
          })}>
            <label htmlFor="publish">發布時間</label>
            <input type="radio" id="publish" name="sortvideo" checked={this.sortChecked(SORT_VIDEOS_PUBLISH)} value={SORT_VIDEOS_PUBLISH} onChange={this.sortChange}/>
          </div>
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.sortChecked(SORT_VIDEOS_VIEWS)
          })}>
            <label htmlFor="views">觀看次數</label>
            <input type="radio" id="views" name="sortvideo" checked={this.sortChecked(SORT_VIDEOS_VIEWS)} value={SORT_VIDEOS_VIEWS} onChange={this.sortChange}/>
          </div>
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.sortChecked(SORT_VIDEOS_COLLECTCOUNT)
          })}>
            <label htmlFor="collectCount">收藏次數</label>
            <input type="radio" id="collectCount" name="sortvideo" checked={this.sortChecked(SORT_VIDEOS_COLLECTCOUNT)} value={SORT_VIDEOS_COLLECTCOUNT} onChange={this.sortChange}/>
          </div>
        </div>
      </div>
    )
  }
}