// Объект для хранения выбранных размеров
const selectedSizes = {};

// Функция выбора размера
function selectSize(element) {
    const card = element.closest('.card');
    const productId = card.getAttribute('data_id');
    
    // Снимаем выделение у всех размеров этого товара
    const sizeItems = card.querySelectorAll('.card_item');
    sizeItems.forEach(el => el.classList.remove('selected'));
    
    // Выделяем выбранный размер
    element.classList.add('selected');
    
    // Сохраняем выбор
    selectedSizes[productId] = element.getAttribute('data-size');
}

// Массив корзины
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Функция добавления в корзину
function addToCart(productId) {
    const card = document.querySelector(`.card[data_id="${productId}"]`);
    
    // Проверка выбора размера
    if (!selectedSizes[productId]) {
        alert('Пожалуйста, выберите размер!');
        return;
    }

    const item = {
        id: productId,
        name: card.getAttribute('data_name'),
        price: parseFloat(card.getAttribute('data_price')),
        size: selectedSizes[productId],
        quantity: 1,
        imageClass: card.querySelector('[class*="card_image"]').className
    };

    // Проверяем есть ли товар в корзине
    const existingItem = cartItems.find(i => 
        i.id === productId && i.size === item.size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(item);
    }
    
    // Сохраняем и обновляем
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
    alert('Товар добавлен в корзину!');
}

// Функция создания карточки товара для корзины
function createCartItemCard(item) {
    const card = document.createElement('div');
    card.className = 'cart-card';
    card.innerHTML = `
        <div class="${item.imageClass} cart-card-image"></div>
        <div class="cart-card-content">
            <h3>${item.name}</h3>
            <p>Размер: ${item.size}</p>
            <div class="cart-card-controls">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}" data-size="${item.size}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}" data-size="${item.size}">+</button>
                </div>
                <div class="price-total">${(item.price * item.quantity).toFixed(2)} руб.</div>
            </div>
        </div>
        <button class="remove-btn" data-id="${item.id}" data-size="${item.size}">×</button>
    `;
    return card;
}

// Функция обновления интерфейса корзины
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    
    if (!cartItemsContainer) return;
    
    // Очищаем контейнер
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        if (cartTotalEl) cartTotalEl.textContent = 'Итого: 0 руб.';
        if (cartCountEl) cartCountEl.textContent = '0';
        return;
    }
    
    let total = 0;
    let totalCount = 0;
    
    // Добавляем карточки товаров
    cartItems.forEach(item => {
        total += item.price * item.quantity;
        totalCount += item.quantity;
        cartItemsContainer.appendChild(createCartItemCard(item));
    });
    
    // Обновляем итоги
    if (cartTotalEl) cartTotalEl.textContent = `Итого: ${total.toFixed(2)} руб.`;
    if (cartCountEl) cartCountEl.textContent = totalCount;
}

// Функция изменения количества
function changeQuantity(id, size, change) {
    const item = cartItems.find(i => i.id === id && i.size === size);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        cartItems = cartItems.filter(i => !(i.id === id && i.size === size));
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
}

// Функция удаления товара
function removeCartItem(id, size) {
    cartItems = cartItems.filter(item => !(item.id === id && item.size === size));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
}

// Очистка корзины
function clearCart() {
    cartItems = [];
    localStorage.removeItem('cart');
    updateCartUI();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Назначаем обработчики кнопок
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
    
    // Обработчики для корзины
    document.addEventListener('click', function(e) {
        // Удаление товара
        if (e.target.classList.contains('remove-btn')) {
            removeCartItem(
                e.target.getAttribute('data-id'),
                e.target.getAttribute('data-size')
            );
        }
        
        // Изменение количества
        if (e.target.classList.contains('quantity-btn')) {
            const change = e.target.classList.contains('plus') ? 1 : -1;
            changeQuantity(
                e.target.getAttribute('data-id'),
                e.target.getAttribute('data-size'),
                change
            );
        }
    });
    
    // Инициализация корзины
    updateCartUI();
});