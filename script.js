const infinitive = document.getElementById('infinitive')
const sing_first = document.getElementById('sing_first');
const sing_second = document.getElementById('sing_second');
const sing_third = document.getElementById('sing_third');
const plural_first = document.getElementById('plural_first');
const plural_second = document.getElementById('plural_second');
const plural_third = document.getElementById('plural_third');
const passive = document.getElementById('passive');

fetch("new_data.json")
    .then(response => response.json())
    .then(json => renderData(json));

renderForm = (verb, form) => {
    for (var i = 0; i < form.children.length; i++) {
        if (form.children[i].classList.contains("affirmative")) {
            form.children[i].textContent = verb["affirmative"][form.id];
        } else if (form.children[i].classList.contains("negative")) {
            form.children[i].textContent = verb["negative"][form.id];
        }
    }
}

renderData = (data) => {
    // get a random item from the array
    let verb = data[Math.floor(Math.random() * data.length)];
    infinitive.textContent = verb["infinitive"];
    renderForm(verb, sing_first);
    renderForm(verb, sing_second);
    renderForm(verb, sing_third);
    renderForm(verb, plural_first);
    renderForm(verb, plural_second);
    renderForm(verb, plural_third);
    renderForm(verb, passive);
}