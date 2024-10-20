import HomePage from "./Home/HomePage";
import EditProfile from "./User/profile/edit-profile/EditProfile";
import ViewProfile from "./User/profile/view-profile/ViewProfile"; // Import ViewProfile
import Shopping from "./Ticket/Shopping/Shopping";
import TicketDetail from "./Ticket/TicketDetail/TicketDetail";
import TicketManagement from "./Seller/management/TicketManagement";
import SellerProfile from "./Seller/profile/SellerProfile";
import Cart from "./User/cart/Cart";
import CreateTicketPage from "./Ticket/CreateTicketPage";
import Package from "./Package/Package";
import OrderHistory from "../pages/OrderHistory/OrderHistory";
import PaymentBill from "./Payment/PaymentBill";
import Feedback from "../pages/Feedback/Feedback";

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
    path: "Feedback",
    element: <Feedback />,
    title: "Feedback",
  },
];

export default pagesData;
