const urlParams = new URLSearchParams(window.location.search);
const staffId = urlParams.get('staff_id');
const productId = urlParams.get('product_id');

if (!staffId) {
    window.location.href = '../login/login.html?staff_id=no';
    }
else if(!productId){
    window.location.href = 'staff.html?staff_id='+staffId;
}


document.getElementById('staffProducts').addEventListener('click', function(e) {
    window.location.href = "staff.html?staff_id="+staffId;
});
document.getElementById('staffSales').addEventListener('click', function(e) {
window.location.href = "staffSales.html?staff_id="+staffId;
});
const form = document.querySelector('form');

const product_name= form.querySelector('input[placeholder="Product name"]')
const description= form.querySelector('textarea[placeholder="Product description"]')
const price= form.querySelector('input[placeholder="Price"]')
const sellerId= form.querySelector('#sellerId')
function getProductDetails(productId){
    fetch(`http://localhost:9000/staffProductDetails/${productId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => updateForm(data))
    .catch((error) => {
      console.log(error)
    });
}
function updateForm(data){
    product_name.value = data.product_name
    description.value = data.description
    price.value = data.price
    sellerId.value = data.seller_id
}
function submitUpdate(){
    const formData = {
        product_id:productId,
        product_name: product_name.value,
        description: description.value,
        price: price.value,
        seller_id: sellerId.value
    }
    fetch(`http://localhost:9000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}
getProductDetails(productId)


document.querySelector("#updateProduct").addEventListener("click",(e)=>{
    e.preventDefault()
    submitUpdate()
})