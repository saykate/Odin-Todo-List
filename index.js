const body = document.querySelector('body')
const form = document.querySelector('.todo-form');
const todoButton = document.querySelector('.todo-button');
const projectButton = document.querySelector('.project-button');
const overlay = document.querySelector('.overlay')
const deleteButton = document.querySelectorAll('.delete');

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

//Temporary Items
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

//Create the shape and contents of a todo Idem
function TodoItem(_title, _description, _date, _priority, _project) {

    const listItem = document.querySelector('.main-list-items');
    const title = _title;
    const description = _description;
    const date = _date; 
    const priority = _priority;
    const project = _project;

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
        <h3>Title: ${capitalize(title)}</h3>
        <p>Description: ${capitalizeFirstWord(description)}</p>
        <p>Due Date: ${date}</p>
        <p>Priority: <span class="priority-flag">${priority}</span></p>
        <p>Project: ${project}</p>
        <button class="close-button">Close</button>`;

    listItem.appendChild(todoElement);
    const expandTarget = todoElement.querySelector('.expand');
    createExpandListener(expandTarget, todoDetails);
    const deleteTarget = todoElement.querySelector('.delete');
    createDeleteListener(deleteTarget, listItem, todoElement);
    const completeTarget = todoElement.querySelector('.complete');
    createCompleteListener(completeTarget, todoElement);
}

    return { init };
}

//Create the shape and contents of a project Idem
function ProjectItem(_title, _description) {

    const pContainer = document.querySelector('.projects-container');
    const title = _title; 
    const description = _description;

    //puts the contents from the form into the structure of new elements
    const pInit = () => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        projectElement.innerHTML = `
            <p class="title-for-dropdown">${capitalize(title)}</p>
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
        const deleteTarget = projectElement.querySelector('.delete');
        createDeleteListener(deleteTarget, pContainer, projectElement);
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
        </select>
        <button type="submit" class="todo-submit">Add it!</button>`;
        
        openModal(todoForm);

        //get current projects for the dropdown
        const project = document.querySelector('#project');
        const options = document.querySelectorAll('.title-for-dropdown');
        options.forEach(opt => {
            const newOption = document.createElement('option');
            newOption.value = opt.textContent;
            newOption.textContent = opt.textContent;
            project.appendChild(newOption);
        })

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

//Listen for expand button and render modal with the details of that todo item or project
const createExpandListener = (target, details) => {
    target.addEventListener('click', (event) => {
        event.preventDefault();
        openModal(details);
        details.classList.remove('hidden');
         //change color of priority
        const priorityElement = document.querySelector('.priority-flag');
        if(priorityElement.textContent.includes('low')) {
            priorityElement.style.color = 'rgb(128, 226, 156)';
        } else if (priorityElement.textContent.includes('medium')) {
            priorityElement.style.color = 'orange';
        } else {
            priorityElement.style.color = 'rgb(161, 21, 5)';
        }
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
        console.log('clicked')
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

//render the temporary fake items
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



