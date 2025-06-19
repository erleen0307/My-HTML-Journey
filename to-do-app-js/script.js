// Single Task Class
class singleTask {
    constructor(taskDesc, isCompleted = false) {
        this.taskDesc = taskDesc; // string
        this.isCompleted = isCompleted; // bool
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted; // true <--> false
    }
}

// Multiple Tasks List
class taskList {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    addTask(taskObj) {
        this.tasks.push(taskObj);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    getAllTasks() {
        return this.tasks;
    }
}


// ---------------- DOM & Logic ----------------

// Persistent task list object
const taskListObj = new taskList();

// DOM elements
let taskInput = document.querySelector("#newTaskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let taskDiv = document.querySelector(".taskDiv");

// Render function

const renderTasks = () => {
    taskDiv.innerHTML = ""; // Clear previous tasks

    const tasks = taskListObj.getAllTasks();
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = task.isCompleted 
            ? `✅ ${task.taskDesc}`
            : `❌ ${task.taskDesc}`;

        // Apply class if completed
        if (task.isCompleted) {
            taskText.classList.add("completed-task");
        }

        // Toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click", () => {
            task.toggleCompletion();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskListObj.deleteTask(index);
            renderTasks();
        });

        // Append to task element
        taskElement.appendChild(toggleBtn);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(taskText);

        // Append to DOM
        taskDiv.appendChild(taskElement);
    });
};


// Add task on button click
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const singleTaskObj = new singleTask(taskText);
        taskListObj.addTask(singleTaskObj);
        taskInput.value = ""; // clear input
        renderTasks();
    }
});

// Add task same as click when Enter is pressed
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

