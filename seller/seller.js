document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            seller_id:1,
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
                alert(result.message);
                product_id = result.product_id
                console.log(result)
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
