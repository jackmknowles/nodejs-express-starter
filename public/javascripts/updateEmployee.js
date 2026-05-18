// Client-side validation and submission for updateEmployee form.
const form = document.getElementById('employeeForm');
const fields = ['name', 'address', 'salary', 'role'];

// Validate function
function validateForm() {
    let valid = true;

    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(field + 'Error');
        const value = input.value.trim();

        if (!value) {
            input.classList.add('error');
            error.textContent = field.charAt(0).toUpperCase() + field.slice(1) + ' is required';
            error.style.display = 'block';
            valid = false;
        } else if (field === 'salary' && Number(value) <= 0) {
            input.classList.add('error');
            error.textContent = 'Salary must be a positive number';
            error.style.display = 'block';
            valid = false;
        }
    });

    return valid;
}

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Submit form via AJAX as JSON
    const action = form.getAttribute('action');
    const data = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        salary: document.getElementById('salary').value,
        role: document.getElementById('role').value
    };

    fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect back to employees list on success
            window.location.href = '/employees';
        } else {
            alert('Error updating employee: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the employee');
    });
});

// Clear error state on input
fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + 'Error');
    input.addEventListener('input', function () {
        input.classList.remove('error');
        if (error) error.style.display = 'none';
    });
});
