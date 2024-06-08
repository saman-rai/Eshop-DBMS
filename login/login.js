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
                alert(result.message);
                userid = result.user.user_id
                window.location.replace("../home/home.html?user_id="+userid);
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
