function logout() {
  localStorage.removeItem('authToken'); // Удаляем токен
  localStorage.removeItem('userId'); // Если храните id
  localStorage.removeItem('userRole'); // Если храните роль
  window.location.href = '/index.html'; // Перенаправление на страницу входа
}

const token = localStorage.getItem('authToken');

if (!token) {
  // Если токен не найден — редирект на страницу логина
  window.location.href = '/index.html';
}
