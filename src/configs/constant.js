const {
  SettingFilled,
  NotificationFilled,
  BellFilled,
  LogoutOutlined,
  CalendarFilled,
  ShoppingCartOutlined,
  SolutionOutlined,
} = require("@ant-design/icons");

export const LOCATION_DATA = [
  {
    id: 1,
    name: "Ha Noi",
    url: "/HaNoi.jpg",
  },
  {
    id: 2,
    name: "Ho Chi Minh",
    url: "/HCM.jpg",
  },
  {
    id: 3,
    name: "Da Nang",
    url: "/DaNang.jpg",
  },
];

export const CATEGORY_DATA = [
  {
    id: 1,
    name: "Concert",
    url: "/concert.jpg",
  },
  {
    id: 2,
    name: "Sport",
    url: "/sport.jpg",
  },
  {
    id: 3,
    name: "Theater",
    url: "/movie.jpg",
  },
];

export const SETTING_DATA = [
  {
    id: 1,
    icon: <SettingFilled />,
    needPackage: false,
    label: "Profile",
  },
  {
    id: 2,
    icon: <NotificationFilled />,
    label: "Notifications",
    needPackage: false,
  },
  // {
  //   id: 3,
  //   icon: <BellFilled />,
  //   label: "Ticket alerts",
  // },
  {
    id: 4,
    icon: <ShoppingCartOutlined />,
    label: "Order History",
    needPackage: false,
  },
  {
    id: 5,
    icon: <SolutionOutlined />,
    label: "Seller Space",
    needPackage: true,
  },
  {
    id: 6,
    icon: <LogoutOutlined />,
    label: "Logout",
    needPackage: false,
  },
];

export const DATE_FILTER_DATA = [
  {
    id: 1,
    label: "Today",
    icon: <CalendarFilled style={{ color: "#00B6F0", fontSize: "24px" }} />,
  },
  {
    id: 2,
    label: "Tomorrow",
    icon: <CalendarFilled style={{ color: "#FFA600", fontSize: "24px" }} />,
  },
  {
    id: 3,
    label: "This weekend",
    icon: <CalendarFilled style={{ color: "#00CE5C", fontSize: "24px" }} />,
  },
  {
    id: 4,
    label: "Explore all",
    icon: <CalendarFilled style={{ color: "#FE4A49", fontSize: "24px" }} />,
  },
];

export const PAYMENT_METHODS = {
  VNPAY: "VNPay",
};
