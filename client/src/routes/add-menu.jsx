import React from "react";
import {
  Input,
  Flex,
  Typography,
  Card,
  Form,
  Button,
  Upload,
  message,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
const { TextArea } = Input;

function AddMenu() {
  const [fileList, setFileList] = React.useState([]);
  const [form] = Form.useForm();

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    maxCount: 1,
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image", file);
    });

    try {
      const uploadResponse = await axios.post(
        "http://localhost:3000/upload",
        formData
      );

      if (uploadResponse.status === 200) {
        message.success(uploadResponse?.data?.message);

        const response = await axios.post(
          "http://localhost:3000/admin/add-menu",
          {
            name: values.name,
            description: values.description,
            image_url: uploadResponse?.data?.image_url,
            created_at: dayjs(values?.created_at).toISOString(),
          }
        );

        if (response.status === 200) {
          message.success(response?.data?.message);
          form.resetFields();
          setFileList([]);
        }
      }
    } catch (error) {
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
        Add Menu
      </Typography.Title>

      <Card>
        <Form
          form={form}
          name="add-menu"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter menu title" size="large" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea
              placeholder="Enter description"
              size="large"
              rows={10}
              maxLength={1000}
            />
          </Form.Item>

          <Flex justify="space-between">
            <Form.Item label="Image" name="image">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Date" name="created_at">
              <DatePicker />
            </Form.Item>
          </Flex>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Add Menu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}

export default AddMenu;
