// Функция для получения данных о тесте
function getTest(testId) {
  fetch(`/php/quizPage.php?test_id=${testId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        console.error(data.error);
        alert(`Ошибка: ${data.error}`);
      } else {
        console.log(data);
        renderTest(data);
      }
    })
    .catch((error) => {
      console.error('Ошибка при получении данных теста:', error);
      alert('Не удалось получить данные теста. Подробности в консоли.');
    });
}

function renderTest(test) {
  const testContainer = document.querySelector('.content-test');
  const startTime = Date.now(); // Время начала теста
  const testDuration = test.time * 60 * 1000; // Время теста в миллисекундах

  // Создание заголовка и описания теста
  testContainer.innerHTML = `
    <h1 class="test__title">${test.title}</h1>
    <p class="test__description">${test.description}</p>
    <p class="test__start-time"><strong>Время начала:</strong> ${new Date(
      startTime,
    ).toLocaleTimeString()}</p>
    <p id="time-remaining" class="test__remained-time"><strong>Остаток времени:</strong> ${formatTime(
      test.time * 60,
    )}</p>
    <div class="test-questions"></div>
  `;

  // Таймер обратного отсчёта
  const timerInterval = setInterval(() => {
    const timeRemaining = Math.max(
      0,
      Math.floor((startTime + testDuration - Date.now()) / 1000),
    );

    document.getElementById(
      'time-remaining',
    ).textContent = `Остаток времени: ${formatTime(timeRemaining)}`;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);

  // Отображение вопросов и вариантов ответов
  const questionsContainer = document.querySelector('.test-questions');
  test.questions.forEach((question, questionIndex) => {
    const questionBlock = document.createElement('div');
    questionBlock.classList.add('test-questions-item');
    questionBlock.innerHTML = `
      <h3 class="question__text">${question.question_text}</h3>
      <ul class="question-answers">
        ${question.answers
          .map(
            (answer, answerIndex) =>
              `<li class="question-answers-item">
                <label>
                  ${answer.answer_text}
                </label>
                <input type="radio" name="question-${questionIndex}" value="${answer.is_correct}" />
              </li>`,
          )
          .join('')}
      </ul>
    `;
    questionsContainer.appendChild(questionBlock);
  });

  // Кнопка подтверждения
  const submitButton = document.createElement('button');
  submitButton.classList.add('test__button');
  submitButton.textContent = 'Подтвердить';
  submitButton.onclick = () => {
    clearInterval(timerInterval); // Остановить таймер
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    const selectedAnswers = document.querySelectorAll(
      `input[type="radio"]:checked`,
    );
    let quantityCorrectAnswers = 0;

    selectedAnswers.forEach((answer) => {
      if (answer.value == 'true') {
        quantityCorrectAnswers++;
      }
    });

    const userId = localStorage.getItem('userId');

    const formData = {
      userId: userId,
      title: test.title,
      correctAnswers: quantityCorrectAnswers,
      datePassed: new Date().toISOString().split('T')[0],
      timeTaken: Math.ceil(timeTaken / 60),
      questionsQuantity: test.questions.length,
      specifiedTime: test.time,
    };

    // Отправка данных на сервер
    fetch('/php/submitQuiz.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        alert(
          `Тест завершён! Количество правильных ответов: ${formData.correctAnswers} из ${formData.questionsQuantity}`,
        );
        window.location.href = '/pages/quiz/quiz.html';
      })
      .catch((error) => {
        console.error('Ошибка при отправке данных теста:', error);
        alert('Произошла ошибка при отправке данных теста.');
      });
  };
  testContainer.appendChild(submitButton);
}

// Функция для форматирования времени в "часы:минуты:секунды"
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
    .toString()
    .padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Получаем параметр из URL
  const urlParams = new URLSearchParams(window.location.search);
  const testId = urlParams.get('id'); // Извлекаем значение параметра id
  getTest(testId);
});
