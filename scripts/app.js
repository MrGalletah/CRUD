const URL = "https://65427c7aad8044116ed372d0.mockapi.io/users";
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const btnPut = document.getElementById('btnPut')
const resultsContainer = document.getElementById('results');
const btnPost = document.getElementById('btnPost');
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const modifyId = document.getElementById('inputPutId');
const btnSendChanges = document.getElementById('btnSendChanges');
const inputGet1Id = document.getElementById('inputGet1Id');


inputDelete.addEventListener("input", (e) => {
  if (inputDelete.value !== "") {
    btnDelete.removeAttribute("disabled");
  } else {
    btnDelete.disabled = true;
  }
});
// DELETE  *********************************
btnDelete.addEventListener("click", (e) => {
  deleteFetch();
  inputDelete.value = '';
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
      results.innerHTML = "";
      html = `
        <div> <hr> > ID: ${response.id} <br>
              > Name: ${response.name} <br>
              > Lastname: ${response.lastname}<hr><br>
        </div>`;
      results.innerHTML += html;
      if(response === "Not found"){
          results.innerHTML = "";
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
  // Put (modificar)  ************************
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
                    userList.innerHTML = '';
                      data.forEach(data => {
                        let html = '';
                        html += `
                        <div> <hr> > ID: ${data.id} <br>
                              > Name: ${data.name} <br>
                              > Lastname: ${data.lastname}<hr><br>
                        </div>`;
                        userList.innerHTML = html;
                      });
                      
                  })
                  .catch(error => {
                      console.error('Error fetching user data:', error);
                  });
          } else {
              console.error('Error updating data');
          }
          showData();
      })
      .catch(error => {
          console.error('Error updating data:', error);
      });
      
      inputPutId.value = '';
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

// POST (agregar) ********************************
btnPost.addEventListener('click', ()=> {
async function postMethod(data = {}){
const response = await fetch('https://65427c7aad8044116ed372d0.mockapi.io/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});
showData();
console.log(response.json());
return response.json()
}
    const object = {
        name: inputPostNombre.value,
        lastname: inputPostApellido.value
};
 postMethod(object);
 
 inputPostNombre.value = '';
 inputPostApellido.value = '';
});



// GET ********************
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
      const userList = document.getElementById('results');
      userList.innerHTML = '';
      if (inputId) {
        console.log(data);  
        let html = '';
        html += `
        <div> <hr> > ID: ${data.id} <br>
              > Name: ${data.name} <br>
              > Lastname: ${data.lastname}<hr><br>
        </div>`;
        userList.innerHTML = html;
      } else {
        console.log(data.users);
        showData();
      }
    })
    .catch(error => {
      console.error("Algo salió mal...", error);
    });
    inputGet1Id.value = '';
});

// Función que se llamará al final de realizar cáda método para actualizar los datos
function showData(){
  fetch('https://65427c7aad8044116ed372d0.mockapi.io/users')
  .then(data => data.json())
  .then(data => {
    const userList = document.getElementById('results');
    userList.innerHTML = '';
        data.forEach(data => {
          let html = '';
          html += `
          <div> > ID: ${data.id} <br>
                > Name: ${data.name} <br>
                > Lastname: ${data.lastname}<hr>
          </div>`;
          userList.innerHTML += html;
      });
  } )
}
