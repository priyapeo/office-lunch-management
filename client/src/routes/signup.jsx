import { Card, Flex, Typography, message } from "antd";
import UserForm from "../components/user-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        ...values,
      });

      if (response.status === 200) {
        message.success(response?.data?.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message);
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
        Sign Up
      </Typography.Title>

      <Card>
        <UserForm isLogin={true} handleSubmit={handleSubmit} />
      </Card>
    </Flex>
  );
}

export default Signup;
