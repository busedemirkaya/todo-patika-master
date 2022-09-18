import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Checkbox,
  Button,
  Modal,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { getTodos, postTodos, putTodos, deleteTodos } from "../api/todo";
import LoadingSpinner from "./LoadingSpinner";

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  getFieldDecorator,
  ...restProps
}) => {
  var inputNode = <Input />;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
    case "boolean":
      inputNode = <Checkbox />;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          valuePropName={inputType === "boolean" ? "checked" : "value"}
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableLayout = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    username: "",
    content: "",
    createTime: "",
    isCompleted: false,
  });
  const [status, setStatus] = useState({
    username: null,
    content: null,
  });

  const isEditing = (record) => record.id === editingKey;
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "25%",
      editable: true,
    },
    {
      title: "content",
      dataIndex: "content",
      width: "25%",
      editable: true,
    },
    {
      title: "isCompleted",
      dataIndex: "isCompleted",
      inputType: "number",
      width: "15%",
      editable: true,
      render: (data) => <Checkbox checked={data} disabled></Checkbox>,
    },
    {
      title: "username",
      dataIndex: "username",
      width: "15%",
      editable: true,
    },
    {
      title: "telephoneNumber",
      dataIndex: "createTime",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteAPI(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const getData = async () => {
    setLoading(true);
    await getTodos().then((res) => setData(res));
    setLoading(false);
  };
  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  }, []);
  ///modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalData.content.length > 2 && modalData.username.length > 2) {
      setIsModalOpen(false);
      setLoading(true);
      await postTodos(modalData).then((res) => {
        if (res.status === 201) {
          getTodos().then((res) => setData(res));
        }
      });
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (name, val) => {
    if (name === "username") {
      const userLength = modalData.username.length >2 ? false : true;
      setStatus((prevState) => {
        return {
          ...prevState,
          username: userLength ? "error" : null,
        };
      });
    }
    if (name === "content") {
      const contentLength = modalData.content.length >2 ? false : true;
      setStatus((prevState) => {
        return {
          ...prevState,
          content: contentLength ? "error" : null,
        };
      });
    }

    setModalData((prevState) => {
      return { ...prevState, [name]: val };
    });
  };
  ///modal

  ///table operation
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
      setLoading(true)
      await putTodos(row);
      setLoading(false)
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleAdd = () => {
    showModal();
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "isCompleted" ? "boolean" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const deleteAPI = async (data) => {
    setLoading(true);
    await deleteTodos(data).then((res) => {
      if (res.status === 200) {
        getTodos().then((res) => setData(res));
      }
    });
    setLoading(false);
  };
  ///table operation

  return (
    <Form form={form} component={false}>
      {loading ? <LoadingSpinner /> : null}
      <div style={{ marginTop: "30px" }}>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <span>User Name</span>
          <Input
            name="username"
            status={status.username}
            onChange={(e) => onChange("username", e.target.value)}
          />
          {status.username === "error" ? (
            <span style={{ color: "red" }}>Cannot be shorter than 3 characters</span>
          ) : null}
        </div>
        <div>
          <span>Content</span>
          <Input
            name="content"
            status={status.content}
            onChange={(e) => onChange("content", e.target.value)}
          />
          {status.content === "error" ? (
            <span style={{ color: "red" }}>Cannot be shorter than 3 characters</span>
          ) : null}
        </div>
        <div>
          <span>Telephone number</span>
          <Input
            name="telephonenumber"
            onChange={(e) => onChange("createTime", e.target.value)}
          />
        </div>
        <div
          style={{ marginTop: 10, display: "flex", flexDirection: "column" }}
        >
          <span>Is Completed</span>
          <Select
            style={{}}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(val) => onChange("isCompleted", val)}
          >
            <Option value={true}>True</Option>
            <Option value={false}>False</Option>
          </Select>
        </div>
        {/* <div style={{position:"relative", left:'45%', marginTop:"20px"}}>
          <Button type="primary" onClick={modalSubmit}>Add</Button>
        </div> */}
      </Modal>
    </Form>
  );
};

export default TableLayout;
