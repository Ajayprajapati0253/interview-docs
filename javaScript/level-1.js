//! hoisting

//~ example with var:
// console.log(hoistedVar); 
// var hoistedVar = 'I am hoisted!';
// console.log(hoistedVar);

//~ example with function declaration:
// hoistedFunction();
// function hoistedFunction(){
//     console.log('I am a hoisted function!');
// }

// var notHoistedFunction = function(){
//     console.log('i am not hoisted expression');
// }()

//~ example with let and const (temporal dead zone):




//! Synchronous Callback (e.g., Array methods): 

function processArray(arr, callback) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(callback(arr[i]));
    }
    return newArr;
}

const numbers = [1, 2, 3];
const doubledNumbers = processArray(numbers, function(num) {
    return num * 2; // This is the callback function
});
console.log(doubledNumbers); // [2, 4, 6]

// Built-in example: forEach
numbers.forEach(function(num) {
    console.log(num); // This is the callback
});

//! Asynchronous Callback (e.g., setTimeout, Event Listeners, AJAX requests): 

console.log("Start");

setTimeout(function() {
    console.log("This message appears after 2 seconds (callback executed)");
}, 2000); // This anonymous function is the callback

console.log("End");




