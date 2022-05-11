import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Sale-Bell</h1>
            <p className='py-6'>An Online Auction Website By Subham Hazra</p>
            <button
              className='btn btn-primary'
              onClick={() => {
                navigate('/home')
              }}
            >
              Go to Home-Page
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
