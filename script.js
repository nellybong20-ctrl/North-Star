alert("Welcome to the Scholarship Tracker!");
let scholarships = JSON.parse(localStorage.getItem("scholarships")) || [];

displayScholarships();

function addScholarship() {
    let name = document.getElementById("name").value.trim();
    let deadline = document.getElementById("deadline").value;
    let status = document.getElementById("status").value;
    let link = document.getElementById("link").value;

    if (name === "" || deadline === "") {
        alert("Please fill in all fields");
        return;
    }

    scholarships.push({
        name: name,
        deadline: deadline,
        status: status,
        link: link
    });

    saveData();
    displayScholarships();

    document.getElementById("name").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("link").value = "";
}

function saveData() {
    localStorage.setItem("scholarships", JSON.stringify(scholarships));
}

function deleteScholarship(index) {
    scholarships.splice(index, 1);
    saveData();
    displayScholarships();
}

function getDeadlineClass(days) {
    if (days < 7) return "urgent";
    if (days <= 30) return "warning";
    return "safe";
}

function displayScholarships() {
    let container = document.getElementById("scholarships");
    document.getElementById("total").innerText = "Total Opportunities: " + scholarships.length;
    container.innerHTML = "";

    scholarships.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    scholarships.forEach((item, index) => {
        let today = new Date();
        let due = new Date(item.deadline);
        let diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

        container.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>

            <p class="${getDeadlineClass(diff)}">
                ${diff} days left
            </p>

            <p>Status: ${item.status}</p>

            <p>
                <a href="${item.link}" target="_blank">
                    Open Application
                </a>
            </p>

            <button onclick="deleteScholarship(${index})">
                Delete
            </button>
        </div>
        `;
    });
}

const quotes = [
    "The best opportunities don't wait.",
    "Small applications become big futures.",
    "One deadline at a time.",
    "Your future self is watching."
];

document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];