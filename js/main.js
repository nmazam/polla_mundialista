import { supabase } from './config/supabase-client.js';
import { initAuth } from './modules/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth(supabase);
    checkUserSession();
});

async function checkUserSession() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Cambiamos 'perfiles' por 'profiles' y 'nombre_completo' por 'nombre'
            const { data: perfil, error } = await supabase
                .from('profiles') 
                .select('is_approved, nombre, rol')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            if (perfil.is_approved) {
                // Ocultar sección de login
                const authSection = document.getElementById('auth-section');
                const appSection = document.getElementById('app-section');
                
                if(authSection) authSection.classList.add('is-hidden');
                if(appSection) appSection.classList.remove('is-hidden');
                
                // Mostrar nombre del usuario
                const userDisplay = document.getElementById('user-display-name');
                if(userDisplay) userDisplay.textContent = `Bienvenido, ${perfil.nombre}`;

                // Si es admin, podrías poner un mensaje en consola para verificar
                if (perfil.rol === 'admin') {
                    console.log("Eres administrador. Puedes ir a /pages/admin.html");
                }

            } else {
                alert("Tu cuenta aún no ha sido aprobada.");
                await supabase.auth.signOut();
                window.location.reload();
            }
        }
    } catch (err) {
        console.log("Sesión no activa:", err.message);
    }
}