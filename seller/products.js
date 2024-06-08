window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sellerId = urlParams.get('seller_id');

    if (!sellerId) {
        window.location.href = '../login/login.html?seller_id=no';
    }
    
    document.getElementById('AddProduct').addEventListener('click', function(e) {
        window.location.href = "seller.html?seller_id="+sellerId;
    });
    document.getElementById('Products').addEventListener('click', function(e) {
        window.location.href = "products.html?seller_id="+sellerId;
    });
    populateCards(sellerId)
};

function populateCards(sellerId){
    fetch(`http://localhost:9000/api/sellerProducts/${sellerId}`)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementsByClassName('container')[0];
        console.log(data)
        data.forEach((element)=>{
            e= element.product_details
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
                <button>sold : ${element.sales_count}</button>
            </div>
            `
            container.appendChild(card)
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}