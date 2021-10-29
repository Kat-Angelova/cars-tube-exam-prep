import { html } from '../../node_modules/lit-html/lit-html.js';
import { getCarListingById, deleteCarListing} from '../services/data.js';

const detailsTemplate = (carListing, isOwner, onDelete) =>html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${carListing.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${carListing.brand}</li>
                    <li><span>Model:</span>${carListing.model}</li>
                    <li><span>Year:</span>${carListing.year}</li>
                    <li><span>Price:</span>${carListing.price}$</li>
                </ul>

                <p class="description-para">${carListing.description}</p>

                ${isOwner ? html`
                <div class="listings-buttons">
                    <a href="/edit/${carListing._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="#" class="button-list">Delete</a>
                </div> ` : ''}
            </div>
        </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const carListing = await getCarListingById(id);

    const ownerId = sessionStorage.getItem('ownerId');
    const isOwner = ownerId == carListing._ownerId;

    ctx.render(detailsTemplate(carListing, isOwner, onDelete));

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this meme?');

        if (confirmed) {
            await deleteCarListing(id);
            ctx.page.redirect('/all-listings');
        }

    }
}