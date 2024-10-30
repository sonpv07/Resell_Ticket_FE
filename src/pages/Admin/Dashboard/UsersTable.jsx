import React, { useEffect, useState } from "react";
import DashboardService from "../../../services/dashboard.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

export default function UsersTable() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchNewCustomers = async () => {
      const response = await DashboardService.getNewCustomers();
      if (response.success) {
        console.log("Recent users data:", response.data); 
        setRecentUsers(response.data);
      } else {
        console.error(response.message);
      }
    };
    fetchNewCustomers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="recent users table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Average Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentUsers.length > 0 ? (
            recentUsers.map((user) => (
              <TableRow key={user.iD_Customer}> 
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>
                <TableCell>{user.iD_Customer}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.average_feedback}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No recent users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
