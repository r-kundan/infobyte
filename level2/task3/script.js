function addTask() {
    var taskInput = document.getElementById("taskInput").value.trim();
    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }
    var taskItem = document.createElement("li");
    taskItem.textContent = taskInput;
    taskItem.onclick = function() {
        toggleTaskStatus(taskItem);
    };
    document.getElementById("pendingList").appendChild(taskItem);
    document.getElementById("taskInput").value = "";
}

function toggleTaskStatus(taskItem) {
    taskItem.classList.toggle("completed");
    var parentList = taskItem.parentElement.id;
    if (parentList === "pendingList" && taskItem.classList.contains("completed")) {
        document.getElementById("completedList").appendChild(taskItem);
    } else if (parentList === "completedList" && !taskItem.classList.contains("completed")) {
        document.getElementById("pendingList").appendChild(taskItem);
    }
}
