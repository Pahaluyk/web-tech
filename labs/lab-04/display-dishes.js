// Функция для отображения блюд на странице
function displayDishes() {
    // Сортируем блюда по алфавиту
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    
    // Получаем все секции с блюдами
    const burgerSection = document.querySelector('section:nth-of-type(1) .dishes-grid');
    const sideSection = document.querySelector('section:nth-of-type(2) .dishes-grid');
    const drinkSection = document.querySelector('section:nth-of-type(3) .dishes-grid');
    
    // Очищаем секции
    if (burgerSection) burgerSection.innerHTML = '';
    if (sideSection) sideSection.innerHTML = '';
    if (drinkSection) drinkSection.innerHTML = '';
    
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
        } else if (dish.category === 'drink' && drinkSection) {
            drinkSection.insertAdjacentHTML('beforeend', dishCard);
        }
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', displayDishes);
