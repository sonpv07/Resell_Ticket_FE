import React, { useContext, useState } from "react";
import "./CreateTicketPage.scss";
import { toast } from "react-toastify";
import TicketService from "../../services/ticket.service";
import { AuthContext } from "../../context/AuthContext";
import FirebaseService from "../../services/firebase.service";
import { Button } from "antd";

const CreateTicketPage = () => {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTicket({
        ...ticket,
        [name]: checked,
      });
    } else {
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
        return response.data.join(",");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticket.show_Name.trim()) {
      toast.error("Show Name cannot be empty.", {
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

    if (ticket.price <= 0 || ticket.quantity <= 0) {
      alert("Please make sure all values are valid before submitting.");
      return;
    }

    try {
      setLoading(true);
      let imgURL = null;
      imgURL = await uploadImagesFile();
      if (imgURL !== null) {
        let body = { ...ticket };
        body.image = imgURL;
        const response = await TicketService.createTicket(
          user.iD_Customer,
          body
        );
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
            seat: "",
            location: "",
            image: null,
          });
          setTicketImage([]);
          const newUser = {
            ...user,
            number_of_tickets_can_posted:
              user?.number_of_tickets_can_posted - 1,
          };
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        }
      }
    } catch (error) {
      toast.error("Failed to create ticket. Please try again later.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>

        <div className="create-ticket-form__item">
          <label>Ticket Category:</label>
          <select
            name="ticket_category"
            value={ticket.ticket_category}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select a category</option>
            <option value="Concert">Concert</option>
            <option value="Sport">Sport</option>
            <option value="Theater">Theater</option>
            <option value="Museum">Museum</option>
            <option value="Transport">Transport</option>
          </select>
        </div>

        <div className="create-ticket-form__item">
          <label>Seat Number (If have):</label>
          <input
            type="text"
            name="seat"
            value={ticket.seat}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="create-ticket-form__item">
          <label>Allow Negotiation:</label>
          <input
            type="checkbox"
            name="ticket_type"
            checked={ticket.ticket_type}
            onChange={handleChange}
            disabled={loading}
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
            disabled={ticket.seat || loading}
            required={!ticket.seat}
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="create-ticket-form__item">
          <label>Event Date:</label>
          <input
            type="datetime-local"
            name="event_Date"
            value={ticket.event_Date}
            onChange={handleChange}
            required
            disabled={loading}
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
            disabled={loading}
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
              {Array.from(ticketImage).map((item, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(item)}
                  alt="Preview"
                  className="image-preview"
                />
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="submit-button"
          style={{ backgroundColor: "#1976d2" }}
          loading={loading}
          onClick={handleSubmit}
        >
          Create Your Ticket
        </Button>
      </form>
    </div>
  );
};

export default CreateTicketPage;
