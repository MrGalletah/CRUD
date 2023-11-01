const URL = "https://65427c7aad8044116ed372d0.mockapi.io/users";
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const btnPut = document.getElementById('btnPut')
const resultsContainer = document.getElementById('results');
const btnPost = document.getElementById('btnPost');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const modifyId = document.getElementById('inputPutId')



inputDelete.addEventListener("input", (e) => {
  if (inputDelete.value !== "") {
    btnDelete.removeAttribute("disabled");
  } else {
    btnDelete.disabled = true;
  }
});

btnDelete.addEventListener("click", (e) => {
  deleteFetch();
});

const deleteFetch = async () => {
  try {
    const request = await fetch(
      `https://65427c7aad8044116ed372d0.mockapi.io/users/${inputDelete.value}`,
      {
        method: "DELETE",
      }
    );
    response = await request.json();
    resultsContainer.innerHTML = "";
    const listItem = document.createElement("li");
    listItem.textContent = `ID: ${response.id}, Name: ${response.name}, Lastname: ${response.lastname}`;
    resultsContainer.appendChild(listItem);
    if(response === "Not found"){
        resultsContainer.innerHTML = "";
        document.getElementById("alert-error").classList.add("show");
    }
    console.log(response)
  } catch (error) {
      console.log("asdasdasd")
  }
};

modifyId.addEventListener('input', (e) => {
    if (modifyId.value !== '') {
      btnPut.removeAttribute('disabled');
    } else {
      btnPut.disabled = true;
    }
  });
  
  btnPut.addEventListener('click', () => {
    const userId = modifyId.value;
  
    fetch(`https://65427c7aad8044116ed372d0.mockapi.io/users`)
      .then(response => response.json())
      .then(data => {
        const user = data.find(item => item.id === userId);
        if (user) {
          inputPutNombre.value = user.name;
          inputPutApellido.value = user.lastname;  
          dataModal.style.display = 'block';
        } else{
          console.error('User not found.');
          dataModal.style.display = 'none';
          document.getElementById("alert-error").classList.add("show");
          setTimeout(() => {          
            location.reload();
          }, 2000);

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
                      resultsContainer.innerHTML = '';
                      data.forEach(user => {
                          const listItem = document.createElement('li');
                          listItem.textContent = `ID: ${user.id}, Name: ${user.name}, Lastname: ${user.lastname}`;
                          resultsContainer.appendChild(listItem);
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
});

inputPostNombre.addEventListener("input", togglePostButtonState);
inputPostApellido.addEventListener("input", togglePostButtonState);

function togglePostButtonState() {
  if (inputPostNombre.value !== "" && inputPostApellido.value !== "") {
    btnPost.removeAttribute("disabled");
  } else {
    btnPost.disabled = true;
  }
}

togglePostButtonState();


async function postMethod(data = {}){
const response = await fetch('https://65427c7aad8044116ed372d0.mockapi.io/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
console.log(response.json());
return response.json()
}

btnPost.addEventListener('click', ()=> {
    const object = {
        name: inputPostNombre.value,
        lastname: inputPostApellido.value
};
 postMethod(object);
 AddNewPerson(Object);
});

function AddNewPerson(data){
const add = 
`<li>id: ${data.id} name: ${data.name} lastname: ${data.lastname}</li>`
;
const newPerson = document.createElement('span');
newPerson.innerHTML += add;
resultsContainer.appendChild(newPerson);
} 



function showData(){
    fetch('https://65427c7aad8044116ed372d0.mockapi.io/users')
    .then(response => response.json())
    .then(results => {
        results.forEach(result => {
            const newLi = document.createElement('span');
            const person = `
            <li>id: ${result.id} name: ${result.name} last name: ${result.lastname}</li>
            `;
            newLi.innerHTML += person
             resultsContainer.append(newLi); 
        });
    } )
}
showData();


document.getElementById("btnGet1").addEventListener("click", function() {
    var inputId = document.getElementById("inputGet1Id").value;
    var url = "https://65427c7aad8044116ed372d0.mockapi.io/users";
    if (inputId) {
      url += "/" + inputId;
    }
  console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (inputId) {
          console.log(data);  
          resultsContainer.innerHTML = '';
          const listItem = document.createElement('li');
          listItem.textContent = `ID: ${data.id}, Name: ${data.name}, Lastname: ${data.lastname}`;
          resultsContainer.appendChild(listItem);
        } else {
            console.log(data.users);
        resultsContainer.innerHTML = '';
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${user.id}, Name: ${user.name}, Lastname: ${user.lastname}`;
            resultsContainer.appendChild(listItem);
      })
      }
    })
    .catch(error => {
      console.error("Algo salió mal...", error);
    });
});