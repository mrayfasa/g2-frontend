const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('page')) page = 1;
else page = searchParams.get('page');
if (!searchParams.has('pageSize')) pageSize = 6;
else pageSize = searchParams.get('pageSize');
if (!searchParams.has('query')) query = '';
else query = searchParams.get('query');

function initPagination(len, page, pageSize, range){
    paginationHtml = ``
    page = Number(page)
    range = Number(range)
    if (page > 1) {
        paginationHtml += `<a href="shop.html?page=${page - 1}&pageSize=${pageSize}&name=${query}}">←</a>`
    }
    for (let i = Math.max(1, page - range); i <= Math.min(page + range, Math.ceil(len/pageSize)); i++){
        paginationHtml += `<a href="shop.html?page=${i}&pageSize=${pageSize}&name=${query}}">${i}</a>`
    }
    if (page < Math.ceil(len/pageSize)) {
        paginationHtml += `<a href="shop.html?page=${page + 1}&pageSize=${pageSize}&name=${query}}">→</a>`
    }
    document.getElementById("pagination").innerHTML = paginationHtml;
}
function getShopData(page, pageSize){
    AjaxRequest(API_URL + "/v1/shop/product/search?name=" + query,'GET',{},(res) =>{
        console.log(res);
        const products = res.products;
        productsCardHtml = makeCards(products, page, pageSize);
        const new_arrival_container = document.getElementById("container-item");
        new_arrival_container.innerHTML = productsCardHtml;
        initPagination(products.length, page, pageSize, 1);
    })
}
getShopData(page, pageSize, query);