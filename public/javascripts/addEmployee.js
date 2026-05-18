// ===== GRAB REFERENCES TO HTML ELEMENTS =====
const form = document.getElementById('employeeForm');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const fields = ['name', 'address', 'salary', 'role'];

// ===== HANDLE FORM SUBMIT =====
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop default form submit (no page reload)
    let valid = true;

    // Loop through each field and validate it
    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(field + 'Error');
        const value = input.value.trim();

        // CHECK 1: Field is empty
        if (!value) {
            input.classList.add('error');
            error.textContent = field.charAt(0).toUpperCase() + field.slice(1) + ' is required';
            error.style.display = 'block';
            valid = false;
        }
        // CHECK 2: Salary must be positive
        else if (field === 'salary' && Number(value) <= 0) {
            input.classList.add('error');
            error.textContent = 'Salary must be a positive number';
            error.style.display = 'block';
            valid = false;
        }
    });

    if (!valid) return;

    // Build data object to send to server
    const formData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        salary: document.getElementById('salary').value,
        role: document.getElementById('role').value
    };

    // Send data to backend via fetch (AJAX)
    try {
        const response = await fetch('/employees/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            popupMessage.textContent = 'Employee ' + result.employee.employeeNumber + ' has been added successfully!';
            popup.style.display = 'flex';
            form.reset();
        } else {
            alert(result.message || 'Something went wrong');
        }
    } catch (err) {
        console.error('Full error:', err);
        alert('Error: ' + err.message);
    }
});

// Close popup when "Add Another" is clicked
function closePopup() {
    popup.style.display = 'none';
}

// Remove error when user starts typing
fields.forEach(field => {
    const input = document.getElementById(field);
    const error = document.getElementById(field + 'Error');

    input.addEventListener('input', function () {
        input.classList.remove('error');
        error.style.display = 'none';
    });
});