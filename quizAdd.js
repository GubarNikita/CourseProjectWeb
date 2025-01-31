let questionCount = 1; // Количество вопросов

// Добавление нового вопроса
function addQuestion() {
  questionCount++;
  const questionsContainer = document.getElementById('questionsContainer');

  // Создаем новый блок вопроса
  const newQuestionBlock = document.createElement('div');
  newQuestionBlock.classList.add('form-item', 'questionBlock');
  newQuestionBlock.dataset.questionId = questionCount; // data-атрибут для вопроса

  newQuestionBlock.innerHTML = `
        <div class="item-container">
            <label>
                Вопрос ${questionCount}
                <textarea class="item__quest" data-name="questionText"></textarea>
            </label>

            <div class="item-answers answersContainer">
                <label>Варианты ответов</label>
                <div class="item-answer" data-answer-id="1">
                    <textarea class="answer-text" data-name="answerText"></textarea>
                    <input type="radio" name="correctAnswer${questionCount}" data-name="correct" value="1" />
                </div>
                <div class="item-answer" data-answer-id="2">
                    <textarea class="answer-text" data-name="answerText"></textarea>
                    <input type="radio" name="correctAnswer${questionCount}" data-name="correct" value="2" />
                </div>
            </div>
        </div>
        <div class="item-answer-buttons">
            <button type="button" class="addAnswerButton" onclick="addAnswer(${questionCount})">Добавить вариант ответа</button>
            <button type="button" class="removeAnswerButton" onclick="removeAnswer(${questionCount})">Удалить последний вариант ответа</button>
        </div>
    `;

  questionsContainer.appendChild(newQuestionBlock);
}

// Удаление последнего вопроса
function removeQuestion() {
  if (questionCount > 1) {
    const lastQuestion = document.querySelector(
      `.questionBlock[data-question-id="${questionCount}"]`,
    );
    lastQuestion.remove();
    questionCount--;
  }
}

// Добавление нового ответа к вопросу
function addAnswer(questionId) {
  const questionBlock = document.querySelector(
    `.questionBlock[data-question-id="${questionId}"]`,
  );
  const answersContainer = questionBlock.querySelector('.answersContainer');
  const answerCount =
    answersContainer.querySelectorAll('.item-answer').length + 1;

  // Создаем новый ответ
  const newAnswerDiv = document.createElement('div');
  newAnswerDiv.classList.add('item-answer');
  newAnswerDiv.dataset.answerId = answerCount; // data-атрибут для ответа

  newAnswerDiv.innerHTML = `
        <textarea class="answer-text" data-name="answerText"></textarea>
        <input type="radio" name="correctAnswer${questionId}" data-name="correct" value="${answerCount}" />
    `;

  answersContainer.appendChild(newAnswerDiv);
}

// Удаление последнего ответа
function removeAnswer(questionId) {
  const questionBlock = document.querySelector(
    `.questionBlock[data-question-id="${questionId}"]`,
  );
  const answersContainer = questionBlock.querySelector('.answersContainer');
  const answerElements = answersContainer.querySelectorAll('.item-answer');

  if (answerElements.length > 2) {
    // Минимум 2 ответа
    answersContainer.removeChild(answerElements[answerElements.length - 1]);
  }
}

function submitForm() {
  const form = document.getElementById('quizForm');
  const quizTitle = form.querySelector('#quizTitle');
  const quizDescription = form.querySelector('#quizDescription');
  const quizTime = form.querySelector('#timeInput');

  let isValid = true; // Флаг успешной валидации

  // Проверка заголовка теста
  if (quizTitle.value.trim() === '') {
    quizTitle.style.border = '1px solid red';
    isValid = false;
  } else {
    quizTitle.style.border = '1px solid #ccc';
  }

  // Проверка описания теста
  if (quizDescription.value.trim() === '') {
    quizDescription.style.border = '1px solid red';
    isValid = false;
  } else {
    quizDescription.style.border = '1px solid #ccc';
  }

  // Проверка времени теста
  if (quizTime.value.trim() == '' || quizTime.value == 0) {
    quizTime.style.border = '1px solid red';
    isValid = false;
  } else {
    quizTime.style.border = '1px solid #ccc';
  }

  // Проверка вопросов и ответов
  const questions = [];
  document.querySelectorAll('.questionBlock').forEach((block) => {
    const questionId = block.dataset.questionId;
    const questionText = block.querySelector(
      '[data-name="questionText"]',
    ).value;

    // Проверка текста вопроса
    if (questionText.trim() === '') {
      block.querySelector('[data-name="questionText"]').style.border =
        '1px solid red';
      isValid = false;
    } else {
      block.querySelector('[data-name="questionText"]').style.border =
        '1px solid #ccc';
    }

    const answers = [];
    block.querySelectorAll('.item-answer').forEach((answerBlock) => {
      const answerText = answerBlock.querySelector(
        '[data-name="answerText"]',
      ).value;
      const isCorrect = answerBlock.querySelector(
        '[data-name="correct"]',
      ).checked;

      // Проверка текста ответа
      if (answerText.trim() === '') {
        answerBlock.querySelector('[data-name="answerText"]').style.border =
          '1px solid red';
        isValid = false;
      } else {
        answerBlock.querySelector('[data-name="answerText"]').style.border =
          '1px solid #ccc';
      }

      answers.push({ text: answerText, isCorrect });
    });

    // Добавляем вопрос только если есть корректные ответы
    if (answers.length > 0) {
      questions.push({ id: questionId, text: questionText, answers });
    }
  });

  // Прекращаем выполнение, если валидация провалена
  if (!isValid) {
    alert('Пожалуйста, заполните все обязательные поля!');
    return;
  }

  // Формирование JSON после успешной валидации
  const quizData = {
    title: quizTitle.value.trim(),
    description: quizDescription.value.trim(),
    time: quizTime.value.trim(),
    questions: questions,
  };

  // Отправка данных на сервер
  fetch('/php/quizAdd.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.text();
    })
    .then(() => {
      alert(`Тест ${quizData.title} успешно создан`);
      window.location.href = '/pages/quiz/quiz.html';
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
}
