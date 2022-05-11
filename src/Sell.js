import { useContext, useEffect, useState } from 'react'
import { storage, db } from './firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, setDoc, doc, getDoc } from 'firebase/firestore'
import { upload } from '@testing-library/user-event/dist/upload'
import UserInfoContext from './UserInfoContext'
import Spinner from './Spinner'
import { ReactComponent as InfoIcon } from './icons/infoIcon.svg'
import { ReactComponent as CheckMark } from './icons/checkMark.svg'

function Sell() {
  const {
    user: { uid },
  } = useContext(UserInfoContext)
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState({
    product_category: '',
    product_details: '',
    product_name: '',
    product_image: null,
    start_price: 0,
    bid_type: '',
    buyout: false,
    deposit_money: 0,
    start_day: null,
    end_day: null,
  })
  const [seller, setSeller] = useState({
    name: '',
    aadhar_number: '',
    aadhar_image: null,
    pan_number: '',
    pan_image: null,
    gst_number: '',
  })
  const [checkKyc, setCheckKyc] = useState(false)

  useEffect(() => {
    console.log('Hello')

    const kyc = async () => {
      const docRef = doc(db, 'seller', uid)
      const kycDoc = await getDoc(docRef)
      if (kycDoc.exists()) {
        setCheckKyc(true)
      }
    }
    if (checkKyc == false) {
      kyc()
    }
  })

  const handleChange = (e) => {
    var value = null
    if (e.target.name == 'aadhar_image' || e.target.name == 'pan_image') {
      value = e.target.files[0]
    } else {
      value = e.target.value
    }

    setSeller((prevSeller) => {
      return { ...prevSeller, [e.target.name]: value }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const aadhar_image_ref = ref(storage, `/aadhar_image/${uid}`)

    const aadharSnapShot = await uploadBytes(
      aadhar_image_ref,
      seller.aadhar_image
    )

    const pan_image_ref = ref(storage, `pan_image/${uid}`)

    const panSnapShot = await uploadBytes(pan_image_ref, seller.pan_image)
    const docRef = doc(db, 'seller', uid)
    await setDoc(docRef, {
      name: seller.name,
      aadhar_number: seller.aadhar_number,
      pan_number: seller.pan_number,
      gst_number: seller.gst_number,
    })
    console.log(aadharSnapShot, panSnapShot)
    setCheckKyc(true)
    setLoading(false)
  }

  const handleProductInputChange = (e) => {
    var value

    if (e.target.name === 'product_image') {
      value = e.target.files[0]
    } else if (e.target.name === 'start_price') {
      //Starting Price
      try {
        value = Number(e.target.value) + 0.1 * Number(e.target.value)
        document.querySelector('#info span').innerHTML =
          'your start price after adding service charges $ ' + value
        document.querySelector('#info').classList.remove('hidden')

        // Deposit Money
        document
          .getElementById('deposit_money')
          .setAttribute('value', 0.5 * value)

        setProductDetails((prevProductDetails) => {
          return { ...prevProductDetails, deposit_money: value * 0.5 }
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      value = e.target.value
    }

    setProductDetails((prevProductDetails) => {
      return {
        ...prevProductDetails,

        [e.target.name]: value,
      }
    })
  }

  const handleProductSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    console.log('heloo')

    const product_image_ref = ref(
      storage,
      `product/${productDetails.product_image.name}`
    )

    const productImageSnapshot = await uploadBytes(
      product_image_ref,
      productDetails.product_image
    )

    const {
      product_category,
      product_name,
      product_details,
      product_image,
      start_price,
      buyout,
      end_day,
      start_day,
      bid_type,
      deposit_money,
    } = productDetails
    const imageUrl = await getDownloadURL(
      ref(storage, `${productImageSnapshot.metadata.fullPath}`)
    )
    await addDoc(collection(db, 'product'), {
      product_category,
      product_name,
      product_details,
      product_image: imageUrl,
      buyout,
      bid_type,
      deposit_money,
      start_price,
      start_day,
      end_day,
    })
    e.target.reset()
    setLoading(false)
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='flex flex-col w-screen items-center'>
        <h1 className='font-bold text-xl pb-2'>Seller Details</h1>

        <div className='flex w-3/4 flex-col items-center shadow-lg shadow-indigo-500/40 p-4 border-white border-4 rounded-lg my-8'>
          {checkKyc ? (
            <h1 className='font-bold text-2xl text-white'>
              <CheckMark className='inline-block' /> You are a KYC Verified User
            </h1>
          ) : (
            <form onSubmit={onSubmit}>
              <div className=' flex flex-col '>
                <label className='mb-5px text-lg mb-2 ' for='full_name'>
                  Full name
                </label>
                <input
                  className='p-2 rounded-lg mb-2 text-black'
                  type='text'
                  placeholder='Enter your name'
                  required
                  name='name'
                  onChange={handleChange}
                />
              </div>
              <div className=' flex flex-col '>
                <div className=' flex flex-col '>
                  <label
                    for='aadhaar_card_number'
                    className='mb-5px text-lg mb-2 '
                  >
                    Aadhaar Card Number
                  </label>
                  <input
                    className='p-2 rounded-lg mb-2 text-black'
                    id='aadhaar_card_number'
                    type='text'
                    placeholder='Please Enter Aadhaar Card Number'
                    required
                    onChange={handleChange}
                    name='aadhar_number'
                  />
                </div>
                <div className=' flex flex-col '>
                  <label
                    for='aadhaar_card_image'
                    className='mb-5px text-lg mb-2 '
                  >
                    Aadhaar Card Image
                  </label>
                  <input
                    type='file'
                    className='p-2 rounded-lg mb-2 text-black'
                    placeholder='Please Select Aadhaar Card Image'
                    required
                    onChange={handleChange}
                    name='aadhar_image'
                  />
                </div>
              </div>
              <div className=' flex flex-col '>
                <div className=' flex flex-col '>
                  <label for='pan_card_number' className='mb-5px text-lg mb-2 '>
                    Pan Card Number
                  </label>
                  <input
                    type='text'
                    className='p-2 rounded-lg mb-2 text-black'
                    id='pan_card_number'
                    placeholder='Please Enter Pan Card Number'
                    required
                    onChange={handleChange}
                    name='pan_number'
                  />
                </div>
                <div className=' flex flex-col '>
                  <label for='pan_card_image' className='mb-5px text-lg mb-2 '>
                    Pan Card Image
                  </label>
                  <input
                    type='file'
                    className='p-2 rounded-lg mb-2 text-black'
                    id='pan_card_image'
                    placeholder='Please Select Pan Card Image'
                    required
                    onChange={handleChange}
                    name='pan_image'
                  />
                </div>
                <div className=' flex flex-col '>
                  <label for='gst_number' className='mb-5px text-lg mb-2 '>
                    GST Number
                    <h6>
                      (If you don't have any company gst then product will be
                      sold as our entity and taking our commission u will get
                      all your money)
                    </h6>
                  </label>
                  <input
                    type='number'
                    className='p-2 rounded-lg mb-2 text-black'
                    placeholder='Please Enter GST Number'
                    onChange={handleChange}
                    name='gst_number'
                  />
                </div>

                <button className='btn btn-primary' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className='flex flex-col w-screen items-center'>
        <div className='flex w-3/4 flex-col items-center shadow-lg shadow-indigo-500/40 p-8 border-white border-4 rounded-lg my-8'>
          <form className='w-full' onSubmit={handleProductSubmit}>
            <div className='flex flex-col '>
              <label
                htmlFor='category_of_product'
                className='mb-5px text-lg mb-2 '
              >
                Category Of Product
              </label>
              <select
                id='category_of_product'
                className='form-control text-black'
                name='product_category'
                onChange={handleProductInputChange}
              >
                <option selected disabled>
                  -- Select One Product Category --
                </option>
                <option value='antique'>
                  Antiques Art-painting, clay models and others
                </option>
                <option value='clothing'>
                  Clothing-hand painted cloth, saree and others
                </option>
                <option value='books'>Books</option>
                <option value='collectibles'>Collectibles</option>
                <option value='electronics'>Electronics</option>
                <option value='jewellery'>Jewellery</option>
                <option value='lifestyle'>Lifestyle</option>
                <option value='used_products'>Used Products</option>
              </select>
            </div>
            <div className=' flex flex-col '>
              <label className='mb-5px text-lg mb-2 ' for='full_name'>
                Product Name
              </label>
              <input
                className='p-2 rounded-lg mb-2 text-black'
                type='text'
                placeholder='Enter your name'
                required
                name='product_name'
                onChange={handleProductInputChange}
              />
            </div>
            <div className=' flex flex-col '>
              <label for='product_details' className='mb-5px text-lg mb-2 '>
                Product Details
              </label>
              <textarea
                id='product_details'
                className='p-2 rounded-lg mb-2 text-black'
                name='product_details'
                placeholder='Please Enter Product Details'
                onChange={handleProductInputChange}
                required
              ></textarea>
            </div>
            <div className=' flex flex-col '>
              <label for='product_image' className='mb-5px text-lg mb-2 '>
                Product Image
              </label>
              <input
                type='file'
                id='product_image'
                className='p-2 rounded-lg mb-2 text-black'
                name='product_image'
                placeholder='Please Upload Your product Image'
                onChange={handleProductInputChange}
                required
              />
            </div>
            <div className=' flex flex-col '>
              <label for='BID_starting_price' className='mb-5px text-lg mb-2 '>
                BID Starting Price(10% Service Charge)
              </label>
              <input
                name='start_price'
                id='BID_starting_price'
                type='number'
                className='p-2 rounded-lg mb-2 text-black'
                placeholder='Please Enter BID Starting Price'
                onChange={handleProductInputChange}
              />
              <div id='info' class='alert hidden alert-info shadow-lg'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    class='stroke-current flex-shrink-0 w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <span></span>
                </div>
              </div>
            </div>
            <div className=' flex flex-col '>
              <label for='BID_type' className='mb-5px text-lg mb-2 '>
                BID Type
              </label>
              <select
                id='BID_type'
                className='form-control text-black'
                name='bid_type'
                onChange={handleProductInputChange}
              >
                <option selected disabled>
                  -- Select One BID Type --
                </option>
                <option value='english_auction'>English Auction</option>
                <option value='sealed_auction'>Sealed Auction</option>
              </select>
            </div>
            <div className=' flex flex-col ' id='BID-buyout'>
              <label className='mb-5px text-lg mb-2 '> BID Buyout</label>
              <div className='form-check'>
                <input
                  className='form-check-input text-black'
                  type='radio'
                  name='buyout'
                  id='exampleRadios1'
                  value='option2'
                />
                <label className='mb-5px text-lg mb-2 ' for='exampleRadios1'>
                  On
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input text-black'
                  type='radio'
                  name='exampleRadios'
                  id='exampleRadios2'
                  value='option2'
                />
                <label className='mb-5px text-lg mb-2 ' for='exampleRadios2'>
                  Off
                </label>
              </div>
            </div>
            <div className=' flex flex-col '>
              <label for='BID_deposit_money' className='mb-5px text-lg mb-2 '>
                BID Earnest Money Deposit(50% Of Original)
              </label>
              <input
                name='deposit_money'
                id='deposit_money'
                type='number'
                step='any'
                className='p-2 rounded-lg mb-2 text-black'
                placeholder='Please Enter BID Deposit Money'
              />
            </div>
            <div className=' flex flex-col '>
              <label for='BID_starting_day' className='mb-5px text-lg mb-2 '>
                BID Starting Day
              </label>
              <input
                name='start_day'
                id='BID_starting_day'
                type='date'
                className='p-2 rounded-lg mb-2 text-black'
                placeholder='Please Enter BID Starting Day'
                onChange={handleProductInputChange}
              />
            </div>
            <div className=' flex flex-col '>
              <label for='BID_ending_day' className='mb-5px text-lg mb-2 '>
                BID Ending Day
              </label>
              <input
                name='end_day'
                id='BID_ending_day'
                type='date'
                className='p-2 rounded-lg mb-2 text-black'
                placeholder='Please Enter BID Starting Day'
                onChange={handleProductInputChange}
              />
            </div>

            <button className='btn btn-primary w-full' type='submit'>
              {' '}
              Submit{' '}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Sell
