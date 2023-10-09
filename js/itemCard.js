function makeItemCard(datum){
    let cardHtml = `
        <div class="card">
            <a href="PDP1.html?id=${datum.product_id}">
            <div class="cardimg">
                <img src="${datum.image_url}" alt="product image">
                </div>
                <div class="cardtext">
                    <h5>NayaNika</h5>
                    <p class="cardname">${datum.name}</p>
                    <p class="cardprice">Rp${datum.price}</p>
                </div>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div> 
            </a>
        </div>
    `
    return cardHtml
}   

function makeCards(data, page = 1, pageSize = 6){
    let cardsHtml = ``
    if (page < 0) page = 0;
    if (page > Math.ceil(data.length / pageSize) ) page = Math.floor(data.length / pageSize);
    for (let i = (page - 1) * pageSize; i < Math.min(page * pageSize, data.length); i++){
        cardsHtml += '\n' + makeItemCard(data[i]);
    }
    return cardsHtml
}