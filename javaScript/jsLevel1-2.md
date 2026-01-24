# JavaScript Interview Questions & Answers

## ⭐ Level 1: Basics (Warm-up)

### 1. Difference between `var`, `let`, `const`?

**Answer:**
These keywords are used to declare variables in JavaScript, but they differ in terms of scope, hoisting, and reassignability.

*   **`var`**:
    *   **Scope**: Function-scoped. This means a variable declared with `var` is accessible anywhere within the function it's declared in, regardless of block (`{}`) boundaries.
    *   **Hoisting**: `var` declarations are hoisted to the top of their function or global scope. This means you can use a `var` variable before it's declared, but its value will be `undefined`.
    *   **Reassignability**: Can be re-declared and reassigned.

    ```javascript
    function exampleVar() {
        console.log(x); // undefined (due to hoisting)
        var x = 10;
        console.log(x); // 10

        if (true) {
            var x = 20; // Re-declares and reassigns the same x
            console.log(x); // 20
        }
        console.log(x); // 20 (still the same x)
    }
    exampleVar();
    // console.log(x); // ReferenceError: x is not defined (x is function-scoped)
    ```

*   **`let`**:
    *   **Scope**: Block-scoped. This means a `let` variable is only accessible within the block (`{}`) where it's declared.
    *   **Hoisting**: `let` declarations are hoisted, but they are in a "temporal dead zone" until their declaration is encountered. Accessing them before declaration will result in a `ReferenceError`.
    *   **Reassignability**: Can be reassigned but not re-declared in the same scope.

    ```javascript
    function exampleLet() {
        // console.log(y); // ReferenceError: Cannot access 'y' before initialization (temporal dead zone)
        let y = 10;
        console.log(y); // 10

        if (true) {
            let y = 20; // Declares a new, separate 'y' within this block
            console.log(y); // 20
        }
        console.log(y); // 10 (the original y)
    }
    exampleLet();
    // let y = 50; // SyntaxError: Identifier 'y' has already been declared (if in global scope)
    ```

*   **`const`**:
    *   **Scope**: Block-scoped, similar to `let`.
    *   **Hoisting**: Similar to `let`, `const` declarations are hoisted but are in a "temporal dead zone" until their declaration.
    *   **Reassignability**: Cannot be re-declared or reassigned after initial assignment. However, if a `const` variable holds an object or array, the *contents* of that object/array can be modified.

    ```javascript
    function exampleConst() {
        // console.log(z); // ReferenceError: Cannot access 'z' before initialization
        const z = 10;
        console.log(z); // 10

        // z = 20; // TypeError: Assignment to constant variable.

        if (true) {
            const z = 30; // Declares a new, separate 'z' within this block
            console.log(z); // 30
        }
        console.log(z); // 10 (the original z)

        const myObject = { name: "Alice" };
        myObject.name = "Bob"; // OK, modifying object content
        console.log(myObject); // { name: "Bob" }

        // myObject = { name: "Charlie" }; // TypeError: Assignment to constant variable.
    }
    exampleConst();
    ```

**Summary Table:**

| Feature         | `var`           | `let`           | `const`         |
| :-------------- | :-------------- | :-------------- | :-------------- |
| **Scope**       | Function-scoped | Block-scoped    | Block-scoped    |
| **Hoisting**    | Yes (with `undefined` value) | Yes (temporal dead zone) | Yes (temporal dead zone) |
| **Re-declare**  | Yes             | No              | No              |
| **Reassign**    | Yes             | Yes             | No (for primitive values) |

### 2. What is hoisting?

**Answer:**
Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase, *before* the code is executed.

It's important to understand that *only the declarations are hoisted*, not the initializations. This means if you use a `var` variable before its assignment, it will have a value of `undefined`. For `let` and `const`, while their declarations are hoisted, they are put into a "temporal dead zone" and cannot be accessed before their actual declaration line in the code, resulting in a `ReferenceError`.

**Example with `var`:**

```javascript
console.log(hoistedVar); // Output: undefined
var hoistedVar = "I am hoisted";
console.log(hoistedVar); // Output: I am hoisted

// This is how JavaScript conceptually processes it:
// var hoistedVar; // Declaration is hoisted
// console.log(hoistedVar);
// hoistedVar = "I am hoisted"; // Assignment stays in place
// console.log(hoistedVar);
```

**Example with function declarations:**

```javascript
hoistedFunction(); // Output: I am a hoisted function!

function hoistedFunction() {
    console.log("I am a hoisted function!");
}

// Function expressions are not hoisted in the same way for their assignment:
// notHoistedFunction(); // TypeError: notHoistedFunction is not a function (if var) or ReferenceError (if let/const)
var notHoistedFunction = function() {
    console.log("I am not a hoisted function expression!");
};
```

**Example with `let` and `const` (Temporal Dead Zone):**

```javascript
// console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "I am hoisted with let";
console.log(hoistedLet); // Output: I am hoisted with let

// console.log(hoistedConst); // ReferenceError: Cannot access 'hoistedConst' before initialization
const hoistedConst = "I am hoisted with const";
console.log(hoistedConst); // Output: I am hoisted with const
```

### 3. What is scope? Types of scope?

**Answer:**
Scope determines the accessibility of variables, functions, and objects in some part of your code. In JavaScript, there are primarily three types of scope:

1.  **Global Scope**:
    *   Variables declared outside of any function or block have global scope.
    *   They are accessible from anywhere in your code, including inside functions and blocks.
    *   In a browser environment, global variables become properties of the `window` object.
    *   It's generally considered good practice to minimize the use of global variables to avoid naming conflicts and make code more modular.

    ```javascript
    var globalVar = "I am a global variable"; // var in global scope
    let globalLet = "I am a global let variable"; // let in global scope
    const globalConst = "I am a global const variable"; // const in global scope

    function showGlobal() {
        console.log(globalVar);
        console.log(globalLet);
        console.log(globalConst);
    }
    showGlobal(); // All accessible
    ```

2.  **Function Scope (or Local Scope for `var`)**:
    *   Variables declared with `var` inside a function are function-scoped. They are only accessible within that function.
    *   Each function creates its own scope.
    *   Variables in a function's scope are not accessible from outside the function.

    ```javascript
    function myFunction() {
        var functionVar = "I am function-scoped";
        console.log(functionVar); // Accessible inside the function
    }
    myFunction();
    // console.log(functionVar); // ReferenceError: functionVar is not defined
    ```

3.  **Block Scope (for `let` and `const`)**:
    *   Variables declared with `let` and `const` inside a block (`{}`) are block-scoped.
    *   A block can be an `if` statement, `for` loop, `while` loop, or any other code wrapped in curly braces.
    *   Variables declared within a block are only accessible within that block.

    ```javascript
    if (true) {
        let blockLet = "I am block-scoped with let";
        const blockConst = "I am block-scoped with const";
        var blockVar = "I am function-scoped even in a block"; // Still function-scoped!

        console.log(blockLet); // Accessible
        console.log(blockConst); // Accessible
        console.log(blockVar); // Accessible
    }

    // console.log(blockLet); // ReferenceError: blockLet is not defined
    // console.log(blockConst); // ReferenceError: blockConst is not defined
    console.log(blockVar); // Accessible (due to var's function scope, if in a function; or global if not)
    ```

**Lexical Scope**:
While not a distinct type of scope in the same way as global, function, or block, lexical scope (also known as static scope) is fundamental to how JavaScript determines variable accessibility. It means that the scope of a variable is determined by *where* the variable is defined in the source code, not where it is called. This is crucial for understanding closures.

### 4. What is the difference between `==` vs `===`?

**Answer:**
Both `==` (equality operator) and `===` (strict equality operator) are used to compare two values in JavaScript. The key difference lies in whether they perform type coercion before comparison.

*   **`==` (Equality Operator / Loose Equality)**:
    *   Compares two values for equality *after* performing type coercion if their types are different.
    *   This means JavaScript will try to convert one or both values to a common type before making the comparison.
    *   Can lead to unexpected results due to implicit type conversions.

    **Examples:**
    ```javascript
    console.log(5 == 5);         // true (same value, same type)
    console.log("5" == 5);       // true (string "5" is coerced to number 5)
    console.log(0 == false);     // true (0 is coerced to false)
    console.log(1 == true);      // true (1 is coerced to true)
    console.log(null == undefined); // true (special case, both represent absence of value)
    console.log("" == false);    // true (empty string is coerced to false)
    console.log([] == false);    // true ([] is coerced to 0, then to false)
    console.log([5] == 5);       // true ([5] is coerced to "5", then to 5)
    ```

*   **`===` (Strict Equality Operator / Identity Equality)**:
    *   Compares two values for equality *without* performing any type coercion.
    *   For the values to be considered strictly equal, they must have both the same value *and* the same type.
    *   This operator is generally recommended for predictable and safer comparisons, as it avoids the pitfalls of implicit type conversions.

    **Examples:**
    ```javascript
    console.log(5 === 5);         // true (same value, same type)
    console.log("5" === 5);       // false (different types: string vs number)
    console.log(0 === false);     // false (different types: number vs boolean)
    console.log(1 === true);      // false (different types: number vs boolean)
    console.log(null === undefined); // false (different types)
    console.log("" === false);    // false (different types: string vs boolean)
    console.log([] === false);    // false (different types: object vs boolean)
    console.log([5] === 5);       // false (different types: object vs number)
    ```

**Recommendation:**
Always prefer `===` over `==` unless you have a specific reason to allow type coercion, as it leads to more explicit and less error-prone code.

### 5. What is `NaN`? How to check if a value is `NaN`?

**Answer:**
`NaN` stands for "Not-a-Number". It's a special numeric value in JavaScript that represents an undefined or unrepresentable numerical value. It typically results from mathematical operations that fail or produce an invalid number (e.g., `0 / 0`, `Math.sqrt(-1)`).

**Key characteristics of `NaN`:**

*   It is a numeric type (`typeof NaN` returns `"number"`).
*   It is the only JavaScript value that is not equal to itself (`NaN == NaN` is `false`, `NaN === NaN` is `false`). This makes direct comparison unreliable.

**How to check if a value is `NaN`?**

Due to the unique property that `NaN` is not equal to itself, you cannot reliably use `==` or `===` to check for it. The standard and most reliable way to check if a value is `NaN` is using the global `isNaN()` function or, preferably, `Number.isNaN()`.

1.  **`Number.isNaN()` (Recommended for accuracy):**
    *   This method is more robust and accurate because it strictly checks if the passed value is *actually* `NaN` and *not* just a value that *would coerce* to `NaN`.
    *   It does *not* perform type coercion.

    ```javascript
    console.log(Number.isNaN(NaN));        // true
    console.log(Number.isNaN(0 / 0));      // true
    console.log(Number.isNaN("hello"));    // false (correct, "hello" is not NaN)
    console.log(Number.isNaN("123"));      // false
    console.log(Number.isNaN(undefined));  // false
    console.log(Number.isNaN(null));       // false
    console.log(Number.isNaN(true));       // false
    console.log(Number.isNaN({}));         // false
    console.log(Number.isNaN(""));         // false
    ```

2.  **`isNaN()` (Global function, less accurate):**
    *   This global function attempts to convert the argument to a number before checking if it's `NaN`.
    *   This can lead to misleading results, as values like `undefined`, `{}`, or non-numeric strings will also return `true` because they coerce to `NaN` when converted to a number.

    ```javascript
    console.log(isNaN(NaN));        // true
    console.log(isNaN(0 / 0));      // true
    console.log(isNaN("hello"));    // true (misleading, "hello" is not NaN, but converts to it)
    console.log(isNaN("123"));      // false (converts to number 123)
    console.log(isNaN(undefined));  // true (misleading, undefined converts to NaN)
    console.log(isNaN(null));       // false (converts to 0)
    console.log(isNaN(true));       // false (converts to 1)
    console.log(isNaN({}));         // true (misleading, {} converts to NaN)
    console.log(isNaN(""));         // false (converts to 0)
    ```

**Example of `NaN` generation:**

```javascript
console.log(0 / 0);          // NaN
console.log(10 * "hello");   // NaN
console.log(Math.sqrt(-1));  // NaN
console.log(parseInt("abc"));// NaN
```

### 6. What is truthy and falsy values?

**Answer:**
In JavaScript, every value has an inherent boolean characteristic, meaning it can be evaluated as either `true` or `false` in a boolean context (e.g., `if` statements, logical operations).

*   **Falsy Values**:
    A "falsy" value is a value that, when encountered in a boolean context, evaluates to `false`. There are only a handful of falsy values in JavaScript:

    1.  `false` (the boolean primitive `false`)
    2.  `0` (the number zero)
    3.  `-0` (the number negative zero)
    4.  `""` (an empty string)
    5.  `null`
    6.  `undefined`
    7.  `NaN` (Not-a-Number)
    8.  `document.all` (a historical artifact, often considered falsy in modern browsers)

    **Examples of falsy values in an `if` statement:**
    ```javascript
    if (false) { console.log("false is falsy"); }
    if (0) { console.log("0 is falsy"); } else { console.log("0 is falsy"); }
    if ("") { console.log("empty string is falsy"); } else { console.log("empty string is falsy"); }
    if (null) { console.log("null is falsy"); } else { console.log("null is falsy"); }
    if (undefined) { console.log("undefined is falsy"); } else { console.log("undefined is falsy"); }
    if (NaN) { console.log("NaN is falsy"); } else { console.log("NaN is falsy"); }

    // Output for all above: ... is falsy
    ```

*   **Truthy Values**:
    A "truthy" value is any value that is *not* falsy. When encountered in a boolean context, it evaluates to `true`. This includes most values you'll encounter.

    **Examples of truthy values:**

    *   `true`
    *   Any non-zero number (e.g., `1`, `-1`, `42`, `3.14`)
    *   Any non-empty string (e.g., `"hello"`, `"false"`, `" "`)
    *   Objects (e.g., `{}`, `[]`, `new Date()`)
    *   Functions
    *   Symbols

    **Examples of truthy values in an `if` statement:**
    ```javascript
    if (true) { console.log("true is truthy"); }
    if (1) { console.log("1 is truthy"); }
    if (-10) { console.log("-10 is truthy"); }
    if ("hello") { console.log("non-empty string is truthy"); }
    if ("false") { console.log("'false' (string) is truthy"); } // Note: the string "false" is truthy!
    if ({}) { console.log("empty object is truthy"); }
    if ([]) { console.log("empty array is truthy"); }
    if (function() {}) { console.log("function is truthy"); }

    // Output for all above: ... is truthy
    ```

**How to check for truthiness/falsiness:**

You can explicitly convert a value to its boolean equivalent using `Boolean()` or by using the double NOT operator `!!`.

```javascript
console.log(Boolean(0));       // false
console.log(!!0);              // false

console.log(Boolean("hello")); // true
console.log(!!"hello");        // true

console.log(Boolean(null));    // false
console.log(!!null);           // false

console.log(Boolean({}));      // true
console.log(!!{});             // true
```

Understanding truthy and falsy values is crucial for writing concise and effective conditional logic in JavaScript.

### 7. What is a callback function?

**Answer:**
A callback function is a function passed as an argument to another function, to be executed later (or "called back") once a particular task or event has completed. Callbacks are a fundamental concept in asynchronous JavaScript programming, but they are also used in synchronous contexts.

**Key characteristics:**

*   **Passed as an argument**: The callback function is literally passed as one of the parameters to another function.
*   **Executed later**: The function that receives the callback is responsible for executing it at an appropriate time. This might be immediately (synchronous callback) or after some operation completes (asynchronous callback).
*   **Encapsulates logic**: Callbacks allow you to define what should happen *after* an operation without coupling that logic directly to the operation itself.

**Examples:**

1.  **Synchronous Callback (e.g., Array methods):**
    `map`, `filter`, `forEach` are common examples where the callback is executed immediately for each element.

    ```javascript
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
    ```

2.  **Asynchronous Callback (e.g., `setTimeout`, Event Listeners, AJAX requests):**
    These are the most common use cases, where the callback is executed after a non-blocking operation completes.

    ```javascript
    console.log("Start");

    setTimeout(function() {
        console.log("This message appears after 2 seconds (callback executed)");
    }, 2000); // This anonymous function is the callback

    console.log("End");

    // Output:
    // Start
    // End
    // (after 2 seconds)
    // This message appears after 2 seconds (callback executed)
    ```

    **Event Listener Example:**
    ```javascript
    // Assume an HTML button with id="myButton"
    // const myButton = document.getElementById("myButton");
    // myButton.addEventListener("click", function() {
    //     console.log("Button was clicked!"); // This is the callback
    // });
    ```

**Why use callbacks?**

*   **Asynchronous operations**: Essential for handling tasks like network requests, file I/O, or timers without blocking the main thread.
*   **Flexibility**: Allows functions to be more generic, as the specific action to perform can be passed in as an argument.
*   **Code separation**: Keeps the "what to do" logic separate from the "when to do it" logic.

**Callback Hell (or Pyramid of Doom):**
A common issue with deeply nested asynchronous callbacks, where the code becomes difficult to read and maintain due to excessive indentation and sequential dependencies. This led to the introduction of Promises and `async/await` to manage asynchronous code more effectively.

### 8. What are array methods (map, filter, reduce)?

**Answer:**
`map`, `filter`, and `reduce` are three of the most commonly used higher-order array methods in JavaScript. They are powerful tools for transforming, filtering, and aggregating data in arrays in a functional and declarative way. They all iterate over an array and do *not* modify the original array (they return new arrays or values), adhering to the principle of immutability.

All these methods take a **callback function** as their first argument, which is executed for each element in the array.

1.  **`map()`**:
    *   **Purpose**: Creates a *new array* by calling a provided callback function on every element in the original array.
    *   **Return Value**: A new array with the results of calling the callback function on every element. The new array will always have the same length as the original array.
    *   **Callback arguments**: `(currentValue, index, array)`

    **Example:** Doubling each number in an array.
    ```javascript
    const numbers = [1, 2, 3, 4];

    const doubledNumbers = numbers.map(function(num) {
        return num * 2;
    });
    // Using arrow function (common practice)
    // const doubledNumbers = numbers.map(num => num * 2);

    console.log(doubledNumbers); // [2, 4, 6, 8]
    console.log(numbers);       // [1, 2, 3, 4] (original array is unchanged)
    ```
    **Use Case**: Transforming each item in an array (e.g., formatting data, extracting specific properties).

2.  **`filter()`**:
    *   **Purpose**: Creates a *new array* containing all elements from the original array that satisfy a condition specified by the provided callback function.
    *   **Return Value**: A new array containing only the elements for which the callback function returned a truthy value. If no elements satisfy the condition, an empty array is returned.
    *   **Callback arguments**: `(currentValue, index, array)`

    **Example:** Filtering out even numbers.
    ```javascript
    const numbers = [1, 2, 3, 4, 5, 6];

    const evenNumbers = numbers.filter(function(num) {
        return num % 2 === 0;
    });
    // Using arrow function
    // const evenNumbers = numbers.filter(num => num % 2 === 0);

    console.log(evenNumbers); // [2, 4, 6]
    console.log(numbers);     // [1, 2, 3, 4, 5, 6] (original array is unchanged)
    ```
    **Use Case**: Selecting a subset of elements from an array based on a condition.

3.  **`reduce()`**:
    *   **Purpose**: Executes a "reducer" callback function on each element of the array, resulting in a single output value. It's used to accumulate values.
    *   **Return Value**: A single value (it can be a number, string, object, array, etc.) that is the result of the reduction.
    *   **Callback arguments**: `(accumulator, currentValue, index, array)`
        *   `accumulator`: The value resulting from the previous call to the callback, or `initialValue` if provided.
        *   `currentValue`: The current element being processed in the array.
    *   **Optional `initialValue`**: An optional second argument to `reduce()` that specifies the initial value of the `accumulator`. If not provided, the first element of the array is used as the `initialValue` and `currentValue` starts from the second element.

    **Example:** Summing all numbers in an array.
    ```javascript
    const numbers = [1, 2, 3, 4];

    const sum = numbers.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0); // 0 is the initialValue for the accumulator
    // Using arrow function
    // const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    console.log(sum);     // 10
    console.log(numbers); // [1, 2, 3, 4] (original array is unchanged)

    // Example: Flatten an array of arrays
    const arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
    const flattenedArray = arrayOfArrays.reduce((acc, curr) => acc.concat(curr), []);
    console.log(flattenedArray); // [1, 2, 3, 4, 5, 6]

    // Example: Counting frequency of items
    const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
    const fruitCount = fruits.reduce((acc, fruit) => {
        acc[fruit] = (acc[fruit] || 0) + 1;
        return acc;
    }, {});
    console.log(fruitCount); // { apple: 3, banana: 2, orange: 1 }
    ```
    **Use Case**: Calculating a single value from an array, accumulating data, creating new objects from array data.

These three methods, along with others like `forEach`, `some`, `every`, `find`, `findIndex`, are essential for modern JavaScript development, promoting cleaner, more readable, and often more performant code compared to traditional `for` loops.

### 9. Explain pass by value vs pass by reference.

**Answer:**
In JavaScript, the way values are passed to functions (or assigned to variables) depends on whether the value is a primitive type or an object type. This is often described as "pass by value" for primitives and "pass by reference" (or more accurately, "pass by sharing" or "pass by value of the reference") for objects.

**1. Pass by Value (for Primitive Types):**

*   **Primitive Types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`.
*   When a primitive value is passed to a function, a *copy* of that value is created and assigned to the function's parameter.
*   Any changes made to the parameter *inside* the function do not affect the original variable outside the function.

**Example:**

```javascript
let a = 10; // Primitive number

function modifyValue(num) {
    num = num + 5; // Changes the *copy* of 'a', not 'a' itself
    console.log("Inside function (num):", num); // 15
}

modifyValue(a);
console.log("Outside function (a):", a); // 10 (original 'a' is unchanged)
```

**2. Pass by Reference (or Pass by Sharing / Pass by Value of the Reference) (for Object Types):**

*   **Object Types**: `objects` (including plain objects, arrays, functions, `Date`, `RegExp`, etc.).
*   When an object is passed to a function, a *copy of the reference (memory address)* to that object is passed to the function's parameter. Both the original variable and the function parameter now point to the *same object* in memory.
*   If you modify the *properties* of the object inside the function, these changes will be reflected in the original object outside the function because both variables refer to the same object.
*   However, if you reassign the *entire object* parameter to a new object inside the function, it will *not* affect the original variable. The parameter will then point to a new object, while the original variable still points to the old one.

**Example 1: Modifying object properties (reflects outside)**

```javascript
let myObject = { name: "Alice" }; // Object

function modifyObject(obj) {
    obj.name = "Bob"; // Modifies the property of the *same* object
    console.log("Inside function (obj.name):", obj.name); // Bob
}

modifyObject(myObject);
console.log("Outside function (myObject.name):", myObject.name); // Bob (original object is changed)
```

**Example 2: Reassigning the parameter (does NOT reflect outside)**

```javascript
let myOtherObject = { name: "Charlie" }; // Object

function reassignObject(obj) {
    obj = { name: "David" }; // 'obj' now points to a *new* object, not the original 'myOtherObject'
    console.log("Inside function (obj.name):", obj.name); // David
}

reassignObject(myOtherObject);
console.log("Outside function (myOtherObject.name):", myOtherObject.name); // Charlie (original object is unchanged)
```

**Analogy:**
Think of primitive types as physical books. When you lend a book, you give a copy. Any notes you write in your copy don't affect the original.
Think of objects as library cards. When you lend your library card, the person uses *your* card to access the *same* library (object). If they borrow a book (modify a property), it affects what's available in the library for everyone. But if they get a *new* library card (reassign the parameter), your original card is unaffected.

Understanding this distinction is crucial for predicting how data will behave in your JavaScript applications, especially when working with functions and objects.

### 10. What is the spread operator (`...`)?

**Answer:**
The spread operator (`...`) is an ES6 feature in JavaScript that allows an iterable (like an array or a string) or an object to be "expanded" or "spread out" into individual elements or key-value pairs. It's a very versatile operator used for a variety of tasks, including copying, concatenating, and extending arrays and objects.

**Main Use Cases:**

1.  **Copying Arrays (Shallow Copy):**
    The spread operator creates a new array containing all the elements of an existing array. This is a common way to create a shallow copy without mutating the original.

    ```javascript
    const originalArray = [1, 2, 3];
    const copiedArray = [...originalArray];

    console.log(copiedArray);        // [1, 2, 3]
    console.log(copiedArray === originalArray); // false (they are different arrays in memory)

    copiedArray.push(4);
    console.log(originalArray); // [1, 2, 3] (original is unchanged)
    console.log(copiedArray);   // [1, 2, 3, 4]
    ```

2.  **Concatenating/Combining Arrays:**
    It can combine multiple arrays into a single new array easily.

    ```javascript
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combinedArray = [...arr1, ...arr2, 5, 6];

    console.log(combinedArray); // [1, 2, 3, 4, 5, 6]
    ```

3.  **Spreading Elements in Function Calls (Rest Parameters):**
    When calling a function, you can use the spread operator to pass the elements of an array as individual arguments. (Note: When used in function *definitions*, it's called "rest parameters," which collects arguments into an array).

    ```javascript
    function sum(a, b, c) {
        return a + b + c;
    }

    const numbers = [1, 2, 3];
    console.log(sum(...numbers)); // Passes sum(1, 2, 3) -> Output: 6

    const moreNumbers = [10, 20];
    console.log(sum(...moreNumbers, 30)); // Passes sum(10, 20, 30) -> Output: 60
    ```

4.  **Combining/Copying Objects (Shallow Copy):**
    Similar to arrays, the spread operator can create a shallow copy of an object or merge multiple objects. If there are duplicate keys, the last object's value for that key will override previous ones.

    ```javascript
    const originalObject = { a: 1, b: 2 };
    const copiedObject = { ...originalObject };

    console.log(copiedObject); // { a: 1, b: 2 }
    console.log(copiedObject === originalObject); // false

    const obj1 = { name: "Alice", age: 30 };
    const obj2 = { city: "New York", age: 31 }; // age will be overwritten

    const mergedObject = { ...obj1, ...obj2, occupation: "Engineer" };
    console.log(mergedObject); // { name: "Alice", age: 31, city: "New York", occupation: "Engineer" }
    ```

5.  **Adding Elements to Arrays/Objects Immutably:**
    Useful for state management in libraries like React, where you want to create new state objects/arrays rather than modifying existing ones.

    ```javascript
    const todos = ['Learn React', 'Learn Redux'];
    const newTodo = 'Learn TypeScript';

    const updatedTodos = [...todos, newTodo]; // Add to end
    // const updatedTodos = [newTodo, ...todos]; // Add to beginning

    console.log(updatedTodos); // ['Learn React', 'Learn Redux', 'Learn TypeScript']
    console.log(todos);        // ['Learn React', 'Learn Redux'] (original unchanged)

    const user = { id: 1, name: 'John Doe' };
    const updatedUser = { ...user, name: 'Jane Doe', email: 'jane@example.com' };

    console.log(updatedUser); // { id: 1, name: 'Jane Doe', email: 'jane@example.com' }
    console.log(user);        // { id: 1, name: 'John Doe' } (original unchanged)
    ```

The spread operator greatly simplifies array and object manipulation, making code more readable and promoting immutable data practices.

## ⭐ Level 2: Intermediate (Important for React & Node)

### 11. What is the event loop?

**Answer:**
The Event Loop is a fundamental concurrency model in JavaScript that allows it to perform non-blocking I/O operations despite being single-threaded. It continuously checks two things: the Call Stack and the Callback Queue. If the Call Stack is empty, it takes the first function from the Callback Queue and pushes it onto the Call Stack to be executed.

**Key Components:**

1.  **Call Stack**: A LIFO (Last In, First Out) stack that stores functions called by the program. When a function is called, it's pushed onto the stack. When it returns, it's popped off. JavaScript is single-threaded, meaning it has only one Call Stack, so it can only do one thing at a time.
2.  **Web APIs / Node.js APIs**: These are not part of the JavaScript engine itself but are provided by the browser (e.g., `setTimeout`, DOM events, `fetch`) or Node.js (e.g., `fs` module, `http` module). When an asynchronous function is called, it's offloaded to these APIs.
3.  **Callback Queue (or Task Queue / Macrotask Queue)**: After a Web API completes its task (e.g., `setTimeout` timer expires, AJAX request returns), its callback function is placed into the Callback Queue.
4.  **Event Loop**: Its sole job is to monitor the Call Stack and the Callback Queue. If the Call Stack is empty, it takes the first callback from the Callback Queue and pushes it onto the Call Stack.

**How it works (simplified):**

1.  Synchronous code is executed first and pushed onto the Call Stack.
2.  When an asynchronous operation (like `setTimeout`, `fetch`, DOM event) is encountered, it's pushed onto the Call Stack, but then immediately offloaded to the Web APIs (or Node.js APIs). The JavaScript engine doesn't wait for it to complete; it continues executing the next synchronous code.
3.  Once the asynchronous operation completes in the Web APIs, its associated callback function is moved to the Callback Queue.
4.  The Event Loop constantly checks if the Call Stack is empty.
5.  If the Call Stack is empty, the Event Loop picks the first callback from the Callback Queue and moves it to the Call Stack for execution. This process is repeated until both the Call Stack and Callback Queue are empty.

**Example:**

```javascript
console.log('1. Start'); // Synchronous

setTimeout(() => {
    console.log('3. setTimeout callback'); // Asynchronous (Macrotask)
}, 0); // Even with 0ms delay, it goes to Web APIs, then Callback Queue

Promise.resolve().then(() => {
    console.log('2. Promise callback'); // Asynchronous (Microtask)
});

console.log('4. End'); // Synchronous

// Expected Output (due to Event Loop priority: Microtasks > Macrotasks):
// 1. Start
// 4. End
// 2. Promise callback
// 3. setTimeout callback
```

**Explanation of Output:**

*   `'1. Start'` is logged immediately.
*   `setTimeout` is offloaded to Web APIs. Its callback goes to the **Macrotask Queue** after 0ms.
*   `Promise.resolve().then()` is offloaded. Its callback goes to the **Microtask Queue**.
*   `'4. End'` is logged immediately.
*   The Call Stack is now empty.
*   The Event Loop checks. It prioritizes the **Microtask Queue** over the Macrotask Queue.
*   The `Promise callback` is moved to the Call Stack and executed. `'2. Promise callback'` is logged.
*   The Microtask Queue is now empty.
*   The Event Loop checks again. The Call Stack is empty.
*   The `setTimeout callback` is moved from the Macrotask Queue to the Call Stack and executed. `'3. setTimeout callback'` is logged.

This mechanism ensures that computationally intensive or time-consuming operations don't block the main thread, keeping the user interface responsive.

### 12. What is call stack?

**Answer:**
The Call Stack (often simply referred to as "the stack") is a fundamental data structure used by JavaScript to keep track of the execution of multiple functions. It operates on a LIFO (Last In, First Out) principle, meaning the last function pushed onto the stack is the first one to be popped off and executed.

**How it works:**

1.  When a script starts executing, the global execution context is pushed onto the Call Stack.
2.  Whenever a function is called, a new "frame" (or "execution context") is created for that function and pushed onto the top of the Call Stack. This frame contains information about the function's arguments, local variables, and the return address.
3.  When a function completes its execution (i.e., returns a value or reaches its end), its frame is popped off the Call Stack.
4.  The JavaScript engine continues executing the function that is now at the top of the Call Stack.
5.  If the Call Stack becomes empty, it means all the code has finished executing.

**Key characteristics:**

*   **Single-threaded**: JavaScript has only one Call Stack, which means it can execute only one function at a time. This is why JavaScript is described as single-threaded.
*   **Order of execution**: Determines the order in which functions are executed.
*   **Error handling**: If an error occurs and is not caught, the Call Stack provides a "stack trace" indicating the sequence of function calls that led to the error, which is invaluable for debugging.
*   **Stack Overflow**: If a function calls itself recursively too many times without a proper base case, or if there's an infinite loop of function calls, the Call Stack can exceed its maximum size, leading to a "Stack Overflow" error.

**Example:**

```javascript
function third() {
    console.log('Inside third function');
    // Call Stack: globalContext -> first() -> second() -> third()
}

function second() {
    console.log('Inside second function');
    third(); // third() is pushed onto the stack
    console.log('Back in second function');
    // Call Stack: globalContext -> first() -> second()
}

function first() {
    console.log('Inside first function');
    second(); // second() is pushed onto the stack
    console.log('Back in first function');
    // Call Stack: globalContext -> first()
}

console.log('Global context start');
first(); // first() is pushed onto the stack
console.log('Global context end');

/*
Execution Flow (and Call Stack state):

1. `console.log('Global context start')` -> Output: Global context start

2. `first()` is called
   `console.log('Inside first function')` -> Output: Inside first function

3. `second()` is called
   `console.log('Inside second function')` -> Output: Inside second function

4. `third()` is called
   `console.log('Inside third function')` -> Output: Inside third function

5. `third()` finishes (returns) -> popped off the stack
   `console.log('Back in second function')` -> Output: Back in second function

6. `second()` finishes (returns) -> popped off the stack
   `console.log('Back in first function')` -> Output: Back in first function

7. `first()` finishes (returns) -> popped off the stack

8. `console.log('Global context end')` -> Output: Global context end

9. Global context finishes -> popped off the stack (empty)
*/
```

Understanding the Call Stack is crucial for debugging, understanding execution flow, and grasping asynchronous concepts like the Event Loop.

### 13. What are Promises?

**Answer:**
Promises are a powerful construct in JavaScript used to handle asynchronous operations more easily and cleanly than traditional callback functions. A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

**States of a Promise:**

A Promise can be in one of three states:

1.  **`pending`**: Initial state, neither fulfilled nor rejected. The asynchronous operation is still in progress.
2.  **`fulfilled` (or `resolved`)**: The operation completed successfully, and the Promise has a resulting value.
3.  **`rejected`**: The operation failed, and the Promise has a reason for the failure (an error object).

Once a Promise is `fulfilled` or `rejected`, it is considered `settled`. A settled Promise cannot change its state again.

**How to create a Promise:**

A Promise is created using the `Promise` constructor, which takes a function called the "executor" as an argument. The executor function itself takes two arguments: `resolve` and `reject`.

*   `resolve(value)`: Call this when the asynchronous operation successfully completes, passing the resulting `value`.
*   `reject(reason)`: Call this when the asynchronous operation fails, passing the `reason` (typically an `Error` object).

```javascript
const myPromise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation (e.g., fetching data)
    const success = Math.random() > 0.5; // Randomly succeed or fail

    setTimeout(() => {
        if (success) {
            resolve('Data fetched successfully!'); // Operation succeeded
        } else {
            reject(new Error('Failed to fetch data.')); // Operation failed
        }
    }, 2000); // Simulate network delay of 2 seconds
});

console.log('Promise created (pending)');
```

**How to consume a Promise:**

Promises are consumed using `.then()` and `.catch()` methods.

*   **`.then(onFulfilled, onRejected)`**:
    *   `onFulfilled`: A callback function that runs when the Promise is `fulfilled`. It receives the `value` from `resolve()`.
    *   `onRejected`: An optional callback function that runs when the Promise is `rejected`. It receives the `reason` from `reject()`.
*   **`.catch(onRejected)`**: A shorthand for `.then(null, onRejected)`. It's used to handle errors/rejections from any preceding `.then()` or the initial Promise.
*   **`.finally(onFinally)`**: A callback function that runs when the Promise is `settled` (either `fulfilled` or `rejected`). It doesn't receive any arguments and is useful for cleanup operations.

```javascript
myPromise
    .then((data) => {
        console.log('Success:', data); // Executed if resolve() is called
        return data + ' - Processed'; // You can chain promises
    })
    .then((processedData) => {
        console.log('Processed Data:', processedData);
    })
    .catch((error) => {
        console.error('Error:', error.message); // Executed if reject() is called at any point in the chain
    })
    .finally(() => {
        console.log('Promise settled (finished operation)'); // Always executed
    });

console.log('After consuming promise (still pending)');
```

**Benefits of Promises:**

*   **Avoid Callback Hell**: Provides a flatter, more readable structure for asynchronous code, preventing the "pyramid of doom."
*   **Chaining**: `.then()` allows you to chain multiple asynchronous operations sequentially, making complex workflows easier to manage.
*   **Error Handling**: Centralized error handling with `.catch()` for an entire chain of promises.
*   **Composability**: Easier to compose multiple asynchronous operations (e.g., `Promise.all()`, `Promise.race()`).

**`Promise.all()`, `Promise.race()`, `Promise.any()`, `Promise.allSettled()`:**

*   **`Promise.all(iterable)`**: Takes an iterable (e.g., an array) of Promises and returns a single Promise that resolves when all of the input Promises have resolved, or rejects as soon as any of the input Promises rejects.
*   **`Promise.race(iterable)`**: Takes an iterable of Promises and returns a Promise that resolves or rejects as soon as one of the Promises in the iterable resolves or rejects, with the value or reason from that Promise.
*   **`Promise.any(iterable)`**: Takes an iterable of Promises and returns a Promise that resolves as soon as one of the Promises in the iterable resolves. If all of the Promises in the iterable reject, then the returned Promise rejects with an `AggregateError`. (ES2021)
*   **`Promise.allSettled(iterable)`**: Takes an iterable of Promises and returns a Promise that resolves after all of the given Promises have either resolved or rejected, returning an array of objects that each describe the outcome of each Promise. (ES2020)

Promises are a cornerstone of modern asynchronous JavaScript and form the basis for `async/await`.

### 14. Difference between `async` vs `await`?

**Answer:**
`async` and `await` are special keywords in JavaScript that make working with Promises much more comfortable, allowing you to write asynchronous code that *looks* and behaves more like synchronous code. They are syntactic sugar built on top of Promises.

*   **`async` keyword**:
    *   **Purpose**: Used to declare an asynchronous function.
    *   **Behavior**: An `async` function always returns a Promise. If the function returns a non-Promise value, JavaScript automatically wraps it in a resolved Promise. If the function throws an error, JavaScript wraps it in a rejected Promise.
    *   **Requirement**: You *must* use `async` to mark a function if you intend to use the `await` keyword inside it.

    ```javascript
    async function greeting() {
        return 'Hello Async!';
    }

    greeting().then(message => console.log(message)); // Output: Hello Async!

    async function failingGreeting() {
        throw new Error('Something went wrong!');
    }

    failingGreeting().catch(error => console.error(error.message)); // Output: Something went wrong!
    ```

*   **`await` keyword**:
    *   **Purpose**: Used to *pause* the execution of an `async` function until a Promise settles (either resolves or rejects).
    *   **Behavior**: It can only be used *inside* an `async` function.
    *   When `await` is used with a Promise:
        *   If the Promise **resolves**, `await` returns the resolved value.
        *   If the Promise **rejects**, `await` throws the rejected value as an error.
    *   This pausing of the `async` function is non-blocking to the main thread, thanks to the Event Loop.

    ```javascript
    function fetchData(delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Data fetched after ${delay}ms`);
            }, delay);
        });
    }

    async function processData() {
        console.log('Starting data process...');
        try {
            const data1 = await fetchData(2000); // Pauses for 2 seconds
            console.log(data1);

            const data2 = await fetchData(1000); // Pauses for 1 second
            console.log(data2);

            console.log('All data processed.');
        } catch (error) {
            console.error('Error in processData:', error.message);
        }
    }

    processData();
    console.log('This runs immediately after calling processData, not waiting for it.');

    // Expected Output:
    // Starting data process...
    // This runs immediately after calling processData, not waiting for it.
    // (after 2 seconds)
    // Data fetched after 2000ms
    // (after 1 more second)
    // Data fetched after 1000ms
    // All data processed.
    ```

**Key Differences and Relationship:**

| Feature       | `async`                                 | `await`                                      |
| :------------ | :-------------------------------------- | :------------------------------------------- |
| **Role**      | Declares an asynchronous function       | Pauses an `async` function until a Promise settles |
| **Usage**     | Applies to a function declaration       | Can only be used *inside* an `async` function |
| **Returns**   | Always returns a Promise                | Returns the resolved value of a Promise (or throws error) |
| **Dependency**| Can exist without `await` (returns Promise) | Requires the enclosing function to be `async` |

**Error Handling with `async/await`:**

Since `await` throws an error if the Promise it's waiting on rejects, you can use standard `try...catch` blocks to handle errors in `async` functions, just like with synchronous code. This is another major benefit over `.catch()` chains.

```javascript
function willReject(delay) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Failed after ${delay}ms`));
        }, delay);
    });
}

async function handleFailure() {
    try {
        const result = await willReject(1500);
        console.log(result);
    } catch (error) {
        console.error('Caught error:', error.message);
    }
}

handleFailure();
```

`async/await` dramatically improves the readability and maintainability of asynchronous JavaScript code, making it look much like synchronous code while retaining the non-blocking nature of JavaScript.

### 15. What is closure? Give an example.

**Answer:**
A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In simpler terms, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

**Key Concepts of Closure:**

*   **Lexical Scoping**: The scope of a variable is determined by *where* it is declared in the source code, not where it is called. When an inner function is defined, it "remembers" the environment in which it was created.
*   **Preservation of State**: Even if the outer function has finished executing and its execution context has been popped off the Call Stack, the inner function (the closure) still maintains access to the outer function's variables and parameters.
*   **Data Privacy**: Closures are a powerful way to implement data privacy and create private variables/methods in JavaScript, as only the inner function has access to the outer function's scope.

**Example:**

Let's create a `makeCounter` function that returns another function.

```javascript
function makeCounter() {
    let count = 0; // 'count' is a variable in the lexical environment of makeCounter

    return function() { // This inner function is a closure
        count++;
        return count;
    };
}

const counter1 = makeCounter(); // counter1 now holds the inner function
const counter2 = makeCounter(); // counter2 holds a *new* inner function with its *own* separate 'count'

console.log(counter1()); // Output: 1 (counter1's count is 0 -> 1)
console.log(counter1()); // Output: 2 (counter1's count is 1 -> 2)
console.log(counter2()); // Output: 1 (counter2's count is 0 -> 1, independent from counter1)
console.log(counter1()); // Output: 3 (counter1's count is 2 -> 3)
```

**Explanation:**

1.  When `makeCounter()` is called, a new execution context is created, and `count` is initialized to `0`.
2.  The `makeCounter()` function then returns the *inner anonymous function*.
3.  Even though `makeCounter()` has finished executing and its execution context is theoretically gone, the inner function *remembers* and still has access to the `count` variable from `makeCounter()`'s scope. This is the closure.
4.  Each time `makeCounter()` is called (`counter1 = makeCounter()`, `counter2 = makeCounter()`), it creates a *new* separate lexical environment for `count`.
5.  Therefore, `counter1` and `counter2` operate on their own independent `count` variables. `counter1` increments its `count`, and `counter2` increments its own `count`, without affecting each other.

**Another Common Example: Event Handlers in Loops**

Closures are often seen (and sometimes misused) in loops when creating event handlers.

```javascript
// Problem without closure (old way with var):
// for (var i = 1; i <= 3; i++) {
//     setTimeout(function() {
//         console.log(i); // This will always log 4, 4, 4
//     }, 1000 * i);
// }
// Explanation: The var i is function-scoped (or global if outside a function).
// By the time the setTimeout callbacks execute, the loop has finished and i is 4.

// Solution with closure (using IIFE for var, or simply let):
for (let i = 1; i <= 3; i++) { // 'let' creates a new block-scoped 'i' for each iteration
    setTimeout(function() {
        console.log(i); // This will log 1, 2, 3 as expected
    }, 1000 * i);
}
// Explanation: In each iteration, 'let i' creates a new variable 'i' for that specific block scope.
// The setTimeout callback forms a closure over that specific 'i' from its iteration.

// Or with an IIFE (Immediately Invoked Function Expression) for 'var':
// for (var i = 1; i <= 3; i++) {
//     (function(j) { // j is a new variable for each iteration, capturing the value of i
//         setTimeout(function() {
//             console.log(j); // Logs 1, 2, 3
//         }, 1000 * j);
//     })(i);
// }
```

Closures are a fundamental and powerful feature of JavaScript, essential for understanding many advanced patterns like module patterns, currying, and maintaining private state.

### 16. What is higher-order function?

**Answer:**
A **higher-order function (HOF)** is a function that does one or both of the following:

1.  **Takes one or more functions as arguments.**
2.  **Returns a function as its result.**

HOFs are a cornerstone of functional programming paradigms and are widely used in JavaScript to create more modular, reusable, and abstract code.

**Examples:**

1.  **Taking functions as arguments:**
    This is the most common use case. Array methods like `map`, `filter`, `reduce`, `forEach`, `sort`, etc., are prime examples of higher-order functions. They take a callback function as an argument to perform an operation on each element.

    ```javascript
    // Example: Array.prototype.map()
    const numbers = [1, 2, 3, 4];

    const doubled = numbers.map(function(num) { // map is a HOF, the anonymous function is the callback
        return num * 2;
    });
    console.log(doubled); // [2, 4, 6, 8]

    // Custom HOF for performing an operation on numbers
    function operateOnNumbers(arr, operation) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(operation(arr[i])); // Executes the passed function
        }
        return result;
    }

    function addTen(num) {
        return num + 10;
    }

    function square(num) {
        return num * num;
    }

    const initialNumbers = [1, 2, 3];
    console.log(operateOnNumbers(initialNumbers, addTen));   // [11, 12, 13]
    console.log(operateOnNumbers(initialNumbers, square));   // [1, 4, 9]
    ```

2.  **Returning a function:**
    This pattern is often used for function factories, currying, memoization, and creating functions with persistent state (closures).

    ```javascript
    // Example: Function factory to create a custom greeting function
    function createGreeter(greetingPrefix) { // createGreeter is a HOF
        return function(name) { // This anonymous function is returned
            return `${greetingPrefix}, ${name}!`;
        };
    }

    const sayHello = createGreeter('Hello');
    const sayHi = createGreeter('Hi');

    console.log(sayHello('Alice')); // Hello, Alice!
    console.log(sayHi('Bob'));      // Hi, Bob!

    // Example: A HOF to create a logger with a specific level
    function createLogger(level) {
        return function(message) {
            console.log(`[${level.toUpperCase()}]: ${message}`);
        };
    }

    const infoLogger = createLogger('info');
    const errorLogger = createLogger('error');

    infoLogger('User logged in.');    // [INFO]: User logged in.
    errorLogger('Failed to fetch data.'); // [ERROR]: Failed to fetch data.
    ```

**Why use Higher-Order Functions?**

*   **Abstraction**: They allow you to abstract away repetitive logic, making your code cleaner and more concise.
*   **Reusability**: You can write generic functions that can be customized by passing different function arguments.
*   **Modularity**: Promote breaking down complex problems into smaller, manageable functions.
*   **Composability**: Functions can be easily combined to create more complex behaviors.
*   **Functional Programming**: They are a core concept in functional programming, which emphasizes immutability and side-effect-free functions.

Higher-order functions are fundamental to modern JavaScript development and are a key concept to master, especially when working with frameworks and libraries that embrace functional patterns (like React).

### 17. What is the `this` keyword?

**Answer:**
The `this` keyword in JavaScript is one of the most frequently misunderstood concepts. Its value is not fixed; instead, it is a special identifier that refers to the **context** in which a function is executed. The value of `this` is determined by *how* a function is called, not where it is defined.

**Rules for `this` binding:**

1.  **Global Context (outside any function)**:
    *   In a browser, `this` refers to the `window` object.
    *   In Node.js, `this` refers to `global` object (or an empty object in module scope in strict mode).
    *   In strict mode, `this` is `undefined`.

    ```javascript
    console.log(this === window); // In browser: true
    // console.log(this); // In Node.js module: {} (empty object)
    ```

2.  **Function Call (Simple Function Invocation)**:
    *   When a function is called as a standalone function (not as a method of an object, or with `new`, `call`, `apply`, `bind`), `this` refers to the `window` object (in browsers) or `undefined` (in strict mode).
    *   This is a common source of confusion and bugs.

    ```javascript
    function showThis() {
        console.log(this);
    }
    showThis(); // In browser: window object. In strict mode: undefined.

    // Example in strict mode:
    // "use strict";
    // function showThisStrict() {
    //     console.log(this); // undefined
    // }
    // showThisStrict();
    ```

3.  **Method Call (Object Method Invocation)**:
    *   When a function is called as a method of an object (e.g., `obj.method()`), `this` refers to the object that owns the method (the object before the dot).

    ```javascript
    const myObject = {
        name: 'Alice',
        greet: function() {
            console.log(`Hello, my name is ${this.name}`);
        }
    };
    myObject.greet(); // 'this' refers to myObject -> Output: Hello, my name is Alice

    const anotherObject = {
        name: 'Bob',
        sayHello: myObject.greet // Assigning the method to another object
    };
    anotherObject.sayHello(); // 'this' refers to anotherObject -> Output: Hello, my name is Bob
    ```

4.  **Constructor Call (with `new` keyword)**:
    *   When a function is called with the `new` keyword (acting as a constructor), `this` refers to the newly created instance of the object.

    ```javascript
    function Person(name) {
        this.name = name; // 'this' refers to the new Person object
    }
    const alice = new Person('Alice');
    console.log(alice.name); // Alice
    ```

5.  **Explicit Binding (`call`, `apply`, `bind`)**:
    *   These methods allow you to explicitly set the value of `this` for a function call. (See next question for details).

6.  **Arrow Functions**:
    *   Arrow functions do *not* have their own `this` binding. Instead, they capture the `this` value of their **surrounding lexical context** (the `this` value of the nearest non-arrow function or global scope).
    *   This makes them very useful for callbacks where you want `this` to refer to the context where the arrow function was *defined*, not where it was called.

    ```javascript
    const user = {
        name: 'Charlie',
        regularFunction: function() {
            console.log('Regular function this:', this.name);
            setTimeout(function() {
                console.log('Timeout regular function this:', this.name);
            }, 100);
        },
        arrowFunction: function() {
            console.log('Outer arrow function this:', this.name);
            setTimeout(() => {
                console.log('Timeout arrow function this:', this.name);
            }, 100);
        }
    };

    user.regularFunction();
    // Output (in browser):
    // Regular function this: Charlie
    // Timeout regular function this: undefined (or empty string/global name)

    user.arrowFunction();
    // Output (in browser):
    // Outer arrow function this: Charlie
    // Timeout arrow function this: Charlie
    ```

Understanding `this` is crucial for writing correct and predictable JavaScript code, especially when dealing with objects, prototypes, and asynchronous operations.

### 18. How does `bind()`, `call()`, `apply()` work?

**Answer:**
`bind()`, `call()`, and `apply()` are three powerful methods available on all JavaScript functions that allow you to explicitly control the value of the `this` keyword inside a function, and also to pass arguments to that function. They are crucial for functional programming patterns, object-oriented design, and handling contexts in callbacks.

All three methods are used for **explicit `this` binding**.

1.  **`call(thisArg, arg1, arg2, ...)`**:

    *   **Purpose**: Invokes a function immediately with a specified `this` value and arguments provided individually.
    *   **Syntax**: `function.call(thisArg, arg1, arg2, ...)`
    *   **Behavior**:
        *   The first argument (`thisArg`) sets the `this` context inside the function.
        *   Subsequent arguments are passed to the function as individual parameters.
        *   The function is executed *immediately*.

    **Example:**
    ```javascript
    const person = {
        name: 'Alice',
        greet: function(city, country) {
            console.log(`Hello, my name is ${this.name} from ${city}, ${country}.`);
        }
    };

    const anotherPerson = { name: 'Bob' };

    person.greet.call(anotherPerson, 'New York', 'USA'); // Output: Hello, my name is Bob from New York, USA.

    function introduce(job) {
        console.log(`My name is ${this.name} and I am a ${job}.`);
    }
    const engineer = { name: 'Charlie' };
    introduce.call(engineer, 'Software Engineer'); // Output: My name is Charlie and I am a Software Engineer.
    ```

2.  **`apply(thisArg, [argsArray])`**:
    *   **Purpose**: Invokes a function immediately with a specified `this` value and arguments provided as an array (or an array-like object).
    *   **Syntax**: `function.apply(thisArg, [arg1, arg2, ...])`
    *   **Behavior**: Similar to `call()`, but it takes an array of arguments instead of individual arguments.
        *   The first argument (`thisArg`) sets the `this` context.
        *   The second argument is an array (or array-like object) of arguments to be passed to the function.
        *   The function is executed *immediately*.

    **Example:**
    ```javascript
    const person = {
        name: 'Alice',
        greet: function(city, country) {
            console.log(`Hello, my name is ${this.name} from ${city}, ${country}.`);
        }
    };

    const anotherPerson = { name: 'Bob' };

    const args = ['London', 'UK'];
    person.greet.apply(anotherPerson, args); // Output: Hello, my name is Bob from London, UK.

    function findMax() {
        return Math.max.apply(null, arguments); // Using arguments object
    }
    console.log(findMax(1, 5, 2, 8, 3)); // Output: 8

    const numbers = [10, 2, 7, 15, 3];
    console.log(Math.max.apply(null, numbers)); // Output: 15
    ```

3.  **`bind(thisArg, arg1, arg2, ...)`**:
    *   **Purpose**: Returns a *new function* (a "bound function") with a specified `this` value and, optionally, pre-set arguments. The original function is *not* executed immediately.
    *   **Syntax**: `function.bind(thisArg, arg1, arg2, ...)`
    *   **Behavior**: 
        *   Returns a new function where `this` is permanently bound to `thisArg`.
        *   Any additional arguments passed to `bind()` are pre-filled (curried) as the initial arguments of the new bound function.
        *   The bound function can then be invoked later, and any arguments passed at invocation time will follow the pre-filled ones.

    **Example:**
    ```javascript
    const person = {
        name: 'Alice',
        greet: function() {
            console.log(`Hello, my name is ${this.name}.`);
        }
    };

    const anotherPerson = { name: 'Bob' };

    // Create a new function where 'this' is permanently bound to 'anotherPerson'
    const boundGreet = person.greet.bind(anotherPerson);

    boundGreet(); // Output: Hello, my name is Bob. (executed later)

    // Example with pre-set arguments (currying)
    function multiply(a, b) {
        return this.value * a * b;
    }

    const context = { value: 2 };
    const multiplyByContext = multiply.bind(context); // Binds 'this' to context
    const multiplyByContextAnd5 = multiply.bind(context, 5); // Binds 'this' and pre-sets 'a' to 5

    console.log(multiplyByContext(3, 4));   // Equivalent to context.value * 3 * 4 -> Output: 24
    console.log(multiplyByContextAnd5(6)); // Equivalent to context.value * 5 * 6 -> Output: 60 (b is 6)
    ```

**Summary of Differences:**

| Feature         | `call()`                     | `apply()`                   | `bind()`                      |
| :-------------- | :--------------------------- | :-------------------------- | :---------------------------- |
| **Execution**   | Immediate                    | Immediate                   | Returns a *new* function      |
| **Arguments**   | Individual arguments         | Arguments as an array       | Individual arguments (pre-set) |
| **Return Value**| Result of the function call  | Result of the function call | A new bound function          |

**When to use each:**

*   Use **`call()`** when you want to invoke a function immediately with a specific `this` context and you have the arguments ready individually.
*   Use **`apply()`** when you want to invoke a function immediately with a specific `this` context and you have the arguments already in an array (e.g., when working with `arguments` object or dynamically generated argument lists).
*   Use **`bind()`** when you want to create a *new function* that has a permanently bound `this` context (and optionally pre-set arguments) for later execution. This is especially useful for event handlers, callbacks, and when passing methods as arguments to other functions to ensure `this` refers to the correct object.

### 19. What is debouncing and throttling?

**Answer:**
Debouncing and throttling are two common optimization techniques used in JavaScript to control how often a function is executed, particularly for events that fire rapidly (e.g., `scroll`, `resize`, `mousemove`, `keyup`, `input`). They help improve application performance and user experience by reducing the number of costly computations or API calls.

1.  **Debouncing**:

    *   **Concept**: Debouncing ensures that a function is executed only *after* a certain amount of time has passed since the *last* time it was invoked. It effectively "waits" for a period of inactivity before executing the function.
    *   **Analogy**: Imagine a frantic photographer who only takes a picture *after* a subject has remained still for a moment. If the subject moves, the timer resets, and they wait again.
    *   **Use Cases**:
        *   **Search bar input**: Executing an API call to fetch search results only when the user has stopped typing for a short period.
        *   **Window resizing**: Performing complex layout calculations only after the user has finished resizing the window.
        *   **Saving drafts**: Saving content to a database only when the user pauses typing.

    **How it works**: When the debounced function is called, it clears any existing timer and sets a new one. The actual function is only executed when the timer finally runs out without being reset.

    **Example (Conceptual):**
    ```javascript
    function debounce(func, delay) {
        let timeoutId; // This closure variable stores the timer ID

        return function(...args) {
            const context = this; // Capture 'this' context
            clearTimeout(timeoutId); // Clear previous timer
            timeoutId = setTimeout(() => {
                func.apply(context, args); // Execute the original function
            }, delay);
        };
    }

    // Imagine an input field where user types
    const expensiveSearch = (query) => {
        console.log(`Searching for: ${query}...`);
        // Simulate an API call or heavy computation
    };

    const debouncedSearch = debounce(expensiveSearch, 500); // Wait 500ms after last keystroke

    // Simulate user typing rapidly:
    // debouncedSearch('a'); // Timer starts
    // debouncedSearch('ap'); // Timer resets, new timer starts
    // debouncedSearch('app'); // Timer resets, new timer starts
    // (after 500ms of no further calls)
    // Output: Searching for: app...
    ```

2.  **Throttling**:
    *   **Concept**: Throttling ensures that a function is executed at most once within a specified time period, regardless of how many times it's invoked. It limits the rate at which a function can be called.
    *   **Analogy**: Imagine a turnstile at an event. You can only pass through once every few seconds, no matter how many times you try to push through.
    *   **Use Cases**:
        *   **Scroll events**: Updating UI based on scroll position, but not too frequently to avoid jank.
        *   **Game updates**: Limiting how often a game loop runs.
        *   **Button clicks**: Preventing accidental double-clicks on a submission button.
        *   **Drag events**: Updating an element's position during a drag, but only at a manageable frame rate.

    **How it works**: When the throttled function is called, it checks if enough time has passed since the last execution. If not, it ignores the call. If yes, it executes the function and resets the timer.

    **Example (Conceptual):**
    ```javascript
    function throttle(func, delay) {
        let inThrottle;
        let lastFn;
        let lastTime;

        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                lastTime = Date.now();
                inThrottle = true;
            } else {
                clearTimeout(lastFn);
                lastFn = setTimeout(() => {
                    if (Date.now() - lastTime >= delay) {
                        func.apply(context, args);
                        lastTime = Date.now();
                    }
                }, Math.max(delay - (Date.now() - lastTime), 0));
            }
        };
    }

    const expensiveScrollHandler = (event) => {
        console.log(`Scroll event at: ${window.scrollY}`);
    };

    const throttledScroll = throttle(expensiveScrollHandler, 200);

    // window.addEventListener('scroll', throttledScroll);

    // Simulate rapid scrolling:
    // Scroll... (triggered)
    // Scroll... (ignored, within 200ms)
    // Scroll... (ignored, within 200ms)
    // (after 200ms)
    // Scroll... (triggered again)
    ```

**Key Differences:**

| Feature        | Debouncing                                   | Throttling                                     |
| :------------- | :------------------------------------------- | :--------------------------------------------- |
| **Timing**     | Executes *after* inactivity                  | Executes *at most once* within a time window   |
| **Resetting**  | Timer resets on each new invocation          | Maintains a fixed interval between executions  |
| **Use Case**   | When you only care about the *final* state after rapid inputs (e.g., search suggestions) | When you want to limit the frequency of an action over time (e.g., scroll handling) |

Both techniques are invaluable for optimizing client-side performance and providing a smoother user experience in web applications.

### 20. What is shallow copy vs deep copy?

**Answer:**
When working with objects and arrays in JavaScript, understanding the difference between shallow copy and deep copy is crucial, especially concerning how changes to the copy affect the original data. This distinction primarily applies to objects (including arrays, which are a type of object).

**1. Shallow Copy**:

    *   **Concept**: A shallow copy creates a new object or array, but it only copies the *top-level* properties or elements. If any of the original object's properties are themselves objects (or arrays), only their *references* are copied, not the objects themselves.
    *   **Consequence**: If a nested object or array is modified in the copied structure, the original object will also be affected because both the original and the copy point to the same nested object in memory.

    **Methods to achieve a shallow copy:**
    *   **Spread operator (`...`)**: For arrays and objects.
    *   **`Object.assign()`**: For objects.
    *   **`Array.prototype.slice()`**: For arrays.
    *   **`Array.from()`**: For arrays.
    *   **`concat()`**: For arrays.

    **Example (using spread operator):**
    ```javascript
    const original = {
        a: 1,
        b: {
            c: 2,
            d: [3, 4]
        }
    };

    const shallowCopy = { ...original };

    console.log('Original:', original);
    console.log('Shallow Copy:', shallowCopy);

    // Modifying a top-level primitive property in the copy does NOT affect original
    shallowCopy.a = 100;
    console.log('After shallowCopy.a = 100 -> Original.a:', original.a); // 1
    console.log('After shallowCopy.a = 100 -> ShallowCopy.a:', shallowCopy.a); // 100

    // Modifying a nested object property in the copy DOES affect original
    shallowCopy.b.c = 200;
    console.log('After shallowCopy.b.c = 200 -> Original.b.c:', original.b.c); // 200
    console.log('After shallowCopy.b.c = 200 -> ShallowCopy.b.c:', shallowCopy.b.c); // 200

    // Modifying a nested array element in the copy DOES affect original
    shallowCopy.b.d.push(5);
    console.log('After shallowCopy.b.d.push(5) -> Original.b.d:', original.b.d); // [3, 4, 5]
    console.log('After shallowCopy.b.d.push(5) -> ShallowCopy.b.d:', shallowCopy.b.d); // [3, 4, 5]

    // Check if they are the same reference for nested object
    console.log(original.b === shallowCopy.b); // true (they point to the same nested object)
    ```

2.  **Deep Copy**:
    *   **Concept**: A deep copy creates a completely independent copy of an object or array, including all nested objects and arrays. No references are shared between the original and the copy.
    *   **Consequence**: Changes made to the deep copy (at any level) will *not* affect the original object, and vice-versa. They are entirely separate entities in memory.

    **Methods to achieve a deep copy:**
    *   **`JSON.parse(JSON.stringify(object))`**: This is a common and simple method, but it has limitations:
        *   It cannot handle circular references (will throw an error).
        *   It cannot copy functions, `undefined`, `Symbol` values, or `Date` objects correctly (they will be lost or converted to strings).
        *   It won't copy `RegExp` objects, `Map`, `Set`, `Blob`, `File`, etc.
    *   **Recursion (custom function)**: Writing a recursive function to traverse and copy each nested object/array.
    *   **Libraries**: Using specialized deep copy libraries like Lodash's `_.cloneDeep()` for robust and feature-rich deep copying.

    **Example (using `JSON.parse(JSON.stringify())`):**
    ```javascript
    const original = {
        a: 1,
        b: {
            c: 2,
            d: [3, 4]
        },
        e: function() { console.log('hello'); }
    };

    const deepCopy = JSON.parse(JSON.stringify(original));

    console.log('Original:', original);
    console.log('Deep Copy:', deepCopy);

    // Modifying a top-level primitive property in the copy does NOT affect original
    deepCopy.a = 100;
    console.log('After deepCopy.a = 100 -> Original.a:', original.a); // 1
    console.log('After deepCopy.a = 100 -> DeepCopy.a:', deepCopy.a); // 100

    // Modifying a nested object property in the copy does NOT affect original
    deepCopy.b.c = 200;
    console.log('After deepCopy.b.c = 200 -> Original.b.c:', original.b.c); // 2
    console.log('After deepCopy.b.c = 200 -> DeepCopy.b.c:', deepCopy.b.c); // 200

    // Modifying a nested array element in the copy does NOT affect original
    deepCopy.b.d.push(5);
    console.log('After deepCopy.b.d.push(5) -> Original.b.d:', original.b.d); // [3, 4]
    console.log('After deepCopy.b.d.push(5) -> DeepCopy.b.d:', deepCopy.b.d); // [3, 4, 5]

    // Check if they are the same reference for nested object
    console.log(original.b === deepCopy.b); // false
    console.log(deepCopy.e); // undefined (function was not copied)
    ```

**When to choose which:**

*   Use **shallow copy** when your object or array contains only primitive values, or when you only need to modify top-level properties and don't care about shared references for nested objects.
*   Use **deep copy** when your object or array contains nested objects/arrays, and you need a completely independent copy where changes to the copy will *never* affect the original, and you are aware of the limitations of the chosen deep copy method.

