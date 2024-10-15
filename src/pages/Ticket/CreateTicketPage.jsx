import React, { useContext, useState } from "react";
import "./CreateTicketPage.scss";
import { toast } from "react-toastify";
import TicketService from "../../services/ticket.service";
import { AuthContext } from "../../context/AuthContext";

const CreateTicketPage = () => {
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState({
    ID_Ticket: "",
    iD_Customer: user.iD_Customer,
    price: "",
    ticket_category: "",
    ticket_type: true, // Boolean for true/false
    quantity: 1,
    status: "",
    event_Date: "",
    show_Name: "",
    description: "",
    location: "",
    seat: "",
    Image: null,
  });

  const [errors, setErrors] = useState({
    price: "",
    quantity: "",
    event_Date: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox for ticket_type (true/false)
    if (type === "checkbox") {
      setTicket({
        ...ticket,
        [name]: checked,
      });
    } else {
      // Validate price and quantity
      if (name === "price" && value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: "Price must be greater than 0",
        }));
      } else if (name === "quantity" && value <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: "Quantity must be greater than 0",
        }));
      } else if (name === "event_Date") {
        const selectedDate = new Date(value);
        const today = new Date();

        if (selectedDate <= today) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            event_Date: "Event Date must be in the future.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            event_Date: "",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
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

    // Validate event date is in the future
    const selectedDate = new Date(ticket.event_Date);
    const today = new Date();

    if (selectedDate <= today) {
      toast.error("Event Date must be in the future.", {
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

    // Validate fields
    if (ticket.price <= 0 || ticket.quantity <= 0) {
      alert("Please make sure all values are valid before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in ticket) {
        formData.append(key, ticket[key]);
      }

      // Call the createTicket API
      const response = await TicketService.createTicket(
        user.iD_Customer,
        formData
      );

      if (response.success) {
        toast.success(response.message);
        setTicket({
          ID_Ticket: "",
          iD_Customer: user.iD_Customer,
          price: "",
          ticket_category: "",
          ticket_type: true, // Reset to true
          quantity: "",
          status: "",
          event_Date: "",
          show_Name: "",
          description: "",
          seat: "",
          Image: null,
        });

        setImagePreview(null);
      }
    } catch (error) {
      toast.error("Failed to create ticket. Please try again later.");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="create-ticket-container">
      <h1 className="title">Sell Your Ticket</h1>

      <form onSubmit={handleSubmit} className="create-ticket-form">
        <div className="create-ticket-form__item">
          <label>Show Name:</label>

          <input
            type="text"
            name="show_Name"
            value={ticket.show_Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="create-ticket-form__item">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={ticket.price}
            onChange={handleChange}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="create-ticket-form__item">
          <label>Location:</label>
          <select
            name="location"
            value={ticket.location}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            <option value="Concert">Ha Noi</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
            <option value="Da Nang">Da Nang</option>
          </select>
        </div>
        <div className="create-ticket-form__item">
          <label>Ticket Category:</label>
          <select
            name="ticket_category"
            value={ticket.ticket_category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Concert">Concert</option>
            <option value="Sport">Sport</option>
            <option value="Theater">Theater</option>
          </select>
        </div>

        <div className="create-ticket-form__item">
          <label>Seat Number (If have):</label>
          <input
            type="text"
            name="seat"
            value={ticket.seat}
            onChange={handleChange}
            required
          />
        </div>

        <div
          className="create-ticket-form__item"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <label>Allow Negotiation:</label>
          <input
            className="input"
            type="checkbox"
            name="ticket_type"
            checked={ticket.ticket_type}
            onChange={handleChange}
            style={{ width: "50px", backgroundColor: "transparent" }}
          />
          <span>{ticket.ticket_type ? "True" : "False"}</span>
        </div>
        <div className="create-ticket-form__item">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={ticket.seat ? 1 : ticket.quantity}
            onChange={handleChange}
            disabled={ticket.seat ? true : false}
            required={!ticket.seat}
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>
        <div className="create-ticket-form__item">
          <label>Event Date:</label>
          <input
            type="date"
            name="event_Date"
            value={ticket.event_Date}
            onChange={handleChange}
            required
          />
          {errors.event_Date && (
            <span className="error">{errors.event_Date}</span>
          )}
        </div>

        <div className="create-ticket-form__item">
          <label>Description:</label>

          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-ticket-form__item">
          <label>Upload Image:</label>
          <input type="file" name="Image" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>

        <button type="submit" className="submit-button">
          Create Your Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
