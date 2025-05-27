let tasks = [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("task-list");
const numberDisplay = document.getElementById("number");
const progressBar = document.getElementById("progress");

document.getElementById("NewTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if (text !== "") {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        updateTaskList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
}

function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
}

function updateTaskList() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" onchange="toggleTaskComplete(${index})" ${task.completed ? "checked" : ""}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="https://cdn-icons-png.flaticon.com/512/6325/6325975.png" onclick="editTask(${index})" title="Edit">
                    <img src="https://th.bing.com/th/id/OIP.VeuaWNtGR9oztF9Pwl_3dwAAAA?rs=1&pid=ImgDetMain" onclick="deleteTask(${index})" title="Delete">
                </div>
            </div>
        `;

        taskList.appendChild(listItem);
    });

    updateProgress();
}

function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const percent = total ? (completed / total) * 100 : 0;

    numberDisplay.textContent = `${completed}/${total}`;
    progressBar.style.width = `${percent}%`;

    if (total > 0 && completed === total) {
        blastConfetti(); // Corrected function name
    }
}

// ✅ Confetti Function
function blastConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}
