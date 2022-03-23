/*### Page view and pricing totals

Here are the different page view ranges and the corresponding monthly price totals:

- 10K pageviews / $8 per month
- 50K pageviews / $12 per month
- 100K pageviews / $16 per month
- 500k pageviews / $24 per month
- 1M pageviews / $36 per month

If the visitor switches the toggle to yearly billing, a 25% discount should be applied to all prices.*/

const prices = [8, 12, 16, 24, 36]; //Our main prices
const pageViews = ['10K', '50K', '100K', '500K', '1M']; //Pageviews
const pageViewsNumber = document.querySelector("#pageviews-number"); 
const price_range = document.querySelector("#price-range");
const output = document.querySelector('#price');
const discount_prices = prices.map((value)=> value - (25/100 * value)); //25% discount on main prices
const checkbox = document.querySelector("#checkbox-ticked");



//Storing our price range value after each input for further use
let counter;


//Default price function - 16$/month
function defaultPrice(){
output.innerHTML = `<span>` + `<label class="price">$${prices[2]}.00</label>` + '<span> / month</span> </span>';
price_range.value = 2;
pageViewsNumber.textContent = pageViews[2];
counter = 2;
}


//Main prices function
function mainPrices(){
    output.innerHTML = `<span>` + `<label class="price">$${prices[this.value]}.00</label>` + '<span> / month</span> </span>';
    pageViewsNumber.textContent = pageViews[this.value];
    counter = this.value; //Update counter with the this.input value
};


//Discount prices function
function discountPrices(){
    output.innerHTML = `<span>` + `<label class="price">$${discount_prices[this.value]}.00</label>` + '<span> / month</span> </span>';
    pageViewsNumber.textContent = pageViews[this.value];
    counter = this.value;
}



//Main prices based on counter value - used to keep the same price equivalent when switching between discount price and normal price via toggle button
function mainPricesBasedOnCounterValue(value){
    output.innerHTML = `<span>` + `<label class="price">$${prices[value]}.00</label>` + '<span> / month</span> </span>';
}


//Discount prices based on counter value - used to keep the same price equivalent when switching between discount prices and normal prices via toggle button
function discountPricesBasedOnCounterValue(value){
    output.innerHTML = `<span>` + `<label class="price">$${discount_prices[value]}.00</label>` + '<span> / month</span> </span>';
}


checkbox.checked = false;//Set toggle button off by default (duh)
//Nested event listeners for on-off toggling functionality - don't try this at home
function monthly_yearly_billing(){ //Toggle button on - discount activated!
        checkbox.checked = true; //Activated button
        price_range.removeEventListener('input', mainPrices);//Remove the main prices event
        price_range.addEventListener('input', discountPrices);//Add the discount prices event
        discountPricesBasedOnCounterValue(counter);//Show discount price after toggling - eg(16$ off button - 12$ on button; 36$ off button - 27$ on button)
        this.removeEventListener('click', monthly_yearly_billing); //remove this function from within it's own context (so that it won't always fire itself first and not be able to disable the button after 2nd click)



         checkbox.addEventListener('click', function(){ //Second click event - turn off
                     checkbox.checked = false;
                     price_range.removeEventListener('input', discountPrices); //Remove discount prices event
                     price_range.addEventListener('input', mainPrices); //Add main prices event back
                     mainPricesBasedOnCounterValue(counter);//Show main price again after toggling 
                    this.addEventListener('click', monthly_yearly_billing); //Add the toggle-on function back!
        })
  
}

   
//Initial following background color on the slider - eg(soft cyan up until the range thumb, grey color on other half of the range slider)
function initialFollowingBackgroundColor_slider(){
    let value = (2-0)/(4-0)*100;
    price_range.style.background = 'linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ' + value + '%, var(--empty-slider-bar) '+ value + '%, var(--empty-slider-bar) 100%)'

}

//Same thing as above except it follows the range thumb
function followingBackgroundColor_slider(){
    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) ' + value + '%, var(--empty-slider-bar) '+ value + '%, var(--empty-slider-bar) 100%)'

}


//Add/remove discount word based on viewport (eg. mobile screens only have -25%, desktop screens have -25% discount text shown);
const discount_span = document.querySelector("#discount-text");
const desktop_media_query = window.matchMedia("(min-width: 1000px)");
const mobile_media_query = window.matchMedia("(max-width: 999px)");

const br = document.getElementById("add_remove_br");


function addDiscountWord(){
    if(desktop_media_query.matches){
        discount_span.textContent = "-25% discount";
        br.remove();
        } else if (mobile_media_query.matches){
        discount_span.textContent = "-25%";
    }
    
}



/*Event listeners*/
window.addEventListener('DOMContentLoaded',defaultPrice); //Load 16$/month - no discount first :(
window.addEventListener('DOMContentLoaded', initialFollowingBackgroundColor_slider); //Initial following background color on the slider

price_range.addEventListener('input', followingBackgroundColor_slider); //Following color on range thumb slider
price_range.addEventListener('input', mainPrices); //Show main prices on input
checkbox.addEventListener('click', monthly_yearly_billing); //Toggle button listener - no discount/discount


window.addEventListener('DOMContentLoaded', addDiscountWord); //Add/remove BR tag and add/remove discount word
window.addEventListener('resize', addDiscountWord); //Add/remove BR tag and add/remove discount word






