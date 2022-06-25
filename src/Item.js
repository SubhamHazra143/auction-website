import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import UserInfoContext from './UserInfoContext'
import {auth,db} from './firebase.config'
import TableRow from './TableRow'
import {addDoc, query, updateDoc,doc, increment, Timestamp, getDoc} from 'firebase/firestore'
import Spinner from './Spinner'
import {toast , ToastContainer} from 'react-toastify'
import { collection, getDocs,where , serverTimestamp} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Wallet from './Wallet'
export default function Item() {
  const { id } = useParams()
  const {  wallet , user , products, fetchProduct } = useContext(UserInfoContext)
  const [bidders,setBidders]=useState([])
  const [product, setProduct] = useState({})
  const [loading,setLoading]=useState(true)
  const [bid,setBid]=useState({
    bid_value:0,
    bid_time:new Date(),
    increment:0,

    set_auto_bid_limit:0
  })
  const [countDown,setCountDown]=useState({
    days:0,
    hour:0,
    min:0,
    sec:0
  })


  var onSubmit=async(e)=>{
    e.preventDefault()

    if(wallet.remaining_amount >=  bid.bid_value){

    await addDoc(collection(db,"Bid"),{
      name : user.name , 
      address :  user.address,
      bid_value: bid.bid_value,  
      bid_time : bid.bid_time  ,
      increment : bid.increment,
      product_id  : id , 
      set_auto_bid_limit: bid.set_auto_bid_limit,
      uid :  auth.currentUser.uid
    })
    //Wallet update
   await updateDoc(doc(db,"wallet",user.uid),{remaining_amount:wallet.remaining_amount-bid.bid_value , amount_in_auction:wallet.amount_in_auction+bid.bid_value})

   //Increment Bid value of Each bidders

   const bidSnapshot = await getDocs(query(collection(db ,"Bid") ,where("product_id" ,  "==" ,  id )))
  
     var bidders = [] ;
     bidSnapshot.forEach((doc)=>{
      const bidder =  doc.data()
      bidders.push({doc_id : doc.id ,...bidder })
     }) 




 
    //Bid Data
    Promise.all( bidders.map(async(bidder)=>{
       
      
      if(bidder.uid === auth.currentUser.uid) return;
  
     return await updateDoc(doc(db , "Bid" , bidder.doc_id) , {bid_value :  bidder.bid_value + bidder.increment ,bid_time  : serverTimestamp() })
       }))


     const wallets =  await getDocs(query(collection(db , "wallet")))

     Promise.all(bidders.map(async(bidder)=>{
      
      if(bidder.uid ===  auth.currentUser.uid) return;

        const wallet  = wallets.find((wallet)=>{return bidder.uid === wallet.uid })
              
     
   return await updateDoc(doc(db , "wallet" , bidder.uid) , {remaining_amount  : wallet.remaining_amount - bidder.increment  , amount_in_auction :  wallet.amount_in_auction + bidder.increment })
    
          
         

     }))
    







    window.location.reload()
   document.getElementById("start_bid").classList.add("disabled")

  }
  else{
    toast("You have Low Balance")
  }


  }


const onChange =  (e)=>{


     var value = e.target.value;

     if(e.target.type==="number"){
      value =  Number(value)
     }



   setBid((prevBid)=>{
    return  {...prevBid , [e.target.name] :  value}
   })


}




  useEffect(() => {

    




    setProduct(() => {
    
      const prod = products.find((product) => {
        return product.id === id
      })
      return prod;
     
    })
  
    const intervalID = setInterval(()=>{
     
      
   
    
     if(product.end_day===undefined){
      return
     }
      var currDate=new Date().getTime()

      var endDate=(new Date(product.end_day))
     
      endDate = endDate.getTime()
     
      var diff=Math.round(endDate-currDate)
      var days =  Math.abs(Math.round(diff / (24*60*60*1000)))
    
      var hour=Math.round((diff % (24*60*60*1000) )/(60*60*1000))
      var min=Math.round(((diff % (24*60*60*1000) )%(60*60*1000))/(1000*60))
      var sec=Math.round((((diff % (24*60*60*1000) )%(60*60*1000))%(1000*60) ) / 1000)
   
     
      setCountDown((prevCountDown)=>{

      
    return  {...prevCountDown , days,hour,min,sec}

      })

     } , 1000);

setLoading(false)

return ()=>{
  clearInterval(intervalID)
}


  }, [product])



  useEffect(()=>{
    async function fetchBidders(){

  
      const querySnapShot= await getDocs(query(collection(db,"Bid",),where("product_id","==",id)))
 
 
       querySnapShot.forEach((doc)=>{
 
         const  data  =doc.data()
         
         if(data.name===user.name){
         
           document.getElementById("start_bid").classList.add("disabled");
         }
 
         setBidders((prevBidders)=>{
           return [...prevBidders,data]
         })
       })
        
  
 
     }
 
 
     fetchBidders()
  } , [])


  return loading?<Spinner/>:(

    <>
      <div className='flex flex-row card shadow-xl '>
        <figure >
          <img  className='max-h-80  max-w-80 object-contain' src={product.product_image} alt='Album' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title text-blue-400 font-bold'>
            {product.product_name}
          </h2>
          <p>{product.product_details}</p>
          <div className='badge badge-accent'>{product.bid_type}</div>
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
              <span className=' font-mono text-2xl'>
                <span  >{countDown.days}</span>
              </span>
              days
            </div>
            <div>
              <span className=' font-mono text-2xl'>
                <span >{countDown.hour}</span>
              </span>
              hours
            </div>
            <div>
              <span className='font-mono text-2xl'>
                <span >{countDown.min}</span>
              </span>
              min
            </div>
            <div>
              <span className='font-mono text-2xl'>
                <span>{countDown.sec}</span>
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
                <small>$</small> {bidders[0]=== undefined ?  0 :  Math.max(...bidders.map(bidder => bidder.bid_value)) }
              </div>
            </div>
   

            <a  id="start_bid" href='#my-modal-2' className='btn btn-primary'>
              Start Bidding
            </a>
            

            
            <div className='modal' id='my-modal-2'>
              <div className='modal-box'>
              <form onSubmit={onSubmit}>
                <h3 className='font-bold text-lg'>
                  How much do you want to bid
                </h3>
                <br />

                <div>
                  Bid Value
                  <input
                    type='number'
                    placeholder='Bid amount'
                    onChange={onChange}
                    name="bid_value"
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <br />
                <div>
                  Set Auto bid limit
                  <input
                    type='number'
                    name="set_auto_bid_limit"
                    onChange={onChange}
                    placeholder='Bid amount'
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <br />
                <div>
                  Increment by
                  <input
                    type='number'
                    placeholder='Bid amount'
                    onChange={onChange}
                    name="increment"
                    className='input input-bordered w-full max-w-xs'
                  />
                </div>
                <p className='py-4'>
                  By setting autobid, with other bidders bid your bid value will
                  increase.
                </p>
                <div className='modal-action'>
                  <button type='submit' className='btn btn-accent'>
                    Place Bid
                  </button>
                </div>
                </form>
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
            {bidders.map((bidder,index)=>{
           
         
             
           return  <TableRow Key={index} name={bidder.name} location={bidder.address} bid_value={bidder.bid_value}  />

            })}
          </tbody>
        </table>
      </div>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </>
  )
}
