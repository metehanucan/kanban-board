class Column {
    constructor() {
        let colID = 1;
        this.colID = colID;
    }
    newColumn() {
        this.colID += 1;
        const header = document.createElement('h1');
        header.innerHTML = 'Column Title'
        header.contentEditable = 'true';
        const container = document.createElement('div');
        container.className = 'container';
        const column = document.createElement('div');
        column.className = 'column';
        column.id = `column-${this.colID}`;
        const btn = document.createElement('button');
        btn.className = 'new-card';
        btn.innerText = 'New Card';
        document.querySelector('.columns').appendChild(container);
        container.appendChild(column);
        column.appendChild(header);
        container.appendChild(btn);
    }
    deleteColumn() {

    }
    getID() {
        return this.colID;
    }
}

class Card {
    constructor() {
        let value = 1;
        this.value = value;
    }
    newCard(columnID) {
        this.value += 1;
        const card = document.createElement('div');
        card.id = `card-${columnID}-${this.value}`;
        card.className = 'card';
        //Create the content div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        card.appendChild(contentDiv);
        const text = document.createElement('p');
        text.className = 'text';
        text.contentEditable = "true";
        text.innerHTML = 'Click on the text to write, Drag to move';
        contentDiv.appendChild(text);
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        card.appendChild(optionsDiv);
        const deleteDiv = document.createElement('div');
        deleteDiv.className = 'delete';
        deleteDiv.innerHTML = 'Delete';
        optionsDiv.appendChild(deleteDiv);
        card.appendChild(optionsDiv);
        card.draggable = 'true';
        document.querySelector(`#${columnID}`).appendChild(card);
    }
    deleteCard(deleteID) {
        deleteID.remove();
    }
}

let column = new Column;
let card = new Card;

const newCardBtn = document.querySelector('body');

newCardBtn.addEventListener('click', function (e) {
    if (e.target.className == 'new-card')
        card.newCard(e.target.parentNode.firstElementChild.id);
})

const newColumnBtn = document.querySelector('.new-column');
newColumnBtn.addEventListener('click', function () {
    column.newColumn();
})

//delete event
document.addEventListener('click', function (event) {
    if (event.target.className == "delete") {
        card.deleteCard(event.target.parentNode.parentNode);
    }

})

//when start dragging
document.addEventListener("dragstart", function (event) {
    if (event.target.className == "card") {
        dragged = event.target;
        dragged.classList.add('dragging');
    }
});

document.addEventListener("dragend", function (event) {
    dragged.classList.remove('dragging')
}, false);

document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
    if (event.target.className == "column") {
        const afterEl = getDragAfterElement(event.target, event.clientY)
        if (event.target != dragged.parentNode) {
            event.target.appendChild(dragged);
        } else {
            event.target.insertBefore(dragged, afterEl)
        }
    }
}, false);

function getDragAfterElement(col, y) {
    const d = [...col.querySelectorAll('.card:not(.dragging')];
    return d.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

