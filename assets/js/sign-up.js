// --- GENERAR LAS OPCIONES DE LA FECHA DE NACIMIENTO ---

// Generar días (1-31)
const $daySelect = document.querySelector('#day');
for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    $daySelect.appendChild(option);
}

// Generar años (desde el actual hasta -100)
const $yearSelect = document.querySelector('#year');
const currentYear = new Date().getFullYear();
const minYear = currentYear - 100; // 100 años atrás

for (let i = currentYear; i >= minYear; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    $yearSelect.appendChild(option);
}




// --- VALIDAR CAMPOS ---

// Validar fechas
function isValidDate(day, month, year) {
    // Convertir a números
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);
            
    // Validaciones básicas
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < minYear || year > currentYear) return false;
            
    // Validar meses con 30 días
    if ([4, 6, 9, 11].includes(month) && day > 30) return false;
            
    // Validar febrero y años bisiestos
    if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (isLeapYear && day > 29) return false;
        if (!isLeapYear && day > 28) return false;
    }
            
    // Validar que no sea una fecha futura
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    if (selectedDate > today) return false;
            
    return true;
}

// Validar edad mínima (13 años)
function isOldEnough(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
            
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
            
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
            
    return age >= 10;
}




// --- MANEJO DE ERRORES ---

// Mostrar u ocultar error
function showError(message) {
    const $errorElement = document.querySelector('#dateError');
    $errorElement.textContent = message;
    $errorElement.style.display = 'block';
}

function hideError() {
    const $errorElement = document.querySelector('#dateError');
    $errorElement.style.display = 'none';
}

// Validar al cambiar los selects
const $monthSelect = document.querySelector('#month'); // * Ya estaban declarados los nodos de los select "day" y "year", por eso solo el "month"


function validateDate() {
    const day = $daySelect.value;
    const month = $monthSelect.value;
    const year = $yearSelect.value;
            
    if (!day || !month || !year) {
        hideError();
        return false;
    }
            
    if (!isValidDate(day, month, year)) {
        showError('Por favor, ingresa una fecha válida.');
        return false;
    }
            
    if (!isOldEnough(day, month, year)) {
        showError('Debes tener al menos 10 años para registrarte.');
        return false;
    }
            
    hideError();
    return true;
}

// Verifica cada vez que el usuario cambia los valores
$daySelect.addEventListener('change', validateDate);
$monthSelect.addEventListener('change', validateDate);
$yearSelect.addEventListener('change', validateDate);




// Validar al enviar el formulario

//? Es posible que esta parte del código deba ir arriba, en la sección de validar, o quizás la deje acá

// TODO: Me falta hacer eso, validar el formulario.
// TODO: También hace falta establecer qué pasará cuando esté válido: si enviará al usuario a la pestaña de sign in, si accederá directamente (algo más orgánico), o cualquier otra opción.