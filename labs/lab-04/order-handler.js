// Объект для хранения выбранных блюд
const selectedDishes = {
    burger: null,
    side: null,
    drink: null
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
}

// Функция для обновления отображения раздела "Ваш заказ"
function updateOrderDisplay() {
    const orderDetails = document.querySelector('.order-details');
    
    if (!orderDetails) return;
    
    // Проверяем, выбрано ли хоть что-то
    const hasAnyDish = selectedDishes.burger || selectedDishes.side || selectedDishes.drink;
    
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
                    <p><strong>Гарнир:</strong></p>
                    <p>${selectedDishes.side.name} - ${selectedDishes.side.price} руб.</p>
                </div>
            `;
        } else {
            orderHTML += `
                <div class="order-item">
                    <p><strong>Гарнир:</strong></p>
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

// Функция для подсчета итоговой стоимости
function calculateTotal() {
    let total = 0;
    
    if (selectedDishes.burger) total += selectedDishes.burger.price;
    if (selectedDishes.side) total += selectedDishes.side.price;
    if (selectedDishes.drink) total += selectedDishes.drink.price;
    
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
});