import HighestBid from './HighestBid'
import RecentlyAdded from './RecentlyAdded'
import ResellProduct from './ResellProduct'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'
function Buy() {
  const { products, fetchProducts, filterProducts } =
    useContext(UserInfoContext)

  useEffect(() => {
    console.log('Buy')
    const fetch = async () => {
      await fetchProducts()
      filterProducts('')
    }
    fetch()
  }, [])

  const onChange = (e) => {
    filterProducts(e.target.value)
  }

  return (
    <>
      <div className='container mx-auto px-4'>
        <div className='form-control py-4'>
          <input
            type='text'
            placeholder='Search'
            class='input input-bordered '
            onChange={onChange}
          />
        </div>
        <hr className='opacity-30'></hr>
        <HighestBid />

        <br />

        <hr className='opacity-30 pt-2' />

        <ResellProduct />

        <br />

        <hr className='opacity-30 py-2' />

        <hr className='opacity-30' />
        <RecentlyAdded />

        <hr className='opacity-70 '></hr>
      </div>
    </>
  )
}

export default Buy
