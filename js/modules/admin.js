import { supabase } from '../config/supabase-client.js';

const listPending = document.getElementById('list-pending');

async function loadPendingUsers() {
    const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('is_approved', false);

    if (error) return console.error(error);

    listPending.innerHTML = data.map(user => `
        <tr>
            <td>${user.nombre_completo}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn-approve" data-id="${user.id}">Aprobar</button>
            </td>
        </tr>
    `).join('');

    // Agregar eventos a los botones
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', () => approveUser(btn.dataset.id));
    });
}

async function approveUser(userId) {
    const { error } = await supabase
        .from('perfiles')
        .update({ is_approved: true })
        .eq('id', userId);

    if (error) alert("Error al aprobar");
    else {
        alert("Usuario aprobado con éxito");
        loadPendingUsers(); // Recargar lista
    }
}

loadPendingUsers();