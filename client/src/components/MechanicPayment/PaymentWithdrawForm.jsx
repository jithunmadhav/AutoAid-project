import React, { useState } from 'react'
import './PaymentWithdrawForm.css'
import validator from 'validator';
import axios from '../../axios';
import MechanicPaymentPage from '../../Pages/MechanicPaymentPage';
import { useDispatch, useSelector } from 'react-redux';
function PaymentWithdrawForm() {
    const {mechanic} = useSelector(state => state)
    const mechanic_id=mechanic.details[0]._id;
    const dispatch = useDispatch()
    const [accno, setaccno] = useState('')
    const [name, setname] = useState('')
    const [branch, setbranch] = useState('')
    const [amount, setamount] = useState('')
    const [err, seterr] = useState('')
    const [openMechanicPayment, setopenMechanicPayment] = useState(false)
    const isBankAccountNumberValid = (bankAccountNumber) => {
        const cleanedBankAccountNumber = bankAccountNumber.replace(/\s+/g, '');
      
        if (validator.isNumeric(cleanedBankAccountNumber) && validator.isLength(cleanedBankAccountNumber, { min: 9, max:18 })) {
          return true;
        }
      
        return false;
      };
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const accnoValid=isBankAccountNumberValid(accno);
        if(accnoValid){
          if(name.trim() && branch.trim() && amount.trim()){
            if( validator.isNumeric(amount)){
                axios.post('/mechanic/paymentrequest',{accno,name,branch,amount,mechanic_id}).then((response)=>{
                   if(!response.data.err){
                       dispatch({type:'refresh'})
                       setopenMechanicPayment(true)
                   }else{
                       seterr('something went wrong')
                   }
                })
            }else{
                seterr('Enter a valid amount')
            }
          }else{
            seterr('All fields are required')
          }
        }else{
            seterr('Invalid account number')
        }

    }
  return (
    openMechanicPayment ? <MechanicPaymentPage/> :
    <div>
    <div className='withdraw-background'>
     <div className='withdraw'>
   <div className='withdraw-connect-mechanic '>
   </div>
   <div className='withdraw-classic'>
  <p className="errorMessage">{err}</p>
  <form  onSubmit={handleSubmit} className='Form'>
    <fieldset className='username'>
      <input type="text" value={accno} onChange={(e=>setaccno(e.target.value))} placeholder="Acc no" required/>
    </fieldset>
    <fieldset className='email'>
      <input type="text"  value={name} onChange={(e=>setname(e.target.value))} placeholder="Name" required/>
    </fieldset>
    <fieldset className='password'>
      <input type="text"  value={branch} onChange={(e=>setbranch(e.target.value))} placeholder="Branch"  required/>
    </fieldset>
 
    <fieldset className='password'>
      <input type="text"  value={amount} onChange={(e=>setamount(e.target.value))} placeholder="Amount"  required/>
    </fieldset>
   
    <button type="submit" style={{ color:'white' }}  className="btn">submit</button>
  </form>
</div>
</div>
  </div>
  </div>
  )
}

export default PaymentWithdrawForm
