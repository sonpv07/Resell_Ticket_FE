import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { Card, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TagOutlined,
} from "@ant-design/icons";
import UsersTable from "./UsersTable";
import RecentOrdersTable from "./OrdersTable";
import DashboardService from "../../../services/dashboard.service";
import IncomeAreaChart from "./IncomeAreaChart";

export default function DashboardDefault() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalPackage, setTotalPackage] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const customerResponse = await DashboardService.getTotalCustomer();
      if (customerResponse.success) setTotalCustomer(customerResponse.data);

      const orderResponse = await DashboardService.getTotalOrder();
      if (orderResponse.success) setTotalOrder(orderResponse.data);

      const packageResponse = await DashboardService.getTotalPackage();
      if (packageResponse.success) setTotalPackage(packageResponse.data);

      const ticketResponse = await DashboardService.getTotalTicket();
      if (ticketResponse.success) setTotalTicket(ticketResponse.data);
    };

    fetchDashboardData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Dashboard
        </Typography>
      </Grid>

      {/* Statistics Cards */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            borderLeft: "5px solid #1890ff",
            borderRadius: "8px",
          }}
        >
          <Statistic
            title={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
              >
                Total Users
              </Typography>
            }
            value={totalCustomer}
            prefix={<UserOutlined style={{ color: "#1890ff" }} />}
            valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            borderLeft: "5px solid #52c41a",
            borderRadius: "8px",
          }}
        >
          <Statistic
            title={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
              >
                Total Orders
              </Typography>
            }
            value={totalOrder}
            prefix={<ShoppingCartOutlined style={{ color: "#52c41a" }} />}
            valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            borderLeft: "5px solid #faad14",
            borderRadius: "8px",
          }}
        >
          <Statistic
            title={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
              >
                Total Packages
              </Typography>
            }
            value={totalPackage}
            prefix={<AppstoreOutlined style={{ color: "#faad14" }} />}
            valueStyle={{ color: "#faad14", fontWeight: "bold" }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            borderLeft: "5px solid #f5222d",
            borderRadius: "8px",
          }}
        >
          <Statistic
            title={
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.secondary"
              >
                Total Tickets
              </Typography>
            }
            value={totalTicket}
            prefix={<TagOutlined style={{ color: "#f5222d" }} />}
            valueStyle={{ color: "#f5222d", fontWeight: "bold" }}
          />
        </Card>
      </Grid>

      {/* Recent Users Table */}
      <Grid item xs={12} md={12}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Recent Users
        </Typography>
        <Paper
          style={{
            backgroundColor: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <UsersTable />
        </Paper>
      </Grid>

      {/* Recent Orders Table */}
      <Grid item xs={12} md={12}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Recent Orders
        </Typography>
        <Paper
          style={{
            backgroundColor: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <RecentOrdersTable />
        </Paper>
      </Grid>

      {/* Revenue Chart */}
      {/* <Grid item xs={12} md={12}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Monthly Revenue
        </Typography>
        <Paper style={{ padding: "16px", borderRadius: "8px" }}>
          <IncomeAreaChart />
        </Paper>
      </Grid> */}
    </Grid>
  );
}
