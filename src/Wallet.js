import { useState,useContext, useEffect } from 'react'
import UserInfoContext from './UserInfoContext'
import {auth,db} from "./firebase.config"
import {doc, updateDoc} from "firebase/firestore"

export default function Wallet() {
  const { wallet:{total_amount,remaining_amount,total_purchase,amount_in_auction} } = useContext(UserInfoContext)
 
   const [walletAmount , setWalletAmount] = useState({total_amount : 0 , remaining_amount : 0 ,total_purchase : 0 , amount_in_auction : 0 });
   const [updateAmount , setUpdateAmount] =  useState(0);

     useEffect(()=>{
      
      if(total_amount){

         setWalletAmount({total_amount ,  remaining_amount , total_purchase , amount_in_auction});

      }




     } , [total_amount])



  var onSubmit=async (e)=>{
   e.preventDefault();
    
    await updateDoc(doc(db , "wallet" , auth.currentUser.uid ) , {total_amount  : walletAmount.total_amount+updateAmount,remaining_amount:walletAmount.remaining_amount+updateAmount});
    setWalletAmount((prevWalletAmount)=>{
     
    return {...walletAmount ,  total_amount  : walletAmount.total_amount+updateAmount,remaining_amount:walletAmount.total_amount+updateAmount}
    });

    




  }



const onChange =(e) =>{


setUpdateAmount(Number(e.target.value));


}


  return (
    <>
      <div className=' flex justify-center grid grid-cols-2 gap-3  '>
        <div className='card w-96 bg-base-100 shadow-2xl items-center '>
          <div className='card-body'>
            <h2 className='card-title'>Total Amount Added</h2>
            <p className='text-blue-400 text-2xl'>Rs {walletAmount.total_amount
            }</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Amount Remaining</h2>
            <p className='text-blue-400 text-2xl'>Rs {walletAmount.remaining_amount} </p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Amount In Auction</h2>
            <p className='text-blue-400 text-2xl'>Rs {walletAmount.amount_in_auction}</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Total Purchase</h2>
            <p className='text-blue-400 text-2xl'>Rs {walletAmount.total_purchase}</p>
          </div>
        </div>
        <div className='card w-96 bg-base-100 shadow-2xl items-center'>
          <div className='card-body'>
            <h2 className='card-title'>Add Amount</h2>
            <form  onSubmit={onSubmit}>
              <div className='form-group mb-6'>
                <input
                  type='number'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal
                          text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                          rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='fname'
                  aria-describedby='number'
                  onChange = {onChange}
                  placeholder='Enter Amount'
                
                />
                <br />
                <button className='btn btn-accent'  >Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
