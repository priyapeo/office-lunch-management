import { Card, Typography, Flex, message, Button } from "antd";
import axios from "axios";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const { Meta } = Card;

function Menus() {
  const [menus, setMenus] = React.useState([]);
  const { auth } = useAuth();

  const getMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee/menus");
      setMenus(response?.data?.menus);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  React.useEffect(() => {
    getMenus();
  }, []);

  const handleOrder = async (menuId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/employee/add-order",
        {
          user_id: auth?.id,
          menu_id: menuId,
        }
      );

      if (response?.status === 200) {
        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <Typography.Title level={3} style={{ marginBottom: 32 }}>
        All Menus For Today
      </Typography.Title>
      <Flex gap={"large"}>
        {menus.map((menu) => {
          return (
            <Card
              key={menu.id}
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt={`menu_image_${menu.id}`} src={menu.image_url} />}
              actions={[
                <Button
                  type="primary"
                  ghost
                  onClick={() => handleOrder(menu.id)}
                >
                  Confirm Order
                </Button>,
              ]}
            >
              <Meta title={menu.name} description={menu.description} />
            </Card>
          );
        })}
      </Flex>
    </>
  );
}

export default Menus;
