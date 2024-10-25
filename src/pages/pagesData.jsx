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
    allowedRoles: ["Seller"],
    children: [
      {
        path: "",
        element: <TicketManagement />,
        title: "email",
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
    title: "SeLLer Profile",
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
    path: "/order-history",
    title: "Order History",
    // allowedRoles: ["Customer"],
    element: <OrderHistory />,
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
    path: "request-price",
    element: <RequestPriceForm />,
    title: "request price",
  },
];

export default pagesData;
