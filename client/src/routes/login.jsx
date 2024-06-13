import { Flex, Typography, Card, message } from "antd";
import UserForm from "../components/user-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        ...values,
      });
      updateAuth(response.data.user);

      if (response.status === 200) {
        if (response?.data?.user?.role === "admin") {
          return navigate("/orders");
        } else {
          return navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }
  };

  return (
    <Flex
      vertical
      align="middle"
      justify="center"
      style={{ width: "40%", margin: "auto", minHeight: "100lvh" }}
    >
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Login
      </Typography.Title>

      <Card>
        <UserForm handleSubmit={handleSubmit} renderFor="login" />
      </Card>
    </Flex>
  );
};

export default Login;
