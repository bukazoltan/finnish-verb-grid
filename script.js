const infinitive = document.getElementById('infinitive')
const sing_first = document.getElementById('sing_first');
const sing_second = document.getElementById('sing_second');
const sing_third = document.getElementById('sing_third');
const plural_first = document.getElementById('plural_first');
const plural_second = document.getElementById('plural_second');
const plural_third = document.getElementById('plural_third');
const passive = document.getElementById('passive');
const negativeCells = document.querySelectorAll('.negative');
let data;
let currentId = 0;

fetch("new_data.json")
    .then(response => response.json())
    .then(json => {
        renderData(json);
        data = json;
    });

const renderForm = (verb, form, includeNeg) => {
    for (var i = 0; i < form.children.length; i++) {
        if (form.children[i].classList.contains("affirmative")) {
            form.children[i].textContent = verb["affirmative"][form.id];
        } else if (includeNeg && form.children[i].classList.contains("negative")) {
            form.children[i].textContent = verb["negative"][form.id];
        }
    }
}

const renderData = (data) => {
    // get a random item from the array
    currentId = Math.floor(Math.random() * data.length);
    let verb = data[currentId];
    infinitive.textContent = verb["infinitive"];
    let verbForms = [
        sing_first,
        sing_second,
        sing_third,
        plural_first,
        plural_second,
        plural_third,
        passive
    ]
    verbForms.forEach(form => renderForm(verb, form, false));
    negativeCells.forEach(cell => cell.setAttribute("contenteditable", "true"));
}

const checkInput = (e) => {
    let input = (e.target.textContent).toLowerCase();
    let formName = e.target.parentElement.id;
    let correct = data[currentId]["negative"][formName];
    e.target.classList.add("incorrect");
    if (input === correct) {
        e.target.classList.add("correct");
        e.target.setAttribute("contenteditable", "false");
        nextActive(e);
    }
}

const nextActive = (e) => {
    let targetClass = (e.target.classList[0]);
    if (e.target.parentElement.nextElementSibling) {
        let row = e.target.parentElement.nextElementSibling.cells;
        for (i = 0; i < row.length; i++) {
            if (row[i].classList[0] === targetClass) {
                row[i].focus();
            }
        }
    }
}

negativeCells.forEach(cell => cell.addEventListener('input', checkInput));
negativeCells.forEach(cell => cell.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        nextActive(e);
    }
}));