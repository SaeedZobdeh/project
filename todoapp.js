
//سایدبار
const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      sidebar.classList.add('show');
      sidebar.classList.remove('hide');
    });
//نمایش ساعت برای کاربر
function updateDateTime() {
  const now = new Date();
  const currentDateTime = now.toLocaleString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.querySelector('.datetime').textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);


// نمایش و هیدن کردن نگ  فرم و تصویر بک گراند 
document.getElementById('showFormButton').addEventListener('click', function() {
  let taskForm = document.getElementById('taskForm');
  let additionalContent = document.getElementById('additionalContent');
  
  if (taskForm.classList.contains('hidden')) {
      taskForm.classList.remove('hidden');
      additionalContent.classList.add('hidden');
  } else {
      taskForm.classList.add('hidden');
      additionalContent.classList.remove('hidden');
  }
});

// نمایش و هیدن کردن نگ اولویت ها 
document.getElementById('showPriorityButton').addEventListener('click', function() {
  var itemPriority = document.getElementById('item-priority');
  if (itemPriority.classList.contains('hidden')) {
      itemPriority.classList.remove('hidden');
  } else {
      itemPriority.classList.add('hidden');
  }
});


// دریافت اطلاعات از کاربر  و نمایش آن در صفحه
document.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('desc');
  const addTaskButton = document.getElementById('addTask-btn');
  const tasksContainer = document.getElementById('tasksContainer');
  const priorityButtons = document.querySelectorAll('.priority-btn');
  let selectedPriority = 'پایین';

  tasks.forEach(task => addTaskToDOM(task));

  priorityButtons.forEach(button => {
      button.addEventListener('click', () => {
          selectedPriority = button.innerText;
          document.getElementById('show-priority').innerText = selectedPriority;
      });
  });

  addTaskButton.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();

      if (title) {
          const task = {
              title,
              desc,
              priority: selectedPriority
          };
          tasks.push(task);
          addTaskToDOM(task);
          saveTasksToLocalStorage(tasks);
          titleInput.value = '';
          descInput.value = '';
          selectedPriority = 'پایین'; 
          document.getElementById('show-priority').innerText = selectedPriority;
      }
  });
//فرم اضافه کردن تسک
  function addTaskToDOM(task) {
      const taskElement = document.createElement('div');
      taskElement.className = 'border rounded-xl bg-white px-5 py-4 mt-5 dark:bg-[#002247]';

      taskElement.innerHTML = `
          <div class="flex justify-between">
              <div class="flex gap-4 items-center">
                  <input type="checkbox" class="h-6 w-6">
                  <h2 class="font-bold text-[#242424] text-sm md:text-base dark:text-white">${task.title}</h2>
                  <span id="show-priority" class="rounded bg-[#C3FFF1] text-[#11A483] px-2 py-1 mt-3 md:mt-0 w-fit">${task.priority}</span>
              </div>
              <button class="showOptionsButton"><i class="fa fa-ellipsis-v dark:text-white"></i></button>
          </div>
          <div class="options flex items-center gap-3 hidden">
              <button><i class="fa-regular fa-trash-can"></i></button>
              <button><i class="fa-regular fa-pen-to-square"></i></button>
          </div>
          <span class="font-normal text-base text-[#696969] dark:text-[#848890] mt-3">${task.desc}</span>
      `;

      tasksContainer.appendChild(taskElement);
  }

  function saveTasksToLocalStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
// چک باکس
function markTaskAsCompleted(checkbox, taskElement) {
  const completedTasksContainer = document.getElementById('completedTasks');
  const taskTitle = taskElement.querySelector('h2');
  
  if (checkbox.checked) {
      taskTitle.innerHTML = `<del>${taskTitle.innerText}</del>`;
      completedTasksContainer.appendChild(taskElement);
  } else {
      taskTitle.innerHTML = taskTitle.innerText;
      const tasksContainer = document.getElementById('tasksContainer');
      tasksContainer.appendChild(taskElement);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const taskCheckboxes = document.querySelectorAll('#tasksContainer input[type="checkbox"]');
  

  taskCheckboxes.forEach(checkbox => {
      const taskId = checkbox.closest('div.border.rounded-xl').getAttribute('data-task-id');
      const savedState = localStorage.getItem(`task-${taskId}`);
      if (savedState === 'completed') {
          checkbox.checked = true;
          const taskElement = checkbox.closest('div.border.rounded-xl');
          markTaskAsCompleted(checkbox, taskElement);
      }
  });

  taskCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
          const taskElement = checkbox.closest('div.border.rounded-xl');
          markTaskAsCompleted(checkbox, taskElement);

          const taskId = taskElement.getAttribute('data-task-id');
          if (checkbox.checked) {
              localStorage.setItem(`task-${taskId}`, 'completed');
          } else {
              localStorage.removeItem(`task-${taskId}`);
          }
      });
  });
});
// تم دارک و لایت برای پروژه 
document.addEventListener('DOMContentLoaded', () => {

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark');
  }

  const dark = document.querySelector('#dark');
  const light = document.querySelector('#light');

  dark.addEventListener('click', function () {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
  });

  light.addEventListener('click', function () {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
  });
});


