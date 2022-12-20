fetch('/products.json')
  .then(response => response.json())
  .then(produits => {

    prixMin = document.getElementById('prixMin').value
    prixMax = document.getElementById('prixMax').value
    noteMin = document.getElementById('noteMin').value
    noteMax = document.getElementById('noteMax').value


    function affichageProduit() {
      if (produits[i].price > prixMin && produits[i].price < prixMax) {
        if (produits[i].note >= noteMin && produits[i].note <= noteMax) {
          if (!document.getElementById('card' + [i])) {
            var chocolat = produits[i];
            var card = document.createElement('div');
            card.className = 'card mx-4 my-3';
            card.style = "width: 15rem;";
            card.id = 'card' + [i];
            var lienProduit = document.createElement('a')
            lienProduit.href = './produit.html?' + chocolat.id;
            lienProduit.id = 'lienProduit' + [i];
            var produitImg = document.createElement('img');
            produitImg.src = chocolat.image;
            produitImg.className = 'card-img-top';
            produitImg.style = 'object-fit: cover; height: 150px'
            produitImg.alt = 'photo chocolat ' + chocolat.title;
            var produitH3 = document.createElement('h3');
            produitH3.innerHTML = chocolat.title;
            produitH3.className = 'card-title h4';
            var produitPrix = document.createElement('p');
            produitPrix.innerHTML = chocolat.price + '€';
            produitPrix.className = 'card-text';
            var produitNote = document.createElement('p');
            produitNote.innerHTML = 'note : ' + chocolat.note;
            produitNote.className = 'card-text';
            var boutonAjout = document.createElement('button');
            boutonAjout.innerHTML = 'ajouter au panier';
            boutonAjout.className = 'btn btn-primary text-warning ajoutPanier';
            boutonAjout.id = "ajoutPanier" + chocolat.id;
            boutonAjout.value = chocolat.id;
            document.getElementById('produits').appendChild(card);
            document.getElementById('card' + [i]).appendChild(lienProduit);
            document.getElementById('lienProduit' + [i]).appendChild(produitImg);
            document.getElementById('card' + [i]).appendChild(produitH3);
            document.getElementById('card' + [i]).appendChild(produitPrix);
            document.getElementById('card' + [i]).appendChild(produitNote);
            document.getElementById('card' + [i]).appendChild(boutonAjout);
          }
        }
      }
    }

    function filtre() {
      if ($('#selectTous').prop('checked') == true) {
        for (i = 0; i < produits.length; i++) {
          affichageProduit()
        }
      }
      if ($('#selectBlanc').prop('checked') == true) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.blanc == true) {
            affichageProduit()
          }
        }
      }
      if (($('#selectLait').prop('checked') == true)) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.lait == true) {
            affichageProduit()
          }
        }
      }
      if (($('#selectNoir').prop('checked') == true)) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.noir == true) {
            affichageProduit()
          }
        }
      }
      if (($('#selectNoix').prop('checked') == true)) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.noix == true) {
            affichageProduit()
          }
        }
      }
      if (($('#selectFruit').prop('checked') == true)) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.fruit == true) {
            affichageProduit()
          }
        }
      }
      if (($('#selectCaramel').prop('checked') == true)) {
        for (i = 0; i < produits.length; i++) {
          if (produits[i].category.caramel == true) {
            affichageProduit()
          }
        }
      }
    }

    // affichage des produits au chargement de la page
    filtre();



    //filtrage des produits. Après click décoche "tous" une fois choix fait
    $(".selectChoco").on('click', function () {
      $('#produits').empty();
      $('#selectTous').prop('checked', false);
      filtre();

    })

    // si click sur tous décoche tout les choix spécifiques et affiche tout
    $('#selectTous').on('click', function () {
      $('#produits').empty();
      $('.selectChoco').prop('checked', false);
      for (i = 0; i < produits.length; i++) {
        affichageProduit()
      }
    })

    
    // au click modifie la value du prix ou de la note et affiche les produits correspondants
    $(document).on('click', '.select', function() {
      prixMin = document.getElementById('prixMin').value
      prixMax = document.getElementById('prixMax').value
      noteMin = document.getElementById('noteMin').value
      noteMax = document.getElementById('noteMax').value
      $('#produits').empty();
      filtre()
    })
    

  })


  //filtre avec item déroulant sur petits écrans
  $('#titreCategories').on("click", function () {
    $("#categories").toggle("slide");
  });

  $('#titrePrix').on("click", function () {
    $("#prix").toggle("slide");
  });

  $('#titreNote').on("click", function () {
    $("#note").toggle("slide");
  });










