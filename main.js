//Defin UI Vars
const form = document.getElementById("form");
const taskInput = document.getElementById("taskInput");
const table = document.getElementById("table");
const clearBtn = document.getElementById("clearBtn");
const filter = document.getElementById("filter");

//Load All EventListener
loadAllEventListener();

function loadAllEventListener() {
  //Add Task
  form.addEventListener("submit", addTask);
  //Delete Task
  table.addEventListener("click", deleteTask);
  //Clear Task
  clearBtn.addEventListener("click", clearTask);
  //Filter Task
  filter.addEventListener("keyup", filterTask);
  //Get Task From Ls
  window.addEventListener("DOMContentLoaded", getFromLS);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    window.alert("Add a task!");
    return;
  }

  //create tr &append
  const tr = document.createElement("tr");
  table.appendChild(tr);

  //create td & append
  const td = document.createElement("td");
  tr.appendChild(td);

  //create text & append
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(taskInput.value));
  span.className = "u-pull-left";
  td.appendChild(span);

  //create delete & append
  const span2 = document.createElement("span");
  span2.appendChild(document.createTextNode("X"));
  span2.className = "u-pull-right delete";
  td.appendChild(span2);

  //clearfix
  const div = document.createElement("div");
  div.className = "u-cf";
  td.appendChild(div);

  //Add to LS
  addToLocalStorage(taskInput.value);

  taskInput.value = "";
  event.preventDefault();
}

// Delete Task
function deleteTask(e) {
  if (e.target.classList.contains("delete")) {
    var del = confirm("Are you sure?");
    if (del == true) {
      e.target.parentNode.parentNode.remove();

      //delete from ls
      deleteFromLS(e.target);
    } else {
    }
    return del;
  }
}

// Clear Task
function clearTask() {
  table.innerHTML = "";

  //clear task from ls
  localStorage.clear();
}

// Filter Task
function filterTask() {
  const tr = document.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    const span = tr[i].getElementsByTagName("span")[0];
    txtValue = span.textContent || span.innerText;
    if (txtValue.toUpperCase().indexOf(filter.value.toUpperCase()) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

//get From LS
function getFromLS() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task) {
    //create tr &append
    const tr = document.createElement("tr");
    table.appendChild(tr);

    //create td & append
    const td = document.createElement("td");
    tr.appendChild(td);

    //create text & append
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(task));
    span.className = "u-pull-left";
    td.appendChild(span);

    //create delete & append
    const span2 = document.createElement("span");
    span2.appendChild(document.createTextNode("X"));
    span2.className = "u-pull-right delete";
    td.appendChild(span2);

    //clearfix
    const div = document.createElement("div");
    div.className = "u-cf";
    td.appendChild(div);
  });
}

// Add to LS
function addToLocalStorage(task) {
  let tasks;
  if (JSON.parse(localStorage.getItem("tasks")) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);
}

//Delete From LS
function deleteFromLS(target) {
  let tasks;
  if (JSON.parse(localStorage.getItem("tasks")) === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (item, index) {
    if (item == target.previousSibling.innerHTML) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
