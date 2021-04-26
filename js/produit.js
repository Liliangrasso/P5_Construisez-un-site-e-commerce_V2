const search = window.location.search
const param = new URLSearchParams(search)
const id = param.get('id')
fetch('http://localhost:3000/api/cameras/' + id)
    .then(response => response.json())
    .then(response => {
        populateProduct(response);
    })
    .catch(error => alert(error));


function populateProduct(response) {
    let lentilles = ""
    response.lenses.forEach(element => {
        lentilles += `<option >${element}</option>`
    });
    const product = `
        <div class="row productContainer">
            <div class="productImg col-lg-7">
                <img src=${response.imageUrl} alt="image du produit" class="img-fluid">
            </div>
            <div class="product-description col-lg-4">
                <div class="productTitle">
                    <h1>${response.name}</h1>
                </div>
                <div class="productInfo">
                    <div class="description">
                    <hr class="text-secondary" aria-hidden="true">
                        <p>${response.description}</p>
                    </div>
                </div>
                <div class="productCustom">
                <hr class="text-secondary" aria-hidden="true">
                    <label for="option">Lentilles : </label>
                    <select id="option" name="option">
                        ${lentilles}
                    </select>
                </div>
                <div class="productPrice">
                    <hr class="text-secondary" aria-hidden="true">
                    <p class="font-weight-bold">Prix : ${response.price}€</p>
                </div>
                <hr class="text-secondary" aria-hidden="true">
                <button type="button" class="btn btn-lg btn-secondary mt-5" id="panierLink">Ajouter au panier</button>
            </div>
        </div>
      `
    document.getElementById('product').innerHTML = product;
    document.getElementById('panierLink').addEventListener("click", () => {
        let lentillesSelected = document.getElementById("option").value
        response.lenses = lentillesSelected
        if (localStorage.getItem("panier")) {
            const panier = JSON.parse(localStorage.getItem('panier'))
            panier.push(response)
            localStorage.setItem("panier", JSON.stringify(panier))
            alert("Article ajouter au panier !")
        } else {
            localStorage.setItem("panier", JSON.stringify([response]))
        }
    })
}