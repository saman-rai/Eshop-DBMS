// script.js
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id = urlParams.get('user_id')


if (!user_id) {
    window.location.href = 'login/login.html';
}


async function getProducts() {
    try {
      const response = await fetch('http://localhost:9000/products'); // Replace with your actual API endpoint URL
  
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Products:', data);
  
      // Use the data (e.g., display products in a list)
      const container = document.getElementsByClassName('container')[0]; // Assuming you have an element for the list
      
  
      data.forEach((e)=>{
        let card = document.createElement('div')
        card.classList.add("product-card")
        card.setAttribute("id", `product-${e.product_id}`);
        card.innerHTML = `
        <img src="img.jpg" alt="Product Image">
        <div class="product-info">
            <h2>${e.product_name}</h2>
            <p>${e.description}</p>
            <p>₩ ${e.price}</p>
            <input type="hidden" value="${e.product_id}">
            <button onclick="buyProduct(${e.product_id}, ${e.seller_id})">Buy</button>
        </div>
        `
        container.appendChild(card)
      })
  
    } catch (error) {
      console.error('Error getting products:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  }
  
  getProducts(); // Call the function to fetch products
  
// Example: Adding a click event to all buttons
function buyProduct(product_id, seller_id){
    addSale(seller_id, product_id, user_id)
}

  
  
async function addSale(sellerId, productId, userId) {
    try {
      const response = await fetch('http://localhost:9000/addSales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seller_id: sellerId, product_id: productId, user_id: userId }),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Sale added:', data);
  
      // Handle successful sale registration (e.g., clear form, show success message)
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      setTimeout(function() {
        modal.style.opacity = 1;
      }, 0);

      // Hide the modal with animation after 3 seconds
      setTimeout(function() {
        modal.style.opacity = 0;
        setTimeout(function() {
          modal.style.display = "none";
        }, 500); // this should match the transition duration in the CSS
      }, 2000);
    } catch (error) {
      console.error('Error adding sale:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  }

document.getElementById('Orders').addEventListener('click', function(e) {
  window.location.href = "orders.html?user_id="+user_id;
});
document.getElementById('Home').addEventListener('click', function(e) {
  window.location.href = "home.html?user_id="+user_id;
});