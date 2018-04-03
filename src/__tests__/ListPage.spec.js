import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import 'url-search-params-polyfill'
import List from '../components/List'
import * as actions from '../actions'
import { INIT_VIDEOS, SORT_VIDEOS, SORT_VIDEOS_PUBLISH, SORT_VIDEOS_VIEWS, SORT_VIDEOS_COLLECTCOUNT, FILTER_VIDEOS_LENGTH, LENGTH_ALL, LENGTH_LESS_THEN_FOUR_MINS, LENGTH_LESS_THEN_FIVE_MINS, LENGTH_FIVE_TO_TEN_MINS, LENGTH_MORE_THEN_TEN_MINS } from '../constants/ActionTypes'
import videosReducer from '../reducers/videos'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('/List page <List />', ()=>{
  it('renders /List page', () => {
    const state = {
      status: {},
      videos: []
    }
    const store = mockStore(state)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ '/List' ]} >
          <div>
            <Route path="/List" render={ props =>(
              <List {...props}
                    actions={actions} 
                    videos={state.videos}
                    pageStatus={state.status} />
            )} />
          </div>
        </MemoryRouter>
      </Provider>)

    // common的layout
    expect(wrapper.find('.common')
      .not('.recommend')
      .not('.bootstrap-grid')).toHaveLength(1)
    
    expect(wrapper.find('.empty-note')).toHaveLength(0)
    // 長度4分鐘
    expect(wrapper.find('#filterVideos4')).toHaveLength(1)
    // 沒有長度5分鐘的選項
    expect(wrapper.find('#filterVideosLess5')).toHaveLength(0)
  })

  const checkedItemsInSortPage = ({
    actions, state, sortType, expectAction, expectState, checkedStatus
  }) => {
    const store = mockStore(state)
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ {
          pathname: '/List',
          search: '?videoSort=' + sortType
        } ]} >
          <div>
            <Route path="/List" render={ props =>(
              <List {...props}
                    actions={actions} 
                    videos={state.videos}
                    pageStatus={state.status} />
            )} />
          </div>
        </MemoryRouter>
      </Provider>)

    // initSort()
    expect(wrapper.find('#publish').props().checked)
      .toEqual(checkedStatus.publish)
    expect(wrapper.find('#views').props().checked)
      .toEqual(checkedStatus.views)
    expect(wrapper.find('#collectCount').props().checked)
      .toEqual(checkedStatus.collectCount)

    // expect action is correct
    store.dispatch(actions.sortVideos(sortType))
    expect(store.getActions()).toEqual(expectAction)

    // reducer is correct
    expect(
      videosReducer(state.videos, ...expectAction)
    ).toEqual(expectState)
  }

  it('/List?sortType=publish page', () => {
    let state = {
      status: {
        videosReady: true
      },
      videos: [
        {id: 1, publish: 22, captions:[]}, 
        {id: 2, publish: 33, captions:[]}, 
        {id: 3, publish: 11, captions:[]}
      ]
    }
    
    const sortType = 'SORT_VIDEOS_PUBLISH'
    const expectAction = [{
      type: SORT_VIDEOS, sortType
    }]
    const expectState = [
      {id: 2, publish: 33, captions:[]}, 
      {id: 1, publish: 22, captions:[]}, 
      {id: 3, publish: 11, captions:[]}
    ]

    const checkedStatus = {
      publish: true,
      views: false,
      collectCount: false
    }

    checkedItemsInSortPage({ actions, state, sortType, expectAction, expectState, checkedStatus })
  })

  it('/List?sortType=views page', () => {
    let state = {
      status: {
        videosReady: true
      },
      videos: [
        {id: 1, views: 1234, captions:[]}, 
        {id: 2, views: 2345, captions:[]}, 
        {id: 3, views: 3456, captions:[]}
      ]
    }
    
    const sortType = 'SORT_VIDEOS_VIEWS'
    const expectAction = [{
      type: SORT_VIDEOS, sortType
    }]
    const expectState = [
      {id: 3, views: 3456, captions:[]}, 
      {id: 2, views: 2345, captions:[]}, 
      {id: 1, views: 1234, captions:[]}
    ]

    const checkedStatus = {
      publish: false,
      views: true,
      collectCount: false
    }

    checkedItemsInSortPage({ actions, state, sortType, expectAction, expectState, checkedStatus })
  })

  it('/List?sortType=collectCount page', () => {
    let state = {
      status: {
        videosReady: true
      },
      videos: [
        {id: 1, collectCount: 3456, captions:[]}, 
        {id: 2, collectCount: 1234, captions:[]}, 
        {id: 3, collectCount: 2345, captions:[]}
      ]
    }
    
    const sortType = 'SORT_VIDEOS_COLLECTCOUNT'
    const expectAction = [{
      type: SORT_VIDEOS, sortType
    }]
    const expectState = [
      {id: 1, collectCount: 3456, captions:[]}, 
      {id: 3, collectCount: 2345, captions:[]}, 
      {id: 2, collectCount: 1234, captions:[]}
    ]

    const checkedStatus = {
      publish: false,
      views: false,
      collectCount: true
    }

    checkedItemsInSortPage({ actions, state, sortType, expectAction, expectState, checkedStatus })
  })
})