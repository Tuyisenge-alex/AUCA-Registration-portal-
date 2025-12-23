<?php
include "config.php";

$result = $conn->query("
SELECT 
    registrations.id AS registration_id,
    students.name,
    students.student_id,
    courses.course_name
FROM registrations
JOIN students ON registrations.student_id = students.id
JOIN courses ON registrations.course_id = courses.id
");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
