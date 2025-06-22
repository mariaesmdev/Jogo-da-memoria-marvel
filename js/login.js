const input = document.getElementById('login-input');
const button = document.querySelector ('.login-button');
const form =  document.querySelector ('.login-form');

function validateInput ({ target }){
   if (target.value.length >= 4){
    button.removeAttribute('disabled');
    return;
   } else {
     button.setAttribute('disabled', '');
   }
}

function handleSubmit(event){
    event.preventDefault();
    localStorage.setItem('player', input.value); //salvar as info
    window.location = 'pages/memorygame.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);