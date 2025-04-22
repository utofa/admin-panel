const API_URL = 'http://192.168.0.167:8080/api';
const token = localStorage.getItem('accessToken');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// Добавление клиента
function addClient() {
    const name = document.getElementById('newClientName').value.trim();
    const imageFile = document.getElementById('newClientImage').files[0];
    const resultElement = document.getElementById('addClientResult');
  
    if (!name || !imageFile) {
      resultElement.textContent = 'Ошибка: Заполните все поля';
      return;
    }
  
    // Собираем JSON вручную
    const clientJson = {
      nameClient: name
    };
  
    const formData = new FormData();
    formData.append('client', JSON.stringify(clientJson)); // как сервер ожидает
    formData.append('file', imageFile);                    // изображение
  
    const fetchHeaders = new Headers(headers || {});
    fetchHeaders.delete('Content-Type'); // пусть браузер выставит сам
  
    fetch(`${API_URL}/admin/clients`, {
      method: 'POST',
      headers: fetchHeaders,
      body: formData,
      credentials: 'include'
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || 'Ошибка сервера');
        }
        return response.json();
      })
      .then(data => {
        resultElement.textContent = JSON.stringify(data, null, 2);
        document.getElementById('newClientName').value = '';
        document.getElementById('newClientImage').value = '';
      })
      .catch(error => {
        resultElement.textContent = 'Ошибка: ' + (error.message || 'Неизвестная ошибка');
        console.error('Ошибка добавления:', error);
      });
  }
// Удаление клиента
function deleteClient() {
  const clientId = document.getElementById('deleteClientId').value;

  fetch(`${API_URL}/admin/clients/${clientId}`, {
    method: 'DELETE',
    headers
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('deleteClientResult').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById('deleteClientResult').textContent = 'Ошибка: ' + error.message;
    });
}
//добавление производителя
function addManufacturer() {
    const name = document.getElementById('manufacturerName').value.trim();
    const resultElement = document.getElementById('manufacturerResult');
  
    if (!name) {
      resultElement.textContent = 'Ошибка: Введите название производителя';
      return;
    }
  
    const manufacturerData = {
      manufactureText: name
    };
  
    fetch(`${API_URL}/admin/manufacturers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers  // Используем те же headers, что и для клиентов
      },
      body: JSON.stringify(manufacturerData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw err; });
        }
        return response.json();
      })
      .then(data => {
        resultElement.textContent = 'Успешно добавлено: ' + JSON.stringify(data, null, 2);
        document.getElementById('manufacturerName').value = ''; // Очистка поля
      })
      .catch(error => {
        resultElement.textContent = 'Ошибка: ' + (error.message || error.toString());
      });
  }


function addProvisions() {
    const name = document.getElementById('newProvisionsName').value;
    const price = document.getElementById('newProvisionsPrice').value;
    const description = document.getElementById('newProvisionsDescription').value;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
  
    
    fetch('${API_URL}/admin/provisions/${provisions}', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('addProductResult').textContent = 'Услуга добавлена успешно!';
        console.log('Success:', data);
      })
      .catch(error => {
        document.getElementById('addProductResult').textContent = 'Ошибка при добавлении услуги.';
        console.error('Error:', error);
      });
  }
  

// Удаление товара
function deleteProduct() {
  const productId = document.getElementById('deleteProductId').value;

  fetch(`${API_URL}/admin/products/${productId}`, {
    method: 'DELETE',
    headers
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('deleteProductResult').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      document.getElementById('deleteProductResult').textContent = 'Ошибка: ' + error.message;
    });
}
