document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let task = {
    title,
    description
  };

  if(localStorage.getItem('tasks') === null) {//se crea la tarea si esta vacio
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));//almacenarlo en Local-storage y luego convertirlo de un objeto a un string
  } else {//se agrega la tarea si contiene tareas
    let tasks = JSON.parse(localStorage.getItem('tasks'));//parse sirve para convertir el dato en un objeto y getItem para obtener el dato
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();//sirve para no perder la informacion al altualizar la pagina
}

function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
//innerHTML sirve para agregar al html 
    tasksView.innerHTML += `<div class="card mb-3"> 
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
