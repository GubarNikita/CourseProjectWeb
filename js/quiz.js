const role = localStorage.getItem('userRole');
const addButton = document.querySelector('.content__item-add');
if (role == 'admin') {
  addButton.style.display = 'flex';
}

fetch('/php/quizList.php', {
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
    const testListContainer = document.querySelector('.content-items');
    data.forEach((test) => {
      const testItem = document.createElement('div');
      testItem.id = `${test.id}`;
      testItem.classList.add('content__item');
      testItem.innerHTML = `
          
            <h3 class="item__title">${test.title}</h3>
            <p class="item__desc">
                ${test.description}
            </p>
            <button onclick="openQuiz(this)">Пройти тест</button>
            
            
          
        `;
      testListContainer.appendChild(testItem);
    });
  })
  .catch((error) => {
    console.error('Ошибка при получении списка тестов:', error);
  });

function openQuiz(button) {
  const testId = button.parentElement.id;

  window.location.href = `/pages/quizPage/quizPage.html?id=${testId}`;
}
