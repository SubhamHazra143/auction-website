import Header from './Header'
import Footer from './Footer'
import { Outlet, Navigate } from 'react-router-dom'
import useAuthstatus from './useAuthStatus'
import Spinner from './Spinner'

export default function Home() {
  const { checkStatus, loggedIn } = useAuthstatus()

  {
    if (checkStatus) {
      return <Spinner />
    } else {
      return loggedIn ? (
        <>
          <Header /> <Outlet /> <Footer />
        </>
      ) : (
        <Navigate to='/' />
      )
    }
  }
}
