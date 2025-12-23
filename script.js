function loadStudents() {
    fetch("report.php")
        .then(res => res.json())
        .then(data => {

            studentList.innerHTML = "";

            if (data.length === 0) {
                studentList.innerHTML = "<li>No registrations yet</li>";
                return;
            }

            data.forEach(student => {
                const li = document.createElement("li");
                li.textContent =
                    student.name + " (" +
                    student.student_id + ") - " +
                    student.course_name;

                studentList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("ERROR:", error);
        });
}
