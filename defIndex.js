const token = localStorage.getItem('authToken');

if (token) {
  // Если токен найден, редирект на main.html
  window.location.href = '/main.html';
}
