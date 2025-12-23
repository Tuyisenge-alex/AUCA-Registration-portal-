/*************************************************
 * AUCA REGISTRATION PORTAL - script.js
 * Frontend Logic + DOM Manipulation + AJAX
 *************************************************/

// =====================
// DOM ELEMENTS
// =====================
const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const course = document.getElementById("course");
const registerBtn = document.getElementById("registerBtn");

const studentList = document.getElementById("studentList");
const attendanceList = document.getElementById("attendanceList");
const publishReportBtn = document.getElementById("publishReport");

// =====================
// REGISTER STUDENT
// =====================
registerBtn.addEventListener("click", function () {

    // Basic validation
    if (
        studentName.value.trim() === "" ||
        studentId.value.trim() === "" ||
        course.value === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    // Prepare data for PHP
    const formData = new FormData();
    formData.append("name", studentName.value);
    formData.append("student_id", studentId.value);
    formData.append("course", course.value);

    // Send data to backend
    fetch("register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        clearInputs();
        loadStudents();   // Update UI from DB
    });
});

// =====================
// LOAD STUDENTS FROM DB
// =====================
function loadStudents() {
    fetch("report.php")
        .then(response => response.json())
        .then(data => {

            // Clear previous DOM nodes
            studentList.innerHTML = "";
            attendanceList.innerHTML = "";

            data.forEach(student => {

                // ===== STUDENT LIST =====
                const li = document.createElement("li");
                li.textContent = `${student.name} (${student.student_id}) - ${student.course_name}`;
                studentList.appendChild(li);

                // ===== ATTENDANCE PANEL =====
                const attLi = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                checkbox.addEventListener("change", function () {
                    markAttendance(student.registration_id, checkbox.checked);
                });

                attLi.appendChild(checkbox);
                attLi.append(` ${student.name}`);
                attendanceList.appendChild(attLi);
            });
        });
}

// =====================
// MARK ATTENDANCE
// =====================
function markAttendance(registrationId, present) {

    const formData = new FormData();
    formData.append("registration_id", registrationId);
    formData.append("present", present ? 1 : 0);

    fetch("attendance.php", {
        method: "POST",
        body: formData
    });
}

// =====================
// PUBLISH ATTENDANCE REPORT
// =====================
publishReportBtn.addEventListener("click", function () {

    let report = "ATTENDANCE REPORT\n\n";

    const items = attendanceList.querySelectorAll("li");

    items.forEach(item => {
        const name = item.textContent.trim();
        const status = item.querySelector("input").checked
            ? "Present"
            : "Absent";

        report += `${name} - ${status}\n`;
    });

    alert(report);
});

// =====================
// CLEAR INPUT FIELDS
// =====================
function clearInputs() {
    studentName.value = "";
    studentId.value = "";
    course.value = "";
}

// =====================
// INITIAL LOAD
// =====================
loadStudents();
