import Card from './Card'
import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'

function ResellProduct() {
  const { searchProducts } = useContext(UserInfoContext)

  return (
    <>
      <div className='pt-2 text-lg text-sky-400'>Resell Product</div>
      <div className='flex'>
        {searchProducts
          .filter((product) => {
            return product.product_category === 'used_products'
          })
          .map((product) => {
            return (
              <Card
                product_name={product.product_name}
                product_image={product.product_image}
                Key={product.id}
                start_price={product.start_price}
              />
            )
          })}
      </div>
    </>
  )
}
export default ResellProduct
