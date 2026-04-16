/**
 * auth.js - Lógica de Interfaz y Autenticación
 */

// 1. Selección de elementos del DOM
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// 2. Función para alternar pestañas
const toggleTabs = (activeTab) => {
    if (activeTab === 'login') {
        tabLogin.classList.add('auth-card__tab--active');
        tabRegister.classList.remove('auth-card__tab--active');
        loginForm.classList.remove('auth-form--hidden');
        registerForm.classList.add('auth-form--hidden');
    } else {
        tabRegister.classList.add('auth-card__tab--active');
        tabLogin.classList.remove('auth-card__tab--active');
        registerForm.classList.remove('auth-form--hidden');
        loginForm.classList.add('auth-form--hidden');
    }
};

// 3. Escuchadores de Eventos
tabLogin.addEventListener('click', () => toggleTabs('login'));
tabRegister.addEventListener('click', () => toggleTabs('register'));

// 4. Manejo de envíos de formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    console.log("Iniciando sesión con:", email);
    // Próximo paso: auth con Supabase
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-password').value;

    // Guardamos el nombre para el saludo dinámico "Hola, [nombre]"
    localStorage.setItem('tempUserName', name);
    
    console.log(`Registrando a: ${name} (${email})`);
    // Próximo paso: registro con Supabase
});