import { html } from '../../node_modules/lit-html/lit-html.js';
import { editCarListing, getCarListingById} from '../services/data.js';

const editTemplate = (onSubmit, carListing) =>html`
        <section id="edit-listing">
            <div class="container">

                <form @submit=${onSubmit} id="edit-form">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value=${carListing.brand}>

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value=${carListing.model}>

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value=${carListing.description}>

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value=${carListing.year}>

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${carListing.imageUrl}>

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value=${carListing.price}>

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const carListing = await getCarListingById(id);
    ctx.render(editTemplate(onSubmit, carListing));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const year = Number(formData.get('year').trim());
        const imageUrl = formData.get('imageUrl').trim();
        const price = Number(formData.get('price').trim());
        const editData = {brand, model, description, year, imageUrl, price}

        if(price < 1 || year < 1 ) {
            return alert('Entered information in the wrong format!');
        }

        
        await editCarListing(id, editData);
        e.target.reset();
        ctx.page.redirect(`/details/${id}`);

    }

}