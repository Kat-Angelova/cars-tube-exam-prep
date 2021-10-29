import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyCarListings } from '../services/data.js';

const carTemplate = (listing) =>html`
                <div class="listing">
                    <div class="preview">
                        <img src=${listing.imageUrl}>
                    </div>
                    <h2>${listing.brand} ${listing.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${listing.year}</h3>
                            <h3>Price: ${listing.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
`;

const myListingsTemplate = (data, isData) =>html`
        <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
                ${isData ? data.map(carTemplate) : html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
            </div>
        </section>
`;

export async function myListingsPage(ctx) {
    const ownerId = sessionStorage.getItem('ownerId');
    const data = await getMyCarListings(ownerId);
    const isData = data.length !== 0
    ctx.render(myListingsTemplate(data, isData))
}


