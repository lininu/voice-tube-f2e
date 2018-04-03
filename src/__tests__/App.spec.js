import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter, Route } from 'react-router'

import { createMockStore } from 'redux-test-utils'

import App from '../containers/App'
import List from '../components/List'

describe('<App />', ()=>{
  it('renders <App /> component', () => {
    const state = {
      status: {},
      videos: []
    }
    const store = createMockStore(state)
    // const action = {
    //   type: 'type',
    //   data: 'data'
    // }

    // store.dispatch(getVideos())
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>)
    expect(wrapper).toHaveLength(1)
  })

  it('renders /ListRecommend page', () => {
    const state = {
      status: {},
      videos: []
    }
    const store = createMockStore(state)
    const actions = {}

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ { pathname: '/ListRecommend' } ]} >
          <div>
            <Route path="/ListRecommend" render={ props =>(
              <List {...props} 
                    recommend={true}
                    actions={actions} 
                    videos={state.videos}
                    pageStatus={state.status} />
            )} />
          </div>
        </MemoryRouter>
      </Provider>)

    expect(wrapper).toHaveLength(1)
    // common & recommend的layout
    expect(wrapper.find('.common.recommend')).toHaveLength(1)
    // 長度4分鐘
    expect(wrapper.find('#filterVideosLess5')).toHaveLength(1)
  })

  it('renders /ListBootstrap page', () => {
    const state = {
      status: {},
      videos: []
    }
    const store = createMockStore(state)
    const actions = {}

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ { pathname: '/ListBootstrap' } ]} >
          <div>
            <Route path="/ListBootstrap" render={ props =>(
              <List {...props} 
                    bootstrapGrid={true}
                    actions={actions} 
                    videos={state.videos}
                    pageStatus={state.status} />
            )} />
          </div>
        </MemoryRouter>
      </Provider>)

    expect(wrapper).toHaveLength(1)
    // common & recommend的layout
    expect(wrapper.find('.recommend.bootstrap-grid')).toHaveLength(1)
    // 長度4分鐘
    expect(wrapper.find('#filterVideosLess5')).toHaveLength(1)
  })
})