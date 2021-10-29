import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCarListings } from '../services/data.js';

const cardListing = (listing) =>html`
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

const allListingsTemplate = (data, isData) =>html`
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${isData ? data.map(cardListing) : html`<p class="no-cars">No cars in database.</p>`}
            </div>
        </section>
`;

export async function allListingsPage(ctx) {
    const data = await getAllCarListings();
    const isData = data.length !== 0;
    ctx.render(allListingsTemplate(data, isData));

}
