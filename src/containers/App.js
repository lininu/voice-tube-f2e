import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import 'url-search-params-polyfill'
import * as actions from '../actions'
import '../components/global/global.scss'
import List from '../components/List'

const listRedirectDefault = () => (<Redirect to="/List"/>)
const App = ({actions, videos, status}) => (
  <Router>
    <Route render={ ({ location }) => (
      <Switch location={location}>
        <Route exact path="/" component={listRedirectDefault} />
        <Route path="/List" 
               render={ props =>(
          <List {...props} 
                actions={actions} 
                videos={videos}
                pageStatus={status} />
        )} />
        <Route path="/ListRecommend" 
               render={ props =>(
          <List {...props} 
                recommend={true}
                actions={actions} 
                videos={videos}
                pageStatus={status} />
        )} />
      </Switch>
    )}/>
  </Router>
)

const mapStateToProps = (state, ownProps) => ({
  status: state.status,
  videos: state.videos
})

const mapDispatchProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchProps
)(App)