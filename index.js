const form = document.querySelector('#to-do-form');
const input = document.querySelector('#to-do-input');
const list = document.querySelector('#to-do-list');

let toDos = JSON.parse(localStorage.getItem('toDos')) || [];

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if (input.value) {
    const toDo = {
      id: Date.now(),
      content: input.value,
      status: 'Incomplete'
    };
    toDos.push(toDo);
    showTodo();
    input.value = '';
    saveToDos();
  }
});

function showTodo() {
    list.innerHTML = '';
    let counter = 1;


    for (let i = 0; i < toDos.length; i++) {
      const toDo = toDos[i];
      const listItem = document.createElement('li');
      listItem.setAttribute('data-id', toDo.id);
      listItem.setAttribute('data-index', i);
      listItem.classList.add('to-do-item');
      if (toDo.status === 'Complete') {
        listItem.classList.add('completed');
      } else if (toDo.status === 'Running') {
        listItem.classList.add('running');
      }

      const number = document.createElement('div');
      number.textContent = counter + '.';

      const content = document.createElement('span');
      content.textContent = toDo.content;

      const statusSelect = document.createElement('select');
      statusSelect.addEventListener('change', updateTodo);
      const incompleteOption = document.createElement('option');
      incompleteOption.value = 'Incomplete';
      incompleteOption.textContent = 'Incomplete';
      const runningOption = document.createElement('option');
      runningOption.value = 'Running';
      runningOption.textContent = 'Running';
      const completeOption = document.createElement('option');
      completeOption.value = 'Complete';
      completeOption.textContent = 'Complete';
      statusSelect.appendChild(incompleteOption);
      statusSelect.appendChild(runningOption);
      statusSelect.appendChild(completeOption);
      statusSelect.value = toDo.status;

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', editToDo);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteToDo);

      listItem.appendChild(number);
      listItem.appendChild(content);
      listItem.appendChild(statusSelect);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
      counter++;
    }
  }
  

function updateTodo(event) {
  const id = parseInt(event.target.parentElement.getAttribute('data-id'));
  const index = parseInt(event.target.parentElement.getAttribute('data-index'));
  toDos[index].status = event.target.value;
  saveToDos();
  showTodo();
}

function editToDo(event) {
  const listItem = event.target.parentElement;
  const content = listItem.querySelector('span');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = content.textContent;
  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      content.textContent = input.value;
      toDos[parseInt(listItem.getAttribute('data-index'))].content = input.value;
      saveToDos();
      showTodo();
    }
  });
  content.replaceWith(input);
  input.focus();
  input.select();
}

function deleteToDo(event) {
  const id = parseInt(event.target.parentElement.getAttribute('data-id'));
  const index = parseInt(event.target.parentElement.getAttribute('data-index'));
  toDos.splice(index, 1);
  saveToDos();
  showTodo();
}

function saveToDos() {
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

showTodo();
