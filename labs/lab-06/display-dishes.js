// Функция для отображения блюд на странице
function displayDishes() {
    // Сортируем блюда по алфавиту
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    
    // Получаем все секции
    const sections = document.querySelectorAll('main section');
    
    // Находим нужные секции по заголовкам
    let burgerSection = null;
    let sideSection = null;
    let saladSection = null;
    let drinkSection = null;
    let dessertSection = null;
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (!heading) return;
        
        const headingText = heading.textContent;
        
        if (headingText.includes('Бургер')) {
            burgerSection = section.querySelector('.dishes-grid');
        } else if (headingText.includes('Картофель') || headingText.includes('закуск')) {
            sideSection = section.querySelector('.dishes-grid');
        } else if (headingText.includes('Салат') || headingText.includes('стартер')) {
            saladSection = section.querySelector('.dishes-grid');
        } else if (headingText.includes('Напитк')) {
            drinkSection = section.querySelector('.dishes-grid');
        } else if (headingText.includes('Десерт')) {
            dessertSection = section.querySelector('.dishes-grid');
        }
    });
    
    // Очищаем секции
    if (burgerSection) burgerSection.innerHTML = '';
    if (sideSection) sideSection.innerHTML = '';
    if (saladSection) saladSection.innerHTML = '';
    if (drinkSection) drinkSection.innerHTML = '';
    if (dessertSection) dessertSection.innerHTML = '';
    
    // Перебираем отсортированный массив блюд
    sortedDishes.forEach(dish => {
        
        // Создаем HTML для карточки блюда
        const dishCard = `
            <div class="dish-card" data-dish="${dish.keyword}">
                <img src="${dish.image}" alt="${dish.name}">
                <p class="dish-price">${dish.price} руб.</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
                <button>Добавить</button>
            </div>
        `;
        
        // Добавляем карточку в соответствующую секцию
        if (dish.category === 'burger' && burgerSection) {
            burgerSection.insertAdjacentHTML('beforeend', dishCard);
        } else if (dish.category === 'side' && sideSection) {
            sideSection.insertAdjacentHTML('beforeend', dishCard);
        } else if (dish.category === 'salad' && saladSection) {
            saladSection.insertAdjacentHTML('beforeend', dishCard);
        } else if (dish.category === 'drink' && drinkSection) {
            drinkSection.insertAdjacentHTML('beforeend', dishCard);
        } else if (dish.category === 'dessert' && dessertSection) {
            dessertSection.insertAdjacentHTML('beforeend', dishCard);
        }
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', displayDishes);