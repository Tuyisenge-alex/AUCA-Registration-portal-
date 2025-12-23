<?php
include "config.php";

$name = $_POST['name'];
$studentId = $_POST['student_id'];
$course = $_POST['course'];

/* Insert student if not exists */
$conn->query("
INSERT INTO students (student_id, name)
VALUES ('$studentId', '$name')
ON DUPLICATE KEY UPDATE name='$name'
");

/* Get student id */
$studentRes = $conn->query("
SELECT id FROM students WHERE student_id='$studentId'
");
$student = $studentRes->fetch_assoc();
$studentDbId = $student['id'];

/* Insert course if not exists */
$conn->query("
INSERT INTO courses (course_name)
VALUES ('$course')
ON DUPLICATE KEY UPDATE course_name='$course'
");

/* Get course id */
$courseRes = $conn->query("
SELECT id FROM courses WHERE course_name='$course'
");
$courseRow = $courseRes->fetch_assoc();
$courseId = $courseRow['id'];

/* Register student */
$conn->query("
INSERT INTO registrations (student_id, course_id)
VALUES ($studentDbId, $courseId)
");

echo "Student registered successfully";
?>
