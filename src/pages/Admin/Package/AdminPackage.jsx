import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Pagination,
} from "antd";
import PackageService from "../../../services/package.service";
import "./AdminPackage.scss";
import { currencyFormatter } from "../../../utils";

function AdminPackage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPackage, setEditingPackage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await PackageService.getPackageList();
      if (response.success) {
        setPackages(response.data);
      } else {
        message.error("Failed to fetch packages.");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      message.error("An error occurred while fetching packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const showEditModal = (pkg) => {
    setEditingPackage(pkg);
    form.setFieldsValue(pkg);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingPackage(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      const requestData = {
        name_Package: values.name_Package,
        price: values.price,
        time_package: values.time_package,
        ticket_can_post: values.ticket_can_post,
        description: values.description,
      };

      const response = await PackageService.createPackage(requestData);

      if (response.success) {
        message.success("Package created successfully");
        fetchPackages();
        handleCancel();
      } else {
        message.error("Failed to create package.");
      }
    } catch (error) {
      console.error("Error creating package:", error);
      message.error("An error occurred while creating package.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const requestData = {
        iD_Package: editingPackage.iD_Package,
        name_Package: values.name_Package,
        price: values.price,
        time_package: values.time_package,
        ticket_can_post: values.ticket_can_post,
        description: values.description,
      };
      const response = await PackageService.updatePackage(requestData);
      if (response.data.status === 200) {
        message.success("Package updated successfully");
        fetchPackages();
        handleCancel();
      } else {
        message.error("Failed to update package.");
      }
    } catch (error) {
      console.error("Error updating package:", error);
      message.error("An error occurred while updating package.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (values) => {
    if (editingPackage) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await PackageService.deletePackage(id);
      if (response.success) {
        message.success("Package deleted successfully");
        fetchPackages();
      } else {
        message.error("Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      message.error("An error occurred while deleting package.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentPackages = packages.slice(startIndex, startIndex + pageSize);

  const columns = [
    { title: "ID", dataIndex: "iD_Package", key: "iD_Package" },
    { title: "Name", dataIndex: "name_Package", key: "name_Package" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${currencyFormatter(text)}`,
    },
    { title: "Time (days)", dataIndex: "time_package", key: "time_package" },
    {
      title: "Tickets Can Post",
      dataIndex: "ticket_can_post",
      key: "ticket_can_post",
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => showEditModal(record)}
            className="action-button"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.iD_Package)}
          >
            <Button type="link" danger className="delete-button">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="admin-package-page">
      <h2 className="admin-title">Admin Package Management</h2>
      <Button
        type="primary"
        onClick={() => {
          setEditingPackage(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
        className="action-button"
      >
        Create New Package
      </Button>
      <Table
        rowKey="iD_Package"
        columns={columns}
        dataSource={currentPackages}
        loading={loading}
        pagination={false}
        className="admin-table"
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={packages.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        className="pagination"
        responsive={true}
      />
      <Modal
        title={editingPackage ? "Edit Package" : "Create New Package"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={editingPackage ? editingPackage : {}}
        >
          <Form.Item name="iD_Package" label="ID" hidden={!editingPackage}>
            <InputNumber disabled style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="name_Package"
            label="Name"
            rules={[
              { required: true, message: "Please input the package name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="time_package"
            label="Time (days)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="ticket_can_post"
            label="Tickets Can Post"
            rules={[{ required: true, message: "Please input ticket limit!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="action-button"
            >
              {editingPackage ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminPackage;
