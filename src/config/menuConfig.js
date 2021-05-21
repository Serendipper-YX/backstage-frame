import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: PieChartOutlined,
  },
  {
    title: "用户管理",
    key: "/user",
    icon: DesktopOutlined,
  },
  {
    title: "产品管理",
    key: "1",
    icon: MailOutlined,
    children: [
      {
        title: "产品类",
        key: "/product/type",
        icon: ContainerOutlined,
      },
      {
        title: "产品价格",
        key: "/product/price",
        icon: MailOutlined,
      },
    ],
  },
];

export default menuList;
