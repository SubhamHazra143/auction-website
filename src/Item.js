import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'
import Spinner from './Spinner'
export default function Item() {
  const { id } = useParams()
  const { products, fetchProduct } = useContext(UserInfoContext)
  const [product, setProduct] = useState({})
  useEffect(() => {
    setProduct(() => {
      console.log('item')
      const prod = products.find((product) => {
        return product.id === id
      })
      setProduct(prod)
    })
  }, [])
  return (
    <>
      <div className='flex flex-row card shadow-xl '>
        <figure>
          <img src={product.product_image} alt='Album' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-blue-400 font-bold'>
            {product.product_name}
          </h2>
          <p>{product.product_details}</p>
          <div className='badge badge-accent'>English Auction</div>
          <div>
            Bid Starting Price
            <div className='text-sky-400 text-3xl font-semibold'>
              {' '}
              Rs. {product.start_price}
            </div>
          </div>
          <div></div>
          <div className='flex gap-3 text-white'>
            <div>
              <span className='countdown font-mono text-2xl'>
                <span></span>
              </span>
              days
            </div>
            <div>
              <span className='countdown font-mono text-2xl'>
                <span></span>
              </span>
              hours
            </div>
            <div>
              <span className='countdown font-mono text-2xl'>
                <span></span>
              </span>
              min
            </div>
            <div>
              <span className='countdown font-mono text-2xl'>
                <span></span>
              </span>
              sec
            </div>
          </div>
          <div className='card-actions justify-end'>
            <div className='flex flex-col'>
              <div>
                <small> Present highest bid</small>
              </div>
              <div className='text-green-400 font-bold' id='Highest-Bid '>
                {' '}
                <small>$</small> Highest bid price
              </div>
            </div>
            <a href='#my-modal-2' className='btn btn-primary'>
              Start Bidding
            </a>
            <div className='modal' id='my-modal-2'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>
                  How much do you want to bid
                </h3>
                <br />
                <div>
                  Bid Value
                  <input
                    type='text'
                    placeholder='Bid amount'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <br />
                <div>
                  Set Auto bid limit
                  <input
                    type='text'
                    placeholder='Bid amount'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <br />
                <div>
                  Increment by
                  <input
                    type='text'
                    placeholder='Bid amount'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <p className='py-4'>
                  By setting autobid, with other bidders bid your bid value will
                  increase.
                </p>
                <div className='modal-action'>
                  <a href='#' className='btn btn-accent'>
                    Place Bid
                  </a>
                </div>
                <div className='text-center font-bold'>OR</div>
                <br />
                <div className='text-left'>
                  <div className=''>PRESS BUYOUT if you want to buyout at </div>
                  <input
                    type='text'
                    placeholder='Bid amount'
                    className='input input-bordered'
                  />
                </div>
                <div className='modal-action'>
                  <a href='#' className='btn btn-accent'>
                    Buyout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr className='opacity-30' />

      <div className='py-3 font-bold text-blue-400'>ACTIVE BIDDERS</div>
      <div>
        <table className='table table-compact w-full '>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>location</th>
              <th>Last Bid Time</th>
              <th>Bid amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Rs130</td>
            </tr>

            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>United States</td>
              <td>12/5/2020</td>
              <td>Rs 120</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>China</td>
              <td>8/15/2020</td>
              <td>Rs110</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
