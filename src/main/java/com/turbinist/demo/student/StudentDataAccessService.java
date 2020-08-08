package com.turbinist.demo.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    List<Student> selectAllStudents() {
        String sql = "SELECT student_id," +
                " first_name," +
                " last_name," +
                " email," +
                " gender " +
                "FROM student";
        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (rs, rowNum) -> {
            String studentIdStr = rs.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);

            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");

            String genderStr = rs.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            return new Student(studentId, firstName, lastName, email, gender);
        };
    }

    int insertStudent(UUID studentId, Student student) {
        String sql = "" +
                "INSERT INTO student (" +
                "student_id, " +
                "first_name, " +
                "last_name, " +
                "email, " +
                "gender)" +
                "VALUES (?, ?, ?, ?, ?::gender)";
        return jdbcTemplate.update(sql,
                studentId,
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getGender().name().toUpperCase());
    }

    boolean isEmailExists(String email) {
        String sql = "SELECT EXISTS ( " +
                "SELECT 1 FROM STUDENT " +
                "WHERE email = ? )";
        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (rs, i) -> rs.getBoolean(1));
    }

    public List<StudentCourse> getStudentCourses(UUID studentId) {
        String sql = "" +
                "SELECT " +
                "student.student_id, " +
                "student_course.start_date, " +
                "student_course.end_date, " +
                "student_course.grade, " +
                "course.course_id, " +
                "course.name, " +
                "course.description, " +
                "course.department, " +
                "course.teacher_name " +
                "FROM student " +
                "JOIN student_course USING(student_id) " +
                "JOIN course USING(course_id) " +
                "WHERE student.student_id = ?";

        return jdbcTemplate.query(sql, new Object[]{studentId}, studentCourseRowMapper());
    }

    private RowMapper<StudentCourse> studentCourseRowMapper() {
        return (rs, rowNum) -> {
            String studentIdStr = rs.getString("student_id");
            UUID studentID = UUID.fromString(studentIdStr);
            String courseIdStr = rs.getString("course_id");
            UUID courseId = UUID.fromString(courseIdStr);
            String name = rs.getString("name");
            String description = rs.getString("description");
            String department = rs.getString("department");
            String teacherName = rs.getString("teacher_name");
            LocalDate startDate = rs.getDate("start_date").toLocalDate();
            LocalDate endDate = rs.getDate("end_date").toLocalDate();
            Integer grade = rs.getInt("grade");

            return new StudentCourse(
                    studentID,
                    courseId,
                    name,
                    description,
                    department,
                    teacherName,
                    startDate,
                    endDate,
                    grade
            );
        };
    }
}
