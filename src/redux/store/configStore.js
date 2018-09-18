import { createStore } from 'redux'
import reducer from '../reducer'

// export default (prevState) => createStore(reducer, prevState)
export default () => createStore(reducer)
