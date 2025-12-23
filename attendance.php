<?php
include "config.php";

$regId = $_POST['registration_id'];
$present = $_POST['present'];

$conn->query("INSERT INTO attendance (registration_id, present, date)
              VALUES ($regId, $present, CURDATE())");
?>
