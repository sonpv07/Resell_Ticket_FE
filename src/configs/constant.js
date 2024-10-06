const {
  SettingFilled,
  NotificationFilled,
  BellFilled,
  LogoutOutlined,
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
    name: "Movie",
    url: "/movie.jpg",
  },
];

export const SETTING_DATA = [
  {
    id: 1,
    icon: <SettingFilled />,
    label: "Profile",
  },
  {
    id: 2,
    icon: <NotificationFilled />,
    label: "Notifications",
  },
  {
    id: 3,
    icon: <BellFilled />,
    label: "Ticket alerts",
  },
  {
    id: 4,
    icon: <LogoutOutlined />,
    label: "Logout",
  },
];
