const URL = "https://65427c7aad8044116ed372d0.mockapi.io/users";
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const results = document.getElementById("results");
const userList = document.getElementById('results');
const btnPut = document.getElementById('btnPut')



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
    if(response === "Not found"){
        results.innerHTML = "";
        document.getElementById("alert-error").classList.add("show");
    }
    console.log(response)
  } catch (error) {
      console.log("asdasdasd")
  }
};
btnPut.addEventListener('click', () => {
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