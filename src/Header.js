import wallet from './icons/wallet.svg'
import notification from './icons/notification.svg'
import { useContext, useEffect } from 'react'
import UserInfoContext from './UserInfoContext'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import saleBell from './icons/saleBell.svg'

function Header() {
  const { user } = useContext(UserInfoContext)
  const navigate = useNavigate()

  const onLogOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to='/home'>
          <img
            className='h-16 w-16 bg-white shadow-lg border-2 border-white rounded-md'
            src={saleBell}
            alt='logo'
          />
        </Link>

        {/* <a className='btn btn-ghost normal-case text-xl'>SALE BELL</a> */}
      </div>
      <div className='flex-none gap-2'>
        {/* <!-- <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered">
      </div>--> */}
        <div>
          <ul
            tabIndex='0'
            className='menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-25'
          >
            <li>
              <Link to='/Home'>Buyer</Link>
            </li>{' '}
          </ul>
        </div>
        <div>
          <ul
            tabIndex='0'
            className='menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-25'
          >
            <li>
              <Link to='/home/Sell'>Seller</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul
            tabIndex='0'
            className='menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-25'
          >
            <li>
              <Link to='/home/About'>About Us</Link>
            </li>
          </ul>
        </div>
        <button className='btn btn-ghost btn-circle'>
          <div className='indicator'>
            <Link to='/home/Wallet'>
              <img src={wallet} />
            </Link>

            <span className='badge badge-xs badge-primary indicator-item'></span>
          </div>
        </button>
        <button className='btn btn-ghost btn-circle'>
          <div className='indicator'>
            <img src={notification} alt='' />
            <span className='badge badge-xs badge-primary indicator-item'></span>
          </div>
        </button>
        <div className='dropdown dropdown-end'>
          <label tabIndex='0' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src={user.image} />
            </div>
          </label>
          <ul
            tabIndex='0'
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/home/profile' className='justify-between'>
                Profile
              </Link>
            </li>
            <li>
              <button onClick={onLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
