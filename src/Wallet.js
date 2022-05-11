import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'

export default function Wallet() {
  const { wallet } = useContext(UserInfoContext)

  return (
    <>
      <div className=' flex justify-center grid grid-cols-2 gap-3  '>
        <div className='card w-96 bg-base-100 shadow-2xl items-center '>
          <div className='card-body'>
            <h2 className='card-title'>Total Amount Added</h2>
            <p className='text-blue-400 text-2xl'>Rs {wallet.total_amount}</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Amount Remaining</h2>
            <p className='text-blue-400 text-2xl'>Rs 0</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Amount In Auction</h2>
            <p className='text-blue-400 text-2xl'>Rs 0</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Total Purchase</h2>
            <p className='text-blue-400 text-2xl'>Rs 0</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Add Amount</h2>
            <form>
              <div className='form-group mb-6'>
                <input
                  type='number'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                          text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                          rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='fname'
                  aria-describedby='number'
                  placeholder='Enter Amount'
                />
                <br />
                <button className='btn btn-accent'>Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
