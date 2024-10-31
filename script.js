//Находим кнопку поиск для дальнейшего взаимодействия
const btn = document.getElementById('searchButton')

// Вешаем обработчик события клика на кнопку поиска
btn.addEventListener('click', async () => {

    // Находим элементы страницы для использования в коде
    const entity = document.getElementById('entity').value;
    const id = document.getElementById('id').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');
  
    //очищаем поля перед новым запросом
    resultDiv.textContent = '';
    errorDiv.textContent = '';
    
    // Проверка на корректность введенного идентификатора (число от 1 до 10)
    if (!id || id < 1 || id > 10) {
      errorDiv.textContent = 'Пожалуйста, введите корректный идентификатор от 1 до 10.';
      return;
    }
    //Проверка на корректность введенной сущности
    if(entity === ''){
        errorDiv.textContent = 'Пожалуйста, выберите, про кого хотите узнать'
        return;
    }
  
    loadingDiv.style.display = 'block';
  
    try {
      const response = await fetch(`https://swapi.py4e.com/api/${entity}/${id}/`);
      if (!response.ok) {
        return Promise.reject(`Ошибка ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      if (entity === 'films') {
        resultDiv.textContent = `Название: ${data.title}`;
      } else {
        resultDiv.textContent = `Имя: ${data.name}`;
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
      errorDiv.textContent = error === 'Ошибка 404: Not Found' ? 'Данные не найдены' : 'Сервер недоступен';
    } finally {
      loadingDiv.style.display = 'none';
    }
  });
  
