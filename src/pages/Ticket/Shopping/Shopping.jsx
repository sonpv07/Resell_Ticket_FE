import React, { useEffect, useState } from "react";
import "./Shopping.scss";
import TicketList from "../../../components/ticket/list/TicketList";
import { Select } from "antd";
import TicketService from "../../../services/ticket.service";

export default function Shopping() {
  const [location, setLocation] = useState(null);

  const [category, setCategory] = useState(null);

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
    { label: "Other", value: "Other" },
  ];

  const handleFilter = async () => {
    const response = await TicketService.filterTicket(location, category);

    if (response.success) {
      setTicketList(
        response.data.filter((item) => item.status === "Available")
      );
    }
  };

  const fetchApi = async () => {
    try {
      const response = await TicketService.getTicketList();

      if (response.success) {
        const filterData = response.data.filter(
          (item) => item.status === "Available"
        );

        setTicketList(filterData);
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

  return (
    <div>
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
                onChange={(value) => setLocation(value)}
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
                onChange={(value) => setCategory(value)}
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
          </div>

          {/* Add filter options here */}
        </div>
        <TicketList isLoading={isLoading} ticketList={ticketList} />
      </div>
    </div>
  );
}
