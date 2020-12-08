/* Lesson 3 */
const DEBUG = true
const debug = (text) => {
    if (DEBUG) { console.log("debug: " + text) }
}

/* FUNCTIONS */

// Step 1: Using function declaration, define a function named add that takes two arguments, number1 and number2
// Step 2: In the function, return the sum of the parameters number1 and number2
var add = function(arg1, arg2) { return arg1 + arg2 }

// Step 3: Step 3: Using function declaration, define another function named addNumbers that gets the values of two HTML form controls with IDs of addend1 and addend2. Pass them to the add function
var addNumbersFromHTML = function(addend1, addend2) {
    var sum = add(
        parseFloat(document.getElementById(addend1).value),
        parseFloat(document.getElementById(addend2).value)
    )
    console.log("sum: " + sum)
    return sum
}

// Step 4: Assign the return value to an HTML form element with an ID of sum
document.getElementById("sum").value = addNumbersFromHTML("addend1", "addend2")

// Step 5: Add a "click" event listener to the HTML button with an ID of addNumbers that calls the addNumbers function
document.getElementById("addNumbers").addEventListener("click", function() {
    document.getElementById("sum").value = addNumbersFromHTML("addend1", "addend2")
})

// Step 6: Using function expressions, repeat Steps 1-5 with new functions named subtract and subtractNumbers and HTML form controls with IDs of minuend, subtrahend, difference and subtractNumbers

// define subtract
function subtract(arg1, arg2) { return arg1 - arg2 }

// define specifically for html tag
function subtractNumbersFromHTML(minuend, subtrahend) {
    var diff = subtract(
        parseFloat(document.getElementById(minuend).value),
        parseFloat(document.getElementById(subtrahend).value)
    )
    console.log("difference: " + diff)
    return diff
}

// test
document.getElementById("subtractNumbers").value = subtractNumbersFromHTML("minuend", "subtrahend")

// add event listener
document.getElementById("subtractNumbers").addEventListener("click", function() {
    document.getElementById("difference").value = subtractNumbersFromHTML("minuend", "subtrahend")
})

// Step 7: Using arrow functions, repeat Steps 1-5 with new functions named multiply and mulitplyNumbers and HTML form controls with IDs of factor1, factor2, product and multiplyNumbers

// define multiply (define specifically for html tag)
// *inline* function name = (arguments) => function contents
var multiply = (arg1, arg2) => arg1 * arg2
multiplyFromHTML = (factor1, factor2) => {
    var prod = multiply(
        parseFloat(document.getElementById(factor1).value),
        parseFloat(document.getElementById(factor2).value)
    )
    console.log("product: " + prod)
    document.getElementById("product").value = prod
    return prod
}

// test
document.getElementById("subtractNumbers").value = multiplyFromHTML("factor1", "factor2")

// add event listener
document.getElementById("multiplyNumbers").addEventListener("click", function() {
    document.getElementById("product").value = multiplyFromHTML("factor1", "factor2")
})

// Step 8: Using any of the three function declaration types, repeat Steps 1-5 with new functions named divide and divideNumbers and HTML form controls with IDs of dividend, divisor, quotient and divideNumbers
var divide = (arg1, arg2) => arg1 / arg2

function divideFromHTML(numerator, denominator) {
    var quot = divide(
        parseFloat(document.getElementById(numerator).value),
        parseFloat(document.getElementById(denominator).value)
    )
    console.log("quotient: " + quot)
    document.getElementById("quotient").value = quot
    return quot
}

document.getElementById("quotient").value = divideFromHTML("dividend", "divisor")

document.getElementById("divideNumbers").addEventListener("click", function() {
    divideFromHTML("dividend", "divisor")
})

// Step 9: Test all of the mathematical functionality of the task3.html page.


/* BUILT-IN METHODS */

// Step 1: Declare and instantiate a variable of type Date to hold the current date
var currentDate = new Date()
debug("Current date: " + currentDate)

// Step 2: Declare a variable to hold the current year
// Step 3: Using the variable declared in Step 1, call the built-in getFullYear() method/function and assign it to the variable declared in Step 2
var currentYear = currentDate.getFullYear()
debug("Current year: " + currentYear)

// Step 4: Assign the current year variable to an HTML form element with an ID of year
function assignToTagWithID(ID, whatToAssign) {
    document.getElementById(ID).innerHTML = whatToAssign
}

assignToTagWithID("year", currentYear)


/* ARRAY METHODS */

// Step 1: Declare and instantiate an array variable to hold the numbers 1 through 25
var array = []
for (var i = 1; i <= 25; i++) {
    array.push(i)
    debug(i)
}

// Step 2: Assign the value of the array variable to the HTML element with an ID of "array"
assignToTagWithID("array", array)
debug("all: " + array)

// Step 3: Use the filter array method to find all of the odd numbers of the array variable 
// and assign the reult to the HTML element with an ID of "odds" ( hint: % (modulus operartor) )
var isOdd = (a) => a % 2
assignToTagWithID("odds", array.filter(function(a) { return a % 2 }))
debug("odds: " + array.filter(function(a) { return a % 2 }))

// Step 4: Use the filter array method to find all of the even numbers of the array variable and 
// assign the result to the HTML element with an ID of "evens"
var isEven = (a) => !isOdd(a)
assignToTagWithID("evens", array.filter(isEven))
debug("evens: " + array.filter(isEven))

// Step 5: Use the reduce array method to sum the array variable elements and assign the result 
// to the HTML element with an ID of "sumOfArray"
assignToTagWithID("sumOfArray", array.reduce(add))
debug("sumOfArray: " + array.reduce(add))

// Step 6: Use the map array method to multiple each element in the array variable by 2 and 
// assign the result to the HTML element with an ID of "multiplied"
assignToTagWithID("multiplied", array.map((a) => a * 2))
debug("multiplied: " + array.map((a) => a * 2))

// Step 7: Use the map and reduce array methods to sum the array elements after multiplying 
// each element by two.  Assign the result to the HTML element with an ID of "sumOfMultiplied"
assignToTagWithID("sumOfMultiplied", array.map((a) => a * 2).reduce(add))
debug("sumOfMultiplied: " + array.map((a) => a * 2).reduce(add))