import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTicket } from '../../services/axios/ticketCreate';
import './CreateTicketPage.scss';

const CreateTicketPage = ({ customerID }) => {
  const [ticket, setTicket] = useState({
    ID_Ticket: '',
    iD_Customer: customerID || '',  
    price: '',
    ticket_category: '',
    ticket_type: true,  
    quantity: '',
    status: '',
    event_Date: '',
    show_Name: '',
    location: '',  
    description: '',
    seat: '',  
    Image: null,
  });

  const [errors, setErrors] = useState({
    price: '',
    quantity: '',
    event_Date: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox for ticket_type (true/false)
    if (type === 'checkbox') {
      setTicket({
        ...ticket,
        [name]: checked,
      });
    } else {
      // Validate price and quantity
      if (name === 'price' && value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: 'Price must be greater than 0',
        }));
      } else if (name === 'quantity' && value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: 'Quantity must be greater than 0',
        }));
      } else if (name === 'event_Date') {
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate <= today) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            event_Date: 'Event Date must be in the future.',
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            event_Date: '',
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }

      setTicket({
        ...ticket,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTicket({
        ...ticket,
        Image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(ticket.event_Date);
    const today = new Date();

    if (selectedDate <= today) {
      toast.error('Event Date must be in the future.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (ticket.price <= 0 || ticket.quantity <= 0) {
      alert('Please make sure all values are valid before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      for (const key in ticket) {
        formData.append(key, ticket[key]);
      }

      await createTicket(formData);
      toast.success('Ticket created successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTicket({
        ID_Ticket: '',
        iD_Customer: customerID || '',  // Reset customerID automatically
        price: '',
        ticket_category: '',
        ticket_type: true,  // Reset to true
        quantity: '',
        status: '',
        event_Date: '',
        show_Name: '',
        location: '',  // Reset location
        description: '',
        seat: '',  // Reset seat
        Image: null,
      });
      setImagePreview(null);

    } catch (error) {
      toast.error('Failed to create ticket. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="create-ticket-container">
      <h1 className="title">Sell Your Ticket</h1>

      <form onSubmit={handleSubmit} className="create-ticket-form">
        
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={ticket.price}
            onChange={handleChange}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>

        <label>
          Ticket Category:
          <input
            type="text"
            name="ticket_category"
            value={ticket.ticket_category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ticket Type (True):
          <input
            type="checkbox"
            name="ticket_type"
            checked={ticket.ticket_type}
            onChange={handleChange}
          />
          <span>{ticket.ticket_type ? 'True' : 'False'}</span>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={ticket.quantity}
            onChange={handleChange}
            required
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </label>

        <label>
          Event Date:
          <input
            type="date"
            name="event_Date"
            value={ticket.event_Date}
            onChange={handleChange}
            required
          />
          {errors.event_Date && <span className="error">{errors.event_Date}</span>}
        </label>

        <label>
          Show Name:
          <input
            type="text"
            name="show_Name"
            value={ticket.show_Name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location: 
          <input
            type="text"
            name="location"
            value={ticket.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Seat: 
          <input
            type="text"
            name="seat"
            value={ticket.seat}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Image:
          <input type="file" name="Image" onChange={handleImageChange} />
        </label>
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

        <button type="submit" className="submit-button">Create Your Ticket</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateTicketPage;
