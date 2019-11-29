/* global Cart */
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

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
var old_tbody = document.getElementsByTagName('tbody');
var new_tbody = document.createElement('tbody');
populate_with_new_rows(new_tbody);
old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  var tbodyEl = document.getElementsByTagName('tbody');
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  var trEl = document.createElement('tr');
  // TODO: Create a TD for the delete link, quantity,  and the item
  var tdEl = document.createElement('td');
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  // table.appendChild(tbodyEl);
  tbodyEl.appendChild(trEl);
  trEl.appendChild(tdEl);
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  
  // TODO: Save the cart back to local storage
  var items = JSON.stringify(Cart.items);
  localStorage.setItem("cart", items);  
  // TODO: Re-draw the cart table
  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
