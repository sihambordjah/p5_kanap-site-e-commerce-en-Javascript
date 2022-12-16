//=======================AFICHER LES DETAILS DU PRODUIT DANS LA PAGE PRODUIT================
//______________________Récupérer l’id du produit à afficher dans l'URL_________
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//des variable a besoin
let prixProduit = 0;
let imgUrl, altTexte;
let nameProduct;

//______________________Insérer un produit et ses détails dans la page Produit__________
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    afficheProduit(data);
  });

function afficheProduit(produit) {
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

//creer l'image
function createImg(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  appendChild(image);
}
// ajouter l'image a la page produit
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

//----------Sélection du bouton ajouter au panier
const btn_ajoutPanier = document.querySelector("#addToCart");

//---------Ecouter le bouton et ajouter au panier
btn_ajoutPanier.addEventListener("click", (event) => {
  event.preventDefault();

  const idColor = document.querySelector("#colors"); //selection de l'id du produit
  const choixColor = idColor.value; //mettre le choix de l'utilisateur dans une var
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
    price: prixProduit,
    image: imgUrl,
    alt: altTexte,
    name: nameProduct,
  };

  //=============================LOCALSTORAGE====================

  //________________________stokcer les données du produit selectioné dans le localstorage-----
  //-------------Déclaration de la variable "saveProductInLocalStorage"
  //------------dans laquelle on met les clés et les values qui sont dans le local storage

  let saveProductInLocalStorage = JSON.parse(localStorage.getItem("basket")); //JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet javascript
  // console.log(saveProductInLocalStorage);

  //on test si la panier n'est pas vide
  testBasket(saveProductInLocalStorage);

  //fonction d'enregistrer du produit dans localStorage
  function saveProduct(saveProductInLocalStorage) {
    localStorage.setItem("basket", JSON.stringify(saveProductInLocalStorage));
  }

  //fonction pour ajouter du produit dans local storage
  function addProductInLocalStorage(product) {
    let foundProduct = saveProductInLocalStorage.find(
      ((p) => p.id == dataBasket.id) && ((col) => col.color == dataBasket.color)
    );
    if (foundProduct != undefined) {
      console.log("produit existe deja");
      foundProduct.quantity = dataBasket.quantity + foundProduct.quantity;
    } else {
      saveProductInLocalStorage.push(dataBasket);
    }
    saveProduct(saveProductInLocalStorage);
  }

  //fonction test si le panier est vide
  function testBasket() {
    //s'il ya deja des produits enregister dans le localStorage
    if (saveProductInLocalStorage) {
      addProductInLocalStorage();
    }
    //s'il n y'a pas deja des produits enregistrer dans le local storage
    else {
      saveProductInLocalStorage = [];
      addProductInLocalStorage();
      console.log(saveProductInLocalStorage);
    }
  }

  //window.location.href = "cart.html";
});
