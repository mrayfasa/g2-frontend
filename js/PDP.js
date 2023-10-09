const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('id')) window.location = 'shop.html'
const id = searchParams.get('id')

function addToCart(){
    const quantity = document.getElementById("product-quantity").value;
    AjaxRequest(API_URL + '/v1/cart/add', 'PUT', {product_id: id, quantity : quantity}, (res) => {
        alert('Berhasil memasukkan ke dalam card')
        window.location = "shop.html"
    })

}
function getDetailProduct(){
    AjaxRequest(API_URL + '/v1/shop/product/' + id, 'GET', {}, (res) => {
        const product = res.products[0]
        const productHtml = `
            <div class="leftsectionproduct">
                <img src="${product.image_url}" alt="productimage">
            </div>

            <div class="rightsectionproduct">
                <h3>${product.name}</h3>
                <h2>Rp.${product.price}</h2>
                <input id="product-quantity" type="number" value="0">
                <button onclick="addToCart()">Add to Cart</button>
                <h4>Product Description</h4>
                <p>
                <span>${product.description} <br>  </span>
                </p>
            </div>
        `
        const product_container = document.getElementById("detail-container");
        product_container.innerHTML = productHtml
    })
}
function getProductInCart(){
    AjaxRequest(API_URL + '/v1/cart/quantity/' + id,'GET', {}, (res) => {
        const quantity = res.data.quantity;
        const quantityInput = document.getElementById("product-quantity");
        quantityInput.value = quantity;
    })
}
getDetailProduct();
getProductInCart();