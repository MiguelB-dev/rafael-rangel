const $passwordInput = document.querySelector('#password-input');
const $passwordEye = document.querySelector('.password-eye');

$passwordEye.addEventListener('click', ()=> { 
    $passwordEye.classList.toggle('fa-eye')
    if ($passwordInput.type == 'password') {
        $passwordInput.type = 'text';
    }
    else {
        $passwordInput.type = 'password';
    }
});