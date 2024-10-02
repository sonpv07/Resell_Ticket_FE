import Home from "./Home/Home";
import Shopping from "./Ticket/Shopping/Shopping";
import TicketDetail from "./Ticket/TicketDetail/TicketDetail";

const pagesData = [
  {
    path: "",
    element: <Home />,
    title: "home",
  },
  {
    path: "tickets",
    element: <Shopping />,
    title: "tickets",
  },
  {
    path: "ticket/:id",
    element: <TicketDetail />,
    title: "ticket detail",
  },
];

export default pagesData;
