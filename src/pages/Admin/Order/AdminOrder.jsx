import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import orderService from '../../../services/order.service';
import './AdminOrder.scss';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.fetchOrders();
        setOrders(data);
        setFilteredOrders(data); 
      } catch (err) {
        console.error("Error loading orders:", err);
        setError("Failed to load orders");
      }
    };
    loadOrders();
  }, []);

  const handleFilter = () => {
    let filtered = orders;
    if (selectedStatus) {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }
    setFilteredOrders(filtered);
    setCurrentPage(1); 
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + pageSize);

  return (
    <div className="admin-order">
      <h2>Admin Order Management</h2>

      <div className="filter-section">
        <label>
          Status:
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="">GET ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="PROCESSING">PROCESSING</option>
          </select>
        </label>
        <button onClick={handleFilter}>Filter Orders</button>
      </div>

      {error && <div className="error">{error}</div>}

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Payment Method</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.iD_Order}>
              <td>{order.iD_Order}</td>
              <td>{order.iD_CustomerNavigation?.name}</td>
              <td>{order.payment_method}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.create_At).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredOrders.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        className="pagination"
        responsive={true}
      />
    </div>
  );
};

export default AdminOrder;
