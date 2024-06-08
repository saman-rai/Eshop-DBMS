document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            fname: form.querySelector('input[placeholder="First name"]').value,
            lname: form.querySelector('input[placeholder="Last name"]').value,
            email: form.querySelector('input[placeholder="Email"]').value,
            password: form.querySelector('input[placeholder="Password"]').value
        };

        try {
            const response = await fetch('http://localhost:9000/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                window.location.replace("../login/login.html");
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
