import { supabase } from './config/supabase-client.js';
import { initAuth } from './modules/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializamos la lógica de Auth (pestañas y formularios)
    // Ahora le pasamos el cliente 'supabase' real importado arriba
    initAuth(supabase);
    
    // 2. Verificamos si hay una sesión activa al cargar la página
    checkUserSession();
});

async function checkUserSession() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        if (user) {
            console.log("Usuario autenticado:", user.email);
            // Aquí es donde ocultaremos el login y mostraremos el dashboard
            // Por ahora solo lo dejamos listo para el siguiente paso
            document.getElementById('auth-section').classList.add('app-content--hidden');
            document.getElementById('app-section').classList.remove('app-content--hidden');
            document.getElementById('user-display-name').textContent = `Bienvenido, ${user.user_metadata.full_name || 'Participante'}`;
        }
    } catch (err) {
        console.log("No hay sesión activa o hubo un error:", err.message);
    }
}