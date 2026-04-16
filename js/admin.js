// js/admin.js
const modal = document.getElementById('modal-user');
const btnAddUser = document.getElementById('btn-add-user');
const btnClose = document.getElementById('close-modal');
const btnCancel = document.getElementById('btn-cancel');

// Función para abrir modal
btnAddUser.addEventListener('click', () => {
    document.getElementById('modal-title').innerText = 'Agregar Participante';
    modal.classList.add('modal--show');
});

// Función para cerrar modal
const closeModal = () => {
    modal.classList.remove('modal--show');
};

btnClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// Cerrar si se hace clic fuera del contenido blanco
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});