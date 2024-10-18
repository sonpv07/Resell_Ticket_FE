import Package from "./Package/Package";
// import TicketsList from "./Ticket/TicketsList/TicketsList";
import EditProfile from "./User/EditProfile";  
import ViewProfile from "./User/ViewProfile";  
import HomePage from "./Home/HomePage";
import Shopping from "./Ticket/Shopping/Shopping";
import TicketDetail from "./Ticket/TicketDetail/TicketDetail";
import TicketManagement from "./Seller/management/TicketManagement";
import RequestPriceForm from "../components/request-price/RequestPriceForm";

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
    path: "edit-profile",
    element: <EditProfile />,
    title: "edit-profile",
  },
  {
    path: "view-profile",  
    element: <ViewProfile />,
    title: "view-profile",
  },
  {
    path: "package",  
    element: <Package />,
    title: "package",
  },
  {
    path: "ticket/:id",
    element: <TicketDetail />,
    title: "ticket detail",
  },

  {
    path: "seller/management",
    element: <TicketManagement />,
    title: "ticket management",
  },

  //test request price form
  {
    path: "components/request-price",
    element: <RequestPriceForm />,
    title: "request price",
  },
];

export default pagesData;
