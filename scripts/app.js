fetch('https://65427c7aad8044116ed372d0.mockapi.io/users')
  .then(response => response.json())
  .then(data => {
    console.log('Users', data);
  })
  .catch(error => {
    console.error('ERROR', error);
  });

const btnSearchId = document.getElementById('btnGet1');
btnSearchId.addEventListener('click', () => {
    const inputSearchId = document.getElementById('inputGet1Id').value;
    const urlId = `https://65427c7aad8044116ed372d0.mockapi.io/users/${inputSearchId}`;
  
    fetch(urlId)
      .then(response => response.json())
      .then(data => {
        console.log('USER', data);
        const resultsElement = document.getElementById('results');
        resultsElement.innerHTML = `<li>ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}</li>`;
      })
      .catch(error => {
        console.error('ERROR', error);
        const alertError = document.getElementById('alert-error');
        alertError.style.display = 'block';
      });
  });