// Student Data
const students = [
  {
    name: "John Doe",
    roll: "2025A001",
    course: "Computer Science",
    email: "john.doe@example.com",
    marks: {
      Mathematics: 85,
      "Computer Science": 90,
      Physics: 78,
      Chemistry: 88
    }
  },
  {
    name: "Jane Smith",
    roll: "2025A002",
    course: "Information Technology",
    email: "jane.smith@example.com",
    marks: {
      Mathematics: 92,
      "Computer Networks": 89,
      Physics: 84,
      "Database Systems": 91
    }
  },
  {
    name: "Mike Johnson",
    roll: "2025A003",
    course: "Electronics",
    email: "mike.johnson@example.com",
    marks: {
      Mathematics: 76,
      "Circuit Theory": 85,
      Physics: 80,
      "Digital Systems": 79
    }
  }
];

const studentList = document.getElementById("studentList");
const searchBar = document.getElementById("searchBar");
let currentStudent = null;

// Load students in sidebar
function renderStudentList(filter = "") {
  studentList.innerHTML = "";
  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    studentList.innerHTML = "<li><em>No student found</em></li>";
    return;
  }

  filtered.forEach((student, index) => {
    const realIndex = students.indexOf(student);
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="selectStudent(${realIndex})">${student.name}</a>`;
    studentList.appendChild(li);
  });

  if (filtered.length === 1) {
    selectStudent(students.indexOf(filtered[0]));
  }
}

// Select student
function selectStudent(index) {
  currentStudent = students[index];
  showProfile();
  showMarks();
}

// Profile section
function showProfile() {
  if (!currentStudent) return;
  const profileCard = document.getElementById("profileCard");
  profileCard.innerHTML = `
    <p><strong>Name:</strong> ${currentStudent.name}</p>
    <p><strong>Roll No:</strong> ${currentStudent.roll}</p>
    <p><strong>Course:</strong> ${currentStudent.course}</p>
    <p><strong>Email:</strong> ${currentStudent.email}</p>
  `;
}

// Marks section
function showMarks() {
  if (!currentStudent) return;
  const tbody = document.querySelector("#marksTable tbody");
  tbody.innerHTML = "";
  for (let subject in currentStudent.marks) {
    const row = `<tr><td>${subject}</td><td>${currentStudent.marks[subject]}</td></tr>`;
    tbody.innerHTML += row;
  }
}

// Navigation
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-section");

    sections.forEach(sec => {
      sec.classList.remove("active");
      if (sec.id === target) sec.classList.add("active");
    });
  });
});

// Page Load
renderStudentList();
selectStudent(0);
searchBar.addEventListener("input", (e) => {
  renderStudentList(e.target.value);
});
