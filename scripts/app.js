fetch("https://6542837dad8044116ed3816f.mockapi.io/users")
  .then((response) => response.json())
  .then((data) => {
    console.log("Users", data);
  })
  .catch((error) => {
    console.error("ERROR", error);
  });

const btnSearchId = document.getElementById("btnGet1");
btnSearchId.addEventListener("click", () => {
  const inputSearchId = document.getElementById("inputGet1Id").value;
  const urlId = `https://6542837dad8044116ed3816f.mockapi.io/users/${inputSearchId}`;

  fetch(urlId)
    .then((response) => response.json())
    .then((data) => {
      console.log("USER", data);
      const resultsElement = document.getElementById("results");
      resultsElement.innerHTML = `<li>ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}</li>`;
    })
    .catch((error) => {
      console.error("ERROR", error);
      const alertError = document.getElementById("alert-error");
      alertError.style.display = "block";
    });
});

const btnPost = document.getElementById("btnPost");

btnPost.addEventListener("click", function () {
  const nameInput = document.getElementById("inputPostNombre").value;
  const lastNameInput = document.getElementById("inputPostApellido").value;

  if (nameInput !== "" && lastNameInput !== "") {
    const newObject = {
      name: nameInput,
      lastname: lastNameInput,
    };

    fetch("https://6542837dad8044116ed3816f.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('usuario agregado',data);
        document.getElementById("inputPostNombre").value = "";
        document.getElementById("inputPostApellido").value = "";
      })
      .catch((error) => {
        console.error("ERROR", error);
      });
  } else {
    alert("Completa los campos");
  }
});

const deleteBtn = document.getElementById('btnDelete');
deleteBtn.addEventListener('click', function () {
  const deleteInput = document.getElementById('inputDelete').value;
  fetch(`https://6542837dad8044116ed3816f.mockapi.io/users${deleteInput}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Usuario eliminado con éxito');
      } else {
        console.error('Error al eliminar usuario. Estado de respuesta:', response.status);
      }
    })
    .catch(error => {
      console.error('Error al eliminar usuario:', error);
    });
});

