<?php
include "config.php";

$name = $_POST['name'];
$studentId = $_POST['student_id'];
$course = $_POST['course'];

/* Insert student */
$conn->query("INSERT IGNORE INTO students (student_id, name)
              VALUES ('$studentId', '$name')");

/* Get student DB id */
$student = $conn->query("SELECT id FROM students WHERE student_id='$studentId'");
$studentDbId = $student->fetch_assoc()['id'];

/* Insert course if not exists */
$conn->query("INSERT IGNORE INTO courses (course_name) VALUES ('$course')");

/* Get course id */
$courseRes = $conn->query("SELECT id FROM courses WHERE course_name='$course'");
$courseId = $courseRes->fetch_assoc()['id'];

/* Register student */
$conn->query("INSERT INTO registrations (student_id, course_id)
              VALUES ($studentDbId, $courseId)");

echo "Registration successful";
?>
