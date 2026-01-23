"use strict";

/* ===========================
   Mobile Navigation Toggle
   =========================== */
const mobileToggle = document.querySelector(".mobile-toggle");
const nav = document.querySelector(".nav");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    mobileToggle.setAttribute(
      "aria-expanded",
      nav.classList.contains("open")
    );
  });
}

/* ===========================
   Stats Counter Animation
   =========================== */
const counters = document.querySelectorAll(".stat-number");

const runCounter = (counter) => {
  const target = +counter.dataset.target;
  let count = 0;
  const increment = Math.ceil(target / 100);

  const update = () => {
    count += increment;
    if (count < target) {
      counter.textContent = count;
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  };
  update();
};

counters.forEach(runCounter);

/* ===========================
   Contact Form Validation
   =========================== */
const form = document.getElementById("feedbackForm");

if (form) {
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const messageInput = document.getElementById("feedbackMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const charCount = document.getElementById("charCount");
  const successMessage = document.getElementById("successMessage");

  messageInput.addEventListener("input", () => {
    charCount.textContent = `${messageInput.value.length} / 500`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (nameInput.value.trim().length < 3) {
      nameError.textContent = "Name must be at least 3 characters";
      valid = false;
    }

    if (!emailInput.value.includes("@")) {
      emailError.textContent = "Enter a valid email address";
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      valid = false;
    }

    if (valid) {
      form.style.display = "none";
      successMessage.style.display = "block";
      form.reset();
      charCount.textContent = "0 / 500";
    }
  });
}

/* ===========================
   Data Page – Student Dataset
   =========================== */
const tableBody = document.getElementById("tableData");
const totalRecords = document.getElementById("totalRecords");
const avgMarks = document.getElementById("avgMarks");
const maxMarks = document.getElementById("maxMarks");
const minMarks = document.getElementById("minMarks");

if (tableBody) {
  const students = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    marks: Math.floor(Math.random() * 51) + 50,
  }));

  const getGrade = (marks) => {
    if (marks >= 90) return "A";
    if (marks >= 80) return "B";
    if (marks >= 70) return "C";
    if (marks >= 60) return "D";
    return "F";
  };

  const renderTable = (data) => {
    tableBody.innerHTML = "";
    data.forEach((s) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.marks}</td>
        <td class="grade-${getGrade(s.marks).toLowerCase()}">${getGrade(
        s.marks
      )}</td>`;
      tableBody.appendChild(tr);
    });

    totalRecords.textContent = data.length;
    avgMarks.textContent = Math.round(
      data.reduce((a, b) => a + b.marks, 0) / data.length
    );
    maxMarks.textContent = Math.max(...data.map((s) => s.marks));
    minMarks.textContent = Math.min(...data.map((s) => s.marks));
  };

  renderTable(students);
}
