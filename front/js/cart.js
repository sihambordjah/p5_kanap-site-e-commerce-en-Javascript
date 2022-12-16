//===============================***---LE PANIER---***=============================
//__________________________Récupérer les produits dans localStorage on utilisant la methode getItem avec la clé "produit" et les mettre dans le tableau carteProduct_____________

let saveProductInLocalStorage = JSON.parse(localStorage.getItem("basket"));

//_____________________________Afichage des produit selection depuis le LoacalStorage dans la page panier__________________

//------------------Si le panier est vide (le localStorage est vide), on affiche "Votre panier est vide"
if (saveProductInLocalStorage === null) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");
  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
}
//-----------------Si le panier n'est pas vide alors, on affiche le contenu du localStorage------------
else {
  for (let i = 0; i < saveProductInLocalStorage.length; i++) {
    const article = makeArticle(i, saveProductInLocalStorage);
    const divImg = makeDivImg(article, saveProductInLocalStorage);
    const imag = makeImg(divImg, i, saveProductInLocalStorage);
    const divContent = makeDivContent(article, saveProductInLocalStorage);
    const divDescription = makeDivContentDescription(
      divContent,
      saveProductInLocalStorage
    );
    const h2 = makeH2(i, divDescription, saveProductInLocalStorage);
    const p = makeColor(i, divDescription, saveProductInLocalStorage);
    const price = makePrix(i, divDescription, saveProductInLocalStorage);
    const divContentSettings = makeContentSettings(divContent);
    const divQuantity = makeSettingsQuantity(divContentSettings);
    const pQuantity = makePQuantity(divQuantity);
    const inputQuantity = makeInputQuantity(
      i,
      divQuantity,
      saveProductInLocalStorage
    );
    const divDelete = makeSettingsDellete(divContentSettings);
    const btnDelete = DeleteProduct(divDelete, i, saveProductInLocalStorage);
  }
}
//____________________________________FONCTIONS_____________________________________

//************************************GESTION DE PANIER*************************** */

//---------------------Fonctions pour inserer les elements de la carte-----------------

// Création de la balise "article" et insertion dans la section
function makeArticle(i, saveProductInLocalStorage) {
  let article = document.createElement("article");
  document.querySelector("#cart__items").appendChild(article);
  article.className = "cart__item";
  article.setAttribute("data-id", saveProductInLocalStorage[i].id);
  article.setAttribute("data-color", saveProductInLocalStorage[i].color);
  return article;
}
// create de l'élément "div" et Insertion pour l'image produit
function makeDivImg(article, saveProductInLocalStorage) {
  let divImg = document.createElement("div");
  article.appendChild(divImg);
  divImg.className = "cart__item__img";
  return divImg;
}
// create l'image produit et Insertion
function makeImg(divImg, i, saveProductInLocalStorage) {
  let image = document.createElement("img");
  divImg.appendChild(image);
  image.src = saveProductInLocalStorage[i].image;
  image.alt = saveProductInLocalStorage[i].alt;
  return image;
}
//create le div pour le contenu produit et Insertion
function makeDivContent(article, saveProductInLocalStorage) {
  let divContent = document.createElement("div");
  article.appendChild(divContent);
  divContent.className = "cart__item__content";
  return divContent;
}
//create div pour le contenu de description produit et Insertion
function makeDivContentDescription(divContent, saveProductInLocalStorage) {
  let divContentDescription = document.createElement("div");
  divContent.appendChild(divContentDescription);
  divContentDescription.className = "cart__item__content__description";
  return divContentDescription;
}
//create h2 et Insertion pour la description produit
function makeH2(i, divDescription, saveProductInLocalStorage) {
  let h2 = document.createElement("h2");
  divDescription.appendChild(h2);
  h2.textContent = saveProductInLocalStorage[i].name;
  return h2;
}
//create de p pour color dans la description produit
function makeColor(i, divContentDescription, saveProductInLocalStorage) {
  let color = document.createElement("p");
  divContentDescription.appendChild(color);
  color.textContent = saveProductInLocalStorage[i].color;
  return color;
}
//create de p pour le prix dans la description produit
function makePrix(i, divContentDescription, saveProductInLocalStorage) {
  let prix = document.createElement("p");
  divContentDescription.appendChild(prix);
  prix.textContent = saveProductInLocalStorage[i].price + " €";
  return prix;
}
//create le div pour le settings produit
function makeContentSettings(divContent) {
  let divContentSettings = document.createElement("div");
  divContent.appendChild(divContentSettings);
  divContentSettings.className = "cart__item__content__settings";
  return divContentSettings;
}
//create le div pour quantity produit
function makeSettingsQuantity(divContentSettings) {
  let divQuantity = document.createElement("div");
  divContentSettings.appendChild(divQuantity);
  divQuantity.className = "cart__item__content__settings__quantity";
  return divQuantity;
}
//create de p pour la quantity produit
function makePQuantity(divQuantity) {
  let pQuantity = document.createElement("p");
  divQuantity.appendChild(pQuantity);
  pQuantity.textContent = "Qté :";
  return pQuantity;
}
//create de input pour la quantity produit
function makeInputQuantity(i, divQuantity, saveProductInLocalStorage) {
  let inputQuantity = document.createElement("input");
  divQuantity.appendChild(inputQuantity);
  inputQuantity.value = saveProductInLocalStorage[i].quantity;
  inputQuantity.setAttribute("type", "number");
  inputQuantity.className = "itemQuantity";
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("value", inputQuantity.value);
  // inputQuantity.addEventListener(
  //   "input",
  //   total(saveProductInLocalStorage[i].id)
  // ); //change input on click

  return inputQuantity;
}
//create le div pour settings dellete produit
function makeSettingsDellete(divContentSettings) {
  let divDelete = document.createElement("div");
  divContentSettings.appendChild(divDelete);
  divDelete.className = "cart__item__content__settings__delete";
  return divDelete;
}
//-------------------Fonction pour la suppression de l'article sélectionné------------------
function DeleteProduct(divDelete, i, saveProductInLocalStorage) {
  let btnDelete = document.createElement("p");
  divDelete.appendChild(btnDelete);
  btnDelete.className = "deleteItem";
  btnDelete.textContent = "Supprimer";
  btnDelete.addEventListener("click", (e) => {
    e.preventDefault;

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer dans les var
    let deleteId = saveProductInLocalStorage[i].id;
    let deleteColor = saveProductInLocalStorage[i].color;

    // filtrer l'élément cliqué par le bouton supprimer
    saveProductInLocalStorage = saveProductInLocalStorage.filter(
      (elt) => elt.id !== deleteId || elt.color !== deleteColor
    );

    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem("basket", JSON.stringify(saveProductInLocalStorage));
    //Si pas de produits dans le local storage on affiche que le panier est vide
    if (saveProductInLocalStorage.length === 0) {
      localStorage.clear();
    }
    //Refresh rapide de la page
    location.reload();
  });
  return btnDelete;
}

//-------------------Fonction pour calculer la quantity et le prix total des produit dans le panier

function PriceAndQuantityTotal() {
  //Récupération du total des quantités
  let arrayQauntity = [];
  for (let i = 0; i < saveProductInLocalStorage.length; i++) {
    let quantityProductTotal = saveProductInLocalStorage[i].quantity; //chercher les prix dans le panier
    arrayQauntity.push(quantityProductTotal); //ajouter les quantity dans la variable "arrayQuantity"
  }
  const reducerQté = (accumulator, curr) => accumulator + curr;
  const reducerQuantity = arrayQauntity.reduce(reducerQté);
  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = reducerQuantity;

  //Récupération du total des prix
  let arrayPrice = [];
  let sum = 0;
  for (let i = 0; i < saveProductInLocalStorage.length; i++) {
    let priceProduct = saveProductInLocalStorage[i].price; //chercher les prix dans le panier
    let quantityProductTotal = saveProductInLocalStorage[i].quantity;
    let productTotalPrice = quantityProductTotal * priceProduct;
    arrayPrice.push(productTotalPrice); //ajouter les prix dans la variable "arrayPrice"
  }
  const reducerPrice = (accumulator, curr) => accumulator + curr; // calcule le prix total
  const reducerPrix = arrayPrice.reduce(reducerPrice);
  let totalPrice = document.getElementById("totalPrice");
  totalPrice.innerHTML = reducerPrix;
}
PriceAndQuantityTotal();

//-------------Fonctions pour modifier la quantity des produits dans le panier
function modifyQttAndPrice() {
  let changeQttAndPrice = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < changeQttAndPrice.length; k++) {
    changeQttAndPrice[k].addEventListener("change", (event) => {
      event.preventDefault();
      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let currantQuantity = saveProductInLocalStorage[k].quantity; //chercher la quantity actuelle dans le panier
      let quanrityModifValue = changeQttAndPrice[k].valueAsNumber; //la nouvel quantity lors de modification
      const resultProductFind = saveProductInLocalStorage.find(
        ((el) => el.qttModifValue !== currantQuantity) &&
          ((el) => el.id === saveProductInLocalStorage[k].id) &&
          ((el) => el.color === saveProductInLocalStorage[k].color)
      );
      resultProductFind.quantity = quanrityModifValue;
      saveProductInLocalStorage[k].quantity = resultProductFind.quantity;
      localStorage.setItem("basket", JSON.stringify(saveProductInLocalStorage));
      location.reload(); // refresh rapide
    });
  }
}
modifyQttAndPrice();
//******************************FIN DE GESTION DE PANIER*****************

//===============================***---LE FORMULAIRE---***=============================

//____________________________________Rcuperer les données du formulaire_______________________

//----------Sélection du bouton "Cammander" le formulaire
const btnCammande = document.querySelector("#order");
//---------addEventLisner sur le bouton "Commander"-----
btnCammande.addEventListener("click", (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  //--------Récupérer des valeurs du formulaire les mettres dans un objet "contact"-------------
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  //-------Construction d'un array d'id depuis le local storage
  let products = [];
  for (let i = 0; i < saveProductInLocalStorage.length; i++) {
    products.push(saveProductInLocalStorage[i].id);
  }

  //********************************GESTION DE VALIDATION DU FORMULAIRE**************************************/

  //_____________________________Controle des champs de formulaire__________________________

  //Création des expressions régulières (regex)
  const regexPrenomNomVille = (value) => {
    return /^([A-Z a-z]{3,20})?([-]{0,1})?([A-Z a-z]{3,20})$/.test(value);
  };

  const regexAdresse = (value) => {
    return /^[^.?!:;,/\\/_-\s]([, .:;'-\s]?[0-9a-zA-Zàâäéèêëïîôöùûüç\s])+[^.?!:;,/\\/_-\s]$/.test(
      value
    );
  };

  const regexEmail = (value) => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    );
  };

  //Controle de la validité du prenom
  function prenomControle() {
    const prenom = contact.firstName;
    if (regexPrenomNomVille(prenom) == false) {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Veuillez entrez un prenom valide";

      return false;
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML = null;
      return true;
    }
  }

  //Controle de la validité du nom
  function nomControle() {
    const nom = contact.lastName;
    if (regexPrenomNomVille(nom) == false) {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Veuillez entrez un prenom valide";
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML = null;
      return true;
    }
  }
  //Controle de la validité de la ville
  function villeControle() {
    const ville = contact.city;
    if (regexPrenomNomVille(ville) == false) {
      document.getElementById("cityErrorMsg").innerHTML =
        "Veuillez entrez un prenom valide";
    } else {
      document.getElementById("cityErrorMsg").innerHTML = null;
      return true;
    }
  }
  //Controle de la validité de l'adresse postale
  function adresseControle() {
    const adresse = contact.address;
    if (regexAdresse(adresse) == false) {
      //error("Veuillez entrez un adresse postale valide");
      document.getElementById("addressErrorMsg").innerHTML =
        "Veuillez entrez un adresse pastale valide";
    } else {
      document.getElementById("addressErrorMsg").innerHTML = null;
      return true;
    }
  }
  //Controle de la validité de l'adresse email
  function emailControle() {
    const email = contact.email;
    if (regexEmail(email) == false) {
      document.getElementById("emailErrorMsg").innerHTML =
        "Veuillez entrez un adresse email valide";
    } else {
      document.getElementById("emailErrorMsg").innerHTML = null;
      return true;
    }
  }
  //-----------------Controler les données saisies par l'utilisateur dans le formulaire avant envoie dans le localStorage
  if (
    !firstName.value ||
    !lastName.value ||
    !address.value ||
    !city.value ||
    !email.value
  ) {
    alert("Vous devez renseigner tous les champs de formulaire !");
    e.preventDefault();
  } else {
    if (
      prenomControle() &&
      nomControle() &&
      villeControle() &&
      adresseControle() &&
      emailControle()
    ) {
      //Mettre l'objet "dataFormValue" dans localStorage
      localStorage.setItem("contact", JSON.stringify(contact));
    }
    //********************************FIN DE GESTION DE VALIDATION DU FORMULAIRE */

    //===============================***---ENVOYER LE PANIER ET LE FORMULAIRE AU SERVEUR---***=============================

    //Mettre les données du formulaire et mettre les produits selectionnés dans un objet a envoyer vers le serveur
    const sendDataFrom = {
      products,
      contact,
    };

    //-------------Envoie des données vers le serveur

    //On indique la méthode d'envoi des données
    const options = {
      method: "POST",
      body: JSON.stringify(sendDataFrom),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (
      prenomControle() &&
      nomControle() &&
      villeControle() &&
      adresseControle() &&
      emailControle()
    ) {
      //Envoie de l'objet "sendDataBasket" vers le serveur avec l'API fetch et la methode POST
      const promise = fetch(
        "http://localhost:3000/api/products/order",
        options
      );

      //pour voir le resultat du serveur dans la console
      promise.then(async (Response) => {
        try {
          const contenu = await Response.json(); // mettre le contenu en format JSON
          //mettre l'id "orderId" dans le localSotrage
          localStorage.setItem("orderId", contenu.orderId);

          // on redirige vers la page de confirmation de commande en passant en passant l’id de commande "orderId " dans l’URL
          document.location.href = "confirmation.html?id=" + contenu.orderId;
        } catch (err) {
          console.log(err);
          alert("Un problème a été rencontré lors de l'envoi du formulaire.");
        }
      });
    }
  } //Fin else
}); //Fin AddEvenLisner btn commander-------
