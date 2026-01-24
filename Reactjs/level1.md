# ✅ React Level 1: Core Fundamentals (Must-know)

## 📚 Theory Questions with Answers & Examples

### 1. What is React and why is it used?

**Answer:**
React is a JavaScript library (not a framework) developed by Facebook for building user interfaces, particularly web applications. It's used to create interactive, component-based UIs efficiently.

**Why React is used:**
1. **Component-Based Architecture** - Reusable, modular UI components
2. **Virtual DOM** - Efficient updates and rendering
3. **Declarative Syntax** - Describe what UI should look like, not how to build it
4. **Unidirectional Data Flow** - Predictable state management
5. **Large Ecosystem** - Rich community, libraries, and tools
6. **Performance** - Optimized rendering with diffing algorithm
7. **Developer Experience** - Great tooling, hot reload, React DevTools

**Example:**
```javascript
// Simple React component
import React from 'react';

function Welcome() {
  return <h1>Hello, World!</h1>;
}

export default Welcome;

// Why React? Compare with vanilla JS:
// Vanilla JS (Imperative - tell HOW)
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
  button.textContent = 'Clicked!';
});
document.body.appendChild(button);

// React (Declarative - tell WHAT)
function Button() {
  const [text, setText] = useState('Click me');
  return <button onClick={() => setText('Clicked!')}>{text}</button>;
}
```

**Key Points for Interview:**
- React is a **library**, not a framework (unlike Angular)
- Created by Facebook (now Meta) in 2013
- Used by companies like Netflix, Airbnb, Instagram, WhatsApp
- Focuses on the **view layer** of MVC architecture
- Can be used with other libraries for routing, state management, etc.

---

### 2. What is JSX? How is it different from HTML?

**Answer:**
JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It's not HTML - it gets transpiled to JavaScript function calls (React.createElement).

**Key Differences from HTML:**

| Feature | HTML | JSX |
|---------|------|-----|
| **Syntax** | `class` attribute | `className` (reserved word) |
| **Self-closing tags** | Optional `<br>` | Required `<br />` |
| **JavaScript expressions** | Not possible | `{expression}` |
| **Event handlers** | `onclick` (lowercase) | `onClick` (camelCase) |
| **Inline styles** | String `style="color: red"` | Object `style={{color: 'red'}}` |
| **Comments** | `<!-- comment -->` | `{/* comment */}` |

**Example:**
```javascript
// JSX Example
function Greeting({ name, age }) {
  const isAdult = age >= 18;
  
  return (
    <div className="greeting-container">
      <h1 style={{ color: 'blue', fontSize: '24px' }}>
        Hello, {name}!
      </h1>
      {isAdult ? (
        <p>You are an adult</p>
      ) : (
        <p>You are a minor</p>
      )}
      {/* This is a JSX comment */}
      <input 
        type="text" 
        placeholder="Enter name"
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

// What JSX compiles to (React.createElement):
function Greeting({ name, age }) {
  return React.createElement(
    'div',
    { className: 'greeting-container' },
    React.createElement('h1', { style: { color: 'blue' } }, `Hello, ${name}!`)
  );
}

// Common JSX Gotchas:
function Example() {
  // ❌ Wrong: class is reserved
  // <div class="container"></div>
  
  // ✅ Correct
  return <div className="container"></div>;
  
  // ❌ Wrong: for is reserved
  // <label for="name">Name</label>
  
  // ✅ Correct
  return <label htmlFor="name">Name</label>;
  
  // ❌ Wrong: Cannot return multiple elements without wrapper
  // return (
  //   <h1>Title</h1>
  //   <p>Content</p>
  // );
  
  // ✅ Correct: Use Fragment or wrapper
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}
```

**Key Points for Interview:**
- JSX is **syntactic sugar** for `React.createElement()`
- Must be **transpiled** (using Babel) before running in browser
- Looks like HTML but is actually **JavaScript**
- Allows embedding **JavaScript expressions** with `{}`
- **Not required** - you can use React without JSX, but it's much harder

---

### 3. What are components?

**Answer:**
Components are the building blocks of React applications. They are reusable, independent pieces of UI that encapsulate their own structure, logic, and styling. Think of them as JavaScript functions that return JSX.

**Types of Components:**
1. **Functional Components** - JavaScript functions (modern, recommended)
2. **Class Components** - ES6 classes (legacy, still supported)

**Example:**
```javascript
// Simple Component
function Button() {
  return <button>Click me</button>;
}

// Component with Props
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Component with State
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Composing Components (Component Tree)
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function Header() {
  return <header>My App</header>;
}

function MainContent() {
  return <main>Content here</main>;
}

function Footer() {
  return <footer>© 2024</footer>;
}

// Component with Children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

**Component Characteristics:**
- **Reusable** - Use the same component multiple times
- **Composable** - Build complex UIs from simple components
- **Isolated** - Each component manages its own state
- **Independent** - Can be developed and tested separately

**Key Points for Interview:**
- Components are like **functions** - input (props) → output (JSX)
- Follow **single responsibility principle**
- Should be **small and focused**
- Can be **nested** to build complex UIs
- Name should start with **capital letter** (React convention)

---

### 4. Functional vs Class components

**Answer:**
Both create React components, but functional components are the modern, recommended approach. Class components are legacy but still supported.

**Comparison:**

| Feature | Functional Components | Class Components |
|---------|----------------------|------------------|
| **Syntax** | JavaScript function | ES6 class |
| **State** | `useState` hook | `this.state` |
| **Lifecycle** | `useEffect` hook | Lifecycle methods |
| **Performance** | Slightly better | Slightly heavier |
| **Code** | Less code, cleaner | More verbose |
| **Modern** | ✅ Recommended | ⚠️ Legacy |
| **Hooks** | ✅ Full support | ❌ Limited |

**Example: Functional Component**
```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Example: Class Component (Equivalent)**
```javascript
import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // Fetch user data
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data,
          loading: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ loading: true });
      fetch(`/api/users/${this.props.userId}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            user: data,
            loading: false
          });
        });
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

**When to Use Each:**
- **Functional Components** - Use for everything (99% of cases)
- **Class Components** - Only if you need:
  - Error boundaries (can use libraries for functional)
  - Legacy codebase migration
  - Specific lifecycle methods not covered by hooks

**Key Points for Interview:**
- **Functional components are preferred** in modern React
- Hooks make functional components as powerful as class components
- Functional components are **easier to test** and understand
- **Less boilerplate** code with functional components
- React team recommends **functional components** going forward

---

### 5. What are props?

**Answer:**
Props (short for properties) are read-only data passed from parent components to child components. They allow components to be reusable and configurable. Props flow **down** the component tree (unidirectional).

**Key Characteristics:**
- **Read-only** - Cannot be modified by child component
- **Immutable** - Should not be changed
- **Unidirectional** - Flow from parent to child only
- **Any data type** - Strings, numbers, objects, functions, components

**Example:**
```javascript
// Parent Component
function App() {
  const userName = "John Doe";
  const userAge = 25;
  const userData = {
    email: "john@example.com",
    role: "developer"
  };

  return (
    <div>
      <UserCard 
        name={userName}
        age={userAge}
        data={userData}
        isActive={true}
        onUpdate={(newName) => console.log(newName)}
      />
    </div>
  );
}

// Child Component
function UserCard({ name, age, data, isActive, onUpdate }) {
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {data.email}</p>
      <p>Role: {data.role}</p>
      <button onClick={() => onUpdate('Jane Doe')}>
        Update Name
      </button>
    </div>
  );
}

// Props with Default Values
function Button({ text, color = 'blue', onClick }) {
  return (
    <button 
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

// Usage
<Button text="Click me" />  // color defaults to 'blue'
<Button text="Submit" color="green" />

// Props with Children
function Container({ title, children }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// Usage
<Container title="My Container">
  <p>This is the content</p>
  <button>Action</button>
</Container>

// Props Validation (with PropTypes)
import PropTypes from 'prop-types';

function UserProfile({ name, age, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired
};

UserProfile.defaultProps = {
  name: 'Anonymous',
  age: 0
};
```

**Common Patterns:**
```javascript
// Spread Props
function Button(props) {
  return <button {...props}>Click me</button>;
}

// Usage
<Button className="btn-primary" onClick={handleClick} />

// Destructuring Props
function UserCard({ name, age, ...otherProps }) {
  return (
    <div {...otherProps}>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}

// Conditional Props
function Component({ required, optional }) {
  return (
    <div>
      {required && <p>Required: {required}</p>}
      {optional && <p>Optional: {optional}</p>}
    </div>
  );
}
```

**Key Points for Interview:**
- Props are **immutable** - child cannot modify them
- Props flow **one-way** (parent → child)
- Use props to make components **reusable**
- Can pass **functions** as props for communication
- **Props vs State**: Props come from outside, state is internal

---

### 6. What is state?

**Answer:**
State is data that belongs to a component and can change over time. When state changes, React re-renders the component to reflect the new state. State is **internal** to the component and **mutable**.

**Key Characteristics:**
- **Mutable** - Can be changed using setState (class) or setter (functional)
- **Component-specific** - Each component manages its own state
- **Triggers re-render** - Component updates when state changes
- **Private** - Not accessible from outside the component

**Example: Functional Component with useState**
```javascript
import { useState } from 'react';

function Counter() {
  // State declaration
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

// State with Objects
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => handleChange('age', parseInt(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}

// State with Arrays
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Example: Class Component with State**
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: ''
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  // Using functional setState (recommended when using previous state)
  incrementBy = (amount) => {
    this.setState(prevState => ({
      count: prevState.count + amount
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <button onClick={() => this.incrementBy(5)}>Add 5</button>
      </div>
    );
  }
}
```

**State Update Patterns:**
```javascript
// ❌ Wrong: Direct mutation
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // Don't do this!
setUser(user); // Won't trigger re-render

// ✅ Correct: Create new object
setUser({ ...user, name: 'Jane' });

// ❌ Wrong: Array mutation
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // Don't do this!

// ✅ Correct: Create new array
setItems([...items, 4]);
// or
setItems(items.concat(4));
```

**Key Points for Interview:**
- State is **mutable** (unlike props)
- State changes trigger **re-renders**
- State is **private** to the component
- Always use **setState/setter** to update state
- Never **mutate state directly** - create new objects/arrays
- Use **functional updates** when new state depends on previous state

---

### 7. Difference between props and state

**Answer:**
Props and state are both ways to manage data in React, but they serve different purposes and have different characteristics.

**Comparison Table:**

| Aspect | Props | State |
|--------|-------|-------|
| **Source** | Passed from parent component | Managed within component |
| **Mutability** | Immutable (read-only) | Mutable (can be changed) |
| **Ownership** | Parent component | Current component |
| **Purpose** | Configuration/data from parent | Internal component data |
| **Updates** | Changed by parent | Changed by component itself |
| **Flow** | Parent → Child (down) | Internal to component |
| **Initial Value** | Set by parent | Set by component |
| **Can be passed as props** | ✅ Yes | ❌ No (but can pass setter) |

**Example:**
```javascript
// Parent Component
function App() {
  const [parentCount, setParentCount] = useState(0);
  
  return (
    <div>
      <Counter 
        initialValue={10}  // This is a PROP
        onCountChange={setParentCount}  // This is a PROP (function)
      />
      <p>Parent knows count: {parentCount}</p>
    </div>
  );
}

// Child Component
function Counter({ initialValue, onCountChange }) {
  // This is STATE - internal to Counter component
  const [count, setCount] = useState(initialValue);
  
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);  // Update STATE
    onCountChange(newCount);  // Notify parent via PROP
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

**Visual Representation:**
```
Parent Component (App)
  ├─ State: parentCount = 0
  └─ Props passed down ↓
      Child Component (Counter)
        ├─ Props received: initialValue = 10, onCountChange = function
        └─ State: count = 10 (initialized from prop)
```

**When to Use Props vs State:**

**Use Props when:**
- Data comes from parent
- Data doesn't change within component
- Passing configuration
- Passing callback functions

```javascript
// Props example
function Button({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
```

**Use State when:**
- Data changes over time
- Data is specific to component
- User interactions change data
- Component needs to remember something

```javascript
// State example
function Toggle() {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

**Lifting State Up:**
```javascript
// When multiple components need same state, lift it to common parent

// ❌ Bad: Duplicate state
function App() {
  return (
    <div>
      <Display />  // Has its own count state
      <Controls /> // Has its own count state - not synced!
    </div>
  );
}

// ✅ Good: Shared state in parent
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Display count={count} />  // Receives count as prop
      <Controls count={count} setCount={setCount} />  // Receives count and setter as props
    </div>
  );
}
```

**Key Points for Interview:**
- **Props** = external data, **State** = internal data
- **Props** are immutable, **State** is mutable
- **Props** flow down, **State** stays in component
- Can pass **state setters** as props to allow parent/child communication
- When multiple components need same data, **lift state up** to common parent

---

### 8. What is Virtual DOM?

**Answer:**
Virtual DOM is a JavaScript representation of the real DOM kept in memory. React uses it to optimize updates by comparing the virtual DOM with the previous version and making minimal changes to the actual DOM.

**How it Works:**
1. React creates a **Virtual DOM tree** in memory
2. When state changes, React creates a **new Virtual DOM tree**
3. React **compares** (diffs) the new tree with the previous one
4. React calculates the **minimum changes** needed
5. React **updates only the changed parts** in the real DOM

**Example:**
```javascript
// Component
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Virtual DOM representation (simplified)
// Initial render:
{
  type: 'div',
  children: [
    { type: 'h1', children: ['Count: 0'] },
    { type: 'button', children: ['Increment'], props: { onClick: fn } }
  ]
}

// After state change (count = 1):
{
  type: 'div',
  children: [
    { type: 'h1', children: ['Count: 1'] },  // Only this changed!
    { type: 'button', children: ['Increment'], props: { onClick: fn } }
  ]
}

// React sees: Only h1 text changed, so it updates only that in real DOM
```

**Virtual DOM vs Real DOM:**

| Aspect | Real DOM | Virtual DOM |
|--------|----------|-------------|
| **Location** | Browser | Memory (JavaScript) |
| **Speed** | Slow (browser operations) | Fast (JavaScript objects) |
| **Updates** | Expensive (reflow/repaint) | Cheap (object comparison) |
| **Manipulation** | Direct browser API | JavaScript objects |
| **Efficiency** | Updates entire tree | Updates only differences |

**Why Virtual DOM?**
```javascript
// Without Virtual DOM (inefficient):
function updateCounter() {
  // Direct DOM manipulation - slow and error-prone
  document.getElementById('count').textContent = newCount;
  document.getElementById('button').style.backgroundColor = 'blue';
  // Browser reflows and repaints entire page
}

// With Virtual DOM (efficient):
function Counter() {
  const [count, setCount] = useState(0);
  // React handles all DOM updates efficiently
  return <h1>Count: {count}</h1>;
}
```

**Performance Benefits:**
1. **Batching Updates** - Multiple state changes batched together
2. **Minimal DOM Manipulation** - Only changed elements updated
3. **Efficient Diffing** - Smart algorithm finds differences
4. **Predictable Updates** - Easier to reason about

**Key Points for Interview:**
- Virtual DOM is a **JavaScript representation** of real DOM
- Kept in **memory**, not in browser
- React **compares** old and new Virtual DOM (diffing)
- Only **actual changes** are applied to real DOM
- Makes React **fast** and **efficient**
- Virtual DOM is a **implementation detail**, not a feature you use directly

---

### 9. How does React update the UI? (Diffing + Reconciliation)

**Answer:**
React updates the UI through a two-phase process: **Reconciliation** (diffing algorithm) and **Commit** (applying changes). React compares the new Virtual DOM tree with the previous one and efficiently updates only what changed.

**Process Overview:**
1. **Render Phase** - Create new Virtual DOM tree
2. **Reconciliation (Diffing)** - Compare with previous tree
3. **Commit Phase** - Apply changes to real DOM

**Example:**
```javascript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);

  const addTodo = () => {
    setTodos([...todos, { id: 3, text: 'Deploy app' }]);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Reconciliation Process:
// OLD Virtual DOM:
// <ul>
//   <li key={1}>Learn React</li>
//   <li key={2}>Build app</li>
// </ul>

// NEW Virtual DOM:
// <ul>
//   <li key={1}>Learn React</li>  // Same - no change
//   <li key={2}>Build app</li>     // Same - no change
//   <li key={3}>Deploy app</li>    // New - add this
// </ul>

// React sees: Only one new element, adds only that to real DOM
```

**Diffing Algorithm Rules:**

**1. Elements of Different Types**
```javascript
// React will tear down old tree and build new one
// OLD: <div><Counter /></div>
// NEW: <span><Counter /></span>
// React destroys div and Counter, creates span and new Counter
```

**2. Elements of Same Type**
```javascript
// React updates only changed attributes
// OLD: <div className="old" title="hello">Content</div>
// NEW: <div className="new" title="hello">Content</div>
// React updates only className, keeps same div element
```

**3. Component Updates**
```javascript
// React keeps same instance, just updates props
function Counter({ count }) {
  return <div>{count}</div>;
}

// OLD: <Counter count={5} />
// NEW: <Counter count={6} />
// React calls render with new props, updates only the text content
```

**4. Lists with Keys**
```javascript
// Keys help React identify which items changed
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// OLD: [{id: 1, text: 'A'}, {id: 2, text: 'B'}]
// NEW: [{id: 1, text: 'A'}, {id: 3, text: 'C'}, {id: 2, text: 'B'}]
// With keys, React knows: item 1 unchanged, item 3 is new, item 2 moved
```

**Reconciliation Phases:**

**Phase 1: Render (Reconciliation)**
```javascript
// React creates new Virtual DOM tree
// Compares with previous tree
// Identifies what needs to change
// This phase can be interrupted (React 18+)
```

**Phase 2: Commit**
```javascript
// React applies changes to real DOM
// Runs lifecycle methods (componentDidUpdate, useEffect)
// This phase cannot be interrupted
```

**Optimization Strategies:**
```javascript
// React.memo - Prevents re-render if props haven't changed
const ExpensiveComponent = React.memo(function Component({ data }) {
  return <div>{/* expensive rendering */}</div>;
});

// useMemo - Memoizes computed values
function Component({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a - b);
  }, [items]);
  
  return <div>{sortedItems.map(/* ... */)}</div>;
}

// useCallback - Memoizes functions
function Component({ onUpdate }) {
  const handleClick = useCallback(() => {
    onUpdate();
  }, [onUpdate]);
  
  return <button onClick={handleClick}>Update</button>;
}
```

**Key Points for Interview:**
- **Reconciliation** = process of comparing Virtual DOM trees
- **Diffing** = algorithm that finds differences
- React uses **heuristics** (assumptions) for efficient comparison
- **Keys** are crucial for list reconciliation
- React **batches** multiple updates together
- Updates are **asynchronous** - React may delay them for performance
- **Fiber architecture** (React 16+) allows interruptible rendering

---

### 10. Why are keys important? Why not use index as key?

**Answer:**
Keys help React identify which items have changed, been added, or removed in lists. They enable efficient reconciliation and prevent bugs. Using index as key can cause problems when list order changes.

**Why Keys are Important:**
1. **Identity** - React uses keys to track which element is which
2. **Performance** - Helps React efficiently update only changed items
3. **State Preservation** - Maintains component state correctly
4. **Avoiding Bugs** - Prevents UI inconsistencies

**Example: Without Keys (Problem)**
```javascript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' }
  ]);

  const removeFirst = () => {
    setTodos(todos.slice(1)); // Remove first item
  };

  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li>  // ❌ No key - React warns
      ))}
    </ul>
  );
}
```

**Example: With Keys (Correct)**
```javascript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1' },
    { id: 2, text: 'Task 2' },
    { id: 3, text: 'Task 3' }
  ]);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>  // ✅ Unique, stable key
      ))}
    </ul>
  );
}
```

**Why NOT Use Index as Key:**

**Problem 1: Reordering Issues**
```javascript
// Initial list
const items = [
  { id: 'a', value: 'Apple' },
  { id: 'b', value: 'Banana' },
  { id: 'c', value: 'Cherry' }
];

// Render with index as key
items.map((item, index) => <Item key={index} value={item.value} />)
// Keys: 0, 1, 2

// After removing first item
const newItems = [
  { id: 'b', value: 'Banana' },
  { id: 'c', value: 'Cherry' }
];

// Render with index as key
newItems.map((item, index) => <Item key={index} value={item.value} />)
// Keys: 0, 1

// React thinks:
// - Key 0: Changed from 'Apple' to 'Banana' (WRONG!)
// - Key 1: Changed from 'Banana' to 'Cherry' (WRONG!)
// - Key 2: Removed (WRONG!)

// With proper keys (id):
// - Key 'a': Removed (CORRECT!)
// - Key 'b': Same position (CORRECT!)
// - Key 'c': Same position (CORRECT!)
```

**Problem 2: State Bugs**
```javascript
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // ❌ Using index as key
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}  // ❌ BAD!
          todo={todo}
          onToggle={toggleTodo}
        />
      ))}
    </ul>
  );

  // If you remove first item:
  // - Index 0 now points to different todo
  // - Checkbox state gets mixed up!
  // - Component state is tied to wrong item
}

// ✅ Using id as key
return (
  <ul>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}  // ✅ GOOD!
        todo={todo}
        onToggle={toggleTodo}
      />
    ))}
  </ul>
);
```

**Problem 3: Performance Issues**
```javascript
// With index keys, React can't efficiently identify changes
// React may unnecessarily re-render components

// Example: Adding item at beginning
const oldList = ['B', 'C', 'D'];  // indices: 0, 1, 2
const newList = ['A', 'B', 'C', 'D'];  // indices: 0, 1, 2, 3

// With index keys:
// React thinks ALL items changed (0→A, 1→B, 2→C, 3→D)
// Re-renders all components

// With proper keys:
// React knows only 'A' is new
// Re-renders only new component
```

**When Index is Acceptable:**
```javascript
// ✅ OK to use index when:
// 1. List is static (never reordered, added, removed)
// 2. Items have no state
// 3. Items are simple (no complex components)

function StaticList({ items }) {
  // This list never changes order
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>  // OK for static list
      ))}
    </ul>
  );
}

// ❌ NOT OK when:
// - List can be reordered
// - Items can be added/removed
// - Items have internal state
// - Items are complex components
```

**Best Practices:**
```javascript
// ✅ Use unique, stable IDs
const todos = [
  { id: 'todo-1', text: 'Learn React' },
  { id: 'todo-2', text: 'Build app' }
];

todos.map(todo => <TodoItem key={todo.id} todo={todo} />);

// ✅ If no ID, create one
todos.map((todo, index) => (
  <TodoItem key={`todo-${todo.id || index}`} todo={todo} />
));

// ✅ For generated lists, use combination
items.map((item, index) => (
  <Item key={`${item.category}-${item.id}-${index}`} item={item} />
));

// ❌ Avoid these:
key={index}  // Bad if list changes
key={Math.random()}  // Bad - changes every render
key={undefined}  // Bad - React uses index as fallback
```

**Key Points for Interview:**
- Keys help React **identify elements** in lists
- Keys must be **unique** among siblings
- Keys should be **stable** (don't change between renders)
- **Index as key** causes bugs when list order changes
- **Index as key** can cause state to be tied to wrong element
- Use **unique IDs** from your data as keys
- Keys are only needed in **lists** (arrays of elements)

---

## 🎯 Interview Summary & Key Takeaways

### Quick Reference:

1. **React** - Library for building UIs, component-based, uses Virtual DOM
2. **JSX** - Syntax extension, looks like HTML but is JavaScript
3. **Components** - Reusable building blocks, functions that return JSX
4. **Functional Components** - Modern, preferred approach with hooks
5. **Props** - Read-only data from parent, immutable, flow down
6. **State** - Mutable data in component, triggers re-renders
7. **Props vs State** - Props = external, State = internal
8. **Virtual DOM** - JavaScript representation of DOM for efficient updates
9. **Reconciliation** - Process of comparing Virtual DOM trees
10. **Keys** - Unique identifiers for list items, use IDs not indices

### Common Interview Follow-ups:

- "How would you optimize a React app?" → Memoization, code splitting, lazy loading
- "What happens when you call setState?" → Reconciliation process, batching
- "How do you share state between components?" → Lift state up, Context API, state management
- "What's the difference between React and other frameworks?" → Library vs framework, Virtual DOM, ecosystem

### Practice Tips:

1. **Understand the "why"** - Don't just memorize, understand reasoning
2. **Draw diagrams** - Visualize component trees, data flow
3. **Code examples** - Be ready to write code on whiteboard
4. **Real-world scenarios** - Think of practical use cases
5. **Trade-offs** - Know when to use what (props vs state, etc.)

Good luck with your React interviews! 🚀
