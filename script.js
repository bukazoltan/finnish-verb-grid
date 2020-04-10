// Selectors
const passive = document.getElementById('passive');
const taskCells = document.querySelectorAll('.task');
const table = document.querySelector('.table')
const lastRow = table.rows[table.rows.length - 1];

// Basic tracking variables
let data;
let currentId = 0;


fetch("new_data.json")
    .then(response => response.json())
    .then(json => {
        renderData(json);
        data = json;
    });

const makeEditable = (cell) => {
    cell.setAttribute("contenteditable", "true");
}

const renderForm = (verb, settings) => {
    let forms = Object.keys(settings.forms);
    forms.forEach(form => {
        // exits from the loop if the form is turned off in the settings
        let formNode = document.getElementById(form);

        for (var i = 0; i < formNode.children.length; i++) {
            if (formNode.children[i].classList.contains("affirmative")) {
                if (settings.affirmatives) {
                    formNode.children[i].textContent = verb[form]["affirmative"];
                } else {
                    makeEditable(formNode.children[i]);
                }
            }
            if (formNode.children[i].classList.contains("negative")) {
                if (settings.negatives) {
                    formNode.children[i].textContent = verb[form]["negative"];
                } else {
                    makeEditable(formNode.children[i]);
                }
            }
        }
    });
}

const renderData = (data) => {
    // get a random item from the array
    currentId = Math.floor(Math.random() * data.length);
    let verb = data[currentId];
    infinitive.textContent = `${verb["infinitive"]} - ${verb["meaning"]}`;
    renderForm(
        verb, {
            "plurals": false,
            "singulars": false,
            "affirmatives": false,
            "negatives": false,
            forms: {
                "sing_first": true,
                "sing_second": false,
                "sing_third": true,
                "plural_first": true,
                "plural_second": true,
                "plural_third": true,
                "passive": true
            }
        });
    // negativeCells.forEach(cell => cell.setAttribute("contenteditable", "true"));
}

const checkInput = (e) => {
    let input = (e.target.textContent).toLowerCase();
    let formName = e.target.parentElement.id;
    let correct = data[currentId][formName][e.target.classList[0]];
    e.target.classList.add("bg-warning");
    if (input === correct) {
        e.target.classList.remove("bg-warning");
        e.target.classList.add("bg-success");
        e.target.setAttribute("contenteditable", "false");
        nextActive(e);
    }
}

const jumpToNextRow = (e) => {
    let currentRow = e.target.parentElement.nextElementSibling.cells;
    console.log(currentRow);
    if (currentRow)
        for (i = 0; i < currentRow.length; i++) {
            if (currentRow[i].attributes.getNamedItem("contenteditable")) {
                return currentRow;
            }
        };
}

const nextActive = (e) => {
    let targetClass = (e.target.classList[0]);
    if (e.target.parentElement.nextElementSibling) {
        let row = jumpToNextRow(e);
        for (i = 0; i < row.length; i++) {
            if (row[i].classList[0] === targetClass) {
                row[i].focus();
            };
        }
    }
    console.log(e);
}

taskCells.forEach(cell => cell.addEventListener('input', checkInput));
taskCells.forEach(cell => cell.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        nextActive(e);
    }
}));