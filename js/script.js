document.addEventListener("DOMContentLoaded", () => {
    const reader = document.getElementById("reader");
    const listActions = document.getElementById("list-actions");
    const popup = document.getElementById("popup");
    let editMode = false;
    let currentItemIndex = null;

    function openQRScanner() {
        reader.style.display = 'block';
        listActions.style.display = 'none';
        new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 }
        ).render(onScanSuccess, onScanFailure);
    }

    function createList() {
        editMode = false;
        reader.style.display = 'block';
        listActions.style.display = 'none';
        new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 }
        ).render(onScanSuccess, onScanFailure);
    }

    function editList() {
        editMode = true;
        reader.style.display = 'block';
        listActions.style.display = 'none';
        new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 }
        ).render(onScanSuccess, onScanFailure);
    }

    function onScanSuccess(decodedText, decodedResult) {
        alert(`Scanned: ${decodedText}`);
        // Logic to add scanned item to list
        if (editMode) {
            // Append to existing list
        } else {
            // Create new list
        }
    }

    function onScanFailure(error) {
        console.warn(`QR error = ${error}`);
        alert(`QR error: ${error}`);
    }

    function deleteItem() {
        popup.style.display = 'block';
    }

    function confirmDelete(confirm) {
        if (confirm && currentItemIndex !== null) {
            // Logic to delete the current item
        }
        popup.style.display = 'none';
    }

    function editItem() {
        const quantityInput = document.getElementById("quantity");
        quantityInput.focus();
        quantityInput.select();
        // Logic to update the current item
    }

    window.openQRScanner = openQRScanner;
    window.createList = createList;
    window.editList = editList;
    window.deleteItem = deleteItem;
    window.confirmDelete = confirmDelete;
    window.editItem = editItem;
});
