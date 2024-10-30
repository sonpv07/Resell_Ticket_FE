import React, { useState, useEffect } from "react";
import { Pagination } from "antd";
import UserService from "../../../services/user.service";
import "./AdminUserPage.scss";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getProfileList();
      if (response && response.success) {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered list
      } else {
        console.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const applyRoleFilter = () => {
    if (selectedRole === "All") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) => user.iD_RoleNavigation?.name_role === selectedRole
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="admin-user-page">
      <h2 className="admin-title">Admin User Management</h2>

      <div className="filter-container">
        <label htmlFor="role-filter">Filter by Role: </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Choose Role</option>
          <option value="All">All</option>
          <option value="Customer">Customer</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <button onClick={applyRoleFilter} className="filter-button">
          Filter
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Average Feedback</th>
            <th>Role</th>
            <th>Package</th>
            <th>Package Registration</th>
            <th>Package Expiration</th>
            <th>Tickets Allowed</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.iD_Customer}>
              <td>{user.iD_Customer}</td>
              <td>{user.name}</td>
              <td>{user.contact}</td>
              <td>{user.email}</td>
              <td>{user.average_feedback}</td>
              <td>{user.iD_RoleNavigation?.name_role}</td>
              <td>{user.iD_PackageNavigation?.name_Package}</td>
              <td>
                {new Date(user.package_registration_time).toLocaleDateString()}
              </td>
              <td>
                {new Date(user.package_expiration_date).toLocaleDateString()}
              </td>
              <td>{user.number_of_tickets_can_posted}</td>
              <td>
                <img
                  loading="lazy"
                  src={user.avatar}
                  alt="User Avatar"
                  className="avatar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredUsers.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        className="pagination"
        responsive={true}
      />
    </div>
  );
};

export default AdminUser;
