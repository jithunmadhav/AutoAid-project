import React, { useState } from 'react';
import './PaymentWithdrawForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from '../../axios';
import MechanicPaymentPage from '../../Pages/MechanicPaymentPage';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  accno: Yup.string()
    .required('Account number is required')
    .test('is-valid-accno', 'Invalid account number', (value) => {
      return value && /^\d{9,18}$/.test(value.replace(/\s+/g, ''));
    }),
  name: Yup.string().required('Name is required'),
  branch: Yup.string().required('Branch is required'),
  amount: Yup.string()
    .required('Amount is required')
    .test('is-valid-amount', 'Invalid amount', (value) => {
      return value && /^\d+$/.test(value);
    }),
  bank: Yup.string().required('Bank name is required'),
});

function PaymentWithdrawForm() {
  const { mechanic } = useSelector((state) => state);
  const mechanic_id = mechanic.details[0]._id;
  const dispatch = useDispatch();
  const [err, setErr] = useState('');
  const [openMechanicPayment, setOpenMechanicPayment] = useState(false);

  const handleSubmit = (values) => {
    if(parseInt(values.amount) <=parseInt(mechanic.details[0].wallet)){

      axios
        .post('/mechanic/paymentrequest', { ...values, mechanic_id })
        .then((response) => {
          if (!response.data.err) {
            dispatch({ type: 'refresh' });
            setOpenMechanicPayment(true);
          } else {
            setErr('Something went wrong');
          }
        })
        .catch((response) => {
          console.log(response.response.data.message);
          setErr(response.response.data.message);
        });
    }else{
      setErr('Enter amount less than wallet')
    }
  };

  return (
    openMechanicPayment ? (
      <MechanicPaymentPage />
    ) : (
      <div>
        <div className='withdraw-background'>
          <div className='withdraw'>
            <div className='withdraw-connect-mechanic'></div>
            <div className='withdraw-classic'>
              <Formik
                initialValues={{
                  accno: '',
                  name: '',
                  branch: '',
                  amount: '',
                  bank: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className='Form'>
                  <div className="errorMessage">{err}</div>
                  <fieldset className='username'>
                    <Field type="text" name="accno" placeholder="Acc no" required />
                    <ErrorMessage name="accno" component="div" className="errorMessage" />
                  </fieldset>
                  <fieldset className='email'>
                    <Field type="text" name="name" placeholder="Name" required />
                    <ErrorMessage name="name" component="div" className="errorMessage" />
                  </fieldset>
                  <fieldset className='password'>
                    <Field type="text" name="bank" placeholder="Bank name" required />
                    <ErrorMessage name="bank" component="div" className="errorMessage" />
                  </fieldset>
                  <fieldset className='password'>
                    <Field type="text" name="branch" placeholder="Branch" required />
                    <ErrorMessage name="branch" component="div" className="errorMessage" />
                  </fieldset>
                  <fieldset className='password'>
                    <Field type="text" name="amount" placeholder="Amount" required />
                    <ErrorMessage name="amount" component="div" className="errorMessage" />
                  </fieldset>
                  <button type="submit" style={{ color: 'white' }} className="btn">Submit</button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PaymentWithdrawForm;
