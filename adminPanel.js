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


  async function addTag() {
    // 1. Получаем данные из формы
    const tagName = document.getElementById('tagName').value.trim();
    const resultElement = document.getElementById('addTagResult');
  
    // 2. Проверяем заполнение поля
    if (!tagName) {
      resultElement.textContent = 'Ошибка: Введите название тега';
      return;
    }
  
    // 3. Формируем данные для отправки
    const tagData = {
      id: 0, // Сервер сам генерирует ID
      tagName: tagName
    };
  
    try {
      // 4. Отправляем запрос (используем ваш стиль с ...headers)
      const response = await fetch(`${API_URL}/admin/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers  // Распаковываем глобальные headers
        },
        body: JSON.stringify(tagData)
      });
  
      // 5. Обрабатываем ответ
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Ошибка сервера');
      }
  
      const result = await response.json();
      resultElement.textContent = `Тег добавлен: ${JSON.stringify(result, null, 2)}`;
      
      // 6. Очищаем поле ввода
      document.getElementById('tagName').value = '';
  
    } catch (error) {
      resultElement.textContent = `Ошибка: ${error.message}`;
      console.error('Ошибка добавления тега:', error);
    }
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
