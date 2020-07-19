import React, { useState, useEffect } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import { Table, Avatar, Spin } from "antd";
import Container from "./Container";
import { LoadingOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "",
    key: "avatar",
    render: (text, student) => (
      <Avatar size={"large"}>
        {`${student.firstName.charAt(0).toUpperCase()}
          ${student.lastName.charAt(0).toUpperCase()}`}
      </Avatar>
    ),
  },
  {
    title: "StudentId",
    dataIndex: "studentId",
    key: "studentId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  function fetchStudents() {
    setIsFetching(true);
    getAllStudents()
      .then((res) => res.json())
      .then((students) => {
        setIsFetching(false);
        setStudents(students);
      });
  }

  const getIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (isFetching) {
    return (
      <Container>
        <Spin indicator={getIcon()} />
      </Container>
    );
  }

  if (students && students.length) {
    return (
      <Container>
        <Table
          dataSource={students}
          columns={columns}
          rowKey="studentId"
          pagination={false}
        />
      </Container>
    );
  }

  return <h1>No students found</h1>;
}

export default App;
