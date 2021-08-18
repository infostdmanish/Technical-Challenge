var offerIsValid=false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready()

}
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked);


    var offerSettingInput = document.getElementsByClassName('OfferSetting')
    for (var i = 0; i < offerSettingInput.length; i++) {
        var input = offerSettingInput[i];
        input.addEventListener('change', offerSettingChanged);
    }

}

function purchaseClicked(){
    alert('Thank you for your Purchase');
    var cartItems=document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();

}
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function offerSettingChanged(event){
    offerIsValid=this.value;
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.children;
    var imageSrc = shopItem[0].src;
    var price = shopItem[2].innerText;
    var title = shopItem[1].innerText;
    var quantity = shopItem[4].value
    addItemToCart(title, price, imageSrc,quantity);
    updateCartTotal();
}
function addItemToCart(title, price, imageSrc,quantity) {
    var cartRow = document.createElement('div');
    //cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText==title){
            alert('Item is already added to the Cart');
            return;
        }
    }
    var cartRowContents = ` 
                <div class="cart-items">
                <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="l00" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input "type="number" value="${quantity}" min="1" max="50">
                        <button class="btn btn-danger" type="button">Remove</button>
                    </div>
                </div>
            </div>`;
    cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow);
    var removeCartItemButtons = cartItems.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = cartItems.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = parseFloat(0);
    console.log(offerIsValid);
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        var fruitsType=cartRow.getElementsByClassName('cart-item-title')[0].innerText

        if(offerIsValid==='true'){
            var costWithDiscount=calPriceWithBonusOffer(price,quantity,fruitsType);
            total = parseFloat(total) + parseFloat(costWithDiscount);
        }else{
            total = total + (price * quantity);
        }
    }
    //total = Math.round(total * 100) / 100;
    total = total.toFixed(2);

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

function calPriceWithBonusOffer(price, quantity,fruitsType){
    if(fruitsType=="Apple"){
        return calAppleCostWithOffer(price, quantity);
    }else{
       return calOrangeCostWithOffer(price, quantity)
    }
     
}
/*------- Start of Step 2: Simple offers (bonus question)-----*/

function calAppleCostWithOffer(price, numOfApples) {
       var totalCostApple = (Math.floor(numOfApples) * (price / 2)).toFixed(2);
    return totalCostApple;
}

function calOrangeCostWithOffer(price,numOfOranges) {
    var costOfOrange = price;
    var orangeDivision = numOfOranges / 3;
    var remainingOrange = numOfOranges % 3;

    var totalCostOfOrange = (Math.floor(orangeDivision) * 2 + remainingOrange) * costOfOrange;
    return totalCostOfOrange.toFixed(2);
}
/*------- End of Step 2: Simple offers (bonus question)-----*/