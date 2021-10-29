import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSearch } from '../services/data.js';

const filteredTemplate = ({ imageUrl, brand, model, year, price, _id }) =>html`
                <div class="listing">
                    <div class="preview">
                        <img src=${imageUrl}>
                    </div>
                    <h2>${brand} ${model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${year}</h3>
                            <h3>Price: ${price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${_id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
`;

const searchTemplate = (data, onSearch, year) =>html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value="${year||''}">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
               ${data.length == 0 ? html`<p class="no-cars"> No results.</p>` : data.map(filteredTemplate)}
            </div>
        </section>
`;

export async function searchPage(ctx){
    const year = Number(ctx.querystring.split('=')[1]);
    const data = Number.isNaN(year) ? [] : await getSearch(year);

    ctx.render(searchTemplate(data, onSearch, year));

    function onSearch() {
        const query = document.getElementById('search-input').value;

        if(Number.isNaN(query)==false){
            ctx.page.redirect('/by-year?query=' + query);
        }else{
            return alert('Year must be positive number!')
        }
    }

   
}