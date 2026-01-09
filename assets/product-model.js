class ProductModel extends HTMLElement {
    constructor() {
        super();
        this.openModelModal();
        this.addEventListener('click', this.loadContent);
    }
// different function name to avoid conflict with constructor
// the below function is used to load the model-viewer-ui feature from Shopify
    loadContent() {
        Shopify.loadFeatures(
            [
                {
                    name: 'model-viewer-ui',
                    version: '1.0',
                    onLoad: this.setupModelViewerUI.bind(this)
                }
            ]
        )
    }
// the below function sets up the model-viewer-ui feature from Shopify
    setupModelViewerUI(errors) {
        if(errors) return;
        this.modelViewerUI = new Shopify.ModelViewerUI(document.querySelector('model-viewer'))
    }
// the below function gets the media ID from the data attribute
    getMediaID() {
        const id = this.getAttribute('data-media-id');
        return id;
    }
// the below function gets the modal element by its ID
    getModal() {
        const modal = document.getElementById("productModelModal");
        return modal;
    }
// the below function opens the modal and loads the model-viewer content into it when the button is clicked
    openModelModal() {
        const mediaID = this.getMediaID();
        const modal = this.getModal();

        if(!mediaID) return;

        const openModalButton = this.querySelector(`button[id="productModelOpenButton_${mediaID}"]`);

        openModalButton.addEventListener('click', function(e) {
            modal.querySelector("#body").innerHTML = "";

            const template = document.querySelector(`product-model[data-media-id="${mediaID}"] > template`);
            const clone = template.content.cloneNode(true);
            modal.querySelector("#body").appendChild(clone);
            modal.querySelector("#body > model-viewer").setAttribute("reveal", "auto");
        });
    }
}

const productModel = customElements.define('product-model', ProductModel);