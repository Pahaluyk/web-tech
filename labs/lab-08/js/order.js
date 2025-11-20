const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '358a63a5-52ae-4ab0-800b-90f75ce5a5c2';

let dishes = [];
let orderDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

function loadDishes() {
    console.log('Загрузка блюд для страницы заказа...');
    
    fetch(API_URL + '/dishes')
        .then(function(response) {
            console.log('Ответ получен:', response.status);
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Данные загружены:', data.length, 'блюд');
            dishes = data;
            loadOrderFromLocalStorage();
            displayOrderDishes();
            updateOrderSummary();
        })
        .catch(function(error) {
            console.error('Ошибка при загрузке блюд:', error);
            alert('Не удалось загрузить данные о блюдах. Проверьте подключение.');
        });
}

function loadOrderFromLocalStorage() {
    const savedOrder = localStorage.getItem('selectedDishes');
    
    if (!savedOrder) {
        console.log('Сохраненный заказ не найден');
        return;
    }
    
    try {
        const order = JSON.parse(savedOrder);
        console.log('Загружен заказ из localStorage:', order);
        
        Object.keys(order).forEach(function(category) {
            const dishId = order[category];
            const dish = dishes.find(function(d) {
                return d.id === dishId;
            });
            
            if (dish) {
                orderDishes[category] = dish;
                console.log('Найдено блюдо:', dish.name, 'для категории:', category);
            } else {
                console.warn('Блюдо с ID', dishId, 'не найдено для категории:', category);
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке заказа:', error);
    }
}

function displayOrderDishes() {
    const orderDishesContainer = document.getElementById('order-dishes');
    const emptyOrderMessage = document.getElementById('empty-order');
    
    if (!orderDishesContainer || !emptyOrderMessage) {
        console.error('Не найдены контейнеры для отображения заказа');
        return;
    }
    
    const hasAnyDish = Object.values(orderDishes).some(function(dish) {
        return dish !== null;
    });
    
    console.log('Есть блюда для отображения:', hasAnyDish);
    
    if (!hasAnyDish) {
        orderDishesContainer.innerHTML = '';
        emptyOrderMessage.classList.remove('hidden');
        return;
    }
    
    emptyOrderMessage.classList.add('hidden');
    orderDishesContainer.innerHTML = '';
    
    Object.keys(orderDishes).forEach(function(category) {
        const dish = orderDishes[category];
        if (dish) {
            const dishCard = createOrderDishCard(dish);
            orderDishesContainer.insertAdjacentHTML('beforeend', dishCard);
        }
    });
    
    addRemoveHandlers();
}

function createOrderDishCard(dish) {
    return `
        <div class="dish-card" data-dish-id="${dish.id}">
            <img src="${dish.image}" alt="${dish.name}">
            <p class="dish-price">${dish.price} руб.</p>
            <p class="dish-name">${dish.name}</p>
            <p class="dish-weight">${dish.count}</p>
            <button class="remove-dish-btn">Удалить</button>
        </div>
    `;
}

function addRemoveHandlers() {
    const removeButtons = document.querySelectorAll('.remove-dish-btn');
    
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const card = this.closest('.dish-card');
            const dishId = parseInt(card.dataset.dishId);
            removeDishFromOrder(dishId);
        });
    });
}

function removeDishFromOrder(dishId) {
    console.log('Удаление блюда с ID:', dishId);
    
    Object.keys(orderDishes).forEach(function(category) {
        if (orderDishes[category] && orderDishes[category].id === dishId) {
            orderDishes[category] = null;
        }
    });
    
    saveOrderToLocalStorage();
    displayOrderDishes();
    updateOrderSummary();
}

function saveOrderToLocalStorage() {
    const order = {};
    
    Object.keys(orderDishes).forEach(function(category) {
        if (orderDishes[category]) {
            order[category] = orderDishes[category].id;
        }
    });
    
    localStorage.setItem('selectedDishes', JSON.stringify(order));
    console.log('Заказ сохранен в localStorage:', order);
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    
    if (!orderSummary) {
        console.error('Не найден контейнер для сводки заказа');
        return;
    }
    
    const hasSelection = Object.values(orderDishes).some(function(dish) {
        return dish !== null;
    });

    if (!hasSelection) {
        orderSummary.innerHTML = 
            '<p class="empty-order">Ничего не выбрано</p>';
        return;
    }

    let summaryHTML = '';
    let totalPrice = 0;

    if (orderDishes.soup) {
        summaryHTML += `
            <div class="order-category">
                <h3>Суп</h3>
                <div class="order-item">
                    <span>${orderDishes.soup.name}</span>
                    <span>${orderDishes.soup.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += orderDishes.soup.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Суп</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (orderDishes['main-course']) {
        summaryHTML += `
            <div class="order-category">
                <h3>Главное блюдо</h3>
                <div class="order-item">
                    <span>${orderDishes['main-course'].name}</span>
                    <span>${orderDishes['main-course'].price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += orderDishes['main-course'].price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Главное блюдо</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (orderDishes.salad) {
        summaryHTML += `
            <div class="order-category">
                <h3>Салат</h3>
                <div class="order-item">
                    <span>${orderDishes.salad.name}</span>
                    <span>${orderDishes.salad.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += orderDishes.salad.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Салат</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (orderDishes.drink) {
        summaryHTML += `
            <div class="order-category">
                <h3>Напиток</h3>
                <div class="order-item">
                    <span>${orderDishes.drink.name}</span>
                    <span>${orderDishes.drink.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += orderDishes.drink.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Напиток</h3>
                <p class="not-selected">Напиток не выбран</p>
            </div>
        `;
    }

    if (orderDishes.dessert) {
        summaryHTML += `
            <div class="order-category">
                <h3>Десерт</h3>
                <div class="order-item">
                    <span>${orderDishes.dessert.name}</span>
                    <span>${orderDishes.dessert.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += orderDishes.dessert.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Десерт</h3>
                <p class="not-selected">Десерт не выбран</p>
            </div>
        `;
    }

    summaryHTML += `
        <div class="order-total">
            <h3>Стоимость заказа</h3>
            <p class="total-price">${totalPrice} руб.</p>
        </div>
    `;

    orderSummary.innerHTML = summaryHTML;
}

function isValidCombo() {
    const hasSoup = orderDishes.soup !== null;
    const hasMainCourse = orderDishes['main-course'] !== null;
    const hasSalad = orderDishes.salad !== null;
    const hasDrink = orderDishes.drink !== null;

    if (hasSoup && hasMainCourse && hasSalad && hasDrink) {
        return true;
    }
    
    if (hasSoup && hasMainCourse && hasDrink) {
        return true;
    }
    
    if (hasSoup && hasSalad && hasDrink) {
        return true;
    }
    
    if (hasMainCourse && hasSalad && hasDrink) {
        return true;
    }
    
    if (hasMainCourse && hasDrink) {
        return true;
    }

    return false;
}

function getValidationMessage() {
    const hasSoup = orderDishes.soup !== null;
    const hasMainCourse = orderDishes['main-course'] !== null;
    const hasSalad = orderDishes.salad !== null;
    const hasDrink = orderDishes.drink !== null;

    if (!hasSoup && !hasMainCourse && !hasSalad && !hasDrink) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    if (!hasDrink) {
        return 'Выберите напиток';
    }

    if (hasSoup && !hasMainCourse && !hasSalad) {
        return 'Выберите главное блюдо/салат/стартер';
    }

    if (hasSalad && !hasSoup && !hasMainCourse) {
        return 'Выберите суп или главное блюдо';
    }

    if (!hasMainCourse && !hasSoup && (hasDrink || orderDishes.dessert)) {
        return 'Выберите главное блюдо';
    }

    return '';
}

function setupFormSubmission() {
    const form = document.getElementById('order-form');
    
    if (!form) {
        console.error('Форма заказа не найдена');
        return;
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        console.log('Отправка формы заказа');
        
        if (!isValidCombo()) {
            const message = getValidationMessage();
            alert(message);
            return;
        }
        
        const formData = new FormData(form);
        const orderData = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            subscribe: formData.get('subscribe') === '1' ? 1 : 0,
            phone: formData.get('phone'),
            delivery_address: formData.get('delivery_address'),
            delivery_type: formData.get('delivery_type'),
            delivery_time: formData.get('delivery_time') || '',
            comment: formData.get('comment') || ''
        };
        
        if (orderDishes.soup) {
            orderData.soup_id = orderDishes.soup.id;
        }
        if (orderDishes['main-course']) {
            orderData.main_course_id = orderDishes['main-course'].id;
        }
        if (orderDishes.salad) {
            orderData.salad_id = orderDishes.salad.id;
        }
        if (orderDishes.drink) {
            orderData.drink_id = orderDishes.drink.id;
        }
        if (orderDishes.dessert) {
            orderData.dessert_id = orderDishes.dessert.id;
        }
        
        console.log('Данные заказа:', orderData);
        sendOrder(orderData);
    });
}

function sendOrder(orderData) {
    const url = API_URL + '/orders?api_key=' + API_KEY;
    
    console.log('Отправка заказа на сервер:', url);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
        .then(function(response) {
            console.log('Ответ от сервера:', response.status);
            if (!response.ok) {
                return response.json().then(function(errorData) {
                    throw new Error(errorData.error || 
                        'Ошибка при оформлении заказа');
                });
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Заказ успешно создан:', data);
            alert('Заказ успешно оформлен! Номер заказа: ' + data.id);
            localStorage.removeItem('selectedDishes');
            window.location.href = '../index.html';
        })
        .catch(function(error) {
            console.error('Ошибка при отправке заказа:', error);
            alert('Не удалось оформить заказ: ' + error.message);
        });
}

function setupResetButton() {
    const resetButton = document.getElementById('reset-button');
    
    if (!resetButton) {
        console.error('Кнопка сброса не найдена');
        return;
    }
    
    resetButton.addEventListener('click', function() {
        const form = document.getElementById('order-form');
        form.reset();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен для страницы заказа');
    loadDishes();
    setupFormSubmission();
    setupResetButton();
});