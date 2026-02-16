# ⭐ Level 3: Advanced JavaScript Concepts & Coding Questions

## 📚 Theory Questions

### 1. What is the prototype chain?

**Answer:**
The prototype chain is JavaScript's mechanism for inheritance. Every object in JavaScript has a hidden property called `__proto__` (or `[[Prototype]]`) that points to another object. When you try to access a property or method on an object, JavaScript first looks for it on the object itself. If not found, it looks up the prototype chain by following the `__proto__` link until it finds the property or reaches `null`.

**Example:**
```javascript
// Creating objects with prototype chain
const animal = {
  type: 'Animal',
  makeSound() {
    return `${this.name} makes a sound`;
  }
};

const dog = {
  name: 'Buddy',
  breed: 'Golden Retriever'
};

// Setting up prototype chain
dog.__proto__ = animal; // or use Object.setPrototypeOf(dog, animal)

console.log(dog.type);        // 'Animal' (from prototype)
console.log(dog.name);        // 'Buddy' (own property)
console.log(dog.makeSound()); // 'Buddy makes a sound' (from prototype)

// The chain: dog -> animal -> Object.prototype -> null
console.log(dog.__proto__ === animal); // true
console.log(animal.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

**Modern Approach (using Object.create):**
```javascript
const animal = {
  type: 'Animal',
  makeSound() {
    return `${this.name} makes a sound`;
  }
};

const dog = Object.create(animal);
dog.name = 'Buddy';
dog.breed = 'Golden Retriever';

console.log(dog.type); // 'Animal'
```

---

### 2. How does inheritance work in JS?

**Answer:**
JavaScript uses prototype-based inheritance (not class-based like Java/C++). Objects inherit properties and methods from their prototype. There are several ways to implement inheritance:

1. **Prototype Chain** - Direct prototype linking
2. **Constructor Functions** - Using `new` keyword
3. **ES6 Classes** - Syntactic sugar over prototypes
4. **Object.create()** - Creating objects with specific prototypes

**Example 1: Constructor Functions**
```javascript
// Parent constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function() {
  return `${this.name} makes a sound`;
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.makeSound()); // 'Buddy makes a sound'
console.log(myDog.bark());      // 'Buddy barks!'
```

**Example 2: ES6 Classes**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  makeSound() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  bark() {
    return `${this.name} barks!`;
  }
}

const myDog = new Dog('Buddy', 'Golden Retriever');
console.log(myDog.makeSound()); // 'Buddy makes a sound'
console.log(myDog.bark());      // 'Buddy barks!'
```

**Example 3: Object.create()**
```javascript
const animal = {
  init(name) {
    this.name = name;
    return this;
  },
  makeSound() {
    return `${this.name} makes a sound`;
  }
};

const dog = Object.create(animal);
dog.init = function(name, breed) {
  animal.init.call(this, name);
  this.breed = breed;
  return this;
};
dog.bark = function() {
  return `${this.name} barks!`;
};

const myDog = Object.create(dog).init('Buddy', 'Golden Retriever');
console.log(myDog.makeSound()); // 'Buddy makes a sound'
```

---

### 3. What is execution context?

**Answer:**
Execution context is the environment where JavaScript code is evaluated and executed. It contains:
- **Variable Environment** - Stores variables and function declarations
- **Lexical Environment** - Stores variables, functions, and `this` binding
- **`this` binding** - Reference to the current object

There are three types:
1. **Global Execution Context** - Created when script first runs
2. **Function Execution Context** - Created when a function is called
3. **Eval Execution Context** - Created when code runs in `eval()`

**Example:**
```javascript
// Global Execution Context
var globalVar = 'I am global';
let globalLet = 'I am also global';

function outer() {
  // Function Execution Context for outer()
  var outerVar = 'I am in outer';
  
  function inner() {
    // Function Execution Context for inner()
    var innerVar = 'I am in inner';
    console.log(globalVar);  // Accessible (global scope)
    console.log(outerVar);   // Accessible (closure)
    console.log(innerVar);   // Accessible (local scope)
  }
  
  inner();
}

outer();

// Execution Context Stack (Call Stack):
// [Global] -> [outer] -> [inner]
// When inner() finishes: [Global] -> [outer]
// When outer() finishes: [Global]
```

**Execution Context Phases:**
```javascript
function example(a, b) {
  // Phase 1: Creation Phase
  // - Variable declarations are hoisted (var = undefined)
  // - Function declarations are hoisted
  // - `this` is determined
  // - Arguments object is created
  
  console.log(x); // undefined (not ReferenceError due to hoisting)
  var x = 10;
  
  // Phase 2: Execution Phase
  // - Code is executed line by line
  // - Assignments happen
  return a + b;
}
```

---

### 4. What is lexical scope?

**Answer:**
Lexical scope (also called static scope) means that the scope of a variable is determined by its position in the source code at the time it's written, not where it's called. JavaScript uses lexical scoping.

**Example:**
```javascript
function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    // inner() has access to outerVar because of lexical scope
    // The scope is determined by where inner() is defined (inside outer())
    console.log(outerVar); // 'I am outer'
    
    const innerVar = 'I am inner';
    console.log(innerVar); // 'I am inner'
  }
  
  // inner() can access outerVar even if called outside outer()
  return inner;
}

const myInner = outer();
myInner(); // Still has access to outerVar (closure)

// Example showing lexical vs dynamic scope
const x = 'global';

function showX() {
  console.log(x); // 'global' (lexical scope - looks where function is defined)
}

function wrapper() {
  const x = 'local';
  showX(); // Still prints 'global', not 'local'
}

wrapper();
```

**Block Scope (let/const):**
```javascript
function example() {
  if (true) {
    let blockScoped = 'I am block scoped';
    var functionScoped = 'I am function scoped';
  }
  
  // console.log(blockScoped); // ReferenceError
  console.log(functionScoped); // 'I am function scoped'
}
```

---

### 5. Difference between synchronous & asynchronous programming?

**Answer:**

**Synchronous Programming:**
- Code executes line by line, in order
- Each operation blocks until it completes
- Next operation waits for previous one to finish
- Single-threaded execution

**Asynchronous Programming:**
- Code doesn't wait for operations to complete
- Operations can run in parallel or be scheduled for later
- Uses callbacks, promises, or async/await
- Non-blocking execution

**Example: Synchronous**
```javascript
console.log('1');
console.log('2');
console.log('3');
// Output: 1, 2, 3 (in order)

function syncFunction() {
  console.log('Start');
  // This blocks for 2 seconds
  const start = Date.now();
  while (Date.now() - start < 2000) {} // Blocking operation
  console.log('End');
}

syncFunction();
console.log('After function');
// Output: Start, End, After function
// Everything waits
```

**Example: Asynchronous**
```javascript
console.log('1');

// Asynchronous operation - doesn't block
setTimeout(() => {
  console.log('2');
}, 1000);

console.log('3');
// Output: 1, 3, 2 (2 comes after 1 second)

// Async with Promises
function asyncFunction() {
  console.log('Start');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('End');
      resolve('Done');
    }, 2000);
  });
}

asyncFunction().then(result => {
  console.log(result);
});
console.log('After function');
// Output: Start, After function, End, Done
```

**Example: Async/Await**
```javascript
async function fetchData() {
  console.log('Fetching...');
  
  // await pauses execution but doesn't block the thread
  const data = await new Promise(resolve => {
    setTimeout(() => resolve('Data received'), 1000);
  });
  
  console.log(data);
  return data;
}

fetchData();
console.log('This runs immediately');
// Output: Fetching..., This runs immediately, Data received
```

**Key Differences:**
| Synchronous | Asynchronous |
|------------|--------------|
| Blocking | Non-blocking |
| Sequential execution | Can execute in parallel |
| Simple to understand | More complex |
| Can cause UI freezing | Better user experience |
| No callbacks needed | Uses callbacks/promises |

---

### 6. What is event bubbling and event capturing?

**Answer:**
These are two phases of event propagation in the DOM:

1. **Event Capturing (Trickling Down)**: Event travels from root to target element
2. **Target Phase**: Event reaches the target element
3. **Event Bubbling (Bubbling Up)**: Event travels from target back to root

**Example:**
```html
<div id="grandparent">
  <div id="parent">
    <div id="child">Click me</div>
  </div>
</div>
```

```javascript
const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

// Event Bubbling (default - third parameter is false or omitted)
child.addEventListener('click', () => {
  console.log('Child clicked');
});

parent.addEventListener('click', () => {
  console.log('Parent clicked');
});

grandparent.addEventListener('click', () => {
  console.log('Grandparent clicked');
});

// When clicking child, output:
// Child clicked
// Parent clicked
// Grandparent clicked
// (Bubbles up from child to grandparent)

// Event Capturing (third parameter is true)
child.addEventListener('click', () => {
  console.log('Child clicked');
}, true); // Capturing phase

parent.addEventListener('click', () => {
  console.log('Parent clicked');
}, true);

grandparent.addEventListener('click', () => {
  console.log('Grandparent clicked');
}, true);

// When clicking child, output:
// Grandparent clicked
// Parent clicked
// Child clicked
// (Captures down from grandparent to child)
```

**Stopping Propagation:**
```javascript
child.addEventListener('click', (e) => {
  e.stopPropagation(); // Stops event from bubbling/capturing
  console.log('Child clicked');
});

// stopImmediatePropagation() stops all handlers on same element
child.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  console.log('First handler');
});

child.addEventListener('click', () => {
  console.log('This will not run');
});
```

---

### 7. What is currying?

**Answer:**
Currying is a technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument. It allows partial application of functions.

**Example:**
```javascript
// Normal function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6

// Arrow function currying
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6
```

**Practical Example:**
```javascript
// Curried function for API calls
function fetchAPI(baseURL) {
  return function(endpoint) {
    return function(method) {
      return function(data) {
        return fetch(`${baseURL}${endpoint}`, {
          method: method,
          body: JSON.stringify(data)
        });
      };
    };
  };
}

// Create specialized functions
const api = fetchAPI('https://api.example.com');
const usersAPI = api('/users');
const getUsers = usersAPI('GET');
const postUser = usersAPI('POST');

// Usage
getUsers(null).then(/* ... */);
postUser({ name: 'John' }).then(/* ... */);

// Generic curry helper
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

const curriedMultiply = curry((a, b, c) => a * b * c);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4));  // 24
console.log(curriedMultiply(2)(3, 4));  // 24
```

---

### 8. What is memoization?

**Answer:**
Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again.

**Example:**
```javascript
// Without memoization (inefficient)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// This recalculates same values many times
console.log(fibonacci(40)); // Slow!

// With memoization
function memoizedFibonacci() {
  const cache = {};
  
  return function fib(n) {
    if (n in cache) {
      return cache[n];
    }
    
    if (n <= 1) {
      cache[n] = n;
      return n;
    }
    
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = memoizedFibonacci();
console.log(fib(40)); // Fast!

// Generic memoization function
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Cache hit!');
      return cache[key];
    }
    
    console.log('Calculating...');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Example usage
const expensiveFunction = (a, b) => {
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += a + b;
  }
  return sum;
};

const memoizedExpensive = memoize(expensiveFunction);

console.log(memoizedExpensive(5, 10)); // Calculating...
console.log(memoizedExpensive(5, 10)); // Cache hit!
console.log(memoizedExpensive(5, 10)); // Cache hit!
```

**Memoization with Map (better for object keys):**
```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = args.length === 1 ? args[0] : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

### 9. What is a generator function?

**Answer:**
Generator functions are special functions that can be paused and resumed. They use the `function*` syntax and `yield` keyword. They return a Generator object that can be iterated.

**Example:**
```javascript
// Generator function
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
  return 4; // Return value (not included in iteration)
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: 4, done: true }

// Using for...of
for (const value of numberGenerator()) {
  console.log(value); // 1, 2, 3 (doesn't include return value)
}

// Infinite generator
function* infiniteNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const infinite = infiniteNumbers();
console.log(infinite.next().value); // 1
console.log(infinite.next().value); // 2
console.log(infinite.next().value); // 3

// Generator with parameters
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Passing values to generator
function* generator() {
  const x = yield 1;
  const y = yield x + 2;
  return y + 3;
}

const gen2 = generator();
console.log(gen2.next());    // { value: 1, done: false }
console.log(gen2.next(10));  // { value: 12, done: false } (x = 10)
console.log(gen2.next(20));  // { value: 23, done: true } (y = 20)
```

**Practical Example:**
```javascript
// Generator for async operations
function* asyncGenerator() {
  const data1 = yield fetch('/api/data1');
  const data2 = yield fetch('/api/data2');
  return { data1, data2 };
}

// Generator for state management
function* stateMachine() {
  let state = 'idle';
  
  while (true) {
    const action = yield state;
    
    switch (action) {
      case 'start':
        state = 'running';
        break;
      case 'pause':
        state = 'paused';
        break;
      case 'stop':
        state = 'stopped';
        break;
    }
  }
}

const machine = stateMachine();
console.log(machine.next().value);        // 'idle'
console.log(machine.next('start').value); // 'running'
console.log(machine.next('pause').value); // 'paused'
```

---

### 10. Why is JavaScript single-threaded?

**Answer:**
JavaScript is single-threaded because it was designed to run in browsers where it needs to interact with the DOM. Having a single thread prevents race conditions and makes the code predictable. However, JavaScript uses an event loop and asynchronous operations to handle concurrency without blocking.

**Key Points:**
1. **One Call Stack**: Only one piece of code executes at a time
2. **Event Loop**: Manages asynchronous operations
3. **Non-blocking**: Uses callbacks, promises, async/await
4. **Web Workers**: Can create separate threads for heavy computations

**Example:**
```javascript
// Single-threaded execution
console.log('1');
console.log('2');
console.log('3');
// Always executes in order: 1, 2, 3

// Even with async, it's still single-threaded
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Output: Start, End, Promise, Timeout
// All on the same thread, just scheduled differently
```

**Event Loop Visualization:**
```javascript
// Call Stack (single thread)
// ↓
// Web APIs (setTimeout, fetch, etc.)
// ↓
// Callback Queue / Microtask Queue
// ↓
// Event Loop (checks if stack is empty, then moves callbacks to stack)

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Execution order:
// 1. '1' - synchronous
// 2. setTimeout scheduled (Web API)
// 3. Promise.then scheduled (Microtask Queue)
// 4. '4' - synchronous
// 5. Call stack empty, event loop checks microtask queue
// 6. '3' - from microtask queue
// 7. Call stack empty, event loop checks callback queue
// 8. '2' - from callback queue

// Output: 1, 4, 3, 2
```

**Web Workers (Multi-threading):**
```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({ data: [1, 2, 3, 4, 5] });

worker.onmessage = (e) => {
  console.log('Result:', e.data);
};

// worker.js (runs in separate thread)
self.onmessage = (e) => {
  const result = e.data.data.reduce((sum, num) => sum + num, 0);
  self.postMessage(result);
};
```

---

## 💻 Coding Questions (Must Practice)

### 1. Reverse a string without using built-in reverse()

**Solution:**
```javascript
// Method 1: Using loop
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseString('hello')); // 'olleh'

// Method 2: Using recursion
function reverseStringRecursive(str) {
  if (str === '') return '';
  return reverseStringRecursive(str.substr(1)) + str[0];
}

console.log(reverseStringRecursive('hello')); // 'olleh'

// Method 3: Using array methods (without reverse())
function reverseStringArray(str) {
  return str.split('').reduce((acc, char) => char + acc, '');
}

console.log(reverseStringArray('hello')); // 'olleh'

// Method 4: Using spread operator
function reverseStringSpread(str) {
  return [...str].reduce((acc, char) => char + acc, '');
}

console.log(reverseStringSpread('hello')); // 'olleh'
```

---

### 2. Find the frequency of each character in a string

**Solution:**
```javascript
// Method 1: Using object
function charFrequency(str) {
  const frequency = {};
  
  for (let char of str) {
    frequency[char] = (frequency[char] || 0) + 1;
  }
  
  return frequency;
}

console.log(charFrequency('hello'));
// { h: 1, e: 1, l: 2, o: 1 }

// Method 2: Using Map
function charFrequencyMap(str) {
  const frequency = new Map();
  
  for (let char of str) {
    frequency.set(char, (frequency.get(char) || 0) + 1);
  }
  
  return frequency;
}

console.log(charFrequencyMap('hello'));
// Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }

// Method 3: Using reduce
function charFrequencyReduce(str) {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

console.log(charFrequencyReduce('hello'));
// { h: 1, e: 1, l: 2, o: 1 }

// Case-insensitive version
function charFrequencyCaseInsensitive(str) {
  const frequency = {};
  const lowerStr = str.toLowerCase();
  
  for (let char of lowerStr) {
    if (char !== ' ') { // Ignore spaces
      frequency[char] = (frequency[char] || 0) + 1;
    }
  }
  
  return frequency;
}

console.log(charFrequencyCaseInsensitive('Hello World'));
// { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }
```

---

### 3. Write a function for debounce()

**Solution:**
```javascript
// Debounce: Execute function only after a certain time has passed
// since the last time it was invoked

function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // API call here
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Example: Window resize
const debouncedResize = debounce(() => {
  console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Advanced: Immediate option
function debounceAdvanced(func, delay, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(this, args);
    }
  };
}

// Usage
const debouncedClick = debounceAdvanced(() => {
  console.log('Button clicked');
}, 1000, true); // Execute immediately, then debounce
```

---

### 4. Write a function for throttle()

**Solution:**
```javascript
// Throttle: Execute function at most once per time period
// Ensures function is called regularly, not after inactivity

function throttle(func, delay) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Example: Scroll event
const throttledScroll = throttle(() => {
  console.log('Scrolling');
}, 100);

window.addEventListener('scroll', throttledScroll);

// Advanced: Leading and trailing options
function throttleAdvanced(func, delay, options = {}) {
  let lastCall = 0;
  let timeoutId = null;
  const { leading = true, trailing = true } = options;
  
  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= delay) {
      if (leading) {
        lastCall = now;
        func.apply(this, args);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    } else if (trailing && !timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, delay - timeSinceLastCall);
    }
  };
}

// Usage
const throttledMouseMove = throttleAdvanced(
  (e) => {
    console.log('Mouse moved:', e.clientX, e.clientY);
  },
  100,
  { leading: true, trailing: true }
);

document.addEventListener('mousemove', throttledMouseMove);

// Comparison: Debounce vs Throttle
// Debounce: Wait for pause in events
// Throttle: Execute at regular intervals
```

---

### 5. Flatten this array: [1, [2, [3]]] → [1, 2, 3]

**Solution:**
```javascript
// Method 1: Using recursion
function flattenArray(arr) {
  let result = [];
  
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

console.log(flattenArray([1, [2, [3]]])); // [1, 2, 3]
console.log(flattenArray([1, [2, [3, [4]]]])); // [1, 2, 3, 4]

// Method 2: Using reduce
function flattenArrayReduce(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenArrayReduce(item) : item);
  }, []);
}

console.log(flattenArrayReduce([1, [2, [3]]])); // [1, 2, 3]

// Method 3: Using flat() with Infinity (built-in, but for reference)
function flattenArrayFlat(arr) {
  return arr.flat(Infinity);
}

console.log(flattenArrayFlat([1, [2, [3]]])); // [1, 2, 3]

// Method 4: Using stack (iterative)
function flattenArrayStack(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length > 0) {
    const next = stack.pop();
    
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  
  return result.reverse(); // Reverse to maintain order
}

console.log(flattenArrayStack([1, [2, [3]]])); // [1, 2, 3]

// Method 5: Using toString() (only works for numbers)
function flattenArrayToString(arr) {
  return arr.toString().split(',').map(Number);
}

console.log(flattenArrayToString([1, [2, [3]]])); // [1, 2, 3]
```

---

### 6. Remove duplicates from array: [1,1,2,3,3] → [1,2,3]

**Solution:**
```javascript
// Method 1: Using Set
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 1, 2, 3, 3])); // [1, 2, 3]

// Method 2: Using filter and indexOf
function removeDuplicatesFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicatesFilter([1, 1, 2, 3, 3])); // [1, 2, 3]

// Method 3: Using reduce
function removeDuplicatesReduce(arr) {
  return arr.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

console.log(removeDuplicatesReduce([1, 1, 2, 3, 3])); // [1, 2, 3]

// Method 4: Using for loop
function removeDuplicatesLoop(arr) {
  const result = [];
  
  for (let item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  
  return result;
}

console.log(removeDuplicatesLoop([1, 1, 2, 3, 3])); // [1, 2, 3]

// Method 5: Using Map (preserves order, works with objects)
function removeDuplicatesMap(arr) {
  const seen = new Map();
  
  return arr.filter(item => {
    const key = typeof item === 'object' ? JSON.stringify(item) : item;
    if (seen.has(key)) {
      return false;
    }
    seen.set(key, true);
    return true;
  });
}

console.log(removeDuplicatesMap([1, 1, 2, 3, 3])); // [1, 2, 3]
console.log(removeDuplicatesMap([{a: 1}, {a: 1}, {b: 2}])); // [{a: 1}, {b: 2}]

// Performance comparison:
// Set: O(n) - Fastest
// filter + indexOf: O(n²) - Slowest
// reduce + includes: O(n²) - Slow
```

---

### 7. Write your own map function

**Solution:**
```javascript
// Method 1: Using for loop
function myMap(arr, callback) {
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  
  return result;
}

// Usage
const numbers = [1, 2, 3, 4];
const doubled = myMap(numbers, num => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// Method 2: Using for...of
function myMapForOf(arr, callback) {
  const result = [];
  let index = 0;
  
  for (let item of arr) {
    result.push(callback(item, index, arr));
    index++;
  }
  
  return result;
}

// Method 3: Adding to Array prototype (not recommended in production)
Array.prototype.myMap = function(callback) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  
  return result;
};

// Usage
const squares = [1, 2, 3].myMap(x => x * x);
console.log(squares); // [1, 4, 9]

// Method 4: Using reduce
function myMapReduce(arr, callback) {
  return arr.reduce((acc, item, index) => {
    acc.push(callback(item, index, arr));
    return acc;
  }, []);
}

// Examples
const names = ['Alice', 'Bob', 'Charlie'];
const upperNames = myMap(names, name => name.toUpperCase());
console.log(upperNames); // ['ALICE', 'BOB', 'CHARLIE']

const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 }
];
const namesOnly = myMap(users, user => user.name);
console.log(namesOnly); // ['John', 'Jane']

// With index
const indexed = myMap(['a', 'b', 'c'], (item, index) => `${index}: ${item}`);
console.log(indexed); // ['0: a', '1: b', '2: c']
```

---

### 8. Write a function to check if a string is anagram

**Solution:**
```javascript
// Anagram: Two strings have the same characters in different order

// Method 1: Sort and compare
function isAnagram(str1, str2) {
  // Remove spaces and convert to lowercase
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  // Check length
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  // Sort and compare
  const sorted1 = normalized1.split('').sort().join('');
  const sorted2 = normalized2.split('').sort().join('');
  
  return sorted1 === sorted2;
}

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false
console.log(isAnagram('The Morse Code', 'Here come dots')); // true

// Method 2: Using character frequency
function isAnagramFrequency(str1, str2) {
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  const frequency1 = {};
  const frequency2 = {};
  
  for (let char of normalized1) {
    frequency1[char] = (frequency1[char] || 0) + 1;
  }
  
  for (let char of normalized2) {
    frequency2[char] = (frequency2[char] || 0) + 1;
  }
  
  // Compare frequencies
  for (let char in frequency1) {
    if (frequency1[char] !== frequency2[char]) {
      return false;
    }
  }
  
  return true;
}

console.log(isAnagramFrequency('listen', 'silent')); // true

// Method 3: Using Map
function isAnagramMap(str1, str2) {
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  const charMap = new Map();
  
  // Count characters in first string
  for (let char of normalized1) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Subtract characters from second string
  for (let char of normalized2) {
    const count = charMap.get(char);
    if (!count) {
      return false;
    }
    charMap.set(char, count - 1);
  }
  
  // Check if all counts are zero
  for (let count of charMap.values()) {
    if (count !== 0) {
      return false;
    }
  }
  
  return true;
}

console.log(isAnagramMap('listen', 'silent')); // true

// Method 4: One-pass frequency check
function isAnagramOnePass(str1, str2) {
  const normalize = (str) => str.replace(/\s/g, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  const charMap = new Map();
  
  // Add from first string
  for (let char of normalized1) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Subtract from second string
  for (let char of normalized2) {
    const count = charMap.get(char);
    if (!count || count === 0) {
      return false;
    }
    charMap.set(char, count - 1);
  }
  
  return true;
}

console.log(isAnagramOnePass('listen', 'silent')); // true
```

---

### 9. Write a function that returns a promise that resolves after 2 seconds

**Solution:**
```javascript
// Method 1: Basic promise
function delayTwoSeconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Resolved after 2 seconds');
    }, 2000);
  });
}

// Usage
delayTwoSeconds().then(result => {
  console.log(result); // 'Resolved after 2 seconds' (after 2 seconds)
});

// Method 2: Generic delay function
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${ms}ms`);
    }, ms);
  });
}

// Usage
delay(2000).then(result => {
  console.log(result);
});

// Method 3: With async/await
async function delayAsync() {
  const result = await delay(2000);
  console.log(result);
}

delayAsync();

// Method 4: Promise that resolves with value
function delayWithValue(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

// Usage
delayWithValue(2000, 'Hello').then(result => {
  console.log(result); // 'Hello' (after 2 seconds)
});

// Method 5: Using Promise.resolve with setTimeout
function delayPromise(ms) {
  return Promise.resolve().then(() => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  });
}

// Practical example: Sequential delays
async function sequentialDelays() {
  console.log('Start');
  await delay(1000);
  console.log('After 1 second');
  await delay(1000);
  console.log('After 2 seconds');
}

sequentialDelays();

// Practical example: Parallel delays
Promise.all([
  delay(1000).then(() => console.log('Task 1 done')),
  delay(2000).then(() => console.log('Task 2 done')),
  delay(1500).then(() => console.log('Task 3 done'))
]).then(() => {
  console.log('All tasks completed');
});
```

---

### 10. Implement a simple counter using closure

**Solution:**
```javascript
// Method 1: Basic counter
function createCounter() {
  let count = 0;
  
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Method 2: Counter with initial value
function createCounterWithInitial(initialValue = 0) {
  let count = initialValue;
  
  return function() {
    return ++count;
  };
}

const counterFrom5 = createCounterWithInitial(5);
console.log(counterFrom5()); // 6
console.log(counterFrom5()); // 7

// Method 3: Counter with increment/decrement
function createAdvancedCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getValue() {
      return count;
    },
    reset() {
      count = initialValue;
      return count;
    }
  };
}

const advancedCounter = createAdvancedCounter(10);
console.log(advancedCounter.increment()); // 11
console.log(advancedCounter.increment()); // 12
console.log(advancedCounter.decrement()); // 11
console.log(advancedCounter.getValue());  // 11
console.log(advancedCounter.reset());      // 10

// Method 4: Counter with step
function createCounterWithStep(initialValue = 0, step = 1) {
  let count = initialValue;
  
  return {
    increment() {
      count += step;
      return count;
    },
    decrement() {
      count -= step;
      return count;
    },
    getValue() {
      return count;
    }
  };
}

const stepCounter = createCounterWithStep(0, 5);
console.log(stepCounter.increment()); // 5
console.log(stepCounter.increment()); // 10
console.log(stepCounter.decrement()); // 5

// Method 5: Multiple independent counters
function createCounterFactory() {
  let counterId = 0;
  
  return function(initialValue = 0) {
    let count = initialValue;
    const id = ++counterId;
    
    return {
      id,
      increment() {
        return ++count;
      },
      decrement() {
        return --count;
      },
      getValue() {
        return count;
      }
    };
  };
}

const createCounter = createCounterFactory();
const counter1 = createCounter(0);
const counter2 = createCounter(100);

console.log(counter1.increment()); // 1
console.log(counter2.increment()); // 101
console.log(counter1.increment()); // 2
console.log(counter2.getValue());  // 101

// Method 6: Counter with maximum limit
function createBoundedCounter(initialValue = 0, maxValue = Infinity) {
  let count = initialValue;
  
  return {
    increment() {
      if (count < maxValue) {
        count++;
      }
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getValue() {
      return count;
    },
    isMax() {
      return count >= maxValue;
    }
  };
}

const boundedCounter = createBoundedCounter(0, 5);
console.log(boundedCounter.increment()); // 1
console.log(boundedCounter.increment()); // 2
console.log(boundedCounter.increment()); // 3
console.log(boundedCounter.increment()); // 4
console.log(boundedCounter.increment()); // 5
console.log(boundedCounter.increment()); // 5 (max reached)
console.log(boundedCounter.isMax());     // true
```

---

## 🎯 Key Takeaways

1. **Prototype Chain**: Understand how JavaScript looks up properties through the chain
2. **Inheritance**: Know different ways to implement inheritance (prototypes, classes)
3. **Execution Context**: Understand how JavaScript executes code and manages scope
4. **Lexical Scope**: Know that scope is determined at write-time, not runtime
5. **Async/Sync**: Understand the event loop and how async operations work
6. **Event Propagation**: Know bubbling and capturing phases
7. **Functional Concepts**: Currying and memoization for optimization
8. **Generators**: Understand pausable functions with yield
9. **Single-threaded**: Know why and how JavaScript handles concurrency
10. **Practice Coding**: Master these common interview patterns

---

## 📝 Practice Tips

1. **Understand the "why"**: Don't just memorize, understand the reasoning
2. **Multiple solutions**: Try solving each problem in different ways
3. **Edge cases**: Always consider edge cases (empty arrays, null values, etc.)
4. **Time complexity**: Think about Big O notation for your solutions
5. **Space complexity**: Consider memory usage
6. **Test your code**: Write test cases for each solution
7. **Explain out loud**: Practice explaining your solutions as you code

Good luck with your interviews! 🚀
