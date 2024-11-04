import React, { useEffect, useState } from "react";
import OrderService from "../../../services/order.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { currencyFormatter } from "../../../utils";

export default function RecentOrdersTable() {
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await OrderService.getOrderByUser();
        if (response.success) {
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

          const recentOrdersData = response.data.filter((order) => {
            const orderDate = new Date(order.create_At);
            return orderDate >= threeDaysAgo;
          });

          setRecentOrders(recentOrdersData);
        }
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };
    fetchRecentOrders();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="recent orders table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <TableRow key={order.iD_Order}>
                <TableCell>{order.iD_Order}</TableCell>
                <TableCell>{order.iD_CustomerNavigation?.name}</TableCell>
                <TableCell>{order.iD_CustomerNavigation?.contact}</TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{currencyFormatter(order.totalPrice)}</TableCell>
                <TableCell>
                  {new Date(order.create_At).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No recent orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
