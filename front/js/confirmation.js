//Récupérer l'id "orderId" de la commande (provenant de serveur) dans le localStorage
const orderId = localStorage.getItem("orderId");
//Afficher le numero de la comande "orderId" sur la page confirmation
displayOrderId(orderId);
function displayOrderId(orderId) {
  const orderIdElements = document.querySelector("#orderId");
  orderIdElements.innerText = orderId;
}

//Effacer la clé orderId dans localStorage
function removeKeyLoacalStorage(key) {
  localStorage.removeItem(key);
}
removeKeyLoacalStorage("orderId");
