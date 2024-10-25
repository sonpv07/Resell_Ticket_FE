import React, { useContext, useEffect, useState } from "react";

import "./TicketManagement.scss";
import { Button, Space, Table, Tag } from "antd";
import TicketService from "../../../services/ticket.service";
import { currencyFormatter, getTagColor } from "../../../utils";
import moment from "moment";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RequestPriceService from "../../../services/requestPrice.service";
import OrderService from "../../../services/order.service";
import { PAYMENT_METHODS } from "../../../configs/constant";

export default function TicketManagement() {
  const [requestList, setRequestList] = useState([]);
  const [ticketList, setTicketList] = useState([]);
  const [totalActive, setTotalActive] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

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
      render: (text) => <p>{currencyFormatter(text)}</p>,
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
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          {/* <Button
            type="primary"
            style={{ backgroundColor: "red" }}
            onClick={() => handleRemoveTicket(record.key)}
          >
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  const requestColumns = [
    {
      title: "Ticket",
      dataIndex: "name",
      key: "name",
      render: (text) => <p style={{ fontWeight: 600 }}>{text}</p>,
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "price",
      render: (text) => <p>{currencyFormatter(text)}</p>,
    },
    {
      title: "Request Price",
      dataIndex: "requestPrice",
      key: "price",
      render: (text) => <p>{currencyFormatter(text)}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "Pending" ? (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                console.log(record);
                handleApproveRequest(
                  record.buyerId,
                  record.ticketId,
                  record.quantity,
                  record.key
                );
              }}
            >
              Approve
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "red" }}
              onClick={() =>
                handleRejectRequest(
                  record.buyerId,
                  record.ticketId,
                  record.quantity,
                  record.key
                )
              }
            >
              Reject
            </Button>
          </Space>
        ) : record.status === "Completed" ? (
          <Tag color={"#2196f3"} key={"Approve"}>
            {"Approved".toUpperCase()}
          </Tag>
        ) : (
          <Tag color={"red"} key={"Reject"}>
            {"Rejected".toUpperCase()}
          </Tag>
        ),
    },

    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (tag) => (
    //     <>
    //       <Tag color={tag === "Available" ? "#2196f3" : "#ff9800"} key={tag}>
    //         {tag.toUpperCase()}
    //       </Tag>
    //     </>
    //   ),
    // },
  ];

  const fetchApi = async () => {
    try {
      const response = await TicketService.getTicketListBySeller(
        user.iD_Customer
      );

      if (response.success) {
        const transformedData = response.data.map((ticket) => ({
          key: ticket.iD_Ticket,
          name: ticket.show_Name,
          price: ticket.price,
          quantity: ticket.quantity,
          status: ticket.status,
          category: ticket.ticket_category,
          location: ticket.location,
          soldQuantity: ticket.ticketsold,
          date: ticket.event_Date,
        }));

        const { activeCount, soldCount, revenue } = response.data.reduce(
          (acc, ticket) => {
            const { quantity, ticketsold, price } = ticket;

            acc.activeCount += quantity;
            acc.soldCount += ticketsold;
            acc.revenue += price * ticketsold;

            return acc;
          },
          { activeCount: 0, soldCount: 0, revenue: 0 } // Initial accumulator values
        );

        setTotalActive(activeCount);
        setTotalSold(soldCount);
        setTotalRevenue(revenue);
        setTicketList(transformedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequestData = async () => {
    const response = await RequestPriceService.getRequestPrice(
      user.iD_Customer
    );

    if (response.success) {
      const transformedData = response.data.map((request) => ({
        key: request?.iD_Request,
        ticketId: request?.iD_Ticket,
        buyerId: request?.iD_Customer,
        name: request?.ticketNavigation?.show_Name,
        currentPrice: request?.ticketNavigation?.price,
        requestPrice: request?.price_want,
        quantity: request?.quantity,
        status: request?.status,
      }));

      setRequestList(transformedData);
    }
  };

  const handleApproveRequest = async (
    buyerId,
    ticketId,
    quantity,
    requestId
  ) => {
    let body = {
      iD_Customer: buyerId,
      payment_method: PAYMENT_METHODS.VNPAY,
      ticketItems: [
        {
          iD_Ticket: ticketId,
          quantity: quantity,
        },
      ],
    };

    const response = await OrderService.createOrder(body);

    if (response.success) {
      const request = requestList.findIndex(
        (request) => request.key === requestId
      );

      if (request >= 0) {
        const updatedRequestList = [...requestList];
        updatedRequestList[request] = {
          ...updatedRequestList[request],
          status: "Completed",
        };
        setRequestList(updatedRequestList);
        toast.success("Approve request successfully!");
      } else {
        toast.error("Approve request fail!");
      }
    }
  };

  const handleRejectRequest = async (
    buyerId,
    ticketId,
    quantity,
    requestId
  ) => {
    const request = requestList.findIndex(
      (request) => request.key === requestId
    );

    if (request >= 0) {
      const updatedRequestList = [...requestList];
      updatedRequestList[request] = {
        ...updatedRequestList[request],
        status: "Rejected",
      };
      setRequestList(updatedRequestList);
      toast.success("Reject request successfully!");
    } else {
      toast.error("Reject request fail!");
    }
  };

  // const handleRemoveTicket = async (id) => {
  //   const response = await TicketService.deleteTicket(id);
  //   if (response.success) {
  //     const updateTickets = ticketList.filter((item) => item.key !== id);

  //     setTicketList(updateTickets);

  //     toast.success(response.message);
  //   } else {
  //     toast.error(response.message);
  //   }
  // };

  useEffect(() => {
    const fetchDataAndTickets = async () => {
      await Promise.all([fetchApi(), fetchRequestData()]);
    };
    fetchDataAndTickets();

    return () => {
      setRequestList([]);
      setTicketList([]);
    };
  }, []);

  console.log(requestList);

  return (
    <div className="seller-ticket-management">
      <div style={{ marginBottom: "30px" }}>
        <h1 className="seller-ticket-management__title">Package Information</h1>
        <div className="seller-ticket-management__package">
          <p>
            <span>Current Package:</span>{" "}
            {user?.iD_PackageNavigation?.name_Package}
          </p>
          <p>
            <span>Selling Post:</span> {user?.number_of_tickets_can_posted}
          </p>
          <p>
            <span>End Time: </span>
            {moment(user?.package_expiration_date).format("MMMM D, YYYY")}
          </p>
        </div>
      </div>

      <h1 className="seller-ticket-management__title">Ticket Management</h1>

      <div className="seller-ticket-management__stats">
        <div className="seller-ticket-management__stat-item">
          <h2>Total Revenue</h2>
          <p>{currencyFormatter(totalRevenue)}</p>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="seller-ticket-management__subtitle">Tickets List</h2>
        <button
          className="header__button"
          onClick={() => {
            navigate("/seller/create-ticket");
          }}
        >
          Sell Ticket
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={ticketList}
        style={{ backgroundColor: "#ccc" }}
        className="custom-table"
      />

      <h2 className="seller-ticket-management__subtitle">Request List</h2>
      <Table
        columns={requestColumns}
        dataSource={requestList}
        style={{ backgroundColor: "#ccc" }}
        className="custom-table"
      />
    </div>
  );
}
