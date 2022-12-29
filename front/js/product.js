//=======================AFICHER LES DETAILS DU PRODUIT DANS LA PAGE PRODUIT================

//______________________Récupérer l’id du produit à afficher dans l'URL_________

const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

//______________________Insérer un produit et ses détails dans la page Produit__________
//-----Declaration des variable a besoin
let prixProduit = 0;
let imgUrl, altTexte;
let nameProduct;
//---------Récuperer du produit selectioné avec la requete fetch (Requette vers l'API)---------

/**Requete Get a product in database stored with given id */
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    affichProduit(data);
  });

//---------Ajouter les données au DOM----------

/**Afficher le produit  */
function affichProduit(produit) {
  const { imageUrl, altTxt, name, price, description, colors } = produit;
  prixProduit = price;
  imgUrl = imageUrl;
  altTexte = altTxt;
  nameProduct = name;
  createImg(imageUrl, altTxt);
  createNameTitle(name);
  creatPrice(price);
  creatDescription(description);
  createOptionColor(colors);
}
/**Ajouter les elements au DOM */
// ajouter l'image du produit (cibler l'image)
function createImg(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  appendChild(image);
}
function appendChild(image) {
  const item = document.querySelector(".item__img");
  if (item != null) {
    item.appendChild(image);
  }
}
//remplir le titre
function createNameTitle(name) {
  const h1 = document.querySelector("#title");
  h1.textContent = name;
}
// remplir le prix
function creatPrice(price) {
  const prix = document.querySelector("#price");
  prix.textContent = price;
}
// remplir la description
function creatDescription(description) {
  const p = document.querySelector("#description");
  p.textContent = description;
}
//creer l'option des colors
function createOptionColor(colors) {
  for (let color of colors) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    appendOptionToSelect(option);
  }
}
//ajouter l'option au select
function appendOptionToSelect(option) {
  const select = document.querySelector("#colors");
  if (select != null) {
    select.appendChild(option);
  }
}
//======================GESTION DU PANIER===============
//____________________Récupération des données selecionné par l'utilisateur et ajouter au panier_________

//----------Sélection du bouton Ajouter au panier
const btn_ajoutPanier = document.querySelector("#addToCart");

//---------Ecouter le bouton et ajouter au panier
btn_ajoutPanier.addEventListener("click", (event) => {
  event.preventDefault();

  const idColor = document.querySelector("#colors");
  const choixColor = idColor.value;
  const idQuantity = document.querySelector("#quantity");
  const choixQuantity = idQuantity.value;
  if (
    choixColor == null ||
    choixColor === "" ||
    choixQuantity == null ||
    choixQuantity < 1 ||
    choixQuantity > 100
  ) {
    alert(
      "l'Ajout est bloqué, veillez selectionner la bonne couleur ou la bonne quantité (la quantité doit etre entre 1-100)"
    );
    return; //la fct s'arrete si on est dans ces condition la
  }
  //Récupération des données du produit
  const dataBasket = {
    id: id,
    color: choixColor,
    quantity: Number(choixQuantity),
    image: imgUrl,
    alt: altTexte,
    name: nameProduct,
  };

  //=============================LOCALSTORAGE====================

  //________________________stokcer les données du produit selectioné dans le localstorage-----
  //-------------Déclaration de la variable "saveProductInLocalStorage"
  //------------dans laquelle on met les clés et les values qui sont dans le local storage

  let saveProductInLocalStorage = JSON.parse(localStorage.getItem("basket"));
  //JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet javascript

  //fonction d'enregistrer du produit dans localStorage
  function saveProduct(saveProductInLocalStorage) {
    localStorage.setItem("basket", JSON.stringify(saveProductInLocalStorage));
  }

  //fonction pour ajouter du produit dans local storage
  function addProductInLocalStorage(product) {
    let findProduct = saveProductInLocalStorage.find(
      ((p) => p.id == dataBasket.id) && ((col) => col.color == dataBasket.color)
    );
    if (findProduct != undefined) {
      const totalNewQuantity = dataBasket.quantity + findProduct.quantity;

      if (totalNewQuantity <= 100) {
        findProduct.quantity = totalNewQuantity;
        alert("La quantité du produit a bien été mise à jour.");
      } else {
        alert(
          "La quantité d'un produit (même identifiant et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie."
        );
      }
    }
    // Si le produit et la couleur choisis n'existent pas encore dans le localStorage alors on ajoute le produit et les options choisies
    else {
      // on met les options du produit choisi dans une variable "saveProductInLocalStorage"
      saveProductInLocalStorage.push(dataBasket);
      alert("le produit canapé a bien été ajouté au panier");
    }
    saveProduct(saveProductInLocalStorage); //enregistré le produit dans le localStorage
  }
  //on test si la panier n'est pas vide
  testBasket(saveProductInLocalStorage);

  //fonction test si le panier est vide
  function testBasket() {
    //s'il ya deja des produits enregister dans le localStorage
    if (saveProductInLocalStorage) {
      addProductInLocalStorage();
      console.log(saveProductInLocalStorage);
    }
    //s'il n y'a pas deja des produits enregistrer dans le localtorage
    else {
      saveProductInLocalStorage = [];
      addProductInLocalStorage();
      alert(
        "Félicitations ! Vous venez d'ajouter votre premier produit dans le panier!"
      );
    }
  }
  //window.location.href = "cart.html";
}); //end addevenlisner
