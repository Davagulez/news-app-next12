import '../styles/globals.css'
import { createContext } from 'react'

const DataContext = createContext()

function MyApp({ Component, pageProps }) {
  /* return <Component {...pageProps} /> */
  return (
    <DataContext.Provider value={'dark'}>
      <Component {...pageProps} />
    </DataContext.Provider>
  ) 
    
}

export default MyApp
