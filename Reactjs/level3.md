# ✅ React Level 3: Advanced Concepts & Interview Preparation

## 📚 Section 3: Rendering & Lifecycle

### 1. How does React render and re-render a component?

**Answer:**
React renders components by creating a Virtual DOM tree, then updating the real DOM efficiently. Re-rendering happens when state or props change, and React uses reconciliation to update only what changed.

**Initial Render Process:**
```
1. Component function called
2. JSX returned → Virtual DOM tree created
3. React compares with previous tree (null on first render)
4. React commits changes to real DOM
5. Browser paints the screen
```

**Re-render Process:**
```
1. State/Props change detected
2. Component function called again
3. New Virtual DOM tree created
4. React compares (diffs) new tree with previous
5. React calculates minimal changes needed
6. React updates only changed parts in real DOM
7. Browser repaints only changed elements
```

**Example:**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  console.log('Component rendering/re-rendering');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Render flow:
// 1. Initial render: count = 0
//    - Virtual DOM: <div><p>Count: 0</p><button>Increment</button></div>
//    - Real DOM updated
//    - Browser paints

// 2. Button clicked: setCount(1)
//    - State changes → triggers re-render
//    - Component function called again
//    - New Virtual DOM: <div><p>Count: 1</p><button>Increment</button></div>
//    - React diffs: Only <p> text changed
//    - React updates only <p> in real DOM
//    - Browser repaints only <p>
```

**Render Phases:**
```javascript
// React 18+ has three phases:

// 1. Render Phase (can be interrupted)
//    - Component function executes
//    - Virtual DOM tree created
//    - No side effects allowed
//    - Can be paused/resumed (Concurrent Mode)

// 2. Commit Phase (cannot be interrupted)
//    - Changes applied to real DOM
//    - useEffect, useLayoutEffect run
//    - Synchronous, must complete

// 3. Paint Phase
//    - Browser paints the screen
```

**Key Points for Interview:**
- Render = creating Virtual DOM tree
- Re-render = creating new tree when state/props change
- React uses **diffing algorithm** to find changes
- Only **changed parts** are updated in real DOM
- Render is **asynchronous** and can be interrupted (React 18)
- Commit is **synchronous** and must complete

---

### 2. Which hooks replace lifecycle methods?

**Answer:**
Hooks provide equivalent functionality to class component lifecycle methods. Here's the mapping:

| Class Lifecycle Method | Hook Equivalent |
|------------------------|-----------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return cleanup; }, [])` |
| `getDerivedStateFromProps` | `useState` with props |
| `shouldComponentUpdate` | `React.memo`, `useMemo` |
| `componentDidCatch` | `ErrorBoundary` (class only) |

**Example:**
```javascript
// Class Component
class UserProfile extends React.Component {
  componentDidMount() {
    // Runs once after mount
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    // Runs after update
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  componentWillUnmount() {
    // Runs before unmount
    this.cleanup();
  }

  render() {
    return <div>{/* ... */}</div>;
  }
}

// Functional Component with Hooks
function UserProfile({ userId }) {
  useEffect(() => {
    // componentDidMount + componentDidUpdate
    fetchUser(userId);

    return () => {
      // componentWillUnmount
      cleanup();
    };
  }, [userId]); // Runs when userId changes

  return <div>{/* ... */}</div>;
}
```

**Detailed Mapping:**

**1. componentDidMount**
```javascript
// Class
componentDidMount() {
  console.log('Mounted');
  fetchData();
}

// Hook
useEffect(() => {
  console.log('Mounted');
  fetchData();
}, []); // Empty array = runs once
```

**2. componentDidUpdate**
```javascript
// Class
componentDidUpdate(prevProps, prevState) {
  if (prevProps.userId !== this.props.userId) {
    fetchUser(this.props.userId);
  }
}

// Hook
useEffect(() => {
  fetchUser(userId);
}, [userId]); // Runs when userId changes
```

**3. componentWillUnmount**
```javascript
// Class
componentWillUnmount() {
  clearInterval(this.timer);
  unsubscribe();
}

// Hook
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  const subscription = subscribe();

  return () => {
    clearInterval(timer);
    unsubscribe(subscription);
  };
}, []);
```

**4. getDerivedStateFromProps**
```javascript
// Class
static getDerivedStateFromProps(props, state) {
  if (props.userId !== state.prevUserId) {
    return { userId: props.userId, prevUserId: props.userId };
  }
  return null;
}

// Hook
function Component({ userId }) {
  const [prevUserId, setPrevUserId] = useState(userId);

  if (userId !== prevUserId) {
    setPrevUserId(userId);
    // Handle prop change
  }
}
```

**5. shouldComponentUpdate**
```javascript
// Class
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.count !== this.props.count;
}

// Hook
const Component = React.memo(({ count }) => {
  return <div>{count}</div>;
}, (prevProps, nextProps) => {
  return prevProps.count === nextProps.count; // Return true to skip render
});
```

**Key Points for Interview:**
- `useEffect` replaces most lifecycle methods
- Empty dependency array `[]` = `componentDidMount`
- Dependencies in array = `componentDidUpdate`
- Return function = `componentWillUnmount`
- `React.memo` replaces `shouldComponentUpdate`
- Hooks are more flexible and composable

---

### 3. When does a component re-render?

**Answer:**
A component re-renders when:
1. **State changes** (via `useState`, `useReducer`)
2. **Props change** (parent passes new props)
3. **Parent re-renders** (unless memoized)
4. **Context value changes** (if component uses that context)
5. **Force update** (rare, using `forceUpdate` in class components)

**Example:**
```javascript
// 1. State Change
function Counter() {
  const [count, setCount] = useState(0);
  // Re-renders when setCount is called
  return <div>{count}</div>;
}

// 2. Props Change
function Parent() {
  const [name, setName] = useState('John');
  // Child re-renders when name changes
  return <Child name={name} />;
}

function Child({ name }) {
  return <div>{name}</div>;
}

// 3. Parent Re-renders
function Parent() {
  const [count, setCount] = useState(0);
  // Child re-renders even if its props don't change
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="John" /> {/* Re-renders when Parent re-renders */}
    </div>
  );
}

// 4. Context Change
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  // All consumers re-render when theme changes
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  // Re-renders when theme changes
  return <div className={theme}>Content</div>;
}
```

**Preventing Unnecessary Re-renders:**
```javascript
// 1. React.memo
const Child = React.memo(({ name }) => {
  console.log('Child rendered');
  return <div>{name}</div>;
});

// 2. useMemo
function Parent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
}

// 3. useCallback
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

**Key Points for Interview:**
- State/props changes trigger re-renders
- Parent re-render causes child re-render (unless memoized)
- Context changes cause consumer re-renders
- Use `React.memo`, `useMemo`, `useCallback` to prevent unnecessary re-renders
- Re-render doesn't mean DOM update (React optimizes)

---

### 4. What is reconciliation?

**Answer:**
Reconciliation is React's algorithm for comparing the new Virtual DOM tree with the previous one and determining the minimal set of changes needed to update the real DOM efficiently.

**Process:**
```
1. Render phase: Create new Virtual DOM tree
2. Reconciliation: Compare new tree with previous tree
3. Diffing: Find differences between trees
4. Commit phase: Apply changes to real DOM
```

**Diffing Algorithm:**
```javascript
// React uses heuristics (assumptions) for efficient comparison:

// 1. Elements of different types
//    → Tear down old, build new
<div>
  <Counter />
</div>
// Changes to:
<span>
  <Counter />
</span>
// React destroys div and Counter, creates span and new Counter

// 2. Elements of same type
//    → Update only changed attributes
<div className="old" title="hello">Content</div>
// Changes to:
<div className="new" title="hello">Content</div>
// React updates only className

// 3. Component updates
//    → Keep instance, update props
<Counter count={5} />
// Changes to:
<Counter count={6} />
// React calls render with new props, updates only changed parts

// 4. Lists
//    → Use keys to identify items
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
</ul>
// Changes to:
<ul>
  <li key="a">A</li>
  <li key="c">C</li>
  <li key="b">B</li>
</ul>
// React knows: a unchanged, c new, b moved
```

**Example:**
```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Reconciliation when todos change:
// OLD Virtual DOM:
// <ul>
//   <li key="1">Task 1</li>
//   <li key="2">Task 2</li>
// </ul>

// NEW Virtual DOM:
// <ul>
//   <li key="1">Task 1</li>
//   <li key="3">Task 3</li>
//   <li key="2">Task 2</li>
// </ul>

// React reconciliation:
// - Key "1": Same, no change
// - Key "3": New, add to DOM
// - Key "2": Moved, update position
// Result: Only minimal DOM updates
```

**Key Points for Interview:**
- Reconciliation = comparing Virtual DOM trees
- Uses **heuristics** for efficiency
- **Keys are crucial** for list reconciliation
- Minimizes **real DOM updates**
- Happens during **render phase**
- React Fiber (16+) allows **interruptible reconciliation**

---

## 📚 Section 4: Performance Optimization

### 1. What is React.memo?

**Answer:**
`React.memo` is a higher-order component that memoizes a functional component. It prevents re-rendering if props haven't changed (shallow comparison).

**Syntax:**
```javascript
const MemoizedComponent = React.memo(Component, arePropsEqual?);
```

**Example:**
```javascript
// Without React.memo
function Child({ name }) {
  console.log('Child rendered');
  return <div>{name}</div>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name={name} /> {/* Re-renders when count changes! */}
    </div>
  );
}

// With React.memo
const Child = React.memo(function Child({ name }) {
  console.log('Child rendered');
  return <div>{name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name={name} /> {/* Only re-renders when name changes */}
    </div>
  );
}
```

**Custom Comparison:**
```javascript
const Child = React.memo(
  function Child({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    // Return false if props are different (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

**When to Use:**
```javascript
// ✅ Good: Expensive component with stable props
const ExpensiveChart = React.memo(function Chart({ data }) {
  // Expensive rendering
  return <ComplexChart data={data} />;
});

// ✅ Good: Component that re-renders frequently
const Button = React.memo(function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
});

// ❌ Bad: Props change frequently anyway
const SimpleText = React.memo(function Text({ text }) {
  return <p>{text}</p>; // Overhead not worth it
});
```

**With useCallback:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // Without useCallback: New function every render
  // Child re-renders even with React.memo
  const handleClick = () => {
    console.log('clicked');
  };

  // With useCallback: Stable function reference
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name={name} onClick={handleClick} />
    </div>
  );
}

const Child = React.memo(function Child({ name, onClick }) {
  return (
    <div>
      <p>{name}</p>
      <button onClick={onClick}>Click</button>
    </div>
  );
});
```

**Key Points for Interview:**
- Memoizes functional components
- Prevents re-render if props unchanged (shallow comparison)
- Use for **expensive components** or **frequently re-rendering** components
- Works with `useCallback` and `useMemo` for props
- Can provide **custom comparison function**
- Only does **shallow comparison** by default

---

### 2. What is code splitting?

**Answer:**
Code splitting is a technique to split your JavaScript bundle into smaller chunks that are loaded on-demand, reducing initial load time and improving performance.

**Benefits:**
- Smaller initial bundle
- Faster page load
- Load code only when needed
- Better caching

**Methods:**

**1. Route-based Code Splitting (React Router)**
```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**2. Component-based Code Splitting**
```javascript
import { lazy, Suspense, useState } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>Load Heavy Component</button>
      {showHeavy && (
        <Suspense fallback={<div>Loading component...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

**3. Dynamic Import (Webpack)**
```javascript
// Instead of:
import { heavyFunction } from './utils';

// Use:
const loadHeavyFunction = async () => {
  const { heavyFunction } = await import('./utils');
  heavyFunction();
};
```

**4. Using React.lazy**
```javascript
// Before (all code in one bundle):
import Dashboard from './Dashboard';
import Settings from './Settings';

// After (code split):
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
```

**Key Points for Interview:**
- Splits bundle into smaller chunks
- Loads code **on-demand**
- Reduces **initial load time**
- Use `React.lazy` + `Suspense` for components
- Route-based splitting is **most common**
- Webpack automatically creates chunks

---

### 3. What is lazy loading? (React.lazy + Suspense)

**Answer:**
Lazy loading defers loading components until they're needed. `React.lazy` enables code splitting, and `Suspense` provides a fallback UI while loading.

**React.lazy:**
```javascript
// Syntax
const Component = lazy(() => import('./Component'));

// Must return a Promise that resolves to a module with default export
const MyComponent = lazy(() => import('./MyComponent'));
```

**Suspense:**
```javascript
// Provides fallback UI while lazy component loads
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

**Complete Example:**
```javascript
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

**Multiple Suspense Boundaries:**
```javascript
function App() {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      <Footer />
    </Suspense>
  );
}
```

**Error Handling:**
```javascript
import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const LazyComponent = lazy(() => import('./Component'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

**Key Points for Interview:**
- `React.lazy` loads components **on-demand**
- Must use with `Suspense` for fallback UI
- Component must have **default export**
- Reduces **initial bundle size**
- Improves **initial load performance**
- Can have **multiple Suspense boundaries**

---

### 4. How do you prevent unnecessary re-renders?

**Answer:**
Multiple strategies to prevent unnecessary re-renders:

**1. React.memo**
```javascript
const ExpensiveComponent = React.memo(function Component({ data }) {
  return <div>{/* expensive rendering */}</div>;
});
```

**2. useMemo**
```javascript
function Component({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
}
```

**3. useCallback**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```

**4. Memoize Context Value**
```javascript
function App() {
  const [user, setUser] = useState(null);

  // ❌ Bad: New object every render
  // const contextValue = { user, setUser };

  // ✅ Good: Memoized
  const contextValue = useMemo(() => ({
    user,
    setUser
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      <Child />
    </UserContext.Provider>
  );
}
```

**5. Split Contexts**
```javascript
// ❌ Bad: One context for everything
const AppContext = createContext();

// ✅ Good: Split by update frequency
const UserContext = createContext(); // Rarely changes
const ThemeContext = createContext(); // Rarely changes
const CountContext = createContext(); // Changes frequently
```

**6. Component Structure**
```javascript
// ❌ Bad: State in parent causes all children to re-render
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ExpensiveChild1 />
      <ExpensiveChild2 />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

// ✅ Good: Move state down
function Parent() {
  return (
    <div>
      <ExpensiveChild1 />
      <ExpensiveChild2 />
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Key Points for Interview:**
- Use `React.memo` for expensive components
- Use `useMemo` for expensive computations
- Use `useCallback` for stable function references
- Memoize context values
- Split contexts by update frequency
- Move state down the component tree
- Profile first, optimize second

---

## 📚 Section 5: Routing

### 1. How does React Router work?

**Answer:**
React Router is a library for client-side routing in React. It uses the browser's History API to update the URL and render different components based on the current route.

**Basic Setup:**
```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**How It Works:**
```
1. BrowserRouter wraps app, provides routing context
2. Routes component matches URL to route definitions
3. Route component renders element when path matches
4. Link component updates URL without page reload
5. React Router updates component tree based on URL
```

**Key Components:**
```javascript
// BrowserRouter: Uses HTML5 History API
<BrowserRouter>
  <App />
</BrowserRouter>

// HashRouter: Uses hash (#) in URL
<HashRouter>
  <App />
</HashRouter>

// Routes: Container for Route definitions
<Routes>
  <Route path="/" element={<Home />} />
</Routes>

// Route: Defines a route
<Route path="/users" element={<Users />} />

// Link: Navigation without page reload
<Link to="/about">About</Link>

// Navigate: Programmatic navigation
<Navigate to="/login" />
```

**Key Points for Interview:**
- Client-side routing (no page reload)
- Uses **History API** (BrowserRouter) or **hash** (HashRouter)
- Matches URL to routes and renders components
- Updates URL and component tree **synchronously**
- Provides hooks: `useNavigate`, `useParams`, `useLocation`

---

### 2. Difference between <Link> and <a>?

**Answer:**

| Aspect | `<Link>` | `<a>` |
|--------|----------|-------|
| **Navigation** | Client-side (no reload) | Full page reload |
| **Performance** | Faster (SPA) | Slower (new page) |
| **State** | Preserves React state | Loses all state |
| **URL** | Updates via History API | Browser navigation |
| **Use Case** | Internal routes | External links |

**Example:**
```javascript
// ❌ Using <a> for internal routes
function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>        {/* Full page reload! */}
      <a href="/about">About</a>   {/* Loses React state! */}
    </nav>
  );
}

// ✅ Using <Link> for internal routes
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>        {/* No reload */}
      <Link to="/about">About</Link>  {/* Preserves state */}
    </nav>
  );
}

// ✅ Using <a> for external links
function Navigation() {
  return (
    <nav>
      <Link to="/about">About</Link>
      <a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
        External Site
      </a>
    </nav>
  );
}
```

**Key Points for Interview:**
- `<Link>` = internal navigation, no reload
- `<a>` = external links or when you need full reload
- `<Link>` preserves React state and app state
- Use `<a>` for external URLs with `target="_blank"`

---

### 3. What is useNavigate?

**Answer:**
`useNavigate` is a React Router hook that returns a function to programmatically navigate to different routes.

**Syntax:**
```javascript
const navigate = useNavigate();
navigate('/path');
```

**Example:**
```javascript
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Login logic
    const success = await login(email);
    
    if (success) {
      navigate('/dashboard'); // Navigate programmatically
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

**Navigation Options:**
```javascript
function Component() {
  const navigate = useNavigate();

  // Navigate to path
  navigate('/users');

  // Navigate with state
  navigate('/users', { state: { from: 'home' } });

  // Navigate with replace (no history entry)
  navigate('/users', { replace: true });

  // Navigate back/forward
  navigate(-1); // Go back
  navigate(1);  // Go forward
  navigate(-2); // Go back 2 pages

  return <div>Component</div>;
}
```

**Accessing State:**
```javascript
// Sending state
navigate('/user', { state: { userId: 123 } });

// Receiving state
import { useLocation } from 'react-router-dom';

function UserPage() {
  const location = useLocation();
  const { userId } = location.state;

  return <div>User ID: {userId}</div>;
}
```

**Key Points for Interview:**
- Returns navigation function
- Use for **programmatic navigation**
- Can navigate with **state** and **replace** option
- Can navigate **back/forward** with numbers
- Replaces old `useHistory` hook

---

### 4. What are dynamic routes?

**Answer:**
Dynamic routes use URL parameters to create flexible routes that match different paths. Parameters are defined with `:` in the path.

**Syntax:**
```javascript
<Route path="/users/:userId" element={<UserProfile />} />
```

**Example:**
```javascript
import { Routes, Route, useParams } from 'react-router-dom';

// Define dynamic route
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/posts/:postId/comments/:commentId" element={<Comment />} />
</Routes>

// Access parameters
function UserProfile() {
  const { userId } = useParams();
  
  return <div>User ID: {userId}</div>;
}

function Comment() {
  const { postId, commentId } = useParams();
  
  return (
    <div>
      Post: {postId}, Comment: {commentId}
    </div>
  );
}
```

**Optional Parameters:**
```javascript
// Optional parameter with ?
<Route path="/posts/:postId?" element={<Posts />} />

function Posts() {
  const { postId } = useParams();
  
  if (postId) {
    return <PostDetail postId={postId} />;
  }
  return <PostList />;
}
```

**Wildcard Routes:**
```javascript
// Match any path
<Route path="*" element={<NotFound />} />

// Match nested paths
<Route path="/blog/*" element={<Blog />} />
```

**Key Points for Interview:**
- Use `:paramName` for dynamic segments
- Access with `useParams()` hook
- Can have multiple parameters
- Use `*` for catch-all routes
- Parameters are strings (convert if needed)

---

## 📚 Section 6: State Management

### 1. What is Context API?

**Answer:**
Context API is React's built-in solution for sharing data across the component tree without prop drilling. It provides a way to pass data through multiple levels without passing props manually.

**Basic Usage:**
```javascript
// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Context
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consume Context
function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Toggle Theme
    </button>
  );
}
```

**Custom Hook Pattern:**
```javascript
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <UserProvider>
      <Component />
    </UserProvider>
  );
}

function Component() {
  const { user, setUser } = useUser();
  return <div>{user?.name}</div>;
}
```

**Key Points for Interview:**
- Built-in React solution for global state
- Avoids prop drilling
- All consumers re-render when context changes
- Memoize context value to prevent unnecessary re-renders
- Use custom hooks for easier access

---

### 2. Redux vs Context API

**Answer:**

| Aspect | Context API | Redux |
|--------|-------------|-------|
| **Complexity** | Simple | More complex |
| **Boilerplate** | Less | More |
| **DevTools** | No | Yes (Redux DevTools) |
| **Middleware** | No | Yes (thunk, saga) |
| **Performance** | Can cause re-renders | Optimized |
| **Use Case** | Simple global state | Complex state management |
| **Learning Curve** | Easy | Steeper |
| **Bundle Size** | Built-in | Additional library |

**When to Use Context API:**
```javascript
// ✅ Good for:
// - Theme, language, user authentication
// - Simple global state
// - Small to medium apps
// - Avoiding prop drilling

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <App />
    </ThemeContext.Provider>
  );
}
```

**When to Use Redux:**
```javascript
// ✅ Good for:
// - Complex state logic
// - Time-travel debugging
// - Large applications
// - Need middleware (API calls, logging)
// - Predictable state updates

// Redux setup
import { createStore } from 'redux';

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

const store = createStore(counterReducer);
```

**Key Points for Interview:**
- Context API: Simple, built-in, good for simple state
- Redux: Complex, powerful, good for complex state
- Context can cause performance issues with frequent updates
- Redux has better DevTools and middleware support
- Choose based on app complexity

---

### 3. What is useReducer?

**Answer:**
`useReducer` is a Hook for managing complex state logic. It's similar to `useState` but uses a reducer function to update state, similar to Redux.

**Syntax:**
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

**Example:**
```javascript
// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}

// Component
function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD', payload: text });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  return (
    <div>
      <button onClick={() => addTodo('New Todo')}>Add</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

**With Initializer Function:**
```javascript
function init(initialCount) {
  return { count: initialCount };
}

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return init(action.payload);
    default:
      return state;
  }
}

function Counter({ initialCount = 0 }) {
  const [state, dispatch] = useReducer(counterReducer, initialCount, init);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
    </div>
  );
}
```

**Key Points for Interview:**
- Alternative to `useState` for complex state
- Uses reducer function (like Redux)
- Better for multiple related state updates
- Predictable state updates
- Can use with Context API for global state

---

### 4. Explain Redux data flow

**Answer:**
Redux follows a unidirectional data flow:

```
1. User Action → 2. Action Creator → 3. Dispatch → 4. Reducer → 5. Store → 6. View Updates
```

**Detailed Flow:**
```javascript
// 1. User interacts with UI
<button onClick={() => dispatch(increment())}>Increment</button>

// 2. Action Creator returns action object
function increment() {
  return { type: 'INCREMENT' };
}

// 3. Dispatch sends action to store
store.dispatch(increment());

// 4. Reducer receives action and current state, returns new state
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// 5. Store updates with new state
// 6. Components subscribed to store re-render with new state
```

**Complete Example:**
```javascript
// Actions
const increment = () => ({ type: 'INCREMENT' });
const decrement = () => ({ type: 'DECREMENT' });

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Store
import { createStore } from 'redux';
const store = createStore(counterReducer);

// Component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

**Key Points for Interview:**
- **Unidirectional** data flow
- **Single source of truth** (store)
- **Predictable** state updates
- **Immutable** updates (reducers return new state)
- **Time-travel debugging** possible
- Actions → Reducers → Store → View

---

## 📚 Section 7: Advanced / Frequently Asked

### 1. Controlled vs Uncontrolled Components

**Answer:**

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| **State** | React state | DOM state |
| **Value** | `value` prop | `defaultValue` prop |
| **Updates** | Via `onChange` | Via refs |
| **React Control** | Full control | Limited control |
| **Use Case** | Most forms | Simple inputs, file inputs |

**Controlled Component:**
```javascript
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Uncontrolled Component:**
```javascript
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <input
      ref={inputRef}
      defaultValue="initial"
    />
  );
}
```

**Key Points for Interview:**
- Controlled: React manages state
- Uncontrolled: DOM manages state
- Use controlled for most cases
- Use uncontrolled for file inputs, simple forms

---

### 2. What is prop drilling? How to avoid it?

**Answer:**
Prop drilling is passing props through multiple component levels even when intermediate components don't use them.

**Problem:**
```javascript
// ❌ Prop drilling
function App() {
  const user = { name: 'John' };
  return <Level1 user={user} />;
}

function Level1({ user }) {
  return <Level2 user={user} />; // Doesn't use user
}

function Level2({ user }) {
  return <Level3 user={user} />; // Doesn't use user
}

function Level3({ user }) {
  return <div>{user.name}</div>; // Finally uses user
}
```

**Solutions:**

**1. Context API**
```javascript
const UserContext = createContext();

function App() {
  const user = { name: 'John' };
  return (
    <UserContext.Provider value={user}>
      <Level1 />
    </UserContext.Provider>
  );
}

function Level1() {
  return <Level2 />;
}

function Level2() {
  return <Level3 />;
}

function Level3() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

**2. Component Composition**
```javascript
function App() {
  const user = { name: 'John' };
  return <Layout user={user} />;
}

function Layout({ user, children }) {
  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  );
}
```

**Key Points for Interview:**
- Prop drilling = passing props through unused components
- Use Context API for global data
- Use component composition
- Consider state management libraries for complex cases

---

### 3. What are Error Boundaries?

**Answer:**
Error Boundaries are React components that catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the app.

**Class Component (Only Way):**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyApp />
    </ErrorBoundary>
  );
}
```

**Key Points for Interview:**
- Only class components can be Error Boundaries
- Catch errors in child tree
- Display fallback UI
- Don't catch errors in event handlers, async code, or during render of boundary itself

---

### 4. What is SSR?

**Answer:**
SSR (Server-Side Rendering) is rendering React components on the server and sending HTML to the client, improving initial load time and SEO.

**Benefits:**
- Faster initial load
- Better SEO
- Works without JavaScript
- Better for slow devices

**Example (Next.js):**
```javascript
// pages/index.js (Next.js)
export default function Home({ data }) {
  return <div>{data}</div>;
}

export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

**Key Points for Interview:**
- Renders on server
- Sends HTML to client
- Improves SEO and initial load
- Next.js is popular SSR framework for React

---

### 5. What is hydration?

**Answer:**
Hydration is the process where React "attaches" to server-rendered HTML, making it interactive by adding event listeners and setting up React's internal state.

**Process:**
```
1. Server renders HTML → Sent to client
2. Client receives HTML → Shows content immediately
3. React JavaScript loads → Hydration begins
4. React attaches to DOM → Makes interactive
```

**Key Points for Interview:**
- Connects React to server-rendered HTML
- Makes static HTML interactive
- Happens after initial render
- Mismatch between server/client HTML causes errors

---

### 6. What is React Fiber?

**Answer:**
React Fiber is the reconciliation engine introduced in React 16. It's a rewrite of React's core algorithm that enables:

- **Incremental rendering** - Split work into chunks
- **Priority-based updates** - Prioritize important updates
- **Interruptible rendering** - Pause and resume work
- **Better performance** - More efficient updates

**Key Points for Interview:**
- New reconciliation algorithm (React 16+)
- Enables Concurrent Mode
- Allows interruptible rendering
- Better performance for large apps

---

### 7. What is Suspense?

**Answer:**
Suspense lets you "wait" for something (data loading, code splitting) and display a fallback UI while waiting.

**For Code Splitting:**
```javascript
const Component = lazy(() => import('./Component'));

<Suspense fallback={<div>Loading...</div>}>
  <Component />
</Suspense>
```

**For Data Fetching (React 18+):**
```javascript
function DataComponent() {
  const data = use(fetchData()); // Suspense-aware hook
  
  return <div>{data}</div>;
}

<Suspense fallback={<div>Loading data...</div>}>
  <DataComponent />
</Suspense>
```

**Key Points for Interview:**
- Shows fallback while loading
- Works with `React.lazy` for code splitting
- React 18+ supports data fetching
- Can nest multiple Suspense boundaries

---

### 8. What is a Pure Component?

**Answer:**
Pure Component is a class component that implements `shouldComponentUpdate` with shallow prop/state comparison, preventing re-renders if props/state haven't changed.

**Example:**
```javascript
// Regular Component
class RegularComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

// Pure Component
class PureComponent extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}

// Functional equivalent: React.memo
const MemoizedComponent = React.memo(function Component({ name }) {
  return <div>{name}</div>;
});
```

**Key Points for Interview:**
- Class component with shallow comparison
- Prevents unnecessary re-renders
- `React.memo` is functional equivalent
- Only does shallow comparison

---

## 📚 Section 8: Practical / Real Interview Questions

### 1. How to debounce input in React?

**Answer:**
```javascript
// Custom hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

### 2. How to share state between sibling components?

**Answer:**

**1. Lift State Up:**
```javascript
function Parent() {
  const [sharedState, setSharedState] = useState(0);
  
  return (
    <div>
      <Sibling1 state={sharedState} setState={setSharedState} />
      <Sibling2 state={sharedState} setState={setSharedState} />
    </div>
  );
}
```

**2. Context API:**
```javascript
const StateContext = createContext();

function Parent() {
  const [state, setState] = useState(0);
  
  return (
    <StateContext.Provider value={{ state, setState }}>
      <Sibling1 />
      <Sibling2 />
    </StateContext.Provider>
  );
}

function Sibling1() {
  const { state, setState } = useContext(StateContext);
  return <div>{state}</div>;
}
```

---

### 3. How to prevent re-render in React?

**Answer:**
- Use `React.memo` for components
- Use `useMemo` for values
- Use `useCallback` for functions
- Memoize context values
- Move state down component tree

---

### 4. How to implement infinite scroll?

**Answer:**
```javascript
function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const newItems = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.text}</div>)}
      {loading && <div>Loading...</div>}
    </div>
  );
}
```

---

### 5. Why keys should not be index?

**Answer:**
Using index as key causes problems when list order changes:

```javascript
// ❌ Problem with index
const items = ['A', 'B', 'C'];
items.map((item, index) => <Item key={index} value={item} />);
// Keys: 0, 1, 2

// Remove first item
const newItems = ['B', 'C'];
newItems.map((item, index) => <Item key={index} value={item} />);
// Keys: 0, 1

// React thinks:
// - Key 0: Changed from 'A' to 'B' (WRONG!)
// - Key 1: Changed from 'B' to 'C' (WRONG!)
// - Key 2: Removed (WRONG!)

// ✅ Solution: Use unique IDs
items.map(item => <Item key={item.id} value={item} />);
```

**Problems:**
- State tied to wrong element
- Performance issues
- Bugs with component state

**Key Points for Interview:**
- Use unique, stable IDs as keys
- Index only OK for static lists
- Keys help React identify elements

---

## 🎯 Interview Summary & Key Takeaways

### Quick Reference:

**Rendering:**
- Render = create Virtual DOM
- Re-render = when state/props change
- Reconciliation = diffing algorithm
- Hooks replace lifecycle methods

**Performance:**
- `React.memo` prevents re-renders
- Code splitting reduces bundle size
- Lazy loading loads on-demand
- Memoize expensive computations

**Routing:**
- React Router for client-side routing
- `Link` for internal, `<a>` for external
- `useNavigate` for programmatic navigation
- Dynamic routes with `:param`

**State:**
- Context API for simple global state
- Redux for complex state
- `useReducer` for complex local state
- Redux: Actions → Reducers → Store

**Advanced:**
- Controlled = React state, Uncontrolled = DOM state
- Prop drilling → Context API
- Error Boundaries catch errors
- SSR improves SEO and performance

Good luck with your React interviews! 🚀
