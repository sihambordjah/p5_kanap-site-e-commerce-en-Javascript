//Récupérer l'id "orderId" de la commande (provenant de serveur) dans le localStorage
const orderId = localStorage.getItem("orderId");
//Afficher le numero de la comande "orderId" sur la page confirmation
displayOrderId(orderId);
function displayOrderId(orderId) {
  const orderIdElements = document.querySelector("#orderId");
  orderIdElements.innerText = orderId;
}
//Effacer tout le localStorage sauf le formulaire
function removeKeyLoacalStorage(key) {
  localStorage.removeItem(key);
}

// removeKeyLoacalStorage("contact");
// removeKeyLoacalStorage("basket");
removeKeyLoacalStorage("orderId");
