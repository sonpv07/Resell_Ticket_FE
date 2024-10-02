import Home from "./Home/HomePage";
import TicketsList from "./Ticket/TicketsList/TicketsList";

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
];

export default pagesData;
