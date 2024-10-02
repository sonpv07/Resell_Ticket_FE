import Home from "./Home/Home";
import Shopping from "./Ticket/Shopping/Shopping";

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
];

export default pagesData;
