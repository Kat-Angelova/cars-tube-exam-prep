import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../services/data.js';


const header = document.querySelector('#navigation-content');

const guestTemplate = () =>html`
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
`;

const loggedTemplate = (username, onLogout) =>html`
                <div id="profile">
                    <a>Welcome ${username}</a>
                    <a href="/my-listings">My Listings</a>
                    <a href="/create">Create Listing</a>
                    <a @click=${onLogout} href="#">Logout</a>
                </div>
`;

const navTemplate = (isAuthenticated, username, onLogout) =>html`
            <nav>
                <a class="active" href="/">Home</a>
                <a href="/all-listings">All Listings</a>
                <a href="/by-year">By Year</a>
                
                ${isAuthenticated ? loggedTemplate(username, onLogout)
                     : guestTemplate()}
                
            </nav>
`;

export async function navigation(ctx, next){
    const isAuthenticated = sessionStorage.getItem('authToken');
    const username = sessionStorage.getItem('username');
    async function onLogout(e) {
        e.preventDefault();
        await logout();
        ctx.page.redirect('/')
    }
    render(navTemplate(isAuthenticated, username, onLogout), header);
    next();
}