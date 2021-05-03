/* Select Products Element */
const productsDiv = document.querySelector('#products');

/* Products */
const products = [
  {
    name: 'iPhone 11 128GB Black',
    price: 1000,
    productID: 1,
    img: 'img/product-1.png',
    quantity: 1,
  },
  {
    name: 'iPhone 11 64GB Silver',
    price: 800,
    productID: 2,
    img: 'img/product-2.png',
    quantity: 1,
  },
  {
    name: 'Apple Watch',
    price: 400,
    productID: 3,
    img: 'img/product-3.png',
    quantity: 1,
  },
  {
    name: 'iMac',
    price: 2400,
    productID: 4,
    img: 'img/product-4.jpg',
    quantity: 1,
  },
  {
    name: 'Tennis Ball',
    price: 50,
    productID: 5,
    img: 'img/product-5.png',
    quantity: 1,
  },
  {
    name: 'Telephone',
    price: 200,
    productID: 6,
    img: 'img/product-6.png',
    quantity: 1,
  },
];

/* Display Product */
function displayProduct(products) {
  productsDiv.innerHTML = products
    .map((product, index) => {
      return /* html */ productHTML(product, index);
    })
    .join('');
}

/* Product HTML */
function productHTML(product, index) {
  return /* html */ `
  <div data-index="${index}" class="product col-md-6 col-lg-4 mt-4">
    <div class="card p-2">
      <img src="${product.img}" alt="${product.name}" class="card-img-top" />
        <div class="card-body">
          <h5 class="product-name mb-2">${product.name}</h5>
            <div class="d-flex justify-content-between">
              <h6 class="m-0">Price:</h6>
              <h6 class="price">$${product.price.toFixed(2)}</h6>
            </div>
            <div class="mt-3">
              <button onclick="addToCart(${index})" class="btn btn-warning d-block w-100">
                Add To Cart
              </button>
            </div>
        </div>
      </div>
    </div> 
  `;
}

/* Add To Cart */
function addToCart(index) {
  if (cart.indexOf(products[index]) != -1) {
    products[index].quantity++;
    // Update DOM
    displayCartItem(cart);
    handleCheckout(cart);
    return;
  }

  cart.push(products[index]);

  // Show Success Message
  const successMsg = document.querySelector('#cart-added');
  successMsg.classList.add('show');
  setTimeout(() => successMsg.classList.remove('show'), 2500);

  // Update DOM
  displayCartItem(cart);
  handleCheckout(cart);
  // Update Cart Item Number
  itemNum.innerHTML = cart.length;
}

/* Select Cart Element */
const cartDiv = document.querySelector('#cart');

/* Cart */
const cart = [];

/* Display Product */
function displayCartItem(products) {
  cartDiv.innerHTML = products
    .map((product, index) => {
      return cartItemHTML(product, index);
    })
    .join('');
}

/* Cart Item HTML */
function cartItemHTML(product, index) {
  return /* html */ `
  <div data-index="${index}" class="cart-item bg-white py-3 px-3 px-sm-5 rounded my-3">
  <div class="d-lg-flex justify-content-between align-items-center">
    <div class="d-md-flex align-items-center">
      <img
        src="${product.img}"
        alt="${product.name}"
        class="product-img img-fluid"
      />
      <h5 class="product-name ml-md-5">${product.name}</h5>
    </div>
    <div class="mt-3 mt-lg-0">
      <span onclick="deccreamentQuantity(${index})" class="minus"><i class="fa fa-minus"></i></span>
      <input
        onchange="changeQuantity(${index}, this)"
        type="text"
        class="quantity text-center border-0 rounded bg-light mx-3"
        value="${product.quantity}"
      />
      <span onclick="increamentQuantity(${index})" class="plus"><i class="fa fa-plus"></i></span>
      <span class="mx-3 multiply"><i class="fa fa-times text-dark"></i
      ></span>
      <h4 class="price d-inline-block my-0 mr-5 ">$${product.price.toFixed(
        2
      )}</h4>
      <span onclick="removeProduct(${index})" class="remove"
        ><i class="fa fa-times text-danger"></i
      ></span>
    </div>
  </div>
</div>
`;
}

/* Decreament Quantity */
function deccreamentQuantity(index) {
  if (cart[index].quantity < 2) return;
  cart[index].quantity--;
  // Update DOM
  displayCartItem(cart);
  handleCheckout(cart);
}

/* Increament Quantity */
function increamentQuantity(index) {
  cart[index].quantity++;
  // Update DOM
  displayCartItem(cart);
  handleCheckout(cart);
}

/* Change Quantity */
function changeQuantity(index, self) {
  if (+self.value < 1) return;
  cart[index].quantity = +self.value;
  // Update DOM
  displayCartItem(cart);
  handleCheckout(cart);
}

/* Remove Product From Cart */
function removeProduct(index) {
  cart.splice(index, 1);
  // Update DOM
  displayCartItem(cart);
  handleCheckout(cart);
  // Update Cart Item Number
  itemNum.innerHTML = cart.length;
}

/* Checkout Process */
/* Select Checkout Elements */
const checkoutDiv = document.querySelector('#checkout-process');

/* Handle Checkout */
function handleCheckout(products) {
  if (products.length < 1) {
    checkoutDiv.innerHTML = 'Your cart is Empty!';
    return;
  }

  // Subtotal Price
  const subtotal = products
    .map((product) => product.price * product.quantity)
    .reduce((total, price) => total + price);

  checkoutDiv.innerHTML = /* html */ `
    <div class="subtotal d-flex justify-content-between">
      <h5>SubTotal:</h5>
      <h5 class="subtotal">$${subtotal.toFixed(2)}</h5>
    </div>
    <div class="vat d-flex justify-content-between">
      <h5>Vat:</h5>
      <h5 class="vat">$${Number(0).toFixed(2)}</h5>
    </div>
    <div class="total d-flex justify-content-between">
      <h5>Total:</h5>
      <h5 class="total">$${subtotal.toFixed(2)}</h5>
    </div>
    <div class="text-right mt-3">
      <button onclick="confirmOrder()" class="btn btn-success">Checkout</button>
    </div>`;
}

/* Confirm Order */
function confirmOrder() {
  const ordered = cart;
  console.table(ordered);
}

/* Navbar Realated */
const goToHomes = document.querySelectorAll('.go-to-home');
const viewCarts = document.querySelectorAll('.view-cart');
const productsSection = document.querySelector('#products-section');
const cartSection = document.querySelector('#cart-section');
const itemNum = document.querySelector('#item-num');
// Show Real Time Cart Item Number
itemNum.innerHTML = cart.length;

/* Scroll Top */
function scrollTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/* Go To Home */
function homePage() {
  productsSection.classList.add('d-block');
  productsSection.classList.remove('d-none');

  cartSection.classList.add('d-none');
  cartSection.classList.remove('d-block');

  // Scroll Top
  scrollTop();
}

/* View Cart */
function cartPage() {
  productsSection.classList.add('d-none');
  productsSection.classList.remove('d-block');

  cartSection.classList.add('d-block');
  cartSection.classList.remove('d-none');

  // Scroll Top
  scrollTop();
}

goToHomes.forEach((goToHome) => goToHome.addEventListener('click', homePage));
viewCarts.forEach((viewCart) => viewCart.addEventListener('click', cartPage));

/* Init */
function init() {
  displayProduct(products);
  displayCartItem(cart);
  handleCheckout(cart);
}

/* Call Init() */
init();
