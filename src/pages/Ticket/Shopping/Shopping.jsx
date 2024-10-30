import React, { useEffect, useState } from "react";
import "./Shopping.scss";
import TicketList from "../../../components/ticket/list/TicketList";
import { Select, Spin } from "antd";
import TicketService from "../../../services/ticket.service";
import Loading from "../../../components/loading/Loading";

export default function Shopping() {
  const [location, setLocation] = useState(null);

  const [category, setCategory] = useState(null);

  const [showName, setShowName] = useState(null);

  const [price, setPrice] = useState(null);

  const [ticketList, setTicketList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const options = [
    { label: "Ha Noi", value: "Ha Noi" },
    { label: "Ho Chi Minh", value: "Ho Chi Minh" },
    { label: "Da Nang", value: "Da Nang" },
  ];

  const categoryOptions = [
    { label: "Concert", value: "Concert" },
    { label: "Sport", value: "Sport" },
    { label: "Festival", value: "Festival" },
    { label: "Theater", value: "Theater" },
    { label: "Museum", value: "Museum" },
    { label: "Transport", value: "Transport" },
    { label: "Other", value: "Other" },
  ];

  const handleFilter = async () => {
    const response = await TicketService.filterTicket(
      location,
      category,
      price,
      showName
    );

    if (response.success) {
      setTicketList(
        response.data.filter((item) => item.status === "Available")
      );
    }
  };

  const fetchApi = async () => {
    try {
      const response = await TicketService.getTicketList();

      console.log(response.data);

      if (response.success) {
        setTicketList(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="shopping__container">
      <div className="shopping__filter">
        <h2>Filter Tickets</h2>
        <div className="shopping__filter-option">
          <div className="shopping__filter-option__item">
            <Select
              style={{ width: "350px", height: "50px" }}
              className="custom-select"
              placeholder="Select locations..."
              onChange={(value) => setLocation(value)}
              value={location}
              options={options}
            />
          </div>
          <div className="shopping__filter-option__item">
            <Select
              style={{ width: "350px", height: "50px" }}
              className="custom-select"
              placeholder="Select ticket category..."
              onChange={(value) => setCategory(value)}
              value={category}
              options={categoryOptions}
            />
          </div>
          <div className="shopping__filter-option__item">
            <button
              className="shopping__filter-option__item__button"
              onClick={handleFilter}
            >
              Filter
            </button>
          </div>
          <div className="shopping__filter-option__item">
            <button
              className="shopping__filter-option__item__button"
              onClick={() => {
                setLocation(null);
                setCategory(null);
                setPrice(null);
                setShowName(null);
                fetchApi();
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Add filter options here */}
      </div>

      {ticketList.length <= 0 ? (
        <h1 className="null">No Ticket Found</h1>
      ) : (
        <TicketList isLoading={isLoading} ticketList={ticketList} />
      )}
    </div>
  );
}
