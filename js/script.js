function openModal() {
  document.getElementById('registerModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('registerModal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
  const modal = document.getElementById('registerModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

function validateForm() {
  const form = document.forms['registerForm'];
  const login = form['login'].value.trim();
  const pass = form['pass'].value.trim();
  const repeatpass = form['repeatpass'].value.trim();
  const email = form['email'].value.trim();

  let errorMessage = '';

  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //     errorMessage += "Введите корректный email.\n";
  // }

  if (pass != repeatpass) {
    errorMessage = 'пароли должны совпадать';
  }

  if (pass.length < 3) {
    errorMessage = 'пароль должен содержать более 3 символов';
  }

  if (login.length < 3) {
    errorMessage = 'логин должен содержать более 3 символов';
  }

  if (!login.length || !pass.length || !repeatpass.length || !email.length) {
    errorMessage = 'заполните все поля';
  }

  if (errorMessage != '') {
    alert(errorMessage);
    return false;
  } else {
    return true;
  }
}

// Функция для кнопки регистрации
function registerButton() {
  if (validateForm()) {
    const form = document.forms['registerForm'];
    const formData = new FormData(form);

    fetch('php/register.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        closeModal();
        window.location.href = '/pages/main/main.html';
      })
      .catch((error) => {
        console.log('Ошибка: ' + error.message);
      });
  }
}

function loginButton() {
  const form = document.forms['loginForm'];
  const login = form['login'].value.trim();
  const pass = form['pass'].value.trim();

  if (!login.length || !pass.length) {
    console.log('Заполните поля');
  } else {
    const formData = new FormData(form);

    fetch('php/login.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Сохраняем токен, id и роль в localStorage
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userRole', data.role);

          window.location.href = '/pages/main/main.html'; // Переход на защищенную страницу
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log('Ошибка: ' + error.message);
      });
  }
}
