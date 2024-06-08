document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            email: form.querySelector('input[placeholder="Email"]').value,
            password: form.querySelector('input[placeholder="Password"]').value
        };

        try {
            const response = await fetch('http://localhost:9000/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                


                const urlParams = new URLSearchParams(window.location.search);
                let sellerId = urlParams.get('seller_id');
                userId = result.user.user_id
                let staffId = urlParams.get('staff_id');
            
                if (staffId === 'no') {
                    

                    fetch('http://localhost:9000/loginStaff', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: userId }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        window.location.replace("../staff/staff.html?staff_id="+data.staff_id);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
                else if (sellerId === 'no') {
                    

                    fetch('http://localhost:9000/addSeller/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId: userId }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        window.location.replace("../seller/seller.html?seller_id="+data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
                else{

                    alert(result.message);
                    window.location.replace("../home.html?user_id="+userId);
                }
                
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
