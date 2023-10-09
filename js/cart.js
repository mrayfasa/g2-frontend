function removeCartItem(event) {
    if (confirm("Kamu yakin ingin menghapus barang ini dari keranjang?")){
        var buttonClicked = event.target
        const row = buttonClicked.parentElement.parentElement;
        const product_id = row.getAttribute("data-item-id");
        AjaxRequest(API_URL + '/v1/cart/remove/' + product_id, "DELETE", {}, (res) => {
            row.remove();
            updateCartTotal();
        })
    }
}
function updateCartQuantitiy(event){
    if (confirm("Kamu yakin ingin menyimpan perubahan pada barang ini?")){
        var buttonClicked = event.target
        const row = buttonClicked.parentElement.parentElement;
        const product_id = row.getAttribute("data-item-id");
        const new_quantity = row.getElementsByClassName('cart-quantity-input')[0].value
        AjaxRequest(API_URL + '/v1/cart/update/' + product_id, "PUT", {quantity : new_quantity}, (res) => {
            buttonClicked.hidden = true;
            updateCartTotal();
        })
    }
}

function updateCartTotal(event) {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + total
    var saveButton = event.target.parentElement.getElementsByClassName("save-button")[0];
    saveButton.hidden = false
}

function addItemToCart(datum) {
    var cartRowContents = `
        <div class="cart-row" data-item-id="${datum.product_id}">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${datum.image_url}" width="100" height="100">
                <span class="cart-item-title">${datum.name}</span>
            </div>
            <span class="cart-price cart-column">Rp${datum.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" onchange="updateCartTotal(event)"  min="1" value="${datum.quantity}">
                <button class="btn btn-danger" onclick="removeCartItem(event)" type="button">REMOVE</button>
                <button class="save-button btn btn-success" onclick="updateCartQuantitiy(event)" type="button" hidden>SAVE</button>
            </div>
        </div>
        `
    return cartRowContents
}
function purchaseCart() {
    AjaxRequest(API_URL + "/v1/cart/remove", "DELETE", {}, () => {
        window.location = 'order-placed.html'
    })
}
function initCart(data) {
    const header = `
            <h2 class="section-header">Keranjang Belanja</h2>
            <div class="cart-row">
                <span class="cart-item cart-header cart-column">Item</span>
                <span class="cart-price cart-header cart-column">Price</span>
                <span class="cart-quantity cart-header cart-column">Quantity</span>
            </div>
        `
    const items = data.items
    var isiCart= '<div class="cart-items">'
    items.forEach(item => {
        isiCart += addItemToCart(item)
    });
    isiCart += '</div>'
    const footer = `
            <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price">Rp${data.total_price}</span>
            </div>
            <div class="button-item">
                <button class="btn btn-primary btn-purchase" type="button" onclick="purchaseCart()">Purchase</button>
                <a href="shop.html"><button class="btn btn-primary btn-shopping" type="button">Continue Shopping</button></a>
            </div>
        `
    const cart_container = document.getElementById("cart-container");
    cart_container.innerHTML = header + isiCart + footer;
}

function getCartData(){
    AjaxRequest(API_URL + '/v1/cart', 'GET', {}, (res) => {
        initCart(res);
    })
}

getCartData();