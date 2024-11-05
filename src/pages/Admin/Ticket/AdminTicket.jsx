import React, { useEffect, useState } from "react";
import { Table, Select, Button, Modal, message, Pagination } from "antd";
import TicketService from "../../../services/ticket.service";
import { currencyFormatter } from "../../../utils";
import * as XLSX from "xlsx"; 
import "./AdminTicket.scss";

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
      const response = await TicketService.getTicketList();
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

  const handleExportExcel = () => {
    const data = tickets.map((ticket) => ({
      "ID Ticket": ticket.iD_Ticket,
      "Customer ID": ticket.iD_Customer,
      Price: currencyFormatter(ticket.price),
      Category: ticket.ticket_category,
      Type: ticket.ticket_type === 1 ? "1" : "0",
      Quantity: ticket.quantity,
      "Event Date": ticket.event_Date ? new Date(ticket.event_Date).toLocaleDateString() : "N/A",
      "Show Name": ticket.show_Name,
      Location: ticket.location,
      Description: ticket.description,
      Seat: ticket.seat,
      "Tickets Sold": ticket.ticketsold,
      Status: ticket.status,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

    // Export the Excel file
    XLSX.writeFile(workbook, "TicketsData.xlsx");
  };

  const columns = [
    { title: "ID Ticket", dataIndex: "iD_Ticket", key: "iD_Ticket" },
    { title: "Customer ID", dataIndex: "iD_Customer", key: "iD_Customer" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${currencyFormatter(text)}`,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Button type="link" onClick={() => showEditModal(record)}>
          {status}
        </Button>
      ),
    },
    { title: "Event Date", dataIndex: "event_Date", key: "event_Date", render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A") },
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

      <Button className=" " type="primary" onClick={handleExportExcel}  style={{ backgroundColor: "#4caf50", borderColor: "#66bb6a", marginBottom: 16 }} >
        Export to Excel
      </Button>

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
