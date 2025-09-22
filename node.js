const number1Input = document.getElementById('number1');
const number2Input = document.getElementById('number2');
const resultText = document.getElementById('result');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const errorMessage = document.getElementById('error-message');

// Fungsi untuk validasi input
function validateInput() {
    let isValid = true;

    // Reset error messages
    error1.textContent = '';
    error2.textContent = '';
    errorMessage.textContent = '';

    // Validasi angka pertama
    if (number1Input.value === '') {
        error1.textContent = 'Masukkan angka pertama';
        isValid = false;
    } else if (isNaN(parseFloat(number1Input.value))) {
        error1.textContent = 'Input harus berupa angka';
        isValid = false;
    }

    // Validasi angka kedua
    if (number2Input.value === '') {
        error2.textContent = 'Masukkan angka kedua';
        isValid = false;
    } else if (isNaN(parseFloat(number2Input.value))) {
        error2.textContent = 'Input harus berupa angka';
        isValid = false;
    }

    // Jika ada error, tampilkan pesan umum
    if (!isValid) {
        errorMessage.textContent = 'Mohon isi kedua angka dengan benar!';
    }

    return isValid;
}

// Fungsi kalkulasi
function calculate(operation) {
    if (!validateInput()) {
        resultText.textContent = '0';
        resultText.style.color = '';
        return;
    }

    const num1 = parseFloat(number1Input.value);
    const num2 = parseFloat(number2Input.value);
    let result;

    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                showError('Tidak bisa membagi dengan nol!');
                return;
            }
            result = num1 / num2;
            break;
    }

    // Format hasil
    let formattedResult;
    if (Number.isInteger(result)) {
        formattedResult = result.toLocaleString('id-ID');
    } else {
        formattedResult = result.toFixed(2).replace('.', ',');
    }

    resultText.textContent = formattedResult;
    resultText.style.color = '';
    errorMessage.textContent = '';
}

// Fungsi untuk menampilkan error
function showError(message) {
    resultText.textContent = message;
    resultText.style.color = '#e74c3c';
    setTimeout(() => {
        resultText.style.color = '';
        resultText.textContent = '0';
    }, 3000);
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate('add');
    } else if (e.key === '+') {
        e.preventDefault();
        calculate('add');
    } else if (e.key === '-') {
        e.preventDefault();
        calculate('subtract');
    } else if (e.key === '*') {
        e.preventDefault();
        calculate('multiply');
    } else if (e.key === '/') {
        e.preventDefault();
        calculate('divide');
    }
});

// Auto-focus pada input pertama
number1Input.focus();

// Clear error saat user mulai mengetik
number1Input.addEventListener('input', () => {
    if (number1Input.value !== '') {
        error1.textContent = '';
        errorMessage.textContent = '';
    }
});

number2Input.addEventListener('input', () => {
    if (number2Input.value !== '') {
        error2.textContent = '';
        errorMessage.textContent = '';
    }
});