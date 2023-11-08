const body = document.querySelector('body')
const form = document.querySelector('.todo-form');
const todoButton = document.querySelector('.todo-button');
const projectButton = document.querySelector('.project-button');
const overlay = document.querySelector('.overlay')
const deleteButton = document.querySelectorAll('.delete');
const projectList = [];

//Modal functions
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

//Create the shape and contents of a todo Idem
function TodoItem(_title, _description, _date, _priority, _projectTitle, _projectId) {

    const listItem = document.querySelector('.main-list-items');
    const title = _title;
    const description = _description;
    const date = _date; 
    const priority = _priority;
    const projectTitle = _projectTitle;
    const projectId = _projectId;

    //puts the contents from the form into the structure of new elements
    const init = () => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');
        todoElement.innerHTML = `
            <div class="checked">
                <input type="checkbox" class="complete">
                <p class="display-title">${capitalize(title)}</p>
            </div>
            <div class="icon-group">
                <button class="expand"><img src="./icons/arrow-expand.svg" alt=""></button>
                <button class="delete"><img src="./icons/trash-can-outline.svg" alt=""></button>
            </div>`
        const todoDetails = document.createElement('div');
        todoDetails.classList.add('hidden');
        todoDetails.innerHTML = `
            <h3 class="ttl">Title: ${capitalize(title)}</h3>
            <p>Description: ${capitalizeFirstWord(description)}</p>
            <p>Due Date: ${date}</p>
            <p>Priority: <span class="priority-flag ${priority}">${priority}</span></p>
            <p>Project: ${projectTitle}</p>
            <button class="close-button">Close</button>`;

    listItem.appendChild(todoElement);
    const expandTarget = todoElement.querySelector('.expand');
    createExpandListener(expandTarget, todoDetails);
    const deleteTarget = todoElement.querySelector('.delete');
    createDeleteListener(deleteTarget, listItem, todoElement);
    const completeTarget = todoElement.querySelector('.complete');
    createCompleteListener(completeTarget, todoElement);

    //add a todo to a project
    projectList.forEach(project => {
        if (projectId === project.projectId) {
            project.addTodo({title});
        }
    })
}
    init();
    return{ title };
}

//On the submit button of form, this creates a new todo-item
const createTodo = (event) => {
    event.preventDefault();
 
    const title = document.querySelector('#todo-title');
    const description = document.querySelector('#todo-description');
    const date = document.querySelector('#due-date'); 
    const priority = document.querySelector('#priority');
    const project = document.querySelector('#project');
    const selectedTitle = project.options[project.selectedIndex].textContent;

    if (title.value === "") {
        document.getElementById('todo-title').classList.add('error');
        document.querySelector('.error-mess').classList.remove('hidden');
        return
        // console.log('no title value');
    }
    console.log("projectValue", project.value, "selectedTitle", selectedTitle);

    new TodoItem(title.value, description.value, date.value, priority.value, selectedTitle, parseInt(project.value));

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
        </select>
        <div class="form-buttons">
            <button type="submit">Add it!</button>
            <div class="error-mess hidden">PLEASE ADD A TITLE</div>
        </div>`;
        
        openModal(todoForm);

        //get current projects for the dropdown
        const project = document.querySelector('#project');
        projectList.forEach(({projectId, pTitle}) => {
            const newOption = document.createElement('option');
            newOption.value = projectId;
            newOption.textContent = capitalize(pTitle);
            project.appendChild(newOption);
        })

        todoForm.addEventListener('submit', createTodo);
}

//Create the shape and contents of a project Idem
function ProjectItem(_title, _todos) {

    const todos = _todos || [];
    const pContainer = document.querySelector('.projects-container');
    const pTitle = _title; 
    const projectId = Date.now();

    //Opens a model to show the todo items in the project
    const openProjectDetails = () => {
        const projectDetails = document.createElement('div');
        projectDetails.innerHTML = `
            <h3 class="ttl">Title: ${capitalize(pTitle)}</h3>
            <h4>Todos:</h4>
            <div class="project-todos">
                ${todos.map(todo => {
                   return `<div class="proj-todo">${capitalize(todo.title)}</div>`
                }).join('')}
            </div>
            <button class="close-button">Close</button>`
            openModal(projectDetails);
            const closeButton = document.querySelector('.close-button');
            closeButton.addEventListener('click', closeModal);
        }

    //puts the contents from the form into the structure of new elements
    const pInit = () => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
            <p>${capitalize(pTitle)}</p>
            <div class="icon-group">
                <button class="expand"><img src="./icons/arrow-expand.svg" alt=""></button>
                <button class="delete"><img src="./icons/trash-can-outline.svg" alt=""></button>
            </div> `
        pContainer.appendChild(projectElement);
        const deleteTarget = projectElement.querySelector('.delete');
        createDeleteListener(deleteTarget, pContainer, projectElement);
        const expandTarget = projectElement.querySelector('.expand');
        expandTarget.addEventListener('click', openProjectDetails);
    }

        const addTodo = (todo) => {
            todos.push(todo);
        };

        console.log("projectId", projectId)

        pInit();
    
        return {
            projectId,
            pTitle,
            todos,
            addTodo,
        };
} 

//On the submit button of form, this creates a new project
const createProject = (event) => {
    event.preventDefault();
    const pTitle = document.querySelector('#project-title');
  
    if (pTitle.value === "") {
        document.getElementById('project-title').classList.add('error');
        document.querySelector('.error-mess').classList.remove('hidden');
        return
    }

    const newProject = new ProjectItem(pTitle.value);

    closeModal();
    return projectList.push(newProject);
}

//open a modal with a form for a new Project 
const createProjectForm = () => {
    const projectForm = document.createElement('form');
    projectForm.innerHTML = `
    <label for="project-title">Title:</label>
    <input type="text" class="input" id="project-title" name="project-title" maxlength="25">
    <div class="form-buttons">
        <button type="submit">Add it!</button>
        <div class="error-mess hidden">PLEASE ADD A TITLE</div>
    </div>`;
    
    openModal(projectForm);
    projectForm.addEventListener('submit', createProject);
}

//Listen for expand button and render modal with the details of that todo item or project
const createExpandListener = (target, details) => {
    target.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(details);
        details.classList.remove('hidden');
        const closeButton = document.querySelector('.close-button');
        closeButton.addEventListener('click', closeModal);
       });
}

//Listen for delete button and remove the target item or project
const createDeleteListener = (target, parent, child) => {
    target.addEventListener('click', (event) => {
        event.preventDefault();
        parent.removeChild(child)
    })
}

//Listen for completed checkbox and crossout item
const createCompleteListener = (target, parent) => {
    target.addEventListener('change', (event) => {
        event.preventDefault();
        const displayTitle = parent.querySelector('.display-title');
        displayTitle.classList.toggle('strike');
    })
}

//Capitalize the first letter of each word
function capitalize(string) {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
//Capitalize the first letter of the first word
function capitalizeFirstWord(string) {
   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

todoButton.addEventListener('click', createTodoForm);
projectButton.addEventListener('click', createProjectForm);
