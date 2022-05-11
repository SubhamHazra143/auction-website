import Login from './Login'
import Buy from './Buy'
import Sell from './Sell'
import About from './About'
import Wallet from './Wallet'
import Error from './Error'
import Home from './Home'
import Profile from './Profile'
import Item from './Item'
import { UserInfoContextProvider } from './UserInfoContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <UserInfoContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />}>
              <Route index element={<Buy />} />
              <Route path='Sell' element={<Sell />} />
              <Route path='About' element={<About />} />
              <Route path='Wallet' element={<Wallet />} />
              <Route path='Profile' element={<Profile />} />
              <Route path='item/:id' element={<Item />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserInfoContextProvider>
    </>
  )
}

export default App
