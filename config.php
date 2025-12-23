<?php
$conn = new mysqli("localhost", "root", "", "auca_portal");

if ($conn->connect_error) {
    die("Connection failed");
}
?>
