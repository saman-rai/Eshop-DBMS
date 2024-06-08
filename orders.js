// script.js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id = urlParams.get('user_id')
if (!user_id) {
    window.location.href = 'login/login.html';
}


document.getElementById('Orders').addEventListener('click', function(e) {
    window.location.href = "orders.html?user_id="+user_id;
});
document.getElementById('Home').addEventListener('click', function(e) {
    window.location.href = "home.html?user_id="+user_id;
});




function populateCards(){
    fetch(`http://localhost:9000/api/products/${user_id}`)
    .then(response => response.json())
    .then(allProducts => {
        const container = document.getElementsByClassName('container')[0];
        allProducts.forEach((e)=>{
            let card = document.createElement('div')
            card.classList.add("product-card")
            card.setAttribute("id", `product-${e.product_id}`);
            card.innerHTML = `
            <img src="img.jpg" alt="Product Image">
            <div class="product-info">
                <h2>${e.product_name}</h2>
                <p>${e.description}</p>
                <p>$ ${e.price}</p>
                <input type="hidden" value="${e.product_id}">
            </div>
            `
            container.appendChild(card)
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}




populateCards()