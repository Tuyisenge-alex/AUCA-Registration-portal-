<?php
include "config.php";

$sql = "
SELECT 
    registrations.id AS registration_id,
    students.name,
    students.student_id,
    courses.course_name
FROM registrations
INNER JOIN students ON registrations.student_id = students.id
INNER JOIN courses ON registrations.course_id = courses.id
";

$result = $conn->query($sql);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

header("Content-Type: application/json");
echo json_encode($data);
?>
