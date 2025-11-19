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

    soupSection.innerHTML = '';
    mainCourseSection.innerHTML = '';
    saladSection.innerHTML = '';
    drinkSection.innerHTML = '';
    dessertSection.innerHTML = '';

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
    selectedDishes[dish.category] = dish;
    updateOrderSummary();
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const hasSelection = selectedDishes.soup || 
                        selectedDishes['main-course'] ||
                        selectedDishes.salad ||
                        selectedDishes.drink ||
                        selectedDishes.dessert;

    if (!hasSelection) {
        orderSummary.innerHTML = '<p class="empty-order">Ничего не выбрано</p>';
        return;
    }

    let summaryHTML = '';
    let totalPrice = 0;

    if (selectedDishes.soup) {
        summaryHTML += `
            <div class="order-category">
                <h3>Суп</h3>
                <div class="order-item">
                    <span>${selectedDishes.soup.name}</span>
                    <span>${selectedDishes.soup.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += selectedDishes.soup.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Суп</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (selectedDishes['main-course']) {
        summaryHTML += `
            <div class="order-category">
                <h3>Главное блюдо</h3>
                <div class="order-item">
                    <span>${selectedDishes['main-course'].name}</span>
                    <span>${selectedDishes['main-course'].price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += selectedDishes['main-course'].price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Главное блюдо</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (selectedDishes.salad) {
        summaryHTML += `
            <div class="order-category">
                <h3>Салат</h3>
                <div class="order-item">
                    <span>${selectedDishes.salad.name}</span>
                    <span>${selectedDishes.salad.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += selectedDishes.salad.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Салат</h3>
                <p class="not-selected">Блюдо не выбрано</p>
            </div>
        `;
    }

    if (selectedDishes.drink) {
        summaryHTML += `
            <div class="order-category">
                <h3>Напиток</h3>
                <div class="order-item">
                    <span>${selectedDishes.drink.name}</span>
                    <span>${selectedDishes.drink.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += selectedDishes.drink.price;
    } else {
        summaryHTML += `
            <div class="order-category">
                <h3>Напиток</h3>
                <p class="not-selected">Напиток не выбран</p>
            </div>
        `;
    }

    if (selectedDishes.dessert) {
        summaryHTML += `
            <div class="order-category">
                <h3>Десерт</h3>
                <div class="order-item">
                    <span>${selectedDishes.dessert.name}</span>
                    <span>${selectedDishes.dessert.price} руб.</span>
                </div>
            </div>
        `;
        totalPrice += selectedDishes.dessert.price;
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

document.addEventListener('DOMContentLoaded', function() {
    sortDishes();
    displayDishes();
    setupFilters();
});