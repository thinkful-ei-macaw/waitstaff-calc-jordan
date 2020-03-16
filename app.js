const store = {
  tip: 0,
  numberOfMeals: 0, 
};


const handleMealSubmit = () => {
  $('#submit-order').click(function (event) {
    event.preventDefault();
    let mealPrice = $('#meal-price').val();
    let taxRate = $('#tax-percentage').val();
    let tipPercentage = $('#tip-percentage').val();

    $('.charge-details').html(displayCharges(mealPrice, taxRate, tipPercentage));
    $('.earning-details').html(earningDetails);
  });
};

const displayCharges = (mealPrice, taxRate, tipPercentage) => {
console.log(mealPrice);
  let subtotal = (parseInt(mealPrice) + (parseInt(mealPrice) * (taxRate / 100))).toFixed(2);
  let tip = (parseInt(mealPrice)) * (tipPercentage / 100).toFixed(2);
  let total = (parseInt(subtotal) + parseInt(tip));

  store.tip += parseFloat(tip);
  store.numberOfMeals++;

return `

<section>
    <div class="subtotal">
        <h4>Subtotal</h4>
        <h4>${subtotal}</h4>
    </div>
    <div class="tip">
        <h4>Tip</h4>
        <h4>${tip}</h4>
    </div>
    <div class="total">
        <h4>Total</h4>
        <h4>${total}</h4>
    </div>
</section>

`;
 
};


const earningDetails = () => {
    let avg = store.tip / store.numberOfMeals;
    let avgMealTip = avg.toFixed(2);

    let tip = store.tip.toFixed(2);

    return `
        <section>
            <div id="display-tip-total">
                <h4>Tip Total</h4>
                <h4>${tip}</h4>
            </div>
            <div id="display-meal-count">
                <h4>Meal Count</h4>
                <h4>${store.numberOfMeals}</h4>
            </div>
            <div id="display-avg-tip">
                <h4>Average Tip Per Meal</h4>
                <h4>${avgMealTip}</h4>
            </div>
            </section>
    
    `;
};


const myEarningsInfo = () => {
    return `
      <section>
      <div class="tip-total">
          <h4 class="title">Tip Total:</h4>
          <h4 class="number">0.00</h4>
      </div>
      <div class="meal-count">
          <h4 class="title">Meal Count:</h4>
          <h4 class="number">0</h4>
      </div>
      <div class="avg-tip-per-meal">
          <h4 class="title">Average Tip Per Meal:</h4>
          <h4 class="number">0.00</h4>
      </div>
      </section>
    `;
}



const resetButton = () => {
    $('#reset-app').click( e => {
        e.preventDefault();
        store.tip = 0;
        store.numberOfMeals = 0;

           $('.charge-details').html(renderDefault());
           $('.meal-details').html(renderForm());
           $('.earning-details').html(myEarningsInfo());
    })
}

const handleMealCancel = () => {
    $('form').on('click', '#cancel-order', e => {
        e.preventDefault();

        $('.charge-details').html(renderDefault());
        $('.meal-details').html(renderForm());

    });
};

const renderDefault = () => {
    return `
    <section>
      <div class="subtotal">
          <h4 class="title">Subtotal</h4>
          <h4 class="number">0.00</h4>
      </div> 
      <div class="tip">
          <h4 class="title">Tip</h4>
          <h4 class="number">0.00</h4>
      </div>
      <div class="total">
          <h4 class="title">Total</h4>
          <h4 class="number">0.00</h4>
      </div>
      </section>
    `;
};

const renderForm = () => {
    return `
       <section>
    <div class="meal-price">
        <label for="meal-price">Base Meal Price: $</label>
        <input type="number" name="price" placeholder="15.00" id="meal-price" required/>
    </div>
    <div class="tax-percentage">
        <label for="tax-rate">Tax Rate: %</label>
        <input type="number" id="tax-percentage" required/>
    </div>
    <div class="tip-percentage">
        <label for="tip-percentage">Tip Percentage: %</label>
        <input type="number" id="tip-percentage" required>
    </div>
    <div class="buttons">
        <button type="submit" id="submit-order"">Submit</button>
        <button type="submit" id="cancel-order">Cancel</button>
    </div>
    </section>
    `;
};


// Renders when page first loads 

const renderMainDisplay = () => {
  $('main').html(`<h1>Waitstaff Calculator</h1>
  
  <section>
    <h2>Enter the Meal Details</h2>
        <form>
            <div>
                <label for="meal-price">Base Meal Price:</label>
                <input type="number" id="meal-price">
            </div>
            <div>
                <label for="Tax Rate">Tax Rate: %</label>
                <input type="number" id="tax-percentage">
            </div>
            <div>
                <label for="tip-percentage">Tip Percentage:</label>
                <input type="number" id="tip-percentage">
            </div>
            <div class=buttons>
                <button id="submit-order" type="submit">Submit</button>
                <button id="cancel-order" type="submit">Cancel</button>
            </div>
        </form>
  </section>

  <section>
    <div class="charge-details">
        <h2>Customer Charges</h2>
        <div class="subtotal">
            <h4>Subtotal</h4>
            <h4>0.00</h4>
        </div>
        <div class="tip">
            <h4>Tip</h4>
            <h4>0.00</h4>
        </div>
        <div class="total">
            <h4>Total</h4>
            <h4>0.00</h4>
        </div>
    </div>

    </section>

  <section class="earnings-info">
        <h2>My Earnings Info</h2>
        <div class="earning-details">
            <div class="display-tip-total">
                <h4>Tip total</h4>
                <h4>0.00</h4>
            </div>
            <div class="display-meal-count">
                <h4>Meal Count</h4>
                <h4>0</4>
            </div>
            <div id="display-avg-tip">
                <h4>Average Tip Per Meal</h4>
                <h4>0.00<h4>
            </div>
        </div>
  </section>

  <section> 
  <button id="reset-app" type="submit">Reset</button>
  </section> 

  `);

};



const calcEventListeners = () => {
handleMealSubmit();
handleMealCancel();
resetButton();
};


function renderCalculator() {
  renderMainDisplay();
  calcEventListeners();

}

renderCalculator();