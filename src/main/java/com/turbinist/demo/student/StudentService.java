package com.turbinist.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private final StudentDataAccessService studentDataAccessService;

    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }

    List<Student> getAllStudents() {
        return studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId)
                                    .orElse(UUID.randomUUID());
        //TODO: Verify that email is not taken

        studentDataAccessService.insertStudent(newStudentId, student);
    }
}
