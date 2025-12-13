
// Объект для хранения выбранных блюд
const selectedDishes = {
    burger: null,
    side: null,
    salad: null,
    drink: null,
    dessert: null
};

// Функция для добавления блюда в заказ
function addDishToOrder(dishKeyword) {
    // Находим блюдо в массиве
    const dish = dishes.find(d => d.keyword === dishKeyword);
    
    if (!dish) return;
    
    // Добавляем блюдо в соответствующую категорию
    selectedDishes[dish.category] = dish;
    
    // Обновляем отображение заказа
    updateOrderDisplay();
    
    // Добавляем скрытые поля в форму
    updateOrderForm();
}

// Функция для обновления отображения раздела "Ваш заказ"
function updateOrderDisplay() {
    const orderDetails = document.querySelector('.order-details');
    
    if (!orderDetails) return;
    
    // Проверяем, выбрано ли хоть что-то
    const hasAnyDish = selectedDishes.burger || selectedDishes.side || selectedDishes.salad || selectedDishes.drink || selectedDishes.dessert;
    
    if (!hasAnyDish) {
        // Если ничего не выбрано
        orderDetails.innerHTML = `
            <h3>Ваш заказ</h3>
            <p style="color: #888; text-align: center; padding: 20px;">Ничего не выбрано</p>
        `;
    } else {
        // Создаем HTML для отображения заказа
        let orderHTML = '<h3>Ваш заказ</h3>';
        
        // Бургер
        if (selectedDishes.burger) {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Бургер:</strong></p>
                    <p>${selectedDishes.burger.name} - ${selectedDishes.burger.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Бургер:</strong></p>
                    <p style="color: #888;">Блюдо не выбрано</p>
                </div>
            `;
        }
        
        // Гарнир/закуска
        if (selectedDishes.side) {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Картофель/Закуска:</strong></p>
                    <p>${selectedDishes.side.name} - ${selectedDishes.side.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Картофель/Закуска:</strong></p>
                    <p style="color: #888;">Блюдо не выбрано</p>
                </div>
            `;
        }
        
        // Салат
        if (selectedDishes.salad) {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Салат:</strong></p>
                    <p>${selectedDishes.salad.name} - ${selectedDishes.salad.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Салат:</strong></p>
                    <p style="color: #888;">Блюдо не выбрано</p>
                </div>
            `;
        }
        
        // Напиток
        if (selectedDishes.drink) {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Напиток:</strong></p>
                    <p>${selectedDishes.drink.name} - ${selectedDishes.drink.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Напиток:</strong></p>
                    <p style="color: #888;">Напиток не выбран</p>
                </div>
            `;
        }
        
        // Десерт
        if (selectedDishes.dessert) {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Десерт:</strong></p>
                    <p>${selectedDishes.dessert.name} - ${selectedDishes.dessert.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Десерт:</strong></p>
                    <p style="color: #888;">Десерт не выбран</p>
                </div>
            `;
        }
        
        // Добавляем блок стоимости
        orderHTML += `
            <div class="order-total">
                <p><strong>Стоимость заказа:</strong></p>
                <p class="total-price">${calculateTotal()} руб.</p>
            </div>
        `;
        
        orderDetails.innerHTML = orderHTML;
    }
}

// Функция для добавления скрытых полей в форму
function updateOrderForm() {
    const form = document.getElementById('order-form');
    if (!form) return;
    
    // Удаляем старые скрытые поля заказа
    const oldFields = form.querySelectorAll('[data-order-field]');
    oldFields.forEach(field => field.remove());
    
    // Создаем скрытые поля для выбранных блюд
    if (selectedDishes.burger) {
        addHiddenInput(form, 'burger', `${selectedDishes.burger.name} - ${selectedDishes.burger.price} руб.`);
    }
    if (selectedDishes.side) {
        addHiddenInput(form, 'side', `${selectedDishes.side.name} - ${selectedDishes.side.price} руб.`);
    }
    if (selectedDishes.salad) {
        addHiddenInput(form, 'salad', `${selectedDishes.salad.name} - ${selectedDishes.salad.price} руб.`);
    }
    if (selectedDishes.drink) {
        addHiddenInput(form, 'drink', `${selectedDishes.drink.name} - ${selectedDishes.drink.price} руб.`);
    }
    if (selectedDishes.dessert) {
        addHiddenInput(form, 'dessert', `${selectedDishes.dessert.name} - ${selectedDishes.dessert.price} руб.`);
    }
    
    // Добавляем общую стоимость
    addHiddenInput(form, 'total', `${calculateTotal()} руб.`);
}

// Вспомогательная функция для добавления скрытого поля
function addHiddenInput(form, name, value) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    input.setAttribute('data-order-field', 'true');
    form.appendChild(input);
}

// Функция для подсчета итоговой стоимости
function calculateTotal() {
    let total = 0;
    
    if (selectedDishes.burger) total += selectedDishes.burger.price;
    if (selectedDishes.side) total += selectedDishes.side.price;
    if (selectedDishes.salad) total += selectedDishes.salad.price;
    if (selectedDishes.drink) total += selectedDishes.drink.price;
    if (selectedDishes.dessert) total += selectedDishes.dessert.price;
    
    return total;
}

// Обработчик клика на карточку блюда
document.addEventListener('click', function(event) {
    // Проверяем, был ли клик на кнопку "Добавить" или на саму карточку
    const dishCard = event.target.closest('.dish-card');
    
    if (dishCard) {
        const dishKeyword = dishCard.dataset.dish;
        addDishToOrder(dishKeyword);
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateOrderDisplay();
    updateOrderForm();
});
