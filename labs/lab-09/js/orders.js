const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '358a63a5-52ae-4ab0-800b-90f75ce5a5c2';

let orders = [];
let dishes = [];
let currentOrderId = null;

function loadOrders() {
    console.log('Загрузка заказов...');
    
    const url = API_URL + '/orders?api_key=' + API_KEY;
    
    fetch(url)
        .then(function(response) {
            console.log('Ответ получен:', response.status);
            if (!response.ok) {
                throw new Error('Ошибка загрузки заказов: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Заказы загружены:', data.length);
            orders = data;
            sortOrders();
            return loadDishes();
        })
        .then(function() {
            displayOrders();
        })
        .catch(function(error) {
            console.error('Ошибка при загрузке заказов:', error);
            showNotification('Не удалось загрузить заказы: ' + error.message,
                'error');
        });
}

function loadDishes() {
    console.log('Загрузка блюд...');
    
    return fetch(API_URL + '/dishes')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Ошибка загрузки блюд');
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Блюда загружены:', data.length);
            dishes = data;
        });
}

function sortOrders() {
    orders.sort(function(a, b) {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
    });
}

function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    const emptyOrders = document.getElementById('empty-orders');
    
    if (!ordersList || !emptyOrders) {
        console.error('Не найдены контейнеры для отображения заказов');
        return;
    }
    
    if (orders.length === 0) {
        ordersList.innerHTML = '';
        emptyOrders.classList.remove('hidden');
        return;
    }
    
    emptyOrders.classList.add('hidden');
    ordersList.innerHTML = '';
    
    orders.forEach(function(order, index) {
        const orderCard = createOrderCard(order, index + 1);
        ordersList.insertAdjacentHTML('beforeend', orderCard);
    });
    
    addOrderActionHandlers();
}

function createOrderCard(order, number) {
    const date = formatDate(order.created_at);
    const composition = getOrderComposition(order);
    const price = calculateOrderPrice(order);
    const deliveryTime = getDeliveryTime(order);
    
    return `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-card-header">
                <span class="order-number">Заказ №${number}</span>
                <span class="order-date">${date}</span>
            </div>
            <div class="order-card-body">
                <div class="order-info">
                    <p><strong>Состав:</strong> ${composition}</p>
                    <p><strong>Стоимость:</strong> ${price} руб.</p>
                    <p><strong>Доставка:</strong> ${deliveryTime}</p>
                </div>
            </div>
            <div class="order-card-footer">
                <button class="order-btn order-btn-view" data-action="view">Подробнее</button>
                <button class="order-btn order-btn-edit" data-action="edit">Редактировать</button>
                <button class="order-btn order-btn-delete" data-action="delete">Удалить</button>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}

function getOrderComposition(order) {
    const dishNames = [];
    
    if (order.soup_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.soup_id;
        });
        if (dish) {
            dishNames.push(dish.name);
        }
    }
    
    if (order.main_course_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.main_course_id;
        });
        if (dish) {
            dishNames.push(dish.name);
        }
    }
    
    if (order.salad_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.salad_id;
        });
        if (dish) {
            dishNames.push(dish.name);
        }
    }
    
    if (order.drink_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.drink_id;
        });
        if (dish) {
            dishNames.push(dish.name);
        }
    }
    
    if (order.dessert_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.dessert_id;
        });
        if (dish) {
            dishNames.push(dish.name);
        }
    }
    
    return dishNames.join(', ');
}

function calculateOrderPrice(order) {
    let total = 0;
    
    if (order.soup_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.soup_id;
        });
        if (dish) {
            total += dish.price;
        }
    }
    
    if (order.main_course_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.main_course_id;
        });
        if (dish) {
            total += dish.price;
        }
    }
    
    if (order.salad_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.salad_id;
        });
        if (dish) {
            total += dish.price;
        }
    }
    
    if (order.drink_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.drink_id;
        });
        if (dish) {
            total += dish.price;
        }
    }
    
    if (order.dessert_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.dessert_id;
        });
        if (dish) {
            total += dish.price;
        }
    }
    
    return total;
}

function getDeliveryTime(order) {
    if (order.delivery_type === 'by_time') {
        return order.delivery_time;
    }
    return 'Как можно скорее (с 7:00 до 23:00)';
}

function addOrderActionHandlers() {
    const buttons = document.querySelectorAll('.order-btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const card = this.closest('.order-card');
            const orderId = parseInt(card.dataset.orderId);
            
            const order = orders.find(function(o) {
                return o.id === orderId;
            });
            
            if (!order) {
                console.error('Заказ не найден');
                return;
            }
            
            if (action === 'view') {
                showViewModal(order);
            } else if (action === 'edit') {
                showEditModal(order);
            } else if (action === 'delete') {
                showDeleteModal(order);
            }
        });
    });
}

function showViewModal(order) {
    const modal = document.getElementById('view-modal');
    
    if (!modal) {
        return;
    }
    
    const dateTime = formatDateTime(order.created_at);
    const deliveryTime = getDeliveryTime(order);
    
    document.getElementById('view-date').textContent = dateTime;
    document.getElementById('view-name').textContent = order.full_name;
    document.getElementById('view-address').textContent = 
        order.delivery_address;
    document.getElementById('view-time').textContent = deliveryTime;
    document.getElementById('view-phone').textContent = order.phone;
    document.getElementById('view-email').textContent = order.email;
    
    const commentSection = document.getElementById('view-comment-section');
    const commentElement = document.getElementById('view-comment');
    if (order.comment && order.comment.trim() !== '') {
        commentSection.style.display = 'block';
        commentElement.textContent = order.comment;
    } else {
        commentSection.style.display = 'none';
    }
    
    const itemsContainer = document.getElementById('view-items');
    itemsContainer.innerHTML = '';
    
    const orderItems = getOrderItems(order);
    orderItems.forEach(function(item) {
        const itemHTML = `
            <div class="modal-order-item">
                <span>${item.label}</span>
                <span>${item.name} (${item.price}Р)</span>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    const total = calculateOrderPrice(order);
    document.getElementById('view-total').textContent = total + 'Р';
    
    modal.classList.remove('hidden');
}

function showEditModal(order) {
    const modal = document.getElementById('edit-modal');
    
    if (!modal) {
        return;
    }
    
    currentOrderId = order.id;
    
    const dateTime = formatDateTime(order.created_at);
    document.getElementById('edit-created-date').textContent = dateTime;
    
    document.getElementById('edit-name').value = order.full_name;
    document.getElementById('edit-email').value = order.email;
    document.getElementById('edit-phone').value = order.phone;
    document.getElementById('edit-address').value = order.delivery_address;
    document.getElementById('edit-time').value = order.delivery_time || '';
    document.getElementById('edit-comment').value = order.comment || '';
    
    const itemsContainer = document.getElementById('edit-items');
    itemsContainer.innerHTML = '';
    
    const orderItems = getOrderItems(order);
    orderItems.forEach(function(item) {
        const itemHTML = `
            <div class="modal-order-item">
                <span>${item.label}</span>
                <span>${item.name} (${item.price}Р)</span>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
    
    const total = calculateOrderPrice(order);
    document.getElementById('edit-total').textContent = total + 'Р';
    
    modal.classList.remove('hidden');
}

function showDeleteModal(order) {
    const modal = document.getElementById('delete-modal');
    
    if (!modal) {
        return;
    }
    
    currentOrderId = order.id;
    modal.classList.remove('hidden');
}

function getOrderItems(order) {
    const items = [];
    
    if (order.main_course_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.main_course_id;
        });
        if (dish) {
            items.push({
                label: 'Основное блюдо',
                name: dish.name,
                price: dish.price
            });
        }
    }
    
    if (order.drink_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.drink_id;
        });
        if (dish) {
            items.push({
                label: 'Напиток',
                name: dish.name,
                price: dish.price
            });
        }
    }
    
    if (order.dessert_id) {
        const dish = dishes.find(function(d) {
            return d.id === order.dessert_id;
        });
        if (dish) {
            items.push({
                label: 'Десерт',
                name: dish.name,
                price: dish.price
            });
        }
    }
    
    return items;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
    currentOrderId = null;
}

function setupModalHandlers() {
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
            currentOrderId = null;
        });
    });
    
    const viewOkButton = document.getElementById('view-modal-ok');
    if (viewOkButton) {
        viewOkButton.addEventListener('click', function() {
            closeModal('view-modal');
        });
    }
    
    const editCancelButton = document.getElementById('edit-modal-cancel');
    if (editCancelButton) {
        editCancelButton.addEventListener('click', function() {
            closeModal('edit-modal');
        });
    }
    
    const editSaveButton = document.getElementById('edit-modal-save');
    if (editSaveButton) {
        editSaveButton.addEventListener('click', function() {
            saveOrderEdit();
        });
    }
    
    const deleteCancelButton = document.getElementById('delete-modal-cancel');
    if (deleteCancelButton) {
        deleteCancelButton.addEventListener('click', function() {
            closeModal('delete-modal');
        });
    }
    
    const deleteConfirmButton = 
        document.getElementById('delete-modal-confirm');
    if (deleteConfirmButton) {
        deleteConfirmButton.addEventListener('click', function() {
            deleteOrder();
        });
    }
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.add('hidden');
                currentOrderId = null;
            }
        });
    });
}

function saveOrderEdit() {
    const form = document.getElementById('edit-form');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = new FormData(form);
    const updateData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        delivery_address: formData.get('delivery_address'),
        delivery_type: formData.get('delivery_time') ? 'by_time' : 'now',
        delivery_time: formData.get('delivery_time') || '',
        comment: formData.get('comment') || ''
    };
    
    const url = API_URL + '/orders/' + currentOrderId + '?api_key=' + API_KEY;
    
    console.log('Отправка изменений заказа:', updateData);
    
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(function(response) {
            console.log('Ответ от сервера:', response.status);
            if (!response.ok) {
                return response.json().then(function(errorData) {
                    throw new Error(errorData.error ||
                        'Ошибка при редактировании заказа');
                });
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Заказ успешно изменен:', data);
            closeModal('edit-modal');
            showNotification('Заказ успешно изменён', 'success');
            loadOrders();
        })
        .catch(function(error) {
            console.error('Ошибка при редактировании заказа:', error);
            showNotification('Не удалось изменить заказ: ' + error.message,
                'error');
        });
}

function deleteOrder() {
    const url = API_URL + '/orders/' + currentOrderId + '?api_key=' + API_KEY;
    
    console.log('Удаление заказа:', currentOrderId);
    
    fetch(url, {
        method: 'DELETE'
    })
        .then(function(response) {
            console.log('Ответ от сервера:', response.status);
            if (!response.ok) {
                return response.json().then(function(errorData) {
                    throw new Error(errorData.error ||
                        'Ошибка при удалении заказа');
                });
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Заказ успешно удален:', data);
            closeModal('delete-modal');
            showNotification('Заказ успешно удалён', 'success');
            loadOrders();
        })
        .catch(function(error) {
            console.error('Ошибка при удалении заказа:', error);
            showNotification('Не удалось удалить заказ: ' + error.message,
                'error');
        });
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    
    if (!notification) {
        return;
    }
    
    notification.textContent = message;
    notification.className = 'notification notification-' + type;
    notification.classList.remove('hidden');
    
    setTimeout(function() {
        notification.classList.add('hidden');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен для страницы заказов');
    setupModalHandlers();
    loadOrders();
});