const itemTemplate = document.querySelector("#list-item-template");
const list = document.querySelector(".list-items > ul");
const items = [];
function storeItem(){
    localStorage.setItem('todo-list', JSON.stringify(items));

}

function loadItems(){
    let storedItems = localStorage.getItem('todo-list');
    if (!storedItems){
        return[
            { title: 'Setup code', checked:false},
            { title: 'Fetch Meds', checked:false},
            { title: 'Get Groceries', checked:false},
            { title: 'Cook Food', checked:false},
            { title: 'Wash Dishes', checked:false},
            { title: 'Laundry', checked:false}
        ];
    }
    try{
        storedItems = JSON.parse(storedItems);

    }
    catch(e){
        storedItems=[];
    }
    return storedItems;
}

function displayItem(item, atTop = false){
    if (atTop){
        items.unshift(item);
    }
    else{
        items.push(item);
    }
    
    items.push(item);
    const itemNode = itemTemplate.content.firstElementChild.cloneNode(true);
    const itemTitle= itemNode.querySelector('.list-item__title > *');
    
    itemTitle.innerText = item.title;
    
    if(item.checked){
        itemNode.classList.add('checked');
    }
    itemNode.addEventListener('click', (e) => {
        item.checked = !item.checked;
        storeItem();
        if(item.checked){
            itemNode.classList.add('checked');
        }
        else{
            itemNode.classList.remove('checked');
        }
        
    });

    if (atTop){
        list.prepend(itemNode);
    }
    else{
        list.appendChild(itemNode);
    }
    
}

const addPanel = document.querySelector('.add-panel');

const addNavButton = document.querySelector('.navbar .add-button');

addNavButton.addEventListener('click', () => {
    addNavButton.classList.toggle('open');
    addPanel.classList.toggle('open');
});

const addTodoButton = document.querySelector('.add-panel__button');
const addTodoinput = document.querySelector('.add-panel__input');

function addItem(){
    const title = addTodoinput.value;
    if (!title){
        return;
    }
    const newItem = {
        title,
        checked: false,
    };
    displayItem(newItem, true);
    storeItems();
    addTodoinput.value = '';
}

addTodoButton.addEventListener('click',()=>{
    addItem();
})

const currentItems= loadItems();
currentItems.forEach((item)=> {
    displayItem(item);
});
