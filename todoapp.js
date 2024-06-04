//سایدبار
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
let mode = "add";
let editedTaskId = 0;

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("is-active");

  if (sidebar.classList.contains("show")) {
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
  } else {
    sidebar.classList.remove("hide");
    sidebar.classList.add("show");
  }
});
//نمایش ساعت برای کاربر
function updateDateTime() {
  const now = new Date();
  const currentDateTime = now.toLocaleString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.querySelector(".datetime").textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);

// نمایش و هیدن کردن نگ  فرم و تصویر بک گراند
document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    let taskForm = document.getElementById("taskForm");
    let additionalContent = document.getElementById("additionalContent");

    if (taskForm.classList.contains("hidden")) {
      taskForm.classList.remove("hidden");
      additionalContent.classList.add("hidden");
    } else {
      taskForm.classList.add("hidden");
      additionalContent.classList.remove("hidden");
    }
  });

// نمایش و هیدن کردن نگ اولویت ها
document
  .getElementById("showPriorityButton")
  .addEventListener("click", function () {
    var itemPriority = document.getElementById("item-priority");
    if (itemPriority.classList.contains("hidden")) {
      itemPriority.classList.remove("hidden");
    } else {
      itemPriority.classList.add("hidden");
    }
  });

let selectedPriority = "";

const setPrioity = (value) => {
  selectedPriority = value;
};

// دریافت اطلاعات از کاربر  و نمایش آن در صفحه
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const addTaskButton = document.getElementById("addTask-btn");
const tasksContainer = document.getElementById("tasksContainer");
const priorityButtons = document.querySelectorAll(".priority-btn");

function renderTodoList(tasks, isUpdate = false) {
  if (isUpdate) {
    additionalContent.classList.remove("hidden");
    taskForm.classList.add("hidden");

    tasksContainer.innerHTML = "";
  }
  console.log(tasks);
  if (!tasks || tasks.length === 0) return;

  tasks.forEach((task) => addTaskToDOM(task));
}

(() => {
  renderTodoList(tasks);
})();

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
      };
      tasks.push(task);
      addTaskToDOM(task);
      saveTasksToLocalStorage(tasks);
    }
  } else {
    editTask(editedTaskId);
  }

  reset();
});

const reset = () => {
  titleInput.value = "";
  descInput.value = "";
  mode = "add";
  editedTaskId = 0;
};

//فرم اضافه کردن تسک
function addTaskToDOM(task) {
  console.log(task);

  const taskElement = document.createElement("div");
  taskElement.className =
    "border rounded-xl bg-white px-5 py-4 mt-5 dark:bg-[#002247] relative";

  taskElement.innerHTML = `
          <div class="flex justify-between ">
              <div class="flex gap-4 items-center">
                  <input type="checkbox" class="h-6 w-6">
                  <h2 class="font-bold text-[#242424] text-sm md:text-base dark:text-white">${
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

  tasksContainer.appendChild(taskElement);
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
const edit = (id) => {
  additionalContent.classList.add("hidden");
  taskForm.classList.remove("hidden");

  const task = tasks.find((x) => x.id === id);
  mode = "edit";
  editedTaskId = id;

  titleInput.value = task.title;
  descInput.value = task.desc;
};

const editTask = (id) => {
  const result = tasks.map((task) => {
    console.log(id, task.id);
    if (task.id === id) {
      return { ...task, title: titleInput.value, desc: descInput.value };
    } else {
      return task;
    }
  });

  renderTodoList(result, true);
  saveTasksToLocalStorage(result);
};

const showOptions = (id) => {
  document.getElementById(`options-${id}`).classList.toggle("hidden");
};

//delete option
const deleteTask = (id) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasksToLocalStorage(updatedTasks);
  renderTodoList(updatedTasks, true);
};

// uptade Dom function
const updateDOM = () => {
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => addTaskToDOM(task));
};

// چک باکس
function markTaskAsCompleted(checkbox, taskElement) {
  const completedTasksContainer = document.getElementById("completedTasks");
  const taskTitle = taskElement.querySelector("h2");

  if (checkbox.checked) {
    taskTitle.innerHTML = `<del>${taskTitle.innerText}</del>`;
    completedTasksContainer.appendChild(taskElement);
  } else {
    taskTitle.innerHTML = taskTitle.innerText;
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.appendChild(taskElement);
  }
}

const taskCheckboxes = document.querySelectorAll(
  '#tasksContainer input[type="checkbox"]'
);

taskCheckboxes.forEach((checkbox) => {
  const taskId = checkbox
    .closest("div.border.rounded-xl")
    .getAttribute("data-task-id");
  const savedState = localStorage.getItem(`task-${taskId}`);
  if (savedState === "completed") {
    checkbox.checked = true;
    const taskElement = checkbox.closest("div.border.rounded-xl");
    markTaskAsCompleted(checkbox, taskElement);
  }

 savedState && renderTodoList(savedState, true);
});


taskCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const taskElement = checkbox.closest("div.border.rounded-xl");
    markTaskAsCompleted(checkbox, taskElement);

    const taskId = taskElement.getAttribute("data-task-id");
    if (checkbox.checked) {
      localStorage.setItem(`task-${taskId}`, "completed");
    } else {
      localStorage.removeItem(`task-${taskId}`);
    }
  });
});

// تم دارک و لایت برای پروژه
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
});
