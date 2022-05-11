import { Link } from 'react-router-dom'

export default function Card({
  product_image,
  product_name,
  start_price,
  Key,
}) {
  return (
    <>
      <Link to={`/home/item/${Key}`}>
        <div className='card card-compact w-96 bg-base-100 shadow-xl pt-2'>
          <figure>
            <img src={product_image} alt='Shoes' />
          </figure>
          <div className='card-body'>
            <h2 className='card-title text-sky-400 font-bold'>
              {product_name}
            </h2>

            <div id='Starting-Bid'>
              <small>$</small> {start_price}
            </div>

            <div className='card-actions justify-end '>
              <div
                className='pt-3 pr-5 text-green-400 font-semibold'
                id='Highest-Bid '
              >
                <small>$</small> 0
              </div>
              <button className='btn btn-primary'> JOIN BID </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
