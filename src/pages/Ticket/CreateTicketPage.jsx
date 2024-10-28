import React, { useContext, useState } from "react";
import "./CreateTicketPage.scss";
import { toast } from "react-toastify";
import TicketService from "../../services/ticket.service";
import { AuthContext } from "../../context/AuthContext";
import FirebaseService from "../../services/firebase.service";

const CreateTicketPage = () => {
  const { user, setUser } = useContext(AuthContext);

  const [ticket, setTicket] = useState({
    price: "",
    status: "Available",
    ticket_category: "",
    ticket_type: true,
    quantity: 1,
    event_Date: "",
    show_Name: "",
    description: "",
    location: "",
    seat: null,
    image: "",
  });

  const [ticketImage, setTicketImage] = useState([]);

  const [errors, setErrors] = useState({
    price: "",
    quantity: "",
    event_Date: "",
  });

  const [imagePreview, setImagePreview] = useState([]);

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
    const file = e.target.files;

    if (file) {
      setTicketImage(file);
    }
  };

  const uploadImagesFile = async () => {
    try {
      const formData = new FormData();
      for (const single_file of ticketImage) {
        formData.append("images", single_file);
      }

      const response = await FirebaseService.uploadImage(formData);

      if (response.success) {
        console.log(response);
        return response.data.join(",");
      }
    } catch (err) {
      console.log(err);
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
      let imgURL = null;
      imgURL = await uploadImagesFile();
      console.log(imgURL);
      if (imgURL !== null) {
        let body = { ...ticket };
        body.image = imgURL;
        const response = await TicketService.createTicket(
          user.iD_Customer,
          body
        );
        console.log(response);
        if (response.success) {
          toast.success(response.message);
          setTicket({
            price: "",
            ticket_category: "",
            ticket_type: true,
            quantity: "",
            status: "",
            event_Date: "",
            show_Name: "",
            description: "",
            seat: null,
            location: "",
            image: null,
          });
          setImagePreview(null);

          const newUser = {
            ...user,
            number_of_tickets_can_posted:
              user?.number_of_tickets_can_posted - 1,
          };

          console.log(newUser);

          setUser(newUser);

          localStorage.setItem("user", JSON.stringify(newUser));
        }
      }
    } catch (error) {
      toast.error("Failed to create ticket. Please try again later.");
      console.error("API Error:", error);
    }
  };

  console.log(ticketImage);

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

          <input
            type="text"
            name="location"
            value={ticket.location}
            onChange={handleChange}
            required
          />

          {/* <select
            name="location"
            value={ticket.location}
            onChange={handleChange}
            required
          >
            <option value="">Select a location</option>
            <option value="Concert">Ha Noi</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
            <option value="Da Nang">Da Nang</option>
          </select> */}
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
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            multiple
          />
          {ticketImage.length > 0 && (
            <div className="ticket-form__img-preview">
              {Array.from(ticketImage).map((item, index) => {
                return (
                  <img
                    key={index}
                    src={URL.createObjectURL(item)}
                    alt="Preview"
                    className="image-preview"
                  />
                );
              })}
            </div>
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
