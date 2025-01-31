document.addEventListener('DOMContentLoaded', function () {
  fetch(`/php/profile.php?user_id=${localStorage.getItem('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error('Ошибка:', data.error);
        return;
      }
      renderProfile(data);
    })
    .catch((error) => console.error('Ошибка запроса:', error));
});

function formatTime(minutes) {
  const totalSeconds = minutes * 60;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
}

function quizAnnulled(timeTaken, specifiedTime) {
  if (specifiedTime < timeTaken) {
    return '<span class="error">Результат теста аннулирован</span>';
  } else {
    return '';
  }
}

function renderProfile(data) {
  const content = document.querySelector('.profile-content');

  // Генерация элементов для результатов квизов
  const quizResultsHTML = data.quiz_results
    .map(
      (quiz) => `
      <div class="quiz-results__item">
        <span>Название теста: ${quiz.title}</span>
        <span>Правильных ответов: ${quiz.correct_answers} из ${
        quiz.questions_quantity
      }</span>
        <span>Дата прохождения теста: ${formatDate(quiz.date_passed)}</span>
        <span>Итоговое время(час/мин/сек): ${formatTime(quiz.time_taken)}</span>
        ${quizAnnulled(quiz.time_taken, quiz.specified_time)}
      </div>
    `,
    )
    .join('');

  const user = data.user;

  content.innerHTML = `
      <h1 class="content__title">${user.surname} ${user.username}</h1>
      <h3 class="content__subtitle">${user.role}</h3>
  
      <div class="content-info">
        <h2 class="info__title">Данные пользователя</h2>
        <span class="info__item">Email: ${user.email}</span>
        <span class="info__item">Логин: ${user.login}</span>
        <span class="info__item">Пароль: ${user.pass}</span>
      </div>
  
      <div class="content-quiz-results">
        <h2 class="quiz-results__title">Выполненные тесты</h2>
        ${quizResultsHTML}
      </div>
    `;
}
