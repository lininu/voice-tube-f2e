import React, { Component } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import moment from 'moment'
import "moment-duration-format"
import { LANGTYPE, LEVELTYPE } from '../constants/tagType'
import './Video.scss'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { actions, pageStatus } = this.props

    clearTimeout(pageStatus.pageTimeout)
    pageStatus.pageTimeout = setTimeout(()=>{
      !pageStatus.videosReady ?
        actions.videosReady() : ''  
    }, 0)
  }
  render() {
    const { id, thumbnail, title, views, collectCount, duration, publish, level, captions } = this.props
    return (
      <div className="video">
        <div className="video__box">
          <div className="video__img">
            <img src={thumbnail} alt=""/>
            <span className="video__duration">
              {moment.duration(duration, "second").format('hh:mm:ss')}
            </span>
          </div>
          <div className="video__content">
            <div className="video__title">
              <LinesEllipsis
                text={title}
                maxLine='2'
                ellipsis='...'
                // {<span>...<a href='/link/to/article'>Read more</a></span>}
                basedOn='letters'
              />
            </div>
            <div className="video__status">
              <div className="video__views">
                <i className="material-icons">&#xE310;</i>
                <span>{views}</span>
              </div>
              <div className="video__tags">
                { captions.map((caption, i)=>
                    <span key={i} className="video__tag video__tag--caption">{LANGTYPE[caption]}</span>
                )}
                <span className="video__tag video__tag--level">{LEVELTYPE[level]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}