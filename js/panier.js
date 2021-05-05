
function domReady() {
    const search = window.location.search
    const param = new URLSearchParams(search)
    fetch('http://localhost:3000/api/cameras')
        .then(response => response.json())
        .then(response => {
            const panier = JSON.parse(localStorage.getItem('panier'))
            if (panier === null) {
                const panierVide = `<div class="row">
                    <div class="col">
                        <p>Le panier est vide</p>
                    </div>
                </div>`;
                panierList.innerHTML = panierVide
            } else {
                populatePanier(panier)
                displayAndLisenFormulaire()
            }

        })
        .catch(error => alert(error));
}
document.addEventListener('DOMContentLoaded', domReady);

//Affichage du panier
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
                <button type="button" class="btn btn-danger delete-items mb-1" data-id="${index}">Supprimer l'article</button>
            </div>
        </div>
      `   )
    document.getElementById('panierList').innerHTML = listOfPanier;
    // Déclanche la suppression du panier //
    document.getElementById('delete-card').addEventListener("click", () => {
        deleteAllPanier()
    });
    // Suppression d'un items du panier //
    const buttons = document.getElementsByClassName('delete-items')
    Array.prototype.forEach.call(buttons, button => {
        button.addEventListener("click", (r) => {
            deleteOnePanier(r)
        })
    })

    // Calcule le total du panier //
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
//Supression du panier
function deleteAllPanier() {
    localStorage.clear();
    location.reload();
}
//Suppression d'un item du panier
function deleteOnePanier(r) {
    const panier = JSON.parse(localStorage.getItem('panier'))
    const id = parseInt(r.target.dataset.id)
    panier.splice(id, 1)
    localStorage.setItem('panier', JSON.stringify(panier))
    window.location.reload();
}

//Affichage du formulaire
function displayAndLisenFormulaire(form) {
    const structureFormulaire = `
                    <div class="row" id="containerFormulaire" >
                        <div class="col">
                            <form class="buyForm" id="form" method="post">
                                <h2 class="mt-4 mb-4 mr-2 text-center"><span class="mt-4"><i class="fas fa-truck mr-2"></i></span>Informations de livraison</h2>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="lastName">Nom</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="inputLastName" id="inputLastName" placeholder="Entrez vôtre nom" required>                                            
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstName">Prénom</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="inputFirstName" id="inputFirstName" placeholder="Entrez vôtre prénom" required>
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-user"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail">Email</label>
                                        <div class="input-group">
                                            <input type="email" class="form-control" name="inputEmail" id="inputEmail" placeholder="Email" required>                                      
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-at"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputPhone">Téléphone / Portable</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="inputPhone" id="inputPhone" placeholder="06.00.00.00.00" required>
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-mobile-alt fa-lg"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Addresse</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="inputAddress" id="inputAddress" placeholder="1234 Main St" required>
                                        <div class="input-group-append">
                                            <span class="input-group-text inputIcon">
                                                <i class="fas fa-map-marker"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputCity">Ville</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" name="inputCity" id="inputCity" required>
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-building"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputState">Pays</label>
                                        <select name="inputState" id="inputState" class="form-control" required>
                                        <optgroup label="Europe">
                                            <option selected>France</option>
                                            <option>Belgique</option>
                                            <option>Espagne</option>
                                        </optgroup>
                                        <optgroup label="Amerique">
                                            <option>Canada</option>
                                            <option>Colombie</option>
                                        </optgroup>
                                        </select>
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Code postal</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" name="inputZip" id="inputZip" required>
                                            <div class="input-group-append">
                                                <span class="input-group-text inputIcon">
                                                    <i class="fas fa-check-circle"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-row justify-content-center">
                                    <div class="form-group col-md-6">
                                        <h2 class="mt-4 mb-4 mr-2 text-center"><span class="mt-4"><i class="fas fa-money-check mr-2"></i></span>Paiement</h2>
                                        <div class="bg-white">
                                            <div class="card-header">
                                                <strong>Carte de credit</strong>
                                                <small>Entrez vos informations de paiement</small>
                                            </div>
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                    <div class="form-group">
                                                        <label for="name">Nom / prénom</label>                                                        
                                                        <div class="input-group-append">
                                                            <input class="form-control" id="ccname" type="text" placeholder="Entrez vôtre nom" required>
                                                            <span class="input-group-text inputIcon">
                                                                <i class="fas fa-user"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="form-group">
                                                            <label for="ccnumber">Numero de carte de  credit</label>
                                                            <div class="input-group">
                                                                <input id="ccnumber" class="form-control" type="number" placeholder="0000 0000 0000 0000" autocomplete="email" required>
                                                                <div class="input-group-append">
                                                                    <span class="input-group-text inputIcon">
                                                                        <i class="fas fa-credit-card"></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-sm-4">
                                                        <label for="ccmonth">Mois</label>
                                                        <select class="form-control" id="ccmonth" required>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                            <option>7</option>
                                                            <option>8</option>
                                                            <option>9</option>
                                                            <option>10</option>
                                                            <option>11</option>
                                                            <option>12</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group col-sm-4">
                                                        <label for="ccyear">Années</label>
                                                        <select class="form-control" id="ccyear" required>
                                                            <option>2021</option>
                                                            <option>2022</option>
                                                            <option>2023</option>
                                                            <option>2024</option>
                                                            <option>2025</option>
                                                            <option>2026</option>
                                                            <option>2027</option>
                                                            <option>2028</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-group">
                                                            <label for="cvv">CVV/CVC</label>
                                                            <div class="input-group-append">
                                                                <input class="form-control" id="cvv" type="number" placeholder="123" required>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                    <button id='buyValidation' class="btn btn-sm btn-success float-right" type="submit">
                                                     Validez la commande<i class="fas fa-check ml-1"></i></button>
                                                <button class="btn btn-sm btn-danger" type="reset">
                                                    <i class="fas fa-trash-alt"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
    `;
    document.getElementById('paiement').innerHTML = structureFormulaire;

    /* Ecoute des input */
    // Nom
    inputLastName.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    //Prénom
    inputFirstName.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    // Email
    inputEmail.addEventListener('change', function () {
        validationFormulaire(this.id);
    });
    //Portable
    inputPhone.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    // Adresse
    inputAddress.addEventListener('change', function () {
        validationFormulaire(this.id);
    })

    // Ville
    inputCity.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    //Zip
    inputZip.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    /*** Paiement ***/
    // Nom Prénom
    ccname.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    ccnumber.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    ccmonth.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    ccyear.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
    cvv.addEventListener('change', function () {
        validationFormulaire(this.id);
    })
//Ajout d'un événement lors du submit sur le formulaire
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault;
        dataRecoveryAndPost()
    })
}
function dataRecoveryAndPost() {
    //Récupération des données
    let contact = {
        firstName: document.getElementById("inputFirstName").value,
        lastName: document.getElementById("inputLastName").value,
        address: document.getElementById("inputAddress").value,
        city: document.getElementById("inputCity").value,
        email: document.getElementById("inputEmail").value
    }
    let panier = JSON.parse(localStorage.getItem("panier"));
    var products = []
    panier.forEach(element => {
        products.push(element._id)
    });
    let commandes = {
        contact: contact,
        products: products
    }
    // Envoie des données au serveur
        fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commandes)
        })
            .then(async (response) => {
                try {
                    const retour = await response.json();
                    const idCommande = retour.orderId;
                    localStorage.setItem('orderID', idCommande)
                    localStorage.setItem('contact', JSON.stringify(contact))
                    document.location.href = "commande.html"
                } catch (e) {
                    console.log(e)
                }
        })
}
/* Initialisation des valeurs de départ des champs de saisie */
var initForm = {
    "inputLastName": false,
    "inputFirstName": false,
    'inputEmail': false,
    'inputPhone': false,
    'inputAddress': false,
    'inputCity': false,
    'inputZip': false,
    'ccname': false,
    'ccnumber': false,
    'ccmonth': false,
    'ccyear': false,
    'cvv': false
}
//Vérification du Formulaire
function validationFormulaire(idInput) {
    /* Définitions des RegExp et du comportement souhaité */
    let regExp;
    let caseName = document.getElementById('ccname');
    let IdInput;
    switch (idInput) {
        case 'inputLastName':
            regExp = new RegExp('[abcdefghijklmnopqrstxyz]$', 'g');
            IdInput = 0;
            break;
        case 'inputFirstName':
            regExp = new RegExp('[abcdefghijklmnopqrstxyz]$', 'g');
            IdInput = 1;
            break;
        case 'inputEmail':
            regExp = new RegExp('[a-zA-Z0-9._]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
            IdInput = 2;
            break;
        case 'inputPhone':
            regExp = new RegExp('^[0|+33]+[1-9]+[0-9]{8,8}$', 'g');
            IdInput = 3;
            break;
        case 'inputAddress':
            regExp = new RegExp('[0-9]+[ ]+[a-z]', 'g');
            IdInput = 4;
            break;
        case 'inputCity':
            regExp = new RegExp('[a-z]$', 'g');
            IdInput = 5;
            break;
        case 'inputZip':
            regExp = new RegExp('^\\d{5}$', 'g');
            IdInput = 6;
            break;
        case 'ccname':
            regExp = new RegExp('[a-z]+[ ]+[a-z]', 'g');
            IdInput = 7;
            break;
        case 'ccnumber':
            regExp = new RegExp('^[0-9]{14,17}$', 'g')
            IdInput = 8;
            break;
        case 'ccmonth':
            regExp = new RegExp('', 'g')
            IdInput = 9;
            break;
        case 'ccyear':
            regExp = new RegExp('^4[0-9]{ 12}(?:[0 - 9]{ 3})?$', 'g')
            IdInput = 10;
            break;
        case 'cvv':
            regExp = new RegExp('^[0-9]{3,3}$', 'g')
            IdInput = 11;
            break;
    }
    let validationIcon = document.getElementsByClassName('inputIcon');
    let icon = validationIcon[IdInput];
    let input = document.getElementById(idInput);
    if (regExp.test(input.value) && IdInput < 9) {
        input.style.borderColor = '#28a745'
        input.style.borderRightColor = 'white'
        icon.classList.remove("invalid");
        icon.classList.add("validRotate");
        caseName.value = inputLastName.value + ' ' + inputFirstName.value;
        initForm.input = true;
    } else if (IdInput >= 8) {
        input.style.borderColor = '#28a745'
    }
    else {
        input.style.borderColor = '#dc3545'
        input.style.borderRightColor = 'white'
        icon.classList.remove("validRotate");
        icon.classList.add("invalid");
    }
}