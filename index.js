const body = document.querySelector('body')
const form = document.querySelector('.todo-form');
const todoButton = document.querySelector('.todo-button');
const projectButton = document.querySelector('.project-button');
const overlay = document.querySelector('.overlay')
const deleteButton = document.querySelectorAll('.delete');
const modal = document.createElement('div');

const openModal = (content) => {
    modal.classList.add('modal');
    body.appendChild(modal);
    overlay.classList.remove('hidden');
    modal.appendChild(content);
}

const closeModal = () => {
    body.removeChild(modal);
    overlay.classList.add('hidden');
    modal.innerHTML = "";
}

const mockTodos = [
    {
        title: 'this todo', 
        description: 'this description',
        date: '10/23/2023',
        priority: 'low',
        project: 'main'
    }
]

const mockProject = [
    {
        title: 'this project', 
        description: 'this description',
    }
]

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

function TodoItem(_title, _description, _date, _priority, _project) {

    const listItem = document.querySelector('.featured-list-items');
    const title = _title;
    const description = _description;
    const date = _date; 
    const priority = _priority;
    const project = _project;
    let todoDetails; 

   const init = () => {
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo-item');
    todoElement.innerHTML = `
        <p>${capitalize(title)}</p>
        <div class="icon-group">
            <button class="expand"><img src="./icons/arrow-expand.svg" alt=""></button>
            <button class="delete"><img src="./icons/trash-can-outline.svg" alt=""></button>
        </div>`
    todoDetails = document.createElement('div');
    todoDetails.classList.add('hidden');
    todoDetails.innerHTML = `
        <h3>Title: ${capitalize(title)}</h3>
        <p>Description: ${description}</p>
        <p>Due Date: ${date}</p>
        <p>Priority: ${priority}</p>
        <p>Project: ${project}</p>
        <button class="close-button">Close</button>`
    listItem.appendChild(todoElement);
    const expandTarget = todoElement.querySelector('.expand');
    createExpandListener(expandTarget, todoDetails);
}

    return { init };
}

function ProjectItem(_title, _description) {

    const pContainer = document.querySelector('.projects-container');
    const title = _title; 
    const description = _description;

    const pInit = () => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
            <p>${capitalize(title)}</p>
            <div class="icon-group">
                <button class="expand"><img src="./icons/arrow-expand.svg" alt=""></button>
                <button class="delete"><img src="./icons/trash-can-outline.svg" alt=""></button>
            </div> `
        const projectDetails = document.createElement('div');
        projectDetails.classList.add('hidden');
        projectDetails.innerHTML = `
            <h3>Title: ${capitalize(title)}</h3>
            <p>Description: ${description}</p>
            <button class="close-button">Close</button>`
        pContainer.appendChild(projectElement);
        const expandTarget = projectElement.querySelector('.expand');
        createExpandListener(expandTarget, projectDetails);
    }
    
        return {pInit};
}

//On the submit button of form, this creates a new todo-item
const createTodo = (event) => {
    event.preventDefault();

    const title = document.querySelector('#todo-title');
    const description = document.querySelector('#todo-description');
    const date = document.querySelector('#due-date'); 
    const priority = document.querySelector('#priority');
    const project = document.querySelector('#project');

    const newTodo = new TodoItem(title.value, description.value, date.value, priority.value, project.value);

    newTodo.init();
    closeModal();
}

//On the submit button of form, this creates a new project
const createProject = (event) => {
    event.preventDefault();

    const pTitle = document.querySelector('#project-title');
    const pDescription = document.querySelector('#project-description');

    const newProject = new ProjectItem(pTitle.value, pDescription.value);
    console.log(newProject);
  
    newProject.pInit(); 
    closeModal();
}

//open a modal with a form for a new Todo
const createTodoForm = () => {
    const todoForm = document.createElement('form');
    todoForm.innerHTML = `
    <label for="todo-title">Title:</label>
        <input type="text" class="input" id="todo-title" name="todo-title" maxlength="25">
        <label for="todo-description">Description:</label>
        <textarea class="input" type="text" id="todo-description" name="todo-description" cols="30" rows="4"></textarea>
        <label for="due-date">Due Date:</label>
        <input type="date" class="input" id="due-date" name="due-date">
        <label for="priority">Priority:</label>
        <select name="priority" class="input" id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <label for="project">Project:</label>
        <select name="project" class="input" id="project">
            <option value="main-list" selected>Main List</option>
            <option value="new-project">Add New Project</option>
        </select>
        <button type="submit" class="todo-submit">Add it!</button>`;

        openModal(todoForm);
        todoForm.addEventListener('submit', createTodo);
}

//open a modal with a form for a new Project 
const createProjectForm = () => {
    const projectForm = document.createElement('form');
    projectForm.innerHTML = `
    <label for="project-title">Title:</label>
    <input type="text" class="input" id="project-title" name="project-title" maxlength="25">
    <label for="project-description">Description:</label>
    <textarea class="input" type="text" id="project-description" name="project-description" cols="30" rows="4"></textarea>
    <button type="submit" class="project-submit">Add it!</button>`;
    
    openModal(projectForm);
    projectForm.addEventListener('submit', createProject);
}

//Listen for click on the expand button and render modal with the details
const createExpandListener = (target, details) => {
    target.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(details);
        details.classList.remove('hidden');
        
        const closeButton = document.querySelector('.close-button');
        closeButton.addEventListener('click', closeModal);
    });
}

//Capitalize the first letter of each word
function capitalize(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

mockTodos.forEach(todo => {
    const newTodo = new TodoItem(todo.title, todo.description, todo.date, todo.priority, todo.project);
    newTodo.init();
})
mockProject.forEach(project => {
    const newProject = new ProjectItem(project.title, project.description);
    newProject.pInit();
})

todoButton.addEventListener('click', createTodoForm);
projectButton.addEventListener('click', createProjectForm);



