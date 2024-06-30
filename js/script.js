document.addEventListener("DOMContentLoaded", () => {
    const reader = document.getElementById("reader");
    const listActions = document.getElementById("list-actions");
    const popup = document.getElementById("popup");
    let editMode = false;
    let currentItemIndex = null;

    function openQRScanner() {
        reader.style.display = 'block';
        listActions.style.display = 'none';
        initScanner();
    }

    function createList() {
        editMode = false;
        reader.style.display = 'block';
        listActions.style.display = 'none';
        initScanner();
    }

    function editList() {
        editMode = true;
        reader.style.display = 'block';
        listActions.style.display = 'none';
        initScanner();
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

    function initScanner() {
        const config = { fps: 10, qrbox: 250 };
        const html5QrcodeScanner = new Html5Qrcode("reader");

        Html5Qrcode.getCameras().then(devices => {
            console.log("Geräte gefunden: ", devices);
            if (devices && devices.length) {
                let cameraId = devices[0].id;
                for (const device of devices) {
                    if (device.label.toLowerCase().includes('back')) {
                        cameraId = device.id;
                        break;
                    }
                }
                console.log("Scanner starten mit Kamera ID: ", cameraId);
                html5QrcodeScanner.start(cameraId, config, onScanSuccess, onScanFailure)
                .catch(err => console.error("Fehler beim Starten des Scanners: ", err));
            } else {
                console.error('Keine Kameras gefunden.');
                alert('Keine Kameras gefunden.');
            }
        }).catch(err => console.error('Fehler beim Abrufen der Kameras: ', err));
    }

    window.openQRScanner = openQRScanner;
    window.createList = createList;
    window.editList = editList;
    window.deleteItem = deleteItem;
    window.confirmDelete = confirmDelete;
    window.editItem = editItem;
});
