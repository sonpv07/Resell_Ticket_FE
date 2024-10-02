import React, { useState } from "react";
import "./Shopping.scss";
import TicketList from "../../../components/ticket/list/TicketList";
import { Select } from "antd";

export default function Shopping() {
  const [locations, setLocations] = useState([]);

  const handleChange = (value) => {
    setLocations(value);
  };

  console.log(locations);

  const options = [
    { label: "Ha Noi", value: "Ha Noi" },
    { label: "Ho Chi Minh", value: "Ho Chi Minh" },
    { label: "Da Nang", value: "Da Nang" },
  ];

  const categoryOptions = [
    { label: "Concert", value: "Concert" },
    { label: "Sport", value: "Sport" },
    { label: "Festival", value: "Festival" },
    { label: "Other", value: "Other" },
  ];

  const ticketData = [
    {
      price: 50,
      category: "Concert",
      quantity: 100,
      soldQuantity: 75,
      isNegotiation: true,
      ticket_detail:
        "General admission for the main event area. Standing room only.",
      seller_info: {
        name: "John Doe",
        rating: 4.5,
      },
    },
    {
      price: 100,
      category: "Sport",
      quantity: 50,
      soldQuantity: 20,
      isNegotiation: true,

      ticket_detail:
        "VIP access includes premium seating and a meet-and-greet with the performers.",
      seller_info: {
        name: "Jane Smith",
        rating: 4.8,
      },
    },
    {
      price: 75,
      category: "Festival",
      quantity: 200,
      soldQuantity: 180,
      ticket_detail:
        "Limited early bird tickets at a discounted rate. Valid for general admission.",
      seller_info: {
        name: "Bob Johnson",
        rating: 4.2,
      },
    },
    {
      price: 120,
      category: "Festival",
      quantity: 20,
      soldQuantity: 5,
      ticket_detail:
        "Exclusive backstage pass. Includes all VIP benefits plus a tour of the backstage area.",
      seller_info: {
        name: "Alice Brown",
        rating: 4.9,
      },
    },
    {
      price: 120,
      category: "Festival",
      quantity: 20,
      soldQuantity: 5,
      ticket_detail:
        "Exclusive backstage pass. Includes all VIP benefits plus a tour of the backstage area.",
      seller_info: {
        name: "Alice Brown",
        rating: 4.9,
      },
    },
  ];

  return (
    <div className="shopping__container">
      <div className="shopping__filter">
        <h2>Filter Tickets</h2>
        <div className="shopping__filter-option">
          <div className="shopping__filter-option__item">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", height: "50px" }}
              className="custom-select"
              placeholder="Select locations..."
              onChange={handleChange}
              options={options}
            />
          </div>
          <div className="shopping__filter-option__item">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%", height: "50px" }}
              className="custom-select"
              placeholder="Select ticket category..."
              onChange={handleChange}
              options={categoryOptions}
            />
          </div>
          <div className="shopping__filter-option__item">
            <button className="shopping__filter-option__item__button">
              Filter
            </button>
          </div>
          {/* <div className="shopping__filter-option__item">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              className="custom-select"
              placeholder="Select locations..."
              onChange={handleChange}
              options={options}
            />
          </div> */}
        </div>

        {/* Add filter options here */}
      </div>
      <TicketList ticketData={ticketData} />
    </div>
  );
}
