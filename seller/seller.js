window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sellerId = urlParams.get('seller_id');
    console.log(sellerId)
    if (!sellerId) {
        window.location.href = '../login/login.html?seller_id=no';
    }
    
    document.getElementById('AddProduct').addEventListener('click', function(e) {
        window.location.href = "seller.html?seller_id="+sellerId;
    });
    document.getElementById('Products').addEventListener('click', function(e) {
        window.location.href = "products.html?seller_id="+sellerId;
    });

        const form = document.querySelector('form');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                seller_id:sellerId,
                product_name: form.querySelector('input[placeholder="Product name"]').value,
                description: form.querySelector('textarea[placeholder="Product description"]').value,
                price: form.querySelector('input[placeholder="Price"]').value
            };
            console.log(formData)
            try {
                const response = await fetch('http://localhost:9000/registerProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    console.log(result)
                    document.querySelector('form').reset()
                } else {
                    const error = await response.json();
                }
            } catch (error) {
            }
        });


};