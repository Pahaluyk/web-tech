// Скрипт для проверки корректности заказа и показа уведомлений

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('order-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем отправку формы
            
            // Проверяем состав заказа
            const validationResult = validateOrder();
            
            if (!validationResult.isValid) {
                // Показываем уведомление с ошибкой
                showNotification(validationResult.message);
            } else {
                // Если всё корректно, отправляем форму
                form.submit();
            }
        });
    }
});

// Функция проверки корректности заказа
function validateOrder() {
    const hasBurger = selectedDishes.burger !== null;
    const hasSide = selectedDishes.side !== null;
    const hasSalad = selectedDishes.salad !== null;
    const hasDrink = selectedDishes.drink !== null;
    const hasDessert = selectedDishes.dessert !== null;
    
    // Проверка 1: Ничего не выбрано
    if (!hasBurger && !hasSide && !hasSalad && !hasDrink && !hasDessert) {
        return {
            isValid: false,
            message: 'Ничего не выбрано. Выберите блюда для заказа'
        };
    }
    
    // Проверка 2: Выбран только напиток или десерт
    if ((hasDrink || hasDessert) && !hasBurger && !hasSide && !hasSalad) {
        return {
            isValid: false,
            message: 'Выберите бургер'
        };
    }
    
    // Проверка 3: Выбран только салат (без бургера и гарнира)
    if (hasSalad && !hasBurger && !hasSide) {
        return {
            isValid: false,
            message: 'Выберите бургер или картофель/закуску'
        };
    }
    
    // Проверка 4: Выбран только гарнир (без бургера и салата)
    if (hasSide && !hasBurger && !hasSalad) {
        return {
            isValid: false,
            message: 'Выберите бургер или салат/стартер'
        };
    }
    
    // Проверка 5: Есть еда, но нет напитка
    if ((hasBurger || hasSide || hasSalad) && !hasDrink) {
        return {
            isValid: false,
            message: 'Выберите напиток'
        };
    }
    
    // Допустимые комбинации для меню бургеров:
    // 1. Бургер + Гарнир + Салат + Напиток (+ Десерт)
    // 2. Бургер + Гарнир + Напиток (+ Десерт)
    // 3. Бургер + Салат + Напиток (+ Десерт)
    // 4. Гарнир + Салат + Напиток (+ Десерт)
    // 5. Бургер + Напиток (+ Десерт)
    
    const validCombo1 = hasBurger && hasSide && hasSalad && hasDrink;
    const validCombo2 = hasBurger && hasSide && !hasSalad && hasDrink;
    const validCombo3 = hasBurger && !hasSide && hasSalad && hasDrink;
    const validCombo4 = !hasBurger && hasSide && hasSalad && hasDrink;
    const validCombo5 = hasBurger && !hasSide && !hasSalad && hasDrink;
    
    if (validCombo1 || validCombo2 || validCombo3 || validCombo4 || validCombo5) {
        return {
            isValid: true,
            message: ''
        };
    }
    
    // Если не подошла ни одна комбинация
    return {
        isValid: false,
        message: 'Некорректный состав заказа. Проверьте доступные варианты ланча'
    };
}

// Функция показа уведомления
function showNotification(message) {
    // Удаляем предыдущее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    const existingOverlay = document.querySelector('.notification-overlay');
    
    if (existingNotification) {
        existingNotification.remove();
    }
    
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Создаем затемняющий фон
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Создаем заголовок
    const heading = document.createElement('h3');
    heading.textContent = '⚠️ Внимание';
    
    // Создаем текст сообщения
    const text = document.createElement('p');
    text.textContent = message;
    
    // Создаем кнопку
    const button = document.createElement('button');
    button.textContent = 'Окей';
    button.addEventListener('click', function() {
        notification.remove();
        overlay.remove();
    });
    
    // Собираем уведомление
    notification.appendChild(heading);
    notification.appendChild(text);
    notification.appendChild(button);
    
    // Добавляем на страницу
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
    
    // Закрытие по клику на затемнение
    overlay.addEventListener('click', function() {
        notification.remove();
        overlay.remove();
    });
}