// Get employee ID from button's data attribute
document.getElementById('editBtn').addEventListener('click', function () {
    const empId = this.getAttribute('data-id');
    alert('Edit feature coming soon!\nEmployee ID: ' + empId);
});

document.getElementById('deleteBtn').addEventListener('click', function () {
    const empId = this.getAttribute('data-id');
    alert('Delete feature coming soon!\nEmployee ID: ' + empId);
});