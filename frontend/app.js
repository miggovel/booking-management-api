const API_URL = 'http://localhost:3000/api/v1';

// DOM Elements
const authView = document.getElementById('auth-view');
const dashboardView = document.getElementById('dashboard-view');
const loginForm = document.getElementById('login-form');
const venuesGrid = document.getElementById('venues-grid');
const authError = document.getElementById('auth-error');
const logoutBtn = document.getElementById('logout-btn');

// State
let token = localStorage.getItem('token');

// Initialize
if (token) {
    showDashboard();
}

// Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            token = data.access_token;
            localStorage.setItem('token', token);
            showDashboard();
        } else {
            showError(data.message || 'Error al iniciar sesión');
        }
    } catch (err) {
        showError('No se pudo conectar con el servidor.');
    }
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    token = null;
    showAuth();
});

function showDashboard() {
    authView.style.display = 'none';
    dashboardView.style.display = 'block';
    loadVenues();
}

function showAuth() {
    authView.style.display = 'block';
    dashboardView.style.display = 'none';
}

function showError(msg) {
    authError.textContent = msg;
    authError.style.display = 'block';
}

async function loadVenues() {
    try {
        // Note: We fetch venues. Some endpoints might be protected.
        const response = await fetch(`${API_URL}/venues`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const venues = await response.json();

        venuesGrid.innerHTML = venues.map(venue => `
      <div class="glass-card venue-card animate-fade">
        <span class="badge">Local</span>
        <h2>${venue.name}</h2>
        <p class="address">${venue.address}</p>
        <p style="font-size: 0.875rem; color: var(--text-muted); flex-grow: 1;">
          ${venue.description || 'Sin descripción disponible.'}
        </p>
        <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <span style="color: var(--accent); font-weight: 600; font-size: 0.875rem;">
            ${venue.resources?.length || 0} recursos
          </span>
          <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">Ver Detalles</button>
        </div>
      </div>
    `).join('');

        if (venues.length === 0) {
            venuesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No hay locales registrados todavía.</p>';
        }

    } catch (err) {
        console.error('Error loading venues:', err);
    }
}
