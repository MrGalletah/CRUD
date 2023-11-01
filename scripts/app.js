document.getElementById('btnPut').addEventListener('click', () => {
  const userId = inputPutId.value;
  
  fetch(`https://65427c7aad8044116ed372d0.mockapi.io/users`)
      .then(response => response.json())
      .then(data => {
          const user = data.find(item => item.id === userId);
          if (user) {
              inputPutNombre.value = user.name;
              inputPutApellido.value = user.lastname;
              
              dataModal.style.display = 'block';
          } else {
              console.error('User not found.');
          }
      })
      .catch(error => {
          console.error('Error fetching user data:', error);
      });
});

btnSendChanges.addEventListener('click', () => {
  const userId = inputPutId.value;
  const updatedData = {
      name: inputPutNombre.value,
      lastname: inputPutApellido.value
  };

  fetch(`https://65427c7aad8044116ed372d0.mockapi.io/users/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
  })
      .then(response => {
          if (response.ok) {
              console.log('Data successfully updated!!!');
              dataModal.style.display = 'none';
              
              fetch(`https://65427c7aad8044116ed372d0.mockapi.io/users`)
                  .then(response => response.json())
                  .then(data => {
                      const userList = document.getElementById('results');
                      userList.innerHTML = '';
                      data.forEach(user => {
                          const listItem = document.createElement('li');
                          listItem.textContent = `ID: ${user.id}, Name: ${user.name}, Lastname: ${user.lastname}`;
                          userList.appendChild(listItem);
                      });
                  })
                  .catch(error => {
                      console.error('Error fetching user data:', error);
                  });
          } else {
              console.error('Error updating data');
          }
      })
      .catch(error => {
          console.error('Error updating data:', error);
      });
});const results = document.getElementById('results');
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

