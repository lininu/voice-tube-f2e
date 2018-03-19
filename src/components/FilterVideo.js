import React, { Component } from 'react'
import { LENGTH_ALL, LENGTH_LESS_THEN_FOUR_MINS, LENGTH_LESS_THEN_FIVE_MINS, LENGTH_FIVE_TO_TEN_MINS, LENGTH_MORE_THEN_TEN_MINS } from '../constants/ActionTypes'
import classnames from 'classnames'

export default class FilterVideo extends Component {
  constructor(props) {
    super(props)
    this.filterChange = this.filterChange.bind(this)
  }
  componentDidMount() {
    this.initFilter()
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateFilter(prevProps)
  }

  // while componentDidMount, the page will init filter.
  initFilter() {
    let t = setInterval(()=>{
      const { pageStatus, location, actions, filterLength } = this.props
      const search = new URLSearchParams(location.search)
      if(pageStatus.videosReady) {
        clearInterval(t)
        search.get("filterLength") ? actions.filterVideosLength(filterLength) : ''
      }
    }, 100)
  }

  // while componentDidUpdate, the page will re filter.
  updateFilter(prevProps) {
    const { history, location, pageStatus, actions, filterLength } = this.props
    const search = new URLSearchParams(location.search)
    const prevSearch = new URLSearchParams(prevProps.location.search)

    if(pageStatus.videosReady && search.get("filterLength") !== prevSearch.get("filterLength")) {
      actions.filterVideosLength(filterLength)
    }
  }

  // default checked
  filterChecked(value) {
    const { filterLength } = this.props
    const targetValue = value.trim()

    return (filterLength && filterLength === targetValue) ? true : false
  }

  // client trigger change
  filterChange(e) {
    const { actions } = this.props
    const targetValue = e.target.value.trim()

    this.changeUrlState(targetValue)
  }

  // while cilent change, the history of react-router will be changed. And then see componentDidUpdate. If filterLength in prevProps and now props is not equal, we'll filter these videos.
  changeUrlState(filterLength) {
    const { history, location, actions } = this.props
    let search = new URLSearchParams(location.search)
        search.set("filterLength", filterLength)

    history.push({
      pathname: location.pathname,
      search: `?${search.toString()}`,
      state: this.state
    })
  }
  render() {
    const { recommend, bootstrapGrid } = this.props
    return (
      <div className="tool__box">
        <div className="tool__title">長度</div>
        <div className="tool__type">
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.filterChecked(LENGTH_ALL)
          })}>
            <label htmlFor="filterVideosALL">不限</label>
            <input type="radio" id="filterVideosALL" name="filterVideosLength" checked={this.filterChecked(LENGTH_ALL)} value={LENGTH_ALL} onChange={this.filterChange}/>
          </div>
          {(recommend || bootstrapGrid) ?
            <div className={classnames({
              "tool__tag": true,
              "tool__tag--active": this.filterChecked(LENGTH_LESS_THEN_FIVE_MINS)
            })}>
              <label htmlFor="filterVideosLess5">5分鐘以下</label>
              <input type="radio" id="filterVideosLess5" name="filterVideosLength" checked={this.filterChecked(LENGTH_LESS_THEN_FIVE_MINS)} value={LENGTH_LESS_THEN_FIVE_MINS} onChange={this.filterChange}/>
            </div> :
            <div className={classnames({
              "tool__tag": true,
              "tool__tag--active": this.filterChecked(LENGTH_LESS_THEN_FOUR_MINS)
            })}>
              <label htmlFor="filterVideos4">4分鐘以下</label>
              <input type="radio" id="filterVideos4" name="filterVideosLength" checked={this.filterChecked(LENGTH_LESS_THEN_FOUR_MINS)} value={LENGTH_LESS_THEN_FOUR_MINS} onChange={this.filterChange}/>
            </div>
          }
          
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.filterChecked(LENGTH_FIVE_TO_TEN_MINS)
          })}>
            <label htmlFor="filterVideos5">5-10分鐘</label>
            <input type="radio" id="filterVideos5" name="filterVideosLength" checked={this.filterChecked(LENGTH_FIVE_TO_TEN_MINS)} value={LENGTH_FIVE_TO_TEN_MINS} onChange={this.filterChange}/>
          </div>
          <div className={classnames({
            "tool__tag": true,
            "tool__tag--active": this.filterChecked(LENGTH_MORE_THEN_TEN_MINS)
          })}>
            <label htmlFor="filterVideos10">超過10分鐘</label>
            <input type="radio" id="filterVideos10" name="filterVideosLength" checked={this.filterChecked(LENGTH_MORE_THEN_TEN_MINS)} value={LENGTH_MORE_THEN_TEN_MINS} onChange={this.filterChange}/>
          </div>
        </div>
      </div>
    )
  }
}