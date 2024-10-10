import HomePage from "./Home/HomePage";
import EditProfile from "./User/profile/edit-profile/EditProfile";
import ViewProfile from "./User/profile/view-profile/ViewProfile"; // Import ViewProfile
import Shopping from "./Ticket/Shopping/Shopping";
import TicketDetail from "./Ticket/TicketDetail/TicketDetail";
import TicketManagement from "./Seller/management/TicketManagement";

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
    path: "edit",
    element: <EditProfile />,
    title: "edit",
    children: [
      {
        path: "email",
        element: <EditProfile />,
        title: "email",
      },
      {
        path: "password",
        element: <EditProfile />,
        title: "password",
      },
      {
        path: "name",
        element: <EditProfile />,
        title: "name",
      },
      {
        path: "contact",
        element: <EditProfile />,
        title: "Contact",
      },
    ],
  },
  {
    path: "view-profile", // Thêm route cho ViewProfile
    element: <ViewProfile />,
    title: "view-profile",
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
];

export default pagesData;
