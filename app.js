import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';

import {navigation} from './src/views/navigationView.js';
import { loginPage } from './src/views/loginView.js';
import { registerPage } from './src/views/registerView.js';
import { homePage } from './src/views/homeView.js';
import { allListingsPage } from './src/views/allCarsView.js';
import { createPage } from './src/views/createView.js';
import { editPage } from './src/views/editView.js';
import { detailsPage } from './src/views/detailsView.js';
import { myListingsPage } from './src/views/myCarsView.js';
import { searchPage } from './src/views/searchView.js';

const main = document.getElementById('site-content');

page(navigation);

page('/', middleware,homePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);
page('/all-listings', middleware, allListingsPage);
page('/create', middleware, createPage);
page('/details/:id', middleware, detailsPage);
page('/edit/:id', middleware, editPage);
page('/my-listings', middleware, myListingsPage);
page('/by-year', middleware, searchPage)

page.start();

function middleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}