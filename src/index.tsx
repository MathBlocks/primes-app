import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { App } from './components/App'
import './setupGA4'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)
