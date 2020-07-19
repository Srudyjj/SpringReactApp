package com.turbinist.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return Arrays.asList(
                new Student(
                        UUID.randomUUID(),
                        "James",
                        "Bond",
                        "jamesbond@email.com",
                        Student.Gender.MALE
                ),
                new Student(
                        UUID.randomUUID(),
                        "Elisa",
                        "Tamara",
                        "jamesbond@email.com",
                        Student.Gender.FEMALE
                )
        );
    }
}
