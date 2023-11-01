const URL = "https://65427c7aad8044116ed372d0.mockapi.io/users";
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const results = document.getElementById("results");

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
