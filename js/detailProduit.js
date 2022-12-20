fetch('/products.json')
  .then(response => response.json())
  .then(produits => {

    // Récupération ID dans l'url
    var requeteIdUrl = window.location.search;
    var idProduit = requeteIdUrl.slice(1);

    // boucle sur la liste de produits
    for (i = 0; i < produits.length; i++) {
      if (produits[i].id == idProduit) {
        var chocolat = produits[i];
        var detail = `
        <div class="d-none d-md-flex justify-content-center">
            <div class="col-5 mx-5">
                <img src="${chocolat.image}" alt="" class="img-fluid">
            </div>
            <div class="col-5">
                <h2 class="text-primary my-3">${chocolat.title}</h2>
                <p class="my-3">${chocolat.price}€</p>
                <p class="my-3">${chocolat.description}</p>
                <div class="d-flex my-5">
                    <input type="number" id="quantite" name="quantite" min="1" max="100" value="1" style="width: 60px;" class="form-control mx-4">
                    <button class="btn btn-primary text-warning px-5 ajoutPanierDetail" value="${chocolat.id}">Ajouter au panier</button>
                </div>
            </div>
        </div>
        <div class="mt-5 d-none d-md-block">
            <h3 class="text-primary">Ingrédients</h3>
            <p>${chocolat.ingredients}</p>
        </div>

        <div class="d-md-none d-flex-column justify-content-center">
          <div class="col-12">
             <h2 class="text-primary">${chocolat.title}</h2>
             <p class="my-3">${chocolat.price}€</p>
             <p class="my-3">${chocolat.description}</p>
          <div class="d-flex-column">
             <input type="number" id="quantite" name="quantite" min="1" max="100" value="1" style="width: 60px;" class="form-control my-4">
             <button class="btn btn-primary text-warning px-5 ajoutPanierDetail" value="${chocolat.id}">Ajouter au panier</button>
          </div>
        </div>
            <div class="col-12 my-5">
                <img src="${chocolat.image}" alt="" class="img-fluid imageDetail">
            </div>
            
        </div>
        <div class="mt-5 d-md-none d-block">
            <h3 class="text-primary">Ingrédients</h3>
            <p>${chocolat.ingredients}</p>
        </div>
        `
        document.getElementById('produitDetail').innerHTML = detail

      }
    }
  })

