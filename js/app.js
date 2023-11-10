const BTN_DARK_LIGHT_THEME = document.querySelector('.btn-switch');
const BTN_CHECK = document.querySelector('.btn-check');
const INPUT_TODO = document.querySelector('.entrada-todo');
const CONTENEDOR_TODOS = document.querySelector('.contenedor-todos');
let imgBackground = document.querySelector('.imagen-top')
let cuerpo = document.querySelector('body')
let todoParent = document.querySelector('.todos')
let todosCount = document.querySelector('.todos-count')
let contenedorMobileFiler = document.querySelector('.filter-buttons-mobile')
let contenedorMobileFilerButton = document.querySelectorAll('.filter-buttons-mobile button')
let destokFilterButton = document.querySelectorAll('.contenedor-filter button')
// buttones filter
const BTN_ALL = document.querySelectorAll('.btn-filter-all')
const BTN_ACTIVE = document.querySelectorAll('.btn-filter-active')
const BTN_COMPLETED = document.querySelectorAll('.btn-filter-completed')
const BTN_CLEAR = document.querySelector('.btn-clear-todo')



// items left
let allCheckedTodos = document.getElementsByClassName('selected-todo-checked')
let newTodos = document.getElementsByClassName('new-todos')

// darkt theme
let darkTheme = './images/bg-desktop-dark.jpg';
let darkThemeMobile = './images/bg-desktop-dark.jpg';
let lightTheme = './images/bg-desktop-light.jpg'
let lightThemeMobile = './images/bg-desktop-light.jpg';

let darkThemeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>';
let lightThemeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>';
BTN_DARK_LIGHT_THEME.addEventListener('click', () => {
    cuerpo.classList.toggle('dark-body')
    INPUT_TODO.classList.toggle('dark-input');
    CONTENEDOR_TODOS.classList.toggle('dark-input');
    contenedorMobileFiler.classList.toggle('dark-input');
    contenedorMobileFilerButton.forEach(buttons => {
        buttons.classList.toggle('dark-input')
    })
    destokFilterButton.forEach(buttons => {
        buttons.classList.toggle('dark-input')
    })
    if (cuerpo.classList.contains('dark-body')) {
        imgBackground.src = darkTheme;
        BTN_DARK_LIGHT_THEME.innerHTML = darkThemeIcon;
    } else {
        imgBackground.src = lightTheme;
        BTN_DARK_LIGHT_THEME.innerHTML = lightThemeIcon;
    }
})


// CREATE TODOS ON ENTER KEY

INPUT_TODO.addEventListener('keypress', (e) => {
    let deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
    let inpuValue = e.target.value

    if (e.key === 'Enter' && INPUT_TODO.value != '') {
        // create new element on keypress
        let divNewTodo = document.createElement('div')
        let newButtonCheck = document.createElement('button');
        let newButtonDelete = document.createElement('button');
        let todoText = document.createElement('p');
        divNewTodo.classList.add('new-todos')
        newButtonCheck.classList.add('btn-check');
        newButtonDelete.classList.add('btn-delete-todo')
        todoText.textContent = inpuValue;
        divNewTodo.appendChild(newButtonCheck)
        divNewTodo.appendChild(todoText)
        divNewTodo.appendChild(newButtonDelete)
        todoParent.appendChild(divNewTodo)
        newButtonDelete.innerHTML = deleteIcon;
        // reset input value
        INPUT_TODO.value = ''
        // delete todo
        newButtonDelete.addEventListener('click', () => {
            deleteTodo()
            todosCount.textContent = todoParent.children.length - allCheckedTodos.length + ' ' + 'Items Left'
        })
        // drag items function
        divNewTodo.draggable = true;
        // todos count when adding new todo
        todosCount.textContent = todoParent.children.length - allCheckedTodos.length + ' ' + 'Items Left'
        // evenlistener on buttons from todos
        newButtonCheck.addEventListener('click', () => {
            todosButton(newButtonCheck, todoText, todoParent);
        })
    }
    else if (INPUT_TODO.value.length >= 37) {
        alert('Too many characters')
        INPUT_TODO.value = ''
        return
    }
})

// function delete todos
function deleteTodo() {
    for (let i = 0; i < newTodos.length; i++) {
        newTodos[i].remove()
    }
}

function todosButton(boton, contentText, todos) {

    let checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
    boton.classList.toggle('btn-check-active')
    contentText.classList.toggle('todo-content-cheked');
    let getParentFromButton = boton.parentNode;
    if (boton.classList.contains('btn-check-active')) {
        boton.innerHTML = checkIcon;
        // add class for intem left
        getParentFromButton.classList.add('selected-todo-checked')
        // items left
        todosCount.textContent = todos.children.length - allCheckedTodos.length + ' ' + 'Items Left'
    } else {
        boton.innerHTML = '';
        getParentFromButton.classList.remove('selected-todo-checked');
        todosCount.textContent = todos.children.length - allCheckedTodos.length + ' ' + 'Items Left'
    }
}


// remove clompleted todos
BTN_CLEAR.addEventListener('click', () => {
    clearCompletedTodo()
})

const clearCompletedTodo = () => {

    for (let i = 0; i < allCheckedTodos.length; i++) {
        // add animation to remove
        allCheckedTodos[i].classList.add('remove-todo-completed')
        // save in a variable before so it does not iterating over
        let allItems = allCheckedTodos[i]
        allCheckedTodos[i].addEventListener('transitionend', () => {
            allItems.remove()
        })
    }
}


// filter buttons 
BTN_ACTIVE.forEach(buttons => {
    buttons.addEventListener('click', () => {
        filterItems(newTodos, allCheckedTodos, 'flex', 'none');
    });
});

BTN_COMPLETED.forEach(buttons => {
    buttons.addEventListener('click', () => {
        filterItems(newTodos, allCheckedTodos, 'none', 'flex');
    });
});

BTN_ALL.forEach(buttons => {
    buttons.addEventListener('click', () => {
        filterItems(newTodos, allCheckedTodos, 'flex', 'flex');
    });
});


const filterItems = (allTodos, todosChecked, show, hide) => {
    for (let i = 0; i < allTodos.length; i++) {
        for (let a = 0; a < todosChecked.length; a++) {
            if (todosChecked[a].classList.contains('selected-todo-checked')) {
                allTodos[i].style.display = show;
                todosChecked[a].style.display = hide
            }
        }
    }
}



// drag and drop

Sortable.create(todoParent, {
    ghostClass: 'ghost',
    animation: 150
})

// check width to change background image
const checkWidth = (image, imageHolder) => {
    imageHolder.src = image;
}
