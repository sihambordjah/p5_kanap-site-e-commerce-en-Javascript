//fetch les donnees (créer une requête avec fetch )
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    data.forEach((element) => {
      addProduit(element);
    });
    //recuperer le resultat de la requette
  });
function addProduit(produit) {
  // const _id = produit._id; //il recupere l'id de 1er produit
  // const imageUrl = produit.imageUrl;
  // const altTxt = produit.altTxt;
  // const name = produit.name;
  // const description = produit.description;
  const { _id, imageUrl, altTxt, name, description } = produit;
  const ancre = createAncre(_id);
  const article = document.createElement("article");
  const image = createImage(imageUrl, altTxt);
  const h3 = createH3(name);
  const p = createParagraph(description);
  //appel au fonctions au des dessous avec l'id
  //une fois qu'il recupere le resultat de ces fncts
  //il les a met dans leur variable
  // exemple il fait appele a la fonct ancre une fois la recuperation de resultat de cet fct et il va le mettre dans la var ancre

  appendElementsToArticle(article, image, h3, p);
  appendArticleToAncre(ancre, article); //apres il passe a la fct appendchild
}

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
  const items = document.getElementById("items"); //ici il cherche items si il le trouve
  if (items != null) {
    items.appendChild(ancre);
    ancre.appendChild(article); //apres il lui rajoute ancre et l'article qu'il lui a donnée
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
