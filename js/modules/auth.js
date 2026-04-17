/**
 * MODULO: Auth
 * Maneja la lógica de autenticación y el dinamismo de las pestañas
 */

export const initAuth = (supabase) => {
    const authSection = document.getElementById('auth-section');
    const tabLogin = document.getElementById('tab-login'); // Asegúrate de que el ID coincida con el HTML
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // 1. Lógica de Pestañas (Tabs)
    const tabs = document.querySelectorAll('.auth__tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover estado activo de todas las pestañas
            tabs.forEach(t => t.classList.remove('auth__tab--active'));
            // Agregar estado activo a la clicada
            tab.classList.add('auth__tab--active');

            // Mostrar/Ocultar formularios
            const target = tab.getAttribute('data-tab');
            if (target === 'login') {
                formLogin.classList.remove('auth__form--hidden');
                formRegister.classList.add('auth__form--hidden');
            } else {
                formLogin.classList.add('auth__form--hidden');
                formRegister.classList.remove('auth__form--hidden');
            }
        });
    });

    // 2. Lógica de Registro en Supabase
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-pass').value;

        try {
            // Registrar usuario en la tabla de Auth de Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: nombre } // Guardamos el nombre en el metadata
                }
            });

            if (error) throw error;

            if (data.user) {
                alert('¡Registro exitoso! Recuerda que el administrador debe aprobar tu cuenta para que puedas participar.');
                formRegister.reset();
                // Opcional: Redirigir al login automáticamente
                tabs[0].click(); 
            }
        } catch (error) {
            alert('Error en el registro: ' + error.message);
        }
    });

    // 3. Lógica de Login en Supabase
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-pass').value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            if (data.user) {
                // Aquí validaremos más adelante si el usuario está aprobado
                window.location.reload(); // Recargamos para que main.js detecte la sesión
            }
        } catch (error) {
            alert('Error al ingresar: ' + error.message);
        }
    });
};