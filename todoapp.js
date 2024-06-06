// Selecting the menu toggle button and the sidebar element
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
let mode = "add"; // Default mode for adding tasks
let editedTaskId = 0; // ID of the task being edited

// Toggle the sidebar visibility on menu toggle button click
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("is-active"); // Toggle active state for the menu button

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
  } else {
    sidebar.classList.remove("hide");
    sidebar.classList.add("show");
  }
});

// Function to update the current date and time
function updateDateTime() {
  const now = new Date();
  const currentDateTime = now.toLocaleString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.querySelector(".datetime").textContent = currentDateTime;
}
// Update the date and time every second
setInterval(updateDateTime, 1000);

// Toggle the task form and additional content visibility
document.getElementById("showFormButton").addEventListener("click", function () {
  let taskForm = document.getElementById("taskForm");
  let additionalContent = document.getElementById("additionalContent");

  taskForm.classList.toggle("hidden");
  additionalContent.classList.toggle("hidden");
});

// Toggle the task priority section visibility
document.getElementById("showPriorityButton").addEventListener("click", function () {
  let itemPriority = document.getElementById("item-priority");
  itemPriority.classList.toggle("hidden");
});

let selectedPriority = ""; // Selected priority for a task

// Function to set the task priority
const setPriority = (value) => {
  selectedPriority = value;
};

const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage or initialize an empty array
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const addTaskButton = document.getElementById("addTask-btn");
const tasksContainer = document.getElementById("tasksContainer");
const completedTasksContainer = document.getElementById("completedTasks");
const priorityButtons = document.querySelectorAll(".priority-btn");
const statusMessage = document.getElementById("statusMessage");

// Function to render the todo list
function renderTodoList() {
  tasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  if (!tasks.length) {
    statusMessage.textContent = "تسکی برای امروز نداری !";
    return;
  }

  let pendingTasksCount = 0;
  tasks.forEach((task) => {
    addTaskToDOM(task);
    if (!task.completed) {
      pendingTasksCount++;
    }
  });

  updateStatusMessage(pendingTasksCount);
}

// Set the task priority based on the selected button
priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.innerText;
    document.getElementById("show-priority").innerText =
      selectedPriority === "low"
        ? "پایین"
        : selectedPriority === "mid"
        ? "متوسط"
        : "بالا";
  });
});

// Add a new task or edit an existing task
addTaskButton.addEventListener("click", () => {
  if (mode === "add") {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (title) {
      const task = {
        id: new Date().getTime(),
        title,
        desc,
        priority: selectedPriority,
        completed: false,
      };
      tasks.push(task);
      addTaskToDOM(task);
      saveTasksToLocalStorage(tasks);
      reset();
    }
  } else {
    editTask(editedTaskId);
  }
});

// Reset the task form and mode
const reset = () => {
  titleInput.value = "";
  descInput.value = "";
  mode = "add";
  editedTaskId = 0;
  addTaskButton.textContent = "اضافه کردن تسک";
  document.getElementById("taskForm").classList.add("hidden");
  document.getElementById("additionalContent").classList.remove("hidden");
};

// Add a task element to the DOM
function addTaskToDOM(task) {
  const taskElement = document.createElement("div");
  taskElement.className =
    "border rounded-xl bg-white px-5 py-4 mt-5 dark:bg-[#002247] relative";
  taskElement.setAttribute("data-task-id", task.id);

  taskElement.innerHTML = `
          <div class="flex justify-between ">
              <div class="flex gap-4 items-center">
                  <input type="checkbox" class="h-6 w-6" onchange="markTaskAsCompleted(this, ${task.id})" ${task.completed ? "checked" : ""}>
                  <h2 class="font-bold text-[#242424] text-sm md:text-base dark:text-white ${task.completed ? "line-through" : ""}">${
                    task.title
                  }</h2>
                  <span id="show-priority" class="rounded 
                  ${
                    task.priority === "low"
                      ? "bg-[#C3FFF1] text-[#11A483]"
                      : task.priority === "mid"
                      ? "bg-[#FFEFD6] text-[#FFAF37]"
                      : "bg-[#FFE2DB] text-[#FF5F37]"
                  }
                    px-2 py-1 w-fit">${
                      task.priority === "low"
                        ? "پایین"
                        : task.priority === "mid"
                        ? "متوسط"
                        : "بالا"
                    }
                  </span>
              </div>
              <button onclick="showOptions(${
                task.id
              })" class="showOptionsButton"><i class="fa fa-ellipsis-v dark:text-white"></i></button>
          </div>
          <div id="options-${
            task.id
          }" class="hidden absolute left-8 border-2 px-2 rounded-md top-4 bg-white">
            <div class="options flex items-center gap-3">
                <button onclick="deleteTask(${
                  task.id
                })"><i class="fa-regular fa-trash-can"></i></button>
                <button onclick="edit(${
                  task.id
                })"><i class="fa-regular fa-pen-to-square"></i></button>
            </div>
          </div>    
          <span class="font-normal text-base text-[#696969] dark:text-[#848890] mt-3">${
            task.desc
          }</span>
      `;

  if (task.completed) {
    completedTasksContainer.appendChild(taskElement);
  } else {
    tasksContainer.appendChild(taskElement);
  }
}

// Save tasks to local storage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Prepare the form for editing a task
const edit = (id) => {
  additionalContent.classList.add("hidden");
  taskForm.classList.remove("hidden");

  const task = tasks.find((x) => x.id === id);
  mode = "edit";
  editedTaskId = id;
  addTaskButton.textContent = "ویرایش تسک";
  titleInput.value = task.title;
  descInput.value = task.desc;
};

// Update a task with new values
const editTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].title = titleInput.value;
    tasks[taskIndex].desc = descInput.value;
    saveTasksToLocalStorage(tasks);
    renderTodoList();
    reset();
  }
};

// Toggle task options visibility
const showOptions = (id) => {
  document.getElementById(`options-${id}`).classList.toggle("hidden");
};

// Delete a task by ID
const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasksToLocalStorage(tasks);
    renderTodoList();
  }
};

// Mark a task as completed or not
function markTaskAsCompleted(checkbox, taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = checkbox.checked;
    saveTasksToLocalStorage(tasks);
    renderTodoList();
  }
}

// Update the status message based on pending tasks count
function updateStatusMessage(pendingTasksCount) {
  if (pendingTasksCount === 0) {
    statusMessage.textContent = "تسکی برای امروز نداری !";
  } else {
    statusMessage.textContent = `${pendingTasksCount} تسک در حال انجام داری`;
  }
}

// Initialize the app on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const dark = document.querySelector("#dark");
  const light = document.querySelector("#light");

  dark.addEventListener("click", function () {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  });

  light.addEventListener("click", function () {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  });

  renderTodoList(); // Render the todo list on page load
});
