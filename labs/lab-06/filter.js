// Скрипт для фильтрации блюд

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки фильтров
    const filterButtons = document.querySelectorAll('.filters button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем значение фильтра
            const filterKind = this.getAttribute('data-kind');
            
            // Находим секцию, к которой относится кнопка
            const section = this.closest('section');
            const dishesGrid = section.querySelector('.dishes-grid');
            
            // Получаем все кнопки фильтров в этой секции
            const sectionButtons = section.querySelectorAll('.filters button');
            
            // Проверяем, активна ли уже эта кнопка
            if (this.classList.contains('active')) {
                // Если активна - убираем класс active и показываем все блюда
                this.classList.remove('active');
                showAllDishesInSection(section);
            } else {
                // Убираем класс active у всех кнопок в секции
                sectionButtons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем класс active к нажатой кнопке
                this.classList.add('active');
                
                // Фильтруем блюда
                filterDishesInSection(section, filterKind);
            }
        });
    });
});

// Функция для фильтрации блюд в конкретной секции
function filterDishesInSection(section, filterKind) {
    const dishesGrid = section.querySelector('.dishes-grid');
    
    // Определяем категорию по заголовку секции
    const heading = section.querySelector('h2').textContent;
    let category = '';
    
    if (heading.includes('Бургер')) {
        category = 'burger';
    } else if (heading.includes('Картофель') || heading.includes('закуск')) {
        category = 'side';
    } else if (heading.includes('Салат') || heading.includes('стартер')) {
        category = 'salad';
    } else if (heading.includes('Напитк')) {
        category = 'drink';
    } else if (heading.includes('Десерт')) {
        category = 'dessert';
    }
    
    // Очищаем секцию
    dishesGrid.innerHTML = '';
    
    // Фильтруем и сортируем блюда
    const filteredDishes = dishes
        .filter(dish => dish.category === category && dish.kind === filterKind)
        .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    
    // Отображаем отфильтрованные блюда
    filteredDishes.forEach(dish => {
        const dishCard = `
            <div class="dish-card" data-dish="${dish.keyword}">
                <img src="${dish.image}" alt="${dish.name}">
                <p class="dish-price">${dish.price} руб.</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
                <button>Добавить</button>
            </div>
        `;
        
        dishesGrid.insertAdjacentHTML('beforeend', dishCard);
    });
}

// Функция для показа всех блюд в секции
function showAllDishesInSection(section) {
    const dishesGrid = section.querySelector('.dishes-grid');
    
    // Определяем категорию по заголовку секции
    const heading = section.querySelector('h2').textContent;
    let category = '';
    
    if (heading.includes('Бургер')) {
        category = 'burger';
    } else if (heading.includes('Картофель') || heading.includes('закуски')) {
        category = 'side';
    } else if (heading.includes('Салат') || heading.includes('стартер')) {
        category = 'salad';
    } else if (heading.includes('Напиток')) {
        category = 'drink';
    } else if (heading.includes('Десерт')) {
        category = 'dessert';
    }
    
    // Очищаем секцию
    dishesGrid.innerHTML = '';
    
    // Фильтруем и сортируем все блюда категории
    const categoryDishes = dishes
        .filter(dish => dish.category === category)
        .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    
    // Отображаем все блюда
    categoryDishes.forEach(dish => {
        const dishCard = `
            <div class="dish-card" data-dish="${dish.keyword}">
                <img src="${dish.image}" alt="${dish.name}">
                <p class="dish-price">${dish.price} руб.</p>
                <p class="dish-name">${dish.name}</p>
                <p class="dish-weight">${dish.count}</p>
                <button>Добавить</button>
            </div>
        `;
        
        dishesGrid.insertAdjacentHTML('beforeend', dishCard);
    });
}