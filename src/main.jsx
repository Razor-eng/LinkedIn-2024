import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster />
    <App />
  </>
)
