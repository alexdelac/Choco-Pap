fetch('/products.json')
  .then(response => response.json())
  .then(produits => {

    // panier caché au chargement de la page
    $("#panier").hide();

    // Affichage du panier au click
    $('.boutonPanier').on("click", function () {
      $("#panier").toggle("slide");
    });

    // enregistrement des données dans un cookie
    function setCookie(cookieName, cookieValue, exdays){
      var date = new Date();
      date.setTime(date.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ date.toUTCString();

      document.cookie = cookieName + "=" + cookieValue + "; " + expires+';path=/';
    }

    //récupére la liste des ID produits du panier via cookie
    function getProductListByCookie(){
      var tab=document.cookie.split("; ");
      var cookies=[];
      for (var i=0; i<tab.length; i++){
        var name=tab[i].substring(0, tab[i].indexOf("="));
        var value=tab[i].substring(tab[i].indexOf("=")+1);
        cookies[name]=value;
      }
      return cookies;
    }

    function getCookie(name){
      var cookies = getProductListByCookie();
      if(cookies[name]){
        return decodeURIComponent(cookies[name]);
      } else {
        return null
      }
    }

    function widgetPanier(){
      var cookie = getProductListByCookie()
      var qteCookie = 0
      for (i=0; i<cookie.length; i++){
        if(cookie[i] >= 1){
          qteCookie++
        }
      }
      if(qteCookie >= 1){
        document.getElementById('widgetPanier').innerHTML = qteCookie
        document.getElementById('widgetPanier').className = 'bg-warning text-primary rounded-circle px-1'
      }
    }


    function displayProductList(){
      $('#listePanier').empty()
 //récupére la liste d'id dans les cookies
      var cookieId = getProductListByCookie();
 //si l'id produit = le nom du cookie alors recupére les infos produits puis les affiches
 for (i=0; i<produits.length; i++){
   if (cookieId[i]){
    var produitId = parseInt(produits[i].id -2)
    var lignePanier = document.createElement('li')
    lignePanier.className = 'd-flex justify-content-between'
    lignePanier.innerHTML = 
    `<div class="d-flex align-items-center col-2 pb-5">
       <button value="${produits[i].id -1}" class="suppCookie bg-warning">X</button>
     </div>
     <div class="col-4">
       <img src="${produits[produitId].image}" alt="photo ${produits[produitId].title}" class="imagePanier">
     </div>
     <div class="d-flex flex-column align-items-center col-4">
       <p class="mb-0">${produits[produitId].title}</p>
       <p class="mb-0">${produits[produitId].price}€</p>
     </div>
     <div class="col-2">
       <input type="number" id="${produits[produitId].id}" value="${cookieId[i]}" style="max-width: 50px;" class="qteProduit bg-warning">
     </div>`
    document.getElementById('listePanier').appendChild(lignePanier)
        } 
      }
    }

    function displayTotal(){
      var total = 0
      var cookieId = getProductListByCookie() // récupére la liste d'id dans les cookies
      for (i=0; i<produits.length; i++){ // récupére prix et quantité pour chaque produit
        if(cookieId[i]){
          var produitId = parseInt(produits[i].id -2)
          var prix = produits[produitId].price
          var qte = cookieId[i]
          var sousTotal = prix * qte // multiplie chaque prix produit par la quantité puis additionne le tout
          total += sousTotal
        document.getElementById('totalPanier').innerHTML = total   // affiche le total dans le panier
        }
      }
    }

    //au click enregistre le changement de quantité dans le cookie
    $(document).on("click", ".qteProduit", function(){
      setCookie(this.id, this.value, 5)
      displayProductList()
      widgetPanier()
      displayTotal()
    })

    //au clique récupére l'id produit et ajoute une quantité a ce produit au cookie
    // et l'affiche
    $(".ajoutPanier").click(function(){
      var id = this.value;
      var cookieValue = parseInt(getCookie(id)) 
      //si id présent dans les cookies incrémente la quantité de 1
      if (getCookie(id)){
        cookieValue++
        setCookie(id, cookieValue, 5)
      } else { //sinon ajoute l'id aux cookies
        setCookie(id, 1, 5)
      }
      displayProductList()
      widgetPanier()
      displayTotal()
    })
    
    //au clique vide le panier completement
    $("#reinitPanier").click(function(){
      var cookies = document.cookie.split(";");
      var expDate = new Date("1970-01-01");
      for (i=0; i<cookies.length; i++){
        setCookie(cookies[i], " ", expDate)
      }
      displayProductList()
      widgetPanier()
      displayTotal()
    })

    // au click supprime le produit visé
   $(document).on("click", ".suppCookie", function(){
    cookie = this.value
    var expDate = new Date("1970-01-01");
    setCookie(cookie, " ", expDate)
    displayProductList()
    widgetPanier()
    displayTotal()
   })

   // dans la page detail produit au click récupére la value de l'input et ajoute le produit ainsi que sa quantité
   $(".ajoutPanierDetail").click(function(){
    var id = this.value;
    var inputValue = document.getElementById('quantite').value
    var cookieValue = parseInt(getCookie(id)) 
    var ajoutValue = parseInt(inputValue) + cookieValue
    console.log($('#quantite').value)
    if (getCookie(id)){
      setCookie(id, ajoutValue, 5)
    } else { 
      setCookie(id, inputValue, 5)
    }
    displayProductList()
    widgetPanier()
    displayTotal()
  })



    displayProductList()
    widgetPanier()
    displayTotal()

  })




