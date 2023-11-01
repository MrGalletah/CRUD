const URL = "https://65427c7aad8044116ed372d0.mockapi.io/users";
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const results = document.getElementById("results");
const userList = document.getElementById('results');
const btnPut = document.getElementById('btnPut')
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
    results.innerHTML = "";
    const listItem = document.createElement("li");
    listItem.textContent = `ID: ${response.id}, Name: ${response.name}, Lastname: ${response.lastname}`;
    results.appendChild(listItem);
    console.log(response)
  } catch (error) {
    console.log(error);
  }
};


modifyId.addEventListener("input", (e) => {
  if (modifyId.value !== "") {
    btnPut.removeAttribute("disabled");
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
});

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
        const userList = document.getElementById('results');
        userList.innerHTML = '';
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${data.id}, Name: ${data.name}, Lastname: ${data.lastname}`;
        userList.appendChild(listItem);
      } else {
console.log(data.users);
        const userList = document.getElementById('results');
        userList.innerHTML = '';
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${user.id}, Name: ${user.name}, Lastname: ${user.lastname}`;
            userList.appendChild(listItem);
      })
      }
    })
    .catch(error => {
      console.error("Algo salió mal...", error);
    });
});