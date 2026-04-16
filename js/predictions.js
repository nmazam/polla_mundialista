// js/predictions.js

// Función para renderizar un partido (Simulando lo que vendrá de Supabase)
function renderMatch(match) {
    return `
        <article class="match-card">
            <div class="match-card__header">
                <span class="match-card__phase">${match.phase} - ${match.group_name}</span>
                <span class="match-card__date">${match.date}</span>
            </div>
            <div class="match-card__body">
                <div class="team">
                    <img src="${match.flag_home}" class="team__flag">
                    <span class="team__name">${match.team_home}</span>
                    <input type="number" class="team__score" min="0" placeholder="0">
                </div>
                <span class="match-card__vs">VS</span>
                <div class="team">
                    <input type="number" class="team__score" min="0" placeholder="0">
                    <span class="team__name">${match.team_away}</span>
                    <img src="${match.flag_away}" class="team__flag">
                </div>
            </div>
            <button class="btn btn--primary match-card__button">Guardar Pronóstico</button>
        </article>
    `;
}

// Ejemplo de cómo se verá el saludo dinámico al iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Esto se reemplazará con el nombre real de Supabase Auth
    const nombreUsuario = localStorage.getItem('userName') || "Participante";
    document.getElementById('user-name').innerText = nombreUsuario;
});