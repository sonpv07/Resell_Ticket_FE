import Home from "./Home/Home";
import TicketsList from "./Ticket/TicketsList/TicketsList";
import OrderHistory from '../pages/OrderHistory/OrderHistory';
import Feedback from '../pages/Feedback/Feedback';
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
    path: "Feedback",
    element: <Feedback />,
    title: "Feedback",
  },
   {
    path: "OrderHistory",
    element: <OrderHistory />,
    title: "OrderHistory",
  },
];

export default pagesData;
