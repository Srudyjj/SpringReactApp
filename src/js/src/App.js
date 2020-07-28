import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllStudents } from "./client";
import { Avatar, Empty, Modal, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotification } from "./Notification";

function App() {
  const [ students, setStudents ] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ isAddStudentModalVisible, setIsAddStudentModalVisible ] = useState(
    false
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  const openAddStudentModal = () => setIsAddStudentModalVisible(true);

  function fetchStudents() {
    setIsFetching(true);
    getAllStudents()
      .then((res) => res.json())
      .then((students) => {
        setStudents(students);
      })
      .catch(error => {
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
      })
      .finally(() => setIsFetching(false));
  }

  const closeAddStudentModal = () => setIsAddStudentModalVisible(false);

  const getIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin/>;

  const LoadComponent = () => (
    <div style={{
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <Spin indicator={getIcon()}/>
    </div>
  )

  const MainComponent = () => (
    <Table
      style={{ paddingBottom: "5em" }}
      dataSource={students}
      columns={columns}
      rowKey="studentId"
      pagination={false}
    />
  )

  const EmptyComponent = () => (
    <div style={{
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <Empty style={{ margin: '15px 0', paddingBottom: '70px' }}
             description="No students found"/>
    </div>
  )

  return (
    <Container>
      {isFetching ?
        <LoadComponent/> :
        ((students && students.length) ?
          <MainComponent/> :
          <EmptyComponent/>)
      }
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

export default App;
