import Home from "./Home/Home";
import TicketsList from "./Ticket/TicketsList/TicketsList";
import ViewProfile from "./User/profile/view-profile/ViewProfile";  // Import ViewProfile


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
    path: "view-profile",  // Thêm route cho ViewProfile
    element: <ViewProfile />,
    title: "view-profile",
  },
];

export default pagesData;
