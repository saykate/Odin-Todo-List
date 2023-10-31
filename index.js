const title = document.querySelector('#todo-title');
const description = document.querySelector('#todo-description');
const date = document.querySelector('#due-date'); 
const priority = document.querySelector('#priority');
const project = document.querySelector('#project');
const listItem = document.querySelector('.featured-list-items');
const form = document.querySelector('.todo-modal');
const pTitle = document.querySelector('#project-title');
const pDescription = document.querySelector('#project-description');
const pForm = document.querySelector('.project-modal');
const pContainer = document.querySelector('.projects-container');

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

const createTodo = (event) => {
    event.preventDefault();
    const newTodo = new TodoItem(title.value, description.value, date.value, priority.value, project.value);
    console.log(newTodo);
    listItem.insertAdjacentHTML('beforeend', 
    `<div class="todo-item">
        <p>${title.value}</p>
        <div class="icon-group">
            <a href="" class="expand"><img src="./icons/arrow-expand.svg" alt=""></a>
            <a href="" class="delete"><img src="./icons/trash-can-outline.svg" alt=""></a>
        </div>
    </div>`
    );
    form.reset();
}

const createProject = (event) => {
    event.preventDefault();
    const newProject = new ProjectItem(pTitle.value, pDescription.value);
    console.log(newProject);
    pContainer.insertAdjacentHTML('beforeend',
    `<div class="project-item">
    <p>${pTitle.value}</p>
    <div class="icon-group">
        <a href="" class="expand"><img src="./icons/arrow-expand.svg" alt=""></a>
        <a href="" class="delete"><img src="./icons/trash-can-outline.svg" alt=""></a>
    </div>
</div>`
    );
    form.reset
}

form.addEventListener('submit', createTodo);
pForm.addEventListener('submit', createProject);

