// ========================================
// Pizza Ordering App
// ========================================


// ----------------------------------------
// Pizza prices
// ----------------------------------------

const pizzaPrices = {

    Small: 5,

    Medium: 8,

    Large: 12

};


// ----------------------------------------
// Create a Promise
// ----------------------------------------

function preparePizza(name, pizza, size) {

    return new Promise(function(resolve, reject) {

        console.log("Pizza preparation started...");


        setTimeout(function() {

            // Simulate successful preparation

            const pizzaReady = true;


            if (pizzaReady) {

                resolve({
                    name: name,
                    pizza: pizza,
                    size: size
                });

            } else {

                reject("Sorry, we could not prepare your pizza.");

            }

        }, 3000);

    });

}


// ----------------------------------------
// Main async function
// ----------------------------------------

async function startOrder() {

    // Get values using jQuery

    const name = $("#customerName").val().trim();

    const pizza = $("#pizzaType").val();

    const size = $("#pizzaSize").val();


    // ------------------------------------
    // Validate name
    // ------------------------------------

    if (name === "") {

        $("#nameError").text(
            "Please enter your name."
        );

        $("#customerName").focus();

        return;

    }


    // Remove previous error

    $("#nameError").text("");


    // ------------------------------------
    // Calculate price
    // ------------------------------------

    const price = pizzaPrices[size];


    // ------------------------------------
    // Change UI
    // ------------------------------------

    $("#orderBtn").prop("disabled", true);

    $("#loading").show();

    $("#result").html("");


    // ------------------------------------
    // Try asynchronous operation
    // ------------------------------------

    try {

        console.log("Waiting for pizza...");


        // Wait for Promise

        const order = await preparePizza(
            name,
            pizza,
            size
        );


        // --------------------------------
        // Pizza is ready
        // --------------------------------

        console.log("Pizza is ready!");


        $("#loading").hide();


        $("#result").html(`

            <div class="success">

                🎉 Order Ready!

                <br><br>

                Hello ${order.name}! 👋

                <br>

                Your ${order.size}
                ${order.pizza} pizza is ready!

                <br>

                Price: $${price}

                <br><br>

                Enjoy your pizza! 🍕

            </div>

        `);


    } catch (error) {

        // --------------------------------
        // Something went wrong
        // --------------------------------

        $("#loading").hide();


        $("#result").html(`

            <div class="error">

                ❌ ${error}

            </div>

        `);

    }


    // Enable button again

    $("#orderBtn").prop("disabled", false);

}


// ----------------------------------------
// jQuery click event
// ----------------------------------------

$("#orderBtn").click(function() {

    startOrder();

});