import SaleBell from './icons/saleBell.svg'
import google from './icons/google.png'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  return (
    <div className='card glass px-4 w-96  shadow-2xl login-card'>
      <figure className='px-10 pt-10 '>
        <img src={SaleBell} alt='Shoes' className='rounded-xl ' />
      </figure>
      <div className='card-body items-center text-center'>
        <div className='card-actions'>
          <button
            onClick={() => {
              navigate('/Buy')
            }}
            className='btn  btn-error glass shadow-md  text-bold'
          >
            Sign in With <img className='px-2' src={google} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
