# JavaScript Interview Preparation Guide

This guide covers JavaScript concepts from basic to advanced, with theory, examples, and common interview questions.

## Table of Contents

1.  [Basics](#basics)
    *   [Variables and Data Types](#variables-and-data-types)
    *   [Operators](#operators)
    *   [Control Flow](#control-flow)
    *   [Functions](#functions)
2.  [Intermediate](#intermediate)
    *   [Scope and Closures](#scope-and-closures)
    *   [`this` Keyword](#this-keyword)
    *   [Prototypes and Inheritance](#prototypes-and-inheritance)
    *   [Asynchronous JavaScript](#asynchronous-javascript)
3.  [Advanced](#advanced)
    *   [Event Loop](#event-loop)
    *   [Design Patterns](#design-patterns)
    *   [Memory Management](#memory-management)
    *   [Web Workers](#web-workers)
4.  [Common Interview Questions](#common-interview-questions)

## 1. Basics

### Variables and Data Types

**Theory:**

Variables are containers for storing data. JavaScript is a dynamically typed language, meaning you don't have to specify the data type of a variable when you declare it. The data type is determined automatically when the program is processed. There are several primitive data types and one complex data type.

**Primitive Data Types:**
*   **String:** Represents textual data (e.g., `'hello'`, `"world"`).
*   **Number:** Represents both integer and floating-point numbers (e.g., `10`, `3.14`).
*   **Boolean:** Represents a logical entity and can have two values: `true` or `false`.
*   **Undefined:** A variable that has been declared but not assigned a value.
*   **Null:** Represents the intentional absence of any object value. It is a primitive value.
*   **Symbol (ES6):** A unique and immutable data type often used to identify object properties.
*   **BigInt (ES11):** Represents whole numbers larger than 2^53 - 1.

**Complex Data Type:**
*   **Object:** A collection of key-value pairs. Arrays and Functions are also types of objects.

**Variable Declaration Keywords:**
*   `var`: Oldest way to declare variables. Function-scoped and can be re-declared and re-assigned.
*   `let` (ES6): Block-scoped. Can be re-assigned but not re-declared within the same scope.
*   `const` (ES6): Block-scoped. Cannot be re-assigned or re-declared. Must be initialized at declaration.

**Examples:**

```javascript
// var declaration
var oldSchoolVar = "I am old school";
console.log(oldSchoolVar); // I am old school
oldSchoolVar = "I can be re-assigned";
console.log(oldSchoolVar); // I can be re-assigned

// let declaration
let modernVar = "I am modern";
console.log(modernVar); // I am modern
modernVar = "I can be re-assigned too";
console.log(modernVar); // I can be re-assigned too

// const declaration
const constantVar = "I am constant";
console.log(constantVar); // I am constant
// constantVar = "Cannot re-assign"; // This would throw an error

// Data Types
let myString = "Hello, JavaScript!"; // String
let myNumber = 123; // Number
let myBoolean = true; // Boolean
let myUndefined; // Undefined
let myNull = null; // Null

let myObject = { name: "Alice", age: 30 }; // Object
let myArray = [1, 2, 3]; // Object (Array)
let myFunction = function() { console.log("Hello"); }; // Object (Function)

console.log(typeof myString);    // string
console.log(typeof myNumber);    // number
console.log(typeof myBoolean);   // boolean
console.log(typeof myUndefined); // undefined
console.log(typeof myNull);      // object (a historical bug, it's a primitive)
console.log(typeof myObject);    // object
console.log(typeof myArray);     // object
console.log(typeof myFunction);  // function
```

### Operators

**Theory:**

Operators are symbols that perform operations on operands (values or variables). JavaScript supports various types of operators:

*   **Arithmetic Operators:** Perform mathematical calculations (`+`, `-`, `*`, `/`, `%`, `**`, `++`, `--`).
*   **Assignment Operators:** Assign values to variables (`=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`).
*   **Comparison Operators:** Compare two values and return a boolean result (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`).
*   **Logical Operators:** Combine or negate boolean expressions (`&&` (AND), `||` (OR), `!` (NOT)).
*   **Bitwise Operators:** Perform operations on binary representations of numbers (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`).
*   **Unary Operators:** Operate on a single operand (e.g., `typeof`, `-` (negation), `+` (unary plus)).
*   **Ternary (Conditional) Operator:** A shorthand for an `if-else` statement (`condition ? expressionIfTrue : expressionIfFalse`).

**Examples:**

```javascript
// Arithmetic Operators
let a = 10;
let b = 5;
console.log(a + b); // 15
console.log(a - b); // 5
console.log(a * b); // 50
console.log(a / b); // 2
console.log(a % b); // 0 (remainder)
console.log(a ** 2); // 100 (exponentiation)

// Assignment Operators
let x = 10;
x += 5; // x = x + 5; x is now 15
console.log(x);

// Comparison Operators
let num1 = 10;
let num2 = '10';
console.log(num1 == num2);  // true (loose equality, compares value only)
console.log(num1 === num2); // false (strict equality, compares value and type)
console.log(num1 != num2);  // false
console.log(num1 !== num2); // true

// Logical Operators
let isAdult = true;
let hasLicense = false;
console.log(isAdult && hasLicense); // false (AND)
console.log(isAdult || hasLicense); // true (OR)
console.log(!isAdult); // false (NOT)

// Ternary Operator
let age = 20;
let status = (age >= 18) ? 'Adult' : 'Minor';
console.log(status); // Adult
```

### Control Flow

**Theory:**

Control flow statements allow you to execute code blocks based on certain conditions or to repeat code blocks multiple times. This enables dynamic and interactive programs.

*   **Conditional Statements:**
    *   `if...else if...else`: Executes a block of code if a specified condition is true. If the condition is false, another block can be executed.
    *   `switch`: Evaluates an expression and executes code based on matching `case` values.

*   **Looping Statements:**
    *   `for`: Repeats a block of code a specified number of times.
    *   `while`: Repeats a block of code as long as a specified condition is true.
    *   `do...while`: Similar to `while`, but the block of code is executed at least once before the condition is tested.
    *   `for...in`: Iterates over the enumerable properties of an object.
    *   `for...of` (ES6): Iterates over iterable objects (like Arrays, Strings, Maps, Sets, etc.).

*   **Jump Statements:**
    *   `break`: Terminates the current loop or `switch` statement.
    *   `continue`: Skips the current iteration of a loop and continues with the next iteration.

**Examples:**

```javascript
// if...else if...else
let temperature = 25;

if (temperature < 0) {
  console.log("It's freezing!");
} else if (temperature >= 0 && temperature < 20) {
  console.log("It's cold.");
} else {
  console.log("It's warm."); // Output: It's warm.
}

// switch statement
let day = 'Monday';

switch (day) {
  case 'Monday':
    console.log("Start of the week.");
    break;
  case 'Friday':
    console.log("End of the week.");
    break;
  default:
    console.log("Midweek.");
}

// for loop
for (let i = 0; i < 3; i++) {
  console.log("For loop iteration: " + i);
}
// Output:
// For loop iteration: 0
// For loop iteration: 1
// For loop iteration: 2

// while loop
let count = 0;
while (count < 3) {
  console.log("While loop iteration: " + count);
  count++;
}
// Output:
// While loop iteration: 0
// While loop iteration: 1
// While loop iteration: 2

// for...in loop (for objects)
const person = { name: "Bob", age: 40 };
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Bob
// age: 40

// for...of loop (for iterables like arrays)
const colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}
// Output:
// red
// green
// blue

// break and continue
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip 2
  }
  if (i === 4) {
    break;    // Stop at 4
  }
  console.log("Break/Continue example: " + i);
}
// Output:
// Break/Continue example: 0
// Break/Continue example: 1
// Break/Continue example: 3
```

### Functions

**Theory:**

Functions are blocks of code designed to perform a particular task. They allow you to encapsulate logic, make your code reusable, and organize it effectively. In JavaScript, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.

**Types of Functions:**
*   **Function Declarations:** Defined using the `function` keyword. They are hoisted, meaning they can be called before they are defined in the code.
*   **Function Expressions:** Functions assigned to a variable. They are not hoisted and can only be called after they are defined.
*   **Arrow Functions (ES6):** A more concise way to write function expressions. They have a shorter syntax and do not have their own `this` context (they inherit `this` from the enclosing lexical context).

**Key Concepts:**
*   **Parameters and Arguments:** Parameters are the named variables listed in the function definition. Arguments are the real values passed to the function when it is called.
*   **Return Statement:** Functions can return a value using the `return` keyword. If no `return` statement is specified, the function returns `undefined`.
*   **Scope:** Functions create their own scope (function scope). Variables declared inside a function are not accessible from outside the function.

**Examples:**

```javascript
// Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice")); // Hello, Alice!

// Function Expression
const sayHello = function(name) {
  return "Hi, " + name + "!";
};
console.log(sayHello("Bob")); // Hi, Bob!

// Arrow Function
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8

const multiply = (a, b) => {
  const result = a * b;
  return result;
};
console.log(multiply(4, 2)); // 8

// Function with no return (returns undefined implicitly)
function logMessage(message) {
  console.log(message);
}
let result = logMessage("This is a message."); // This is a message.
console.log(result); // undefined

// Default Parameters (ES6)
function greetUser(name = "Guest") {
  return "Welcome, " + name + "!";
}
console.log(greetUser()); // Welcome, Guest!
console.log(greetUser("Charlie")); // Welcome, Charlie!

// Rest Parameters (ES6)
function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Immediately Invoked Function Expression (IIFE)
(function() {
  var iifeVar = "I am in an IIFE";
  console.log(iifeVar);
})();
// console.log(iifeVar); // Throws ReferenceError: iifeVar is not defined
```

## 2. Intermediate

### Scope and Closures

**Theory:**

**Scope** determines the accessibility of variables, objects, and functions from different parts of the code. In JavaScript, there are three main types of scope:

*   **Global Scope:** Variables declared outside any function or block are in the global scope and are accessible from anywhere in the code.
*   **Function Scope (Local Scope):** Variables declared inside a function are function-scoped and are only accessible within that function.
*   **Block Scope (ES6 `let` and `const`):** Variables declared with `let` or `const` inside a block (e.g., `if` statement, `for` loop, or simply `{}`) are block-scoped and are only accessible within that block.

**Closures** are a fundamental concept in JavaScript. A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

**Key characteristics of Closures:**
*   **Data Privacy:** Closures allow you to create private variables and functions.
*   **Stateful Functions:** Functions can maintain state between multiple calls.

**Examples:**

```javascript
// Global Scope
const globalVar = "I am global";

function showGlobal() {
  console.log(globalVar); // Accessible from here
}
showGlobal(); // Output: I am global

// Function Scope
function functionScopeExample() {
  const functionVar = "I am function-scoped";
  console.log(functionVar);
}
functionScopeExample(); // Output: I am function-scoped
// console.log(functionVar); // ReferenceError: functionVar is not defined

// Block Scope
if (true) {
  let blockVar = "I am block-scoped";
  const anotherBlockVar = "I am also block-scoped";
  console.log(blockVar);      // Output: I am block-scoped
  console.log(anotherBlockVar); // Output: I am also block-scoped
}
// console.log(blockVar); // ReferenceError: blockVar is not defined

// Closure Example
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log("Outer Variable: " + outerVariable);
    console.log("Inner Variable: " + innerVariable);
  };
}

const newFunction = outerFunction("Hello");
newFunction("World");
// Output:
// Outer Variable: Hello
// Inner Variable: World

// Counter example using closure for private variable
function createCounter() {
  let count = 0; // This 'count' variable is private

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter1.getCount());  // 2

const counter2 = createCounter(); // New independent counter
console.log(counter2.increment()); // 1
```

### `this` Keyword

**Theory:**

The `this` keyword in JavaScript is one of the most misunderstood concepts. Its value depends on how the function is called, not where it is defined. It refers to the object that is executing the current function.

Here are the main rules for `this` binding:

*   **Global Context:** In the global execution context (outside of any function), `this` refers to the global object (e.g., `window` in browsers, `global` in Node.js).
*   **Function Context (Simple Function Call):** In a regular function call (not a method of an object), `this` also refers to the global object (or `undefined` in strict mode).
*   **Method Context:** When a function is called as a method of an object, `this` refers to the object that owns the method.
*   **Constructor Context:** When a function is used as a constructor with the `new` keyword, `this` refers to the newly created instance of the object.
*   **Explicit Binding (`call`, `apply`, `bind`):**
    *   `call()` and `apply()`: Allow you to invoke a function immediately and specify the `this` context. The difference is how arguments are passed (`call` takes arguments individually, `apply` takes an array of arguments).
    *   `bind()`: Returns a new function with `this` bound to a specific object. The function is not invoked immediately.
*   **Arrow Functions:** Arrow functions do not have their own `this` context. Instead, they lexically bind `this`, meaning they inherit `this` from the enclosing (parent) scope at the time they are defined.

**Examples:**

```javascript
// 1. Global Context
console.log(this === window); // In browsers: true (or global in Node.js)

// 2. Function Context (Simple Function Call)
function showThis() {
  console.log(this);
}
showThis(); // In browsers: window object (or undefined in strict mode)

// 3. Method Context
const myObject = {
  name: "MyObject",
  greet: function() {
    console.log("Hello from " + this.name);
  }
};
myObject.greet(); // Output: Hello from MyObject

const anotherObject = {
  name: "AnotherObject",
  myMethod: myObject.greet
};
anotherObject.myMethod(); // Output: Hello from AnotherObject (this refers to anotherObject)

// 4. Constructor Context
function Person(name) {
  this.name = name;
}
const person1 = new Person("Alice");
console.log(person1.name); // Alice

// 5. Explicit Binding
const car = {
  brand: "Toyota",
  displayBrand: function() {
    console.log(this.brand);
  }
};

const anotherCar = {
  brand: "Honda"
};

car.displayBrand.call(anotherCar);   // Output: Honda
car.displayBrand.apply(anotherCar);  // Output: Honda

const displayHonda = car.displayBrand.bind(anotherCar);
displayHonda(); // Output: Honda (function called later)

// 6. Arrow Functions vs. Regular Functions with `this`
const user = {
  name: "John",
  logRegular: function() {
    setTimeout(function() {
      // 'this' here refers to the global object (window/undefined in strict)
      // because it's a regular function call within setTimeout
      console.log("Regular function: " + this.name);
    }, 100);
  },
  logArrow: function() {
    setTimeout(() => {
      // 'this' here lexically binds to the 'user' object
      console.log("Arrow function: " + this.name);
    }, 100);
  }
};

user.logRegular(); // Output (after 100ms): Regular function: undefined (or empty string in some environments)
user.logArrow();   // Output (after 100ms): Arrow function: John
```

### Prototypes and Inheritance

**Theory:**

JavaScript is a prototype-based language, which means it uses prototypal inheritance rather than classical inheritance. Every JavaScript object has a prototype. A prototype is also an object. All objects inherit properties and methods from their prototype.

*   **Prototype Chain:** When you try to access a property or method on an object, JavaScript first looks for it on the object itself. If it doesn't find it, it looks on the object's prototype, then on that prototype's prototype, and so on, until it reaches `null` (the end of the prototype chain).
*   **`[[Prototype]]` (dunder proto) or `__proto__`:** This internal property (exposed as `__proto__` in many environments, though it's officially accessed via `Object.getPrototypeOf()`) points to the object's prototype.
*   **`prototype` Property of Functions:** Functions in JavaScript (which are also objects) have a `prototype` property. When a function is used as a constructor (with `new`), the newly created object's `__proto__` will point to the constructor function's `prototype` property.
*   **`Object.create()`:** A method to create a new object with the specified prototype object and properties.
*   **`class` Keyword (ES6):** Syntactic sugar over JavaScript's existing prototype-based inheritance. It makes object-oriented programming in JavaScript feel more familiar to developers coming from class-based languages, but underneath, it's still prototypal inheritance.

**Examples:**

```javascript
// Prototypal Inheritance Example

// Constructor function
function Animal(name) {
  this.name = name;
}

// Add a method to the Animal's prototype
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};

const dog = new Animal("Buddy");
dog.speak(); // Output: Buddy makes a sound.

// Inheriting from Animal
function Dog(name, breed) {
  Animal.call(this, name); // Call the parent constructor
  this.breed = breed;
}

// Set Dog's prototype to an instance of Animal's prototype
// This creates the prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Important: reset the constructor

// Add a Dog-specific method
Dog.prototype.bark = function() {
  console.log(`${this.name} barks loudly!`);
};

const myDog = new Dog("Max", "Golden Retriever");
myDog.speak(); // Inherited from Animal.prototype - Output: Max makes a sound.
myDog.bark();  // Dog-specific method - Output: Max barks loudly!

console.log(myDog.__proto__ === Dog.prototype);    // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);  // true (end of the chain)

// ES6 Class Syntax (Syntactic Sugar for Prototypes)

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    console.log(`${this.make} ${this.model} started.`);
  }
}

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model); // Call parent constructor
    this.year = year;
  }

  drive() {
    console.log(`${this.make} ${this.model} is driving.`);
  }
}

const myCar = new Car("Honda", "Civic", 2022);
myCar.start(); // Output: Honda Civic started.
myCar.drive(); // Output: Honda Civic is driving.
```

### Asynchronous JavaScript

**Theory:**

JavaScript is single-threaded, meaning it can only execute one task at a time. However, to handle long-running operations (like network requests, file I/O, or timers) without freezing the browser or Node.js process, JavaScript uses an asynchronous model. This allows non-blocking operations.

Key concepts for asynchronous JavaScript:

*   **Callbacks:** Historically, asynchronous operations were handled using callback functions. A callback is a function passed as an argument to another function, which is then invoked inside the outer function to complete some kind of routine or action. While simple, excessive use of nested callbacks can lead to "Callback Hell" (pyramid of doom), making code hard to read and maintain.
*   **Promises (ES6):** Promises provide a cleaner and more manageable way to handle asynchronous operations. A Promise is an object representing the eventual completion or failure of an asynchronous operation.
    *   A Promise can be in one of three states:
        *   **Pending:** Initial state, neither fulfilled nor rejected.
        *   **Fulfilled (Resolved):** The operation completed successfully.
        *   **Rejected:** The operation failed.
    *   Promises have `.then()` for handling fulfillment and `.catch()` for handling rejections. `.finally()` can be used to execute code regardless of the promise's outcome.
*   **`async`/`await` (ES2017):** Built on top of Promises, `async`/`await` provides a more synchronous-looking syntax for writing asynchronous code, making it even easier to read and debug.
    *   An `async` function implicitly returns a Promise.
    *   The `await` keyword can only be used inside an `async` function and pauses the execution of the `async` function until the Promise settles (resolves or rejects).

**Examples:**

```javascript
// Callbacks
function fetchDataWithCallback(callback) {
  setTimeout(() => {
    const data = "Data from server (callback)";
    callback(data);
  }, 1000);
}

fetchDataWithCallback((data) => {
  console.log(data); // Output (after 1 second): Data from server (callback)
});

// Promises
function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data from server (promise)");
      } else {
        reject("Error fetching data (promise)");
      }
    }, 1500);
  });
}

fetchDataWithPromise()
  .then((data) => {
    console.log(data); // Output (after 1.5 seconds): Data from server (promise)
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise operation finished.");
  });

// Chaining Promises
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 1 complete");
      resolve(10);
    }, 500);
  });
}

function step2(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Step 2 complete with value: ${value}`);
      resolve(value * 2);
    }, 700);
  });
}

step1()
  .then(step2)
  .then(finalValue => {
    console.log("Final result: " + finalValue); // Output: Final result: 20
  })
  .catch(error => {
    console.error("Chain error: " + error);
  });

// async/await
async function fetchDataWithAsyncAwait() {
  try {
    console.log("Fetching data with async/await...");
    const response = await new Promise(resolve => {
      setTimeout(() => resolve("Async/await data!"), 2000);
    });
    console.log(response); // Output (after 2 seconds): Async/await data!
  } catch (error) {
    console.error("Async/await error: " + error);
  } finally {
    console.log("Async/await operation finished.");
  }
}

fetchDataWithAsyncAwait();

// Parallel Promises with Promise.all
async function fetchMultipleData() {
  const promise1 = new Promise(resolve => setTimeout(() => resolve("Data 1"), 1000));
  const promise2 = new Promise(resolve => setTimeout(() => resolve("Data 2"), 500));
  const promise3 = new Promise(resolve => setTimeout(() => resolve("Data 3"), 1500));

  try {
    const results = await Promise.all([promise1, promise2, promise3]);
    console.log("All data fetched:", results); // Output: All data fetched: [ 'Data 1', 'Data 2', 'Data 3' ] (after 1.5s)
  } catch (error) {
    console.error("Error fetching all data:", error);
  }
}

fetchMultipleData();
```
