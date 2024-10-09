import Home from "./Home/Home";
import Package from "./Package/Package";
import TicketsList from "./Ticket/TicketsList/TicketsList";
import EditProfile from "./User/profile/edit-profile/EditProfile";
import ViewProfile from "./User/profile/view-profile/ViewProfile"; // Import ViewProfile

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
    path: "package", // Thêm route cho Package
    element: <Package />,
    title: "package",
  },
];

export default pagesData;
