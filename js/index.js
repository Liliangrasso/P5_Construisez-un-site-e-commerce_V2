function domReady() {
    fetch('http://localhost:3000/api/cameras')
        .then(response => response.json())
        .then(response => {
            populateTableList(response);

        })
        .catch(error => alert(error));
}
document.addEventListener('DOMContentLoaded', domReady);


function populateTableList(response) {
    let listOfProducts = '';

    response.forEach(items =>
        listOfProducts += `
    <div class="itemShop col-lg-4 mt-4">
    <a href="./pages/produit.html?id=${items._id}">
        <div class="text-center card">
            <img src=${items.imageUrl} class="img-fluid card-img-top">
            <div class="card-body ">
                <h5 class="card-title bg-secondary text-center h3">${items.name}</h5>
                <p class="text-center card-text mt-2">${items.description}</p>
                <p class="font-weight-bold text-center ">${items.price}€</p>
            </div>            
        </div>
        </a>
    </div>
      `   )
    document.getElementById('productList').innerHTML = listOfProducts;
}
