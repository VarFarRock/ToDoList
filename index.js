

let out = document.querySelector('.tasks__container')
let taskarr = [];
let count = 0;
function newTask(){
    let inp = document.querySelector('.hero__inp').value
    if (inp.trim() !== '') {
        const task = { id: '', text: inp, class: '', };
        taskarr.push(task);
        let template = `
        <li class="task">
            <div class="task__count">${count}</div>
            <div class="task__name">${inp}</div>
            <button class="task__btn">complite</button>
            <button class="task__edit">edit</button>
            <button class="task__delete">delete</button>
        </li>`;
        count++
        out.innerHTML += template
    }
    else{
        alert("erorr, input cannot be empty")
    }
    location.reload()
    localStorage.setItem('active', JSON.stringify(taskarr))
}
document.querySelector('.hero__add').addEventListener('click', newTask)
document.querySelector('.hero__search').addEventListener('click', findtask)
const finalarr = newarr()
function newarr(){
    let newarr = []
    if(localStorage.getItem("active") !== null){
        let items = JSON.parse(localStorage.getItem("active"))
        if(Array.isArray(items)){
            taskarr = items
        }
        for (let i = 1; i <= items.length; i++) {
            newarr[i] = items[i - 1];
        }
        return newarr
    }else{
        return
    }
}
function load() {
    if (finalarr.length !== 0 || finalarr >= 0) {
        for (let [key, value] of Object.entries(finalarr)) {
            value.id = key
            let template = `
            <li class='task'>
                <div class="task__container">
                    <div class="task__number">${key} </div>
                    <div class="task__text ${value.class}">${value.text}</div>
                </div>
                <button class="task__complite">complite</button>
                <button class="task__edit">edit</button>
                <button class="task__delete">delete</button>
            </li>`;
            out.innerHTML += template; 
            localStorage.setItem('active', JSON.stringify(taskarr))
        }
    }else {
        return
    }
}
load();
let btnComplite = document.querySelectorAll('.task__complite')
    for (let button of btnComplite) {
        console.log(button);
        if (button.classList.contains('task__complite')) {
            button.addEventListener('click', complite)
        }
    }
let buttonsdel = document.querySelectorAll('.task__delete')
    for (let button of buttonsdel) {
        if(button.classList == 'task__delete'){
            button.addEventListener('click', deleteItem);
        }
    }
let buttonsEdit = document.querySelectorAll('.task__edit')
let edit = document.querySelector('.popup__edid')
    for(let button of buttonsEdit){
        if(button.classList == 'task__edit'){
            button.addEventListener('click', editTask)
        }
    }
function complite(e) {
    let taskComplite = e.target.previousElementSibling.lastChild.previousSibling;
    taskComplite.classList.add('complete');
    let num = parseInt(e.target.previousElementSibling.firstChild.nextSibling.textContent);
    for (let task of taskarr) {
        if (parseInt(task.id) === num) {
            task.class = 'complete'
        }
    }
    localStorage.setItem('active', JSON.stringify(taskarr))
}

function deleteItem(e) {
    let del = e.target.closest(".task").firstChild.nextElementSibling.lastChild.previousElementSibling.textContent
    let test = taskarr.findIndex(item => item.text == del);
    console.log(test);
    if (test >= 0) {
        taskarr.splice(test, 1);
    }
    localStorage.setItem('active', JSON.stringify(taskarr));
    location.reload()
}

function editTask(e){
        document.querySelector('.popup').classList.remove('none')
        let curentTaskText = e.target.previousElementSibling.previousElementSibling.lastChild.previousSibling.textContent
        let area = document.querySelector('.popup__area')
        const find = taskarr.findIndex(item => item.text === curentTaskText)
        area.value = curentTaskText
            edit.addEventListener('click', () => {
                if(area.value.trim() !== ''){
                    const value = curentTaskText = area.value.toLowerCase();
                    taskarr[find].text = value
                    localStorage.setItem('active', JSON.stringify(taskarr))
                    location.reload()
                        }else{
                            alert("cannot be emty or delete")
                        }
                    
                })
}
function findtask(){
    let inp = document.querySelector('.hero__inp').value
    const res = taskarr.filter(item => item.text.includes(inp))
    localStorage.setItem('search', JSON.stringify(res))
    out.innerHTML = '';
    for (let [key, value] of Object.entries(res)) {
        value.id = key
        let template = `
        <li class='task'>
            <div class="task__container">
                <div class="task__number">${key} </div>
                <div class="task__text ${value.class}">${value.text}</div>
            </div>
            <button class="task__complite">complite</button>
            <button class="task__edit">edit</button>
            <button class="task__delete">delete</button>
        </li>`;
        out.innerHTML += template; 
    }
}
