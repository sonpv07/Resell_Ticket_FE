import React, { useEffect, useState } from "react";

import "./TicketManagement.scss";
import { Button, Space, Table, Tag } from "antd";
import TicketService from "../../../services/ticket.service";
import { getTagColor } from "../../../utils";
import moment from "moment";

export default function TicketManagement() {
  const [ticketList, setTicketList] = useState([]);
  const [totalActive, setTotalActive] = useState(0);
  const [totalSold, setTotalSold] = useState(0);

  const totalRevenue = 100;

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text} $</p>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sold Quantity",
      dataIndex: "soldQuantity",
      key: "soldQuantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (tag) => (
        <>
          <Tag color={tag === "Available" ? "#2196f3" : "#ff9800"} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{moment(date).format("LLL")}</p>,
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (tag) => (
        <>
          <Tag color={getTagColor(tag)} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" style={{ backgroundColor: "red" }}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const fetchApi = async () => {
    try {
      const response = await TicketService.getTicketList();

      if (response.success) {
        const transformedData = response.data.map((ticket) => ({
          key: ticket.iD_Ticket,
          name: ticket.show_Name,
          price: ticket.price,
          quantity: ticket.quantity,
          status: ticket.status,
          address: ticket.seat,
          category: ticket.ticket_category,
          location: ticket.location,
          soldQuantity: ticket.ticketsold,
          date: ticket.event_Date,
        }));

        const { activeCount, soldCount } = response.data.reduce(
          (acc, ticket) => {
            const { quantity, ticketsold } = ticket;

            acc.activeCount += quantity;
            acc.soldCount += ticketsold;

            return acc;
          },
          { activeCount: 0, soldCount: 0 } // Initial accumulator values
        );

        setTotalActive(activeCount);
        setTotalSold(soldCount);
        setTicketList(transformedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="seller-ticket-management">
      <h1 className="seller-ticket-management__title">Ticket Management</h1>

      <div className="seller-ticket-management__stats">
        <div className="seller-ticket-management__stat-item">
          <h2>Total Revenue</h2>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="seller-ticket-management__stat-item">
          <h2>Sold Tickets</h2>
          <p>{totalSold}</p>
        </div>
        <div className="seller-ticket-management__stat-item">
          <h2>Tickets on Sale</h2>
          <p>{totalActive}</p>
        </div>
      </div>

      <h2 className="seller-ticket-management__subtitle">Tickets List</h2>
      <Table
        columns={columns}
        dataSource={ticketList}
        style={{ backgroundColor: "#ccc" }}
        className="custom-table" // Apply the custom class
      />
    </div>
  );
}
