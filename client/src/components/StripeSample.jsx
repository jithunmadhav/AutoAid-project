// import React from 'react';
// import Swal from 'sweetalert2';

// function ExampleComponent() {
//   const showAlert = () => {
//     Swal.fire({
//       title: 'Sweet Alert!',
//       text: 'This is a sweet alert message!',
//       icon: 'warning',
//       dangerMode:true,
//       confirmButtonText: 'OK',
//     });
//   };

//   return (
//     <div>
//       <button onClick={showAlert}>Show Alert</button>
//     </div>
//   );
// }

// export default ExampleComponent;

import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., send data to the server
    console.log(formData);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Title</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>

        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default ExampleModal;
