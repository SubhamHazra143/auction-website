import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'
const useAuthstatus = () => {
  const { setUserData, fetchProducts } = useContext(UserInfoContext)
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkStatus, setCheckStatus] = useState(true)
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted.current) {
      const auth = getAuth()

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setUserData(user)
          await fetchProducts()
          setLoggedIn(true)
        }

        setCheckStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkStatus }
}

export default useAuthstatus
