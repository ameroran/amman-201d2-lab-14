'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var existingTableRows = document.querySelectorAll('#cart tbody tr');

  for (var i = 0; i <= existingTableRows.length; i++) {
    if (existingTableRows[i]) {
      existingTableRows[i].remove();
    }
  }

}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // Find the table body
  var tableBody = document.querySelector('#cart tbody');

  // Iterate over the items in the cart
  for (var i in cart.items) {
    // Create a TR
    var tr = document.createElement('tr');

    // Create a TD for the delete link, quantity,  and the item
    var deleteTD = document.createElement('td');
    deleteTD.textContent = 'x';
    deleteTD.classList.add('deleter');
    deleteTD.id = i;

    var quantityTD = document.createElement('td');
    quantityTD.textContent = cart.items[i].quantity;

    var itemTD = document.createElement('td');
    itemTD.textContent = cart.items[i].product;

    var img = document.createElement('img');

    // Render product images
    for (var j = 0; j < Product.allProducts.length; j++) {
      if (cart.items[i].product === Product.allProducts[j].name) {
        img.src = Product.allProducts[j].filePath;
      }
    }

    // Add the TR to the TBODY and each of the TD's to the TR
    tableBody.appendChild(tr);

    tr.appendChild(deleteTD);
    tr.appendChild(quantityTD);
    tr.appendChild(itemTD);
    tr.appendChild(img);
  }
  var cardForm = document.createElement('form');
  cardForm.setAttribute('id', 'cardForm');
  document.body.appendChild(cardForm);

  var enterName = document.createElement('input');
  enterName.setAttribute('type', 'text');
  enterName.setAttribute('placeholder', 'Enter Name');

  var enterStreet = document.createElement('input');
  enterStreet.setAttribute('type', 'text');
  enterStreet.setAttribute('placeholder', 'Enter Street');

  var enterState = document.createElement('input');
  enterState.setAttribute('type', 'text');
  enterState.setAttribute('placeholder', 'Enter State');

  var enterZip = document.createElement('input');
  enterZip.setAttribute('type', 'number');
  enterZip.setAttribute('placeholder', 'Enter Zip');

  var enterPhone = document.createElement('input');
  enterPhone.setAttribute('type', 'number');
  enterPhone.setAttribute('placeholder', 'Enter Phone');

  var enterCreditCard = document.createElement('input');
  enterCreditCard.setAttribute('type', 'number');
  enterCreditCard.setAttribute('placeholder', 'Enter Credit Card');

  var buttonProcessOrder = document.createElement('button');
  buttonProcessOrder.setAttribute('class', 'btn');
  buttonProcessOrder.textContent = 'Process Order';

  cardForm.appendChild(enterName);

  cardForm.appendChild(enterStreet);
  cardForm.appendChild(enterState);
  cardForm.appendChild(enterZip);
  cardForm.appendChild(enterPhone);
  
  cardForm.appendChild(enterCreditCard);
  cardForm.appendChild(buttonProcessOrder);

}

function removeItemFromCart(event) {
  if (event.target.classList.contains('deleter')) {
    // When a delete link is clicked, use cart.removeItem to remove the correct item
    cart.removeItem(parseInt(event.target.id));

    // Save the cart back to local storage
    cart.saveToLocalStorage();

    // Re-draw the cart table
    renderCart();
  }
}

// This will initialize the page and draw the cart on screen
renderCart();
