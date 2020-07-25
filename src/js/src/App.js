import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import { Avatar, Modal, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";

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
  const [ students, setStudents ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ isAddStudentModalVisible, setIsAddStudentModalVisible ] = useState(
    false
  );

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

  const openAddStudentModal = () => setIsAddStudentModalVisible(true);
  const closeAddStudentModal = () => setIsAddStudentModalVisible(false);

  const getIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin/>;

  if (isFetching) {
    return (
      <Container>
        <Spin indicator={getIcon()}/>
      </Container>
    );
  }

  if (students && students.length) {
    return (
      <Container>
        <Table
          style={{ paddingBottom: "5em" }}
          dataSource={students}
          columns={columns}
          rowKey="studentId"
          pagination={false}
        />
        <Modal
          title="Add new student"
          visible={isAddStudentModalVisible}
          onOk={closeAddStudentModal}
          onCancel={closeAddStudentModal}
        >
          <AddStudentForm
            onSuccess={() => {
              closeAddStudentModal();
              fetchStudents();
            }}
          />
        </Modal>
        <Footer numberOfStudents={students.length} onAddClick={openAddStudentModal}/>
      </Container>
    );
  }

  return <h1>No students found</h1>;
}

export default App;
