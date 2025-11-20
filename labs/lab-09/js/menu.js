let dishes = [];

const selectedDishes = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

let activeFilters = {
    soup: null,
    'main-course': null,
    salad: null,
    drink: null,
    dessert: null
};

function loadDishes() {
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    console.log('Загрузка блюд из API...');

    fetch(apiUrl)
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
            sortDishes();
            loadOrderFromLocalStorage();
            displayDishes();
            updateOrderPanel();
        })
        .catch(function(error) {
            console.error('Ошибка при загрузке блюд:', error);
            alert('Не удалось загрузить меню. Проверьте подключение к интернету.');
        });
}

function sortDishes() {
    dishes.sort(function(a, b) {
        return a.name.localeCompare(b.name, 'ru');
    });
}

function displayDishes() {
    const soupSection = document.getElementById('soup-section');
    const mainCourseSection = document.getElementById('main-course-section');
    const saladSection = document.getElementById('salad-section');
    const drinkSection = document.getElementById('drink-section');
    const dessertSection = document.getElementById('dessert-section');

    if (!soupSection || !mainCourseSection || !saladSection || 
        !drinkSection || !dessertSection) {
        console.error('Не найдены секции для отображения блюд');
        return;
    }

    soupSection.innerHTML = '';
    mainCourseSection.innerHTML = '';
    saladSection.innerHTML = '';
    drinkSection.innerHTML = '';
    dessertSection.innerHTML = '';

    console.log('Отображение блюд. Всего:', dishes.length);

    dishes.forEach(function(dish) {
        const dishCard = createDishCard(dish);
        
        if (dish.category === 'soup') {
            if (!activeFilters.soup || dish.kind === activeFilters.soup) {
                soupSection.insertAdjacentHTML('beforeend', dishCard);
            }
        } else if (dish.category === 'main-course') {
            if (!activeFilters['main-course'] || 
                dish.kind === activeFilters['main-course']) {
                mainCourseSection.insertAdjacentHTML('beforeend', dishCard);
            }
        } else if (dish.category === 'salad') {
            if (!activeFilters.salad || dish.kind === activeFilters.salad) {
                saladSection.insertAdjacentHTML('beforeend', dishCard);
            }
        } else if (dish.category === 'drink') {
            if (!activeFilters.drink || dish.kind === activeFilters.drink) {
                drinkSection.insertAdjacentHTML('beforeend', dishCard);
            }
        } else if (dish.category === 'dessert') {
            if (!activeFilters.dessert || 
                dish.kind === activeFilters.dessert) {
                dessertSection.insertAdjacentHTML('beforeend', dishCard);
            }
        }
    });

    addDishClickHandlers();
    restoreSelection();
}

function createDishCard(dish) {
    return `
        <div class="dish-card" data-dish="${dish.keyword}">
            <img src="${dish.image}" alt="${dish.name}">
            <p class="dish-price">${dish.price} руб.</p>
            <p class="dish-name">${dish.name}</p>
            <p class="dish-weight">${dish.count}</p>
            <button>Добавить</button>
        </div>
    `;
}

function addDishClickHandlers() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const keyword = this.dataset.dish;
            const dish = dishes.find(function(d) {
                return d.keyword === keyword;
            });
            
            if (dish) {
                selectDish(dish);
            }
        });
    });
}

function selectDish(dish) {
    const previousDish = selectedDishes[dish.category];
    
    if (previousDish) {
        const previousCard = document.querySelector(
            `.dish-card[data-dish="${previousDish.keyword}"]`
        );
        if (previousCard) {
            previousCard.classList.remove('selected');
        }
    }
    
    selectedDishes[dish.category] = dish;
    
    const currentCard = document.querySelector(
        `.dish-card[data-dish="${dish.keyword}"]`
    );
    if (currentCard) {
        currentCard.classList.add('selected');
    }
    
    saveOrderToLocalStorage();
    updateOrderPanel();
}

function saveOrderToLocalStorage() {
    const order = {};
    
    Object.keys(selectedDishes).forEach(function(category) {
        if (selectedDishes[category]) {
            order[category] = selectedDishes[category].id;
        }
    });
    
    localStorage.setItem('selectedDishes', JSON.stringify(order));
    console.log('Заказ сохранен в localStorage:', order);
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
                selectedDishes[category] = dish;
            }
        });
    } catch (error) {
        console.error('Ошибка при загрузке заказа:', error);
    }
}

function updateOrderPanel() {
    const orderPanel = document.getElementById('order-panel');
    const orderPanelPrice = document.getElementById('order-panel-price');
    const orderPanelLink = document.getElementById('order-panel-link');
    
    if (!orderPanel || !orderPanelPrice || !orderPanelLink) {
        console.error('Не найдены элементы панели заказа');
        return;
    }
    
    const hasSelection = selectedDishes.soup || 
                        selectedDishes['main-course'] ||
                        selectedDishes.salad ||
                        selectedDishes.drink ||
                        selectedDishes.dessert;
    
    if (!hasSelection) {
        orderPanel.classList.add('hidden');
        return;
    }
    
    orderPanel.classList.remove('hidden');
    
    let totalPrice = 0;
    
    Object.keys(selectedDishes).forEach(function(category) {
        if (selectedDishes[category]) {
            totalPrice += selectedDishes[category].price;
        }
    });
    
    orderPanelPrice.textContent = totalPrice + ' руб.';
    
    if (isValidCombo()) {
        orderPanelLink.classList.remove('disabled');
    } else {
        orderPanelLink.classList.add('disabled');
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const kind = this.dataset.kind;
            const section = this.closest('section');
            const category = section.querySelector('.dishes-grid').id
                .replace('-section', '');

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                activeFilters[category] = null;
            } else {
                const sectionButtons = section
                    .querySelectorAll('.filter-btn');
                sectionButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                activeFilters[category] = kind;
            }

            displayDishes();
        });
    });
}

function isValidCombo() {
    const hasSoup = selectedDishes.soup !== null;
    const hasMainCourse = selectedDishes['main-course'] !== null;
    const hasSalad = selectedDishes.salad !== null;
    const hasDrink = selectedDishes.drink !== null;

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

function restoreSelection() {
    Object.keys(selectedDishes).forEach(function(category) {
        const dish = selectedDishes[category];
        if (dish) {
            const card = document.querySelector(
                `.dish-card[data-dish="${dish.keyword}"]`
            );
            if (card) {
                card.classList.add('selected');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, начинаем инициализацию');
    loadDishes();
    setupFilters();
});