import Home from "./Home/Home";
import TicketsList from "./Ticket/TicketsList/TicketsList";
import OrderHistory from '../components/OrderHistory';

const pagesData = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "tickets",
    element: <TicketsList />,
    title: "tickets",
  },
   {
    path: "/order-history",
    title: "Order History",
    element: <OrderHistory customerId="12345" />,
   
  },
];

export default pagesData;
