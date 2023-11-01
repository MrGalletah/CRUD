const results = document.getElementById('results');
const btnPost = document.getElementById('btnPost');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');

async function postMethod(data = {}){
const response = await fetch('https://65427c7aad8044116ed372d0.mockapi.io/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
return response.json()
}

btnPost.addEventListener('click', ()=> {
    const object = {
        name: inputPostNombre.value,
        lastname: inputPostApellido.value
}
 postMethod(object);
 //AddNewPerson(object);
})
/*
function AddNewPerson(data){
const add = data;
const newPerson = document.createElement('li');
newPerson.innerHTML = add;
results.appendChild(newPerson);
} 
*/

