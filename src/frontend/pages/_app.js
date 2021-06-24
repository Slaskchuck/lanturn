import { wrapper } from 'redux/Store'

import '../styles/globals.sass'
// base url sass
import '../styles/home.sass'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)