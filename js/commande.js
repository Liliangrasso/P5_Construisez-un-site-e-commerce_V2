
const commandeId = localStorage.getItem('orderID')
const contacts = JSON.parse(localStorage.getItem('contact'))
//console.log(contacts.lastName)
//document.getElementById('contact').innerHTML = contacts.lastName
const panier = JSON.parse(localStorage.getItem('panier'))

function populatePanier(panier) {

    let listOfPanier = '';

    panier.forEach((items, index) =>
        listOfPanier += `
        <div class="row mt-4 productContainer">
            <div class="productImg col-lg-7">
                <img src=${items.imageUrl} alt="image du produit" class="img-fluid">
            </div>
            <div class="product-description col-lg-4">
                <div class="productTitle">
                    <h1>${items.name}</h1>
                </div>
                <div class="productInfo">
                    <div class="description">
                    <hr class="text-secondary" aria-hidden="true">
                        <p>${items.description}</p>
                    </div>
                </div>
                <div class="productCustom">
                <hr class="text-secondary" aria-hidden="true">
                <p>${items.lenses}<p>
                </div>
                <div class="productPrice">
                    <hr class="text-secondary" aria-hidden="true">
                    <p class="font-weight-bold">${items.price}€</p>
                </div>
                <hr class="text-secondary" aria-hidden="true">
            </div>
        </div>
      `   )
    document.getElementById('itemsCommandes').innerHTML = listOfPanier;
 
    // Calcule le total de la commande //
    let totalCardCalcul = [];

    for (let m = 0; m < panier.length; m++) {
        let cardPrice = panier[m].price
        totalCardCalcul.push(cardPrice)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalPrice = totalCardCalcul.reduce(reducer, 0);
    const affichageTotalPrice = `
    <span>
    ${totalPrice}€
    </span>`
    document.getElementById('totalCard').innerHTML = affichageTotalPrice;
}

function populateRemerciment() {
    const structureRemerciment = `
            <p class="ml-1 mr-1 mb-2">Merci ${contacts.lastName} ${contacts.firstName} pour vôtre commande</p>
            <p class="ml-1 mr-1 mb-2">Vôtre numero de commande est</p>
            <p class="ml-1 mr-1 mb-2" id="numeroCommande"></p>
            <p class="ml-1 mr-1 mb-2">Vôtre prix total est de :</p>
            <p class="ml-1 mr-1 mb-2" id="totalCard"></p>
    `;
    document.getElementById('remerciment').innerHTML = structureRemerciment;
    document.getElementById('numeroCommande').innerHTML = commandeId;
}
populateRemerciment()
populatePanier(panier);