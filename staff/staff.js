const urlParams = new URLSearchParams(window.location.search);
const staffId = urlParams.get('staff_id');
console.log(staffId)
if (!staffId) {
    window.location.href = '../login/login.html?staff_id=no';
}

document.getElementById('staffProducts').addEventListener('click', function(e) {
  window.location.href = "staff.html?staff_id="+staffId;
});
document.getElementById('staffSales').addEventListener('click', function(e) {
window.location.href = "staffSales.html?staff_id="+staffId;
});

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
            <p>$ ${e.price}</p>
            <input type="hidden" value="${e.product_id}">
            <div>
                <button onclick="updateProduct(${e.product_id})">Update</button>
                <button onclick="deleteProduct(${e.product_id})">Delete</button>
            </div>
        </div>
        `
        container.appendChild(card)
      })
  
    } catch (error) {
      console.error('Error getting products:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  }
  
getProducts();
function deleteProduct(productId){
    // API call to delete a product
    fetch(`http://localhost:9000/api/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => location.reload())
    .catch((error) => {
      location.reload()
    });
}

function updateProduct(productId){
  window.location.href = 'updateProduct.html?staff_id='+staffId+'&product_id='+productId
}