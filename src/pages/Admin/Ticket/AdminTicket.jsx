import React, { useEffect, useState } from "react";
import { Table, Select, Button, Modal, message, Pagination } from "antd";
import TicketService from "../../../services/ticket.service";
import "./AdminTicket.scss";
import { currencyFormatter } from "../../../utils";

function AdminTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await TicketService.fetchTickets();
      if (response.success) {
        setTickets(response.data);
      } else {
        message.error("Failed to fetch tickets");
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      message.error("An error occurred while fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const showEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async (status) => {
    try {
      const response = await TicketService.updateTicketStatus(
        selectedTicket.iD_Ticket,
        status
      );
      if (response.success) {
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket.iD_Ticket === selectedTicket.iD_Ticket
              ? { ...ticket, status }
              : ticket
          )
        );
        message.success("Status updated successfully");
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("An error occurred while updating the status");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentTickets = tickets.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "ID Ticket", dataIndex: "iD_Ticket", key: "iD_Ticket" },
    { title: "Customer ID", dataIndex: "iD_Customer", key: "iD_Customer" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${currencyFormatter.text}`,
    },
    { title: "Category", dataIndex: "ticket_category", key: "ticket_category" },
    {
      title: "Type",
      dataIndex: "ticket_type",
      key: "ticket_type",
      render: (value) => (value === 1 ? "1" : "0"),
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "History",
      dataIndex: "ticket_History",
      key: "ticket_History",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Button type="link" onClick={() => showEditModal(record)}>
          {status}
        </Button>
      ),
    },
    {
      title: "Event Date",
      dataIndex: "event_Date",
      key: "event_Date",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    { title: "Show Name", dataIndex: "show_Name", key: "show_Name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Seat", dataIndex: "seat", key: "seat" },
    { title: "Tickets Sold", dataIndex: "ticketsold", key: "ticketsold" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => (
        <img
          src={url}
          alt="Ticket"
          style={{ width: 80, height: 80, objectFit: "cover" }}
        />
      ),
    },
  ];

  return (
    <div className="admin-ticket-page">
      <h2 className="admin-title">Admin Ticket Management</h2>
      <Table
        rowKey="iD_Ticket"
        columns={columns}
        dataSource={currentTickets}
        loading={loading}
        pagination={false}
        className="admin-table"
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={tickets.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        className="pagination"
        responsive={true}
      />

      {/* Modal for editing status */}
      <Modal
        title="Update Status"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => handleUpdateStatus(selectedTicket.status)}
      >
        <p>Update status for ticket ID: {selectedTicket?.iD_Ticket}</p>
        <Select
          value={selectedTicket?.status}
          onChange={(newStatus) => handleUpdateStatus(newStatus)}
          style={{ width: "100%" }}
        >
          <Select.Option value="Available">Available</Select.Option>
          <Select.Option value="Unavailable">Unavailable</Select.Option>
        </Select>
      </Modal>
    </div>
  );
}

export default AdminTicket;
