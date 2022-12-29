//fetch les donnees (créer une requête avec fetch )

//*****Requete Get all the products stored in the database */
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    data.forEach((product) => {
      affichProduit(product);
    });
  });

/**Fonction d'affichage */
function affichProduit(produit) {
  const { _id, imageUrl, altTxt, name, description } = produit;
  const ancre = createAncre(_id);
  const article = document.createElement("article");
  const image = createImage(imageUrl, altTxt);
  const h3 = createH3(name);
  const p = createParagraph(description);
  appendElementsToArticle(article, image, h3, p);
  appendArticleToAncre(ancre, article);
}

/**Fonction d'ajouter les elememts au DOM */
//fonction permet d'ajouter les elements a l'article
function appendElementsToArticle(article, image, h3, p) {
  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);
}
//fonction qui creer l'ancre
function createAncre(id) {
  const ancre = document.createElement("a");
  ancre.href = "./product.html?id=" + id;
  return ancre;
}
//fonction va prendre les elements qu'il a envoyer
function appendArticleToAncre(ancre, article) {
  const items = document.getElementById("items");
  if (items != null) {
    items.appendChild(ancre);
    ancre.appendChild(article);
  }
}

//fonction qui creer l'image
function createImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}
//fonction qui creer le H3
function createH3(name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.className = "productName";
  return h3;
}
//fonction qui creer le paragraphe
function createParagraph(description) {
  const para = document.createElement("p");
  para.textContent = description;
  para.className = "productDescription";
  return para;
}
