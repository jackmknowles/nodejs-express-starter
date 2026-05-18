// Navigate to update page for the selected employee
function handleEdit(empId) {
    window.location.href = '/employees/update/' + empId;
}

function handleDelete(empNumber) {
    alert('Delete feature coming soon!\nEmployee: ' + empNumber);
}