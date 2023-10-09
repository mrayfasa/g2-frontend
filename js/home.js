function getHomeData(){
    AjaxRequest(API_URL + "/v1/home/product",'GET',{},(res) =>{
        console.log(res);
        const products = res.products;
        productsCardHtml = makeCards(products);
        const new_arrival_container = document.getElementById("new-arrival-container");
        const top_selling_container = document.getElementById("top-selling-container");

        new_arrival_container.innerHTML = productsCardHtml;
        top_selling_container.innerHTML = productsCardHtml;
    })
}
getHomeData();