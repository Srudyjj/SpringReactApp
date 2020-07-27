import fetch from "unfetch";


const checkStatus = res => {
  if (res.ok) {
    return res;
  } else {
    let error = new Error(res.statusText);
    error.respoce = res;
    res.json().then(e => {
      error.error = e;
    });
    return Promise.reject(error);
  }
}

export const getAllStudents = () => fetch('api/students').then(checkStatus);

export const addNewStudent = student =>
  fetch('api/students', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(student)
  }).then(checkStatus);

