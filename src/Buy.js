import wallet from './icons/wallet.svg'
import notification from './icons/notification.svg'
function Buy() {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>SALE BELL</a>
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
              <a href='first-page.html'>Buyer</a>
            </li>{' '}
          </ul>
        </div>
        <div>
          <ul
            tabIndex='0'
            className='menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-25'
          >
            <li>
              <a href='seller.html'>Seller</a>
            </li>
          </ul>
        </div>
        <div>
          <ul
            tabIndex='0'
            className='menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-25'
          >
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
        <button className='btn btn-ghost btn-circle'>
          <div className='indicator'>
            <a href='wallet.html'>
              <img src={wallet} />
            </a>

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
              <img src='https://api.lorem.space/image/face?hash=33791' />
            </div>
          </label>
          <ul
            tabIndex='0'
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <a href='profile.html' className='justify-between'>
                Profile
              </a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Buy
