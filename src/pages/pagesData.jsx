import HomePage from "./Home/HomePage";
import Shopping from "./Ticket/Shopping/Shopping";
import TicketDetail from "./Ticket/TicketDetail/TicketDetail";
import TicketManagement from "./Seller/management/TicketManagement";
import SellerProfile from "./Seller/profile/SellerProfile";
import Cart from "./User/cart/Cart";
import CreateTicketPage from "./Ticket/CreateTicketPage";
import Package from "./Package/Package";
import PaymentBill from "./Payment/PaymentBill";
import Feedback from "../pages/Feedback/Feedback";
import RequestPriceForm from "../components/request-price/RequestPriceForm";
import OrderHistory from "./OrderHistory/OrderHistory";
import EditProfile from "./User/EditProfile";
import ViewProfile from "./User/ViewProfile";
import Layout from "../layout/Layout";
import Notification from "./Notification/Notification";
import ConfirmSuccess from "./confirm-success/ConfirmSuccess";
import DashboardDefault from "./Admin/Dashboard";

// Import các trang Admin
import AdminOrder from "./Admin/Order/AdminOrder";
import AdminUser from "./Admin/User/AdminUser";
import AdminPackage from "./Admin/Package/AdminPackage";
import AdminTicket from "./Admin/Ticket/AdminTicket";
import RequestList from "./Request/RequestList";
import ChatPage from "./Chat/ChatPage";

const pagesData = [
  {
    path: "",
    element: <HomePage />,
    title: "home",
  },
  {
    path: "tickets",
    element: <Shopping />,
    title: "tickets",
  },
  {
    path: "profile",
    allowedRoles: ["Customer"],
    title: "profile",
    children: [
      {
        path: "",
        element: <ViewProfile />,
        title: "view profile",
      },
      {
        path: "edit",
        element: <EditProfile />,
        title: "edit",
      },
    ],
  },

  {
    path: "ticket/:id",
    element: <TicketDetail />,
    title: "ticket detail",
  },

  {
    path: "seller",
    title: "Seller",
    allowedRoles: ["Customer"],
    children: [
      {
        path: "",
        element: <TicketManagement />,
        title: "ticket management",
      },
      {
        path: "create-ticket",
        element: <CreateTicketPage />,
        title: "create ticket page",
      },
    ],
  },

  {
    path: "seller-profile/:id",
    element: <SellerProfile />,
    title: "Seller Profile",
  },

  {
    path: "cart",
    element: <Cart />,
    title: "cart",
  },

  {
    path: "package",
    element: <Package />,
    title: "package",
  },

  {
    path: "order-history",
    element: <OrderHistory />,
    title: "Order History",
  },

  {
    path: "success-payment",
    element: <PaymentBill />,
    title: "success-payment",
  },

  {
    path: "fail-payment",
    element: <PaymentBill />,
    title: "fail-payment",
  },

  {
    path: "feedback/:orderId",
    element: <Feedback />,
    title: "Feedback",
  },

  {
    path: "request",
    element: <RequestList />,
    title: "request price",
  },
  {
    path: "notification",
    element: <Notification />,
    title: "notification",
  },
  {
    path: "confirm-success",
    element: <ConfirmSuccess />,
    title: "confirmSuccess",
  },

  // Admin routes
  {
    path: "admin-dashboard",
    title: "admin-dashboard",
    allowedRoles: ["Admin"],
    children: [
      {
        path: "",
        element: <DashboardDefault />,
        title: "Order",
      },
      {
        path: "order",
        element: <AdminOrder />,
        title: "Order",
      },
      {
        path: "user",
        element: <AdminUser />,
        title: "User",
      },
      {
        path: "package",
        element: <AdminPackage />,
        title: "Package",
      },
      {
        path: "ticket",
        element: <AdminTicket />,
        title: "Ticket",
      },
    ],
  },

  {
    path: "chat",
    element: <ChatPage />,
    title: "chat",
  },
];

export default pagesData;
