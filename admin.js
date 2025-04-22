const apiUrl = 'http://192.168.0.167:8080/api/admin/clients';
const token = localStorage.getItem('accessToken');

if (!token) {
  alert('Вы не авторизованы!');
  window.location.href = 'index.html';
}

// Добавить клиента
function addClient() {
  const name = document.getElementById('nameClient').value;
  const imageUrl = document.getElementById('imageUrl').value;

  if (!name || !imageUrl) {
    alert('Введите имя и ссылку на изображение');
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      id: 0,
      nameClient: name,
      imageUrl: imageUrl
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка при добавлении клиента');
      return res.json();
    })
    .then(() => {
      alert('Клиент успешно добавлен');
      document.getElementById('nameClient').value = '';
      document.getElementById('imageUrl').value = '';
    })
    .catch(error => console.error('Ошибка при добавлении клиента:', error));
}

// Удалить клиента по ID
function deleteClient() {
  const id = prompt('Введите ID клиента для удаления:');
  if (!id) return;

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка при удалении клиента');
      alert('Клиент успешно удалён');
    })
    .catch(error => console.error('Ошибка при удалении клиента:', error));
}

// Обновить клиента
function editClient() {
  const id = prompt('Введите ID клиента для изменения:');
  const name = prompt('Введите новое имя клиента:');
  const imageUrl = prompt('Введите новый URL изображения:');

  if (!id || !name || !imageUrl) {
    alert('Все поля обязательны');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      id: parseInt(id),
      nameClient: name,
      imageUrl: imageUrl
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка при обновлении клиента');
      alert('Клиент успешно обновлён');
    })
    .catch(error => console.error('Ошибка при обновлении клиента:', error));
}
