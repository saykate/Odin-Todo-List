// const title = document.querySelector('#todo-title');
// const description = document.querySelector('#todo-description');
// const date = document.querySelector('#due-date'); 
// const priority = document.querySelector('#priority');
// const project = document.querySelector('#project');
// const inputs = document.querySelectorAll('.input');
// const listItem = document.querySelector('.featured-list-items');
const form = document.querySelector('.todo-modal');
// const pTitle = document.querySelector('#project-title');
// const pDescription = document.querySelector('#project-description');
const pForm = document.querySelector('.project-modal');
// const pContainer = document.querySelector('.projects-container');
const overlay = document.querySelector('.overlay')
const projectModal = document.querySelector('.project-modal');
const projectButton = document.querySelector('.project-button');
const projectSubmit = document.querySelector('.project-submit');
const todoModal = document.querySelector('.todo-modal');
const todoButton = document.querySelector('.todo-button');
const todoSubmit = document.querySelector('.todo-submit');
const detailsModal = document.querySelector('.details-modal');
const expand = document.querySelectorAll('.expand');
const closeButton = document.querySelector('.close-button');
const deleteButton = document.querySelectorAll('.delete');

//open and close "Add Project" modal
projectButton.addEventListener('click', () => {
    projectModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});
projectSubmit.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    overlay.classList.add('hidden');
});

//open and close "Add Todo" modal
todoButton.addEventListener('click', () => {
    todoModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});
todoSubmit.addEventListener('click', () => {
    todoModal.classList.add('hidden');
    overlay.classList.add('hidden');
});

//Expand each Todo item
expand.forEach(expandButton => {
    expandButton.addEventListener('click', (event) => {
        event.preventDefault();
        detailsModal.classList.remove('hidden')
    })
})

//Close Todo item
closeButton.addEventListener('click', () => {
    detailsModal.classList.add('hidden');
})

//Check input fields for empty fields
const checkFields = () => {
    const inputs = document.querySelectorAll('.input');

    inputs.forEach(input => {
        if (input.value === '') {
            input.classList.add('error')
        } else {
            input.classList.remove('error');
        }
    })
}

function TodoItem(title, description, date, priority, project) {
    this.title = title;
    this.description = description;
    this.date = date; 
    this.priority = priority;
    this.project = project;
}

function ProjectItem(title, description) {
    this.title = title; 
    this.description = description;
}

//On the submit button of form, this creates a new todo-item
const createTodo = (event) => {
    event.preventDefault();

    const title = document.querySelector('#todo-title');
    const description = document.querySelector('#todo-description');
    const date = document.querySelector('#due-date'); 
    const priority = document.querySelector('#priority');
    const project = document.querySelector('#project');
    const listItem = document.querySelector('.featured-list-items');

    const newTodo = new TodoItem(title.value, description.value, date.value, priority.value, project.value);
    console.log(newTodo);

    listItem.insertAdjacentHTML('beforeend', 
    `<div class="todo-item">
        <p>${capitalize(title.value)}</p>
        <div class="icon-group">
            <a href="" class="expand"><img src="./icons/arrow-expand.svg" alt=""></a>
            <a href="" class="delete"><img src="./icons/trash-can-outline.svg" alt=""></a>
        </div>
    </div>
    <div class="hidden modal details-modal">
            <h3>Title: ${capitalize(title.value)}</h3>
            <p>Description: ${description.value}</p>
            <p>Due Date: ${date.value}</p>
            <p>Priority: ${priority.value}</p>
            <p>Project: ${project.value}</p>
            <button class="close-button">Close</button>
        </div>`
    );
    form.reset();
}

//On the submit button of form, this creates a new project
const createProject = (event) => {
    event.preventDefault();

    const pTitle = document.querySelector('#project-title');
    const pDescription = document.querySelector('#project-description');
    const pContainer = document.querySelector('.projects-container');

    const newProject = new ProjectItem(pTitle.value, pDescription.value);
    console.log(newProject);
    pContainer.insertAdjacentHTML('beforeend',
    `<div class="project-item">
    <p>${capitalize(pTitle.value)}</p>
    <div class="icon-group">
        <a href="" class="expand"><img src="./icons/arrow-expand.svg" alt=""></a>
        <a href="" class="delete"><img src="./icons/trash-can-outline.svg" alt=""></a>
    </div>
</div>`
    );
    form.reset
}

//Capitalize the first letter of each word
function capitalize(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

form.addEventListener('submit', createTodo);
pForm.addEventListener('submit', createProject);

