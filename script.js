document.addEventListener("DOMContentLoaded", function() {
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let cartValue = document.querySelector("#cart-value");
// cart click to show the box
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});
// remove btn click box to remove
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    if (cartContent.children.length === 0) {
        alert("Sorry, no items to cart.");
    } else {
        // alert("Your Order is placed");
        window.location.href = 'buy.html';
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    updateCartCount();
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added this item to cart');
            return;
        }
    }


    var cartBoxContent = `
        <img src="${productImg}" class="cart-img" alt="" srcset="">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-solid fa-trash-alt cart-remove"></i>
    `;


    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    const cartCount = document.getElementById('cart-value');
    cartCount.textContent = cartBoxes.length;
    var total = 0;


    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;

}

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
//cart click value increse 
function updateCartCount() {
    const cartCount = document.getElementById('cart-value');
    cartCount.textContent = cart.length;
}

//del tag function:----------------------------


let res = document.getElementById("del");
res.style.textDecoration = "line-through";
let res1 = document.getElementById("del1");
res1.style.textDecoration = "line-through";
let res2 = document.getElementById("del2");
res2.style.textDecoration = "line-through";
let res3 = document.getElementById("del3");
res3.style.textDecoration = "line-through";
let res4 = document.getElementById("del4");
res4.style.textDecoration = "line-through";
let res5 = document.getElementById("del5");
res5.style.textDecoration = "line-through";
let res6 = document.getElementById("del6");
res6.style.textDecoration = "line-through";
let res7 = document.getElementById("del7");
res7.style.textDecoration = "line-through";


//contact page function:------------------------------


document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation (you can expand this)
    if (name && email && message) {
        // Display a success message (you can send the data to a server here)
        document.getElementById('responseMessage').innerText = "Thank you for your message, " + name + "!";

        // Clear the form
        document.getElementById('contactForm').reset();
    } else {
        document.getElementById('responseMessage').innerText = "Please fill in all fields.";
    }
});

//review page function:------------------------


const reviewList = document.getElementById('reviewList');
const reviewForm = document.getElementById('reviewForm');

reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;

    if (username && reviewText && rating) {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <h4>${username} - ${rating} Stars</h4>
            <p>${reviewText}</p>
        `;
        reviewList.appendChild(reviewDiv);

        // Clear the form
        reviewForm.reset();
    }
});


// footer page subscribe button click function------------------------------------

document.getElementById('subscribeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    alert(`Thank you for subscribing with ${email}!`);

    // Clear the email input
    document.getElementById('subscribeForm').reset();
});

//search icon click function:----------------------------------------


const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');

searchButton.addEventListener('click', function () {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        alert(`You searched for: ${searchTerm}`);
        // document.getElementsByName('search').reset();
        searchBox.value = '';
    } 
    
    else {
        alert('Please enter a search term.');
    }
    
});

//view more button click function:--------------------------------

const viewMoreButton = document.getElementById('viewMoreButton');
viewMoreButton.addEventListener('click', function () {

    window.location.href = 'https://top10mobiles.com/';
});
});
