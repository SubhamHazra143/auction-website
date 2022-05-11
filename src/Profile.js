import { useContext, useEffect } from 'react'
import UserInfoContext from './UserInfoContext'
import { useState } from 'react'
import useAuthstatus from './useAuthStatus'
import { db } from './firebase.config.js'
import { doc, setDoc } from 'firebase/firestore'
import Spinner from './Spinner'
export default function Profile() {
  const { loggedIn, checkStatus } = useAuthstatus()
  const [loading, setLoading] = useState(false)
  const {
    user: { name, email, number, address, pincode, uid },
  } = useContext(UserInfoContext)
  const [person, setPerson] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    pincode: '',
  })

  const handleChange = (e) => {
    setPerson((prevPerson) => {
      return { ...prevPerson, [e.target.name]: e.target.value }
    })
  }

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const userRef = doc(db, 'users', uid)

    try {
      await setDoc(
        userRef,
        {
          name: person.name,
          email: person.email,
          address: person.address,
          number: person.number,
          pincode: person.pincode,
          uid: uid,
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (name.length > 0) {
      console.log(name)
      setPerson((prevPerson) => {
        return { ...prevPerson, name, email, number, address, pincode }
      })
    }
  }, [name])

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='card w-96 bg-base-100 shadow-xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>My Profile</h2>
            <br />
            <form onSubmit={onSubmit}>
              <h6 className='text-bold '>User information</h6>
              <br />
              <div className='form-group mb-6'>
                <label
                  htmlFor='fullname'
                  className='form-label inline-block mb-2 text-white-700'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                      text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='fname'
                  aria-describedby='text'
                  placeholder='Enter Name'
                  value={person.name}
                  onChange={handleChange}
                  name='name'
                  required
                />
              </div>
              <div className='form-group mb-6'>
                <label
                  htmlFor='exampleInputEmail1'
                  className='form-label inline-block mb-2 text-white-700'
                >
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                      text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                  value={person.email}
                  onChange={handleChange}
                  name='email'
                  required
                />
                <small
                  id='emailHelp'
                  className='block mt-1 text-xs text-gray-600'
                >
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group mb-6'>
                <label
                  htmlFor='fullname'
                  className='form-label inline-block mb-2 text-white-700'
                >
                  Phone Number
                </label>
                <input
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='phone-number'
                  aria-describedby='phnumber'
                  placeholder='Enter Phone Number'
                  value={person.number}
                  onChange={handleChange}
                  name='number'
                  required
                />
                <small
                  id='phone-number'
                  className='block mt-1 text-xs text-gray-600'
                >
                  We'll never share your phone number with anyone else.
                </small>
              </div>
              <div className='form-group mb-6'>
                <label
                  htmlFor='fullname'
                  className='form-label inline-block mb-2 text-white-700'
                >
                  Address
                </label>
                <input
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                      text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='address'
                  aria-describedby='text'
                  placeholder='Enter Address'
                  value={person.address}
                  onChange={handleChange}
                  name='address'
                  required
                />
              </div>
              <div className='form-group mb-6'>
                <label
                  htmlFor='fullname'
                  className='form-label inline-block mb-2 text-white-700'
                >
                  Pincode
                </label>
                <input
                  type='text'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                      text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='pincode'
                  aria-describedby='number'
                  placeholder='Enter Pincode'
                  value={person.pincode}
                  onChange={handleChange}
                  name='pincode'
                  required
                />
              </div>
              {/* <!-- <div className="form-group mb-6">
                    <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-white-700">Password</label>
                    <input type="password" className="form-control block w-full px-3 py-1.5 text-base
                      font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
                      placeholder="Password">
                  </div> --> */}

              <button
                type='submit'
                className='px-6 py-2.5 bg-blue-600 text-white
                    font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out'
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
