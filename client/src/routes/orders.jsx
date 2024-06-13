import { Typography, Table, Image, message } from "antd";
import axios from "axios";
import React from "react";
import dayjs from "dayjs";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Employee Username",
    dataIndex: ["user", "username"],
  },
  {
    title: "Employee Id",
    dataIndex: ["user", "id"],
  },
  {
    title: "Employee Email",
    dataIndex: ["user", "email"],
  },
  {
    title: "Menu Name",
    dataIndex: ["menu", "name"],
  },
  {
    title: "Menu Description",
    dataIndex: ["menu", "description"],
  },
  {
    title: "Menu Image",
    dataIndex: ["menu", "image_url"],

    render: (menu_image) => (
      <Image src={menu_image} width={80} placeholder={true} />
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    render: (date) => dayjs(date).format("DD/MM/YYYY"),
  },
];

function Orders() {
  const [orders, setOrders] = React.useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/orders");

      if (response.status === 200) {
        setOrders(response?.data?.orders);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Typography.Title level={3} style={{ marginBottom: "2rem" }}>
        All Orders
      </Typography.Title>
      <Table
        dataSource={orders}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default Orders;
