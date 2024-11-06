import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import UserService from "../../../services/user.service";
import * as XLSX from "xlsx";
import "./AdminUserPage.scss";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedPackage, setSelectedPackage] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editUser, setEditUser] = useState(null); 
  const [newRole, setNewRole] = useState(""); 
  const [newIsActive, setNewIsActive] = useState(true); 
  const [toastMessage, setToastMessage] = useState(""); // for success/error messages
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getProfileList();
      if (response && response.success) {
        setUsers(response.data);
        setFilteredUsers(response.data);
      } else {
        console.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    applyFilters(event.target.value, selectedPackage);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
    applyFilters(selectedRole, event.target.value);
  };

  const applyFilters = (role, packageType) => {
    let filtered = users;

    if (role !== "All") {
      filtered = filtered.filter(
        (user) => user.iD_RoleNavigation?.name_role === role
      );
    }

    if (packageType !== "All") {
      filtered = filtered.filter(
        (user) => user.iD_PackageNavigation?.name_Package === packageType
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  const handleTransactionClick = (customerId) => {
    navigate(`/admin-dashboard/transactions/${customerId}`);
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewRole(user.iD_RoleNavigation?.name_role || "");
    setNewIsActive(user.isActive);
  };

  const handleSaveChanges = async () => {
    if (editUser) {
      try {
        const roleMap = {
          Customer: 2,
          Admin: 1,
          Staff: 3, 
        };

        const updatedUser = {
          ...editUser,
          iD_Role: roleMap[newRole] || 2,  
          isActive: newIsActive ? "Active" : "InActive",  
        };

        const response = await UserService.editProfile(updatedUser);
        if (response && response.success) {
          const updatedUsers = users.map((user) =>
            user.iD_Customer === updatedUser.iD_Customer ? updatedUser : user
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          setEditUser(null);
          setToastMessage("User updated successfully!"); // Display success message
        } else {
          console.error("Failed to update user.");
          setToastMessage("Failed to update user.");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        setToastMessage("Error updating user.");
      }
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="admin-user-page">
      <h2 className="admin-title">Admin User Management</h2>

      {/* Filter options */}
      <div className="filter-container">
        <div>
          <label htmlFor="role-filter">Filter by Role: </label>
          <select id="role-filter" value={selectedRole} onChange={handleRoleChange}>
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="package-filter">Filter by Package: </label>
          <select id="package-filter" value={selectedPackage} onChange={handlePackageChange}>
            <option value="All">All Packages</option>
            <option value="Basiccc">Basiccc</option>
            <option value="Premium">Premium</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <button onClick={exportToExcel} className="excel-button">Export to Excel</button>
      </div>

      {/* User table */}
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
            <th>Active Status</th>
            <th>Transactions</th>
            <th>Edit</th>
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
              <td>{new Date(user.package_registration_time).toLocaleDateString()}</td>
              <td>{new Date(user.package_expiration_date).toLocaleDateString()}</td>
              <td>{user.number_of_tickets_can_posted}</td>
              <td><img src={user.avatar} alt="User Avatar" className="avatar" /></td>
              <td>{user.isActive}</td>
              <td><button onClick={() => handleTransactionClick(user.iD_Customer)}>View Transactions</button></td>
              <td><button onClick={() => handleEditClick(user)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination current={currentPage} pageSize={pageSize} total={filteredUsers.length} onChange={handlePageChange} />

      {/* Edit User Modal */}
      {editUser && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <h3>Edit User</h3>
            <div>
              <label>Role: </label>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label>Active: </label>
              <input type="checkbox" checked={newIsActive} onChange={() => setNewIsActive(!newIsActive)} />
            </div>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => setEditUser(null)}>Cancel</button>
          </div>
        </div>
      )}

      
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
};

export default AdminUser;
