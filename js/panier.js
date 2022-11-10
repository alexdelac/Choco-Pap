fetch('/products.json')
  .then(response => response.json())
  .then(produits => {

    // panier caché au chargement de la page
    $("#panier").hide();

    // Affichage du panier au click
    $('#boutonPanier').on("click", function () {
      $("#panier").toggle("slide");
    });


    //consitution panier
    var panier = [];
    var idProduit;
    var a = 0;
    //injection des produits dans panier
    $('button').on('click', function () {
      var idProduit = $(this).val()
      panier.push(produits[idProduit - 1])
      console.log(panier)


    })


  })




