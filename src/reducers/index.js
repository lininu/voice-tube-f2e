import { combineReducers } from 'redux'
import status from './status'
import videos from './videos'

const rootReducer = combineReducers({
  status,
  videos
})

export default rootReducer