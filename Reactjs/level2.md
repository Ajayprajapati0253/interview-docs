# ✅ React Level 2: Hooks (Most Important – Interview Favorite)

## 📚 Theory Questions with Answers & Examples

### 1. What are hooks and why were they introduced?

**Answer:**
Hooks are special functions in React that let you "hook into" React features like state and lifecycle methods from functional components. They were introduced in React 16.8 to allow functional components to have the same capabilities as class components.

**Why Hooks were Introduced:**

1. **Reuse Stateful Logic** - Share logic between components without HOCs or render props
2. **Simplify Components** - Break complex components into smaller functions
3. **Avoid Class Complexity** - No need for `this`, binding, or class syntax
4. **Better Code Organization** - Group related logic together
5. **Easier Testing** - Functions are easier to test than classes

**Rules of Hooks:**
1. **Only call hooks at the top level** - Not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Functional components or custom hooks

**Example:**
```javascript
// ❌ Before Hooks: Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

// ✅ With Hooks: Functional Component
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Common Hooks:**
- `useState` - Manage state
- `useEffect` - Side effects
- `useContext` - Access context
- `useRef` - DOM refs and mutable values
- `useMemo` - Memoize values
- `useCallback` - Memoize functions
- `useReducer` - Complex state logic
- `useLayoutEffect` - Synchronous effects

**Key Points for Interview:**
- Hooks let functional components use React features
- Introduced in **React 16.8** (February 2019)
- **Backward compatible** - class components still work
- Follow **Rules of Hooks** strictly
- Enable **code reuse** and better organization
- **No breaking changes** - existing code still works

---

### 2. Explain useState

**Answer:**
`useState` is a Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.

**Syntax:**
```javascript
const [state, setState] = useState(initialValue);
```

**Example:**
```javascript
import { useState } from 'react';

function Counter() {
  // Declare state
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

**Initial Value:**
```javascript
// Direct value
const [count, setCount] = useState(0);

// Function (lazy initialization - only runs once)
const [data, setData] = useState(() => {
  // Expensive computation
  return computeExpensiveValue();
});

// Example: Lazy initialization
function TodoList() {
  const [todos, setTodos] = useState(() => {
    // Only runs on first render
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  // ... rest of component
}
```

**Updating State:**
```javascript
function Example() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', age: 0 });
  const [items, setItems] = useState([]);

  // Direct update
  const increment = () => {
    setCount(count + 1);
  };

  // Functional update (when new state depends on previous)
  const incrementBy = (amount) => {
    setCount(prevCount => prevCount + amount);
  };

  // Update object (spread operator)
  const updateUser = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: 'John',
      age: 25
    }));
  };

  // Update array
  const addItem = (item) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => incrementBy(5)}>Add 5</button>
    </div>
  );
}
```

**Multiple State Variables:**
```javascript
function Form() {
  // Option 1: Multiple useState calls
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  // Option 2: Single object (if related)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
    </form>
  );
}
```

**Important Behaviors:**
```javascript
function Example() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // ❌ Wrong: Multiple updates batched, but using stale value
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: count increases by 1, not 3

    // ✅ Correct: Use functional updates
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Result: count increases by 3
  };

  // State updates are asynchronous
  const handleAsync = () => {
    setCount(count + 1);
    console.log(count); // Still old value!
    
    // To see new value, use useEffect
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**Key Points for Interview:**
- Returns `[value, setter]` array
- State updates trigger **re-renders**
- Updates are **batched** in React 18
- Use **functional updates** when new state depends on previous
- **Never mutate state directly** - always create new objects/arrays
- Can use **lazy initialization** for expensive computations
- Each `useState` call is **independent**

---

### 3. Explain useEffect and dependency array

**Answer:**
`useEffect` lets you perform side effects in functional components. It's similar to `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined. The dependency array controls when the effect runs.

**Syntax:**
```javascript
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]); // Dependency array
```

**Dependency Array Scenarios:**

**1. No Dependency Array (Runs on every render)**
```javascript
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Runs on every render');
    document.title = `Count: ${count}`;
  }); // No array = runs every render

  return <div>{count}</div>;
}
```

**2. Empty Dependency Array (Runs once on mount)**
```javascript
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Runs only once on mount');
    // Fetch data, set up subscriptions, etc.
    fetch('/api/data')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []); // Empty array = runs once

  return <div>{count}</div>;
}
```

**3. With Dependencies (Runs when dependencies change)**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('Runs when userId changes');
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Runs when userId changes

  return <div>{user?.name}</div>;
}
```

**Common Use Cases:**
```javascript
// 1. Data Fetching
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Fetch once on mount

  if (loading) return <div>Loading...</div>;
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}

// 2. Subscriptions
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = subscribeToRoom(roomId, (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      // Cleanup: unsubscribe when component unmounts or roomId changes
      unsubscribeFromRoom(roomId, subscription);
    };
  }, [roomId]);

  return <div>{/* render messages */}</div>;
}

// 3. DOM Manipulation
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval); // Cleanup interval
    };
  }, []);

  return <div>Timer: {seconds}s</div>;
}

// 4. Document Title Updates
function Page({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}

// 5. Local Storage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**Dependency Array Rules:**
```javascript
function Component({ userId, filters }) {
  const [data, setData] = useState(null);

  // ✅ Include all values from component scope that change
  useEffect(() => {
    fetchData(userId, filters);
  }, [userId, filters]); // Must include both

  // ❌ Missing dependency (ESLint will warn)
  useEffect(() => {
    fetchData(userId);
  }, []); // Missing userId!

  // ✅ Using values inside effect
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(userId);
    }, 1000);
    return () => clearTimeout(timer);
  }, [userId]); // Must include userId

  // ✅ Functions from props/state
  const handleClick = () => {
    console.log(userId);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]); // Include function if it uses props/state
}
```

**Multiple useEffect Hooks:**
```javascript
function Component({ userId }) {
  // Separate concerns into different effects
  useEffect(() => {
    // Effect 1: Fetch user data
    fetchUser(userId);
  }, [userId]);

  useEffect(() => {
    // Effect 2: Update document title
    document.title = `User: ${userId}`;
  }, [userId]);

  useEffect(() => {
    // Effect 3: Set up timer
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    return () => clearInterval(timer);
  }, []); // No dependencies

  return <div>Component</div>;
}
```

**Key Points for Interview:**
- Runs **after** render (asynchronous)
- Empty array `[]` = runs **once on mount**
- No array = runs on **every render**
- Dependencies = runs when **dependencies change**
- Always include **all dependencies** (ESLint helps)
- Can return **cleanup function**
- Use multiple `useEffect` to **separate concerns**

---

### 4. What is cleanup function in useEffect?

**Answer:**
The cleanup function is an optional return value from `useEffect` that runs to clean up side effects. It runs before the component unmounts and before the effect runs again (if dependencies change).

**When Cleanup Runs:**
1. **Before component unmounts**
2. **Before effect runs again** (if dependencies changed)

**Example:**
```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval); // Prevents memory leak
    };
  }, []);

  return <div>Timer: {seconds}s</div>;
}
```

**Common Use Cases:**

**1. Clearing Intervals/Timers**
```javascript
function Countdown({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return <div>Time left: {seconds}s</div>;
}
```

**2. Canceling API Requests**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      
      if (!cancelled) {
        setUser(data);
      }
    }

    fetchUser();

    return () => {
      cancelled = true; // Prevent state update if component unmounts
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

**3. Removing Event Listeners**
```javascript
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Window: {size.width} x {size.height}</div>;
}
```

**4. Cleaning Up Subscriptions**
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = subscribeToMessages(roomId, (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      unsubscribeFromMessages(roomId, subscription);
    };
  }, [roomId]);

  return <div>{/* render messages */}</div>;
}
```

**5. Cleaning Up on Dependency Change**
```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function search() {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      
      if (!cancelled) {
        setResults(data);
      }
    }

    search();

    return () => {
      cancelled = true; // Cancel previous request when query changes
    };
  }, [query]);

  return <div>{/* render results */}</div>;
}
```

**Cleanup Execution Order:**
```javascript
function Component({ userId }) {
  useEffect(() => {
    console.log('Effect runs');

    return () => {
      console.log('Cleanup runs');
    };
  }, [userId]);

  // When userId changes:
  // 1. Cleanup runs (for previous userId)
  // 2. Effect runs (for new userId)

  // When component unmounts:
  // 1. Cleanup runs
  // 2. Component unmounts
}
```

**Why Cleanup is Important:**
```javascript
// ❌ Without cleanup: Memory leak
function BadComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Running...');
    }, 1000);
    // No cleanup - interval keeps running even after unmount!
  }, []);

  return <div>Component</div>;
}

// ✅ With cleanup: No memory leak
function GoodComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Running...');
    }, 1000);

    return () => clearInterval(interval); // Cleanup prevents leak
  }, []);

  return <div>Component</div>;
}
```

**Key Points for Interview:**
- Cleanup runs **before unmount** and **before effect runs again**
- Prevents **memory leaks** (intervals, listeners, subscriptions)
- Cancels **pending requests** when component unmounts
- Always clean up **side effects** that persist
- Optional - only return function if cleanup needed
- Runs in **reverse order** of effect registration

---

### 5. Difference between useEffect and useLayoutEffect

**Answer:**
Both perform side effects, but `useLayoutEffect` runs **synchronously** after DOM mutations but **before** the browser paints, while `useEffect` runs **asynchronously** after the browser paints.

**Timeline Comparison:**

```
useEffect:
Render → Commit to DOM → Browser paints → useEffect runs (async)

useLayoutEffect:
Render → Commit to DOM → useLayoutEffect runs (sync) → Browser paints
```

**Example:**
```javascript
// useEffect - Runs after paint (may cause flicker)
function Component() {
  const [width, setWidth] = useState(0);
  const divRef = useRef();

  useEffect(() => {
    // Runs AFTER browser paints
    // User might see flicker if this changes layout
    setWidth(divRef.current.offsetWidth);
  }, []);

  return <div ref={divRef}>Width: {width}</div>;
}

// useLayoutEffect - Runs before paint (no flicker)
function Component() {
  const [width, setWidth] = useState(0);
  const divRef = useRef();

  useLayoutEffect(() => {
    // Runs BEFORE browser paints
    // No flicker - changes happen before user sees
    setWidth(divRef.current.offsetWidth);
  }, []);

  return <div ref={divRef}>Width: {width}</div>;
}
```

**When to Use useLayoutEffect:**
```javascript
// 1. Measuring DOM elements
function Tooltip({ children, position }) {
  const tooltipRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    // Measure before paint to avoid flicker
    const rect = tooltipRef.current.getBoundingClientRect();
    setCoords({
      x: position.x - rect.width / 2,
      y: position.y - rect.height - 10
    });
  }, [position]);

  return (
    <div ref={tooltipRef} style={{ left: coords.x, top: coords.y }}>
      {children}
    </div>
  );
}

// 2. Synchronous DOM mutations
function AutoScroll({ shouldScroll }) {
  const containerRef = useRef();

  useLayoutEffect(() => {
    if (shouldScroll) {
      // Scroll before paint to avoid visible jump
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [shouldScroll]);

  return <div ref={containerRef}>{/* content */}</div>;
}

// 3. Preventing visual flicker
function AnimatedBox({ isVisible }) {
  const boxRef = useRef();

  useLayoutEffect(() => {
    // Apply styles before paint
    if (isVisible) {
      boxRef.current.style.opacity = '1';
      boxRef.current.style.transform = 'translateX(0)';
    } else {
      boxRef.current.style.opacity = '0';
      boxRef.current.style.transform = 'translateX(-100px)';
    }
  }, [isVisible]);

  return <div ref={boxRef}>Animated Box</div>;
}
```

**Performance Consideration:**
```javascript
// ⚠️ useLayoutEffect blocks browser paint
// Use sparingly - can cause performance issues

// ✅ Good: Small, synchronous DOM read/write
useLayoutEffect(() => {
  element.style.color = 'red';
}, []);

// ❌ Bad: Expensive operations block paint
useLayoutEffect(() => {
  // This blocks the browser from painting!
  expensiveComputation();
  fetchData(); // Async operations don't make sense here
}, []);
```

**Comparison Table:**

| Aspect | useEffect | useLayoutEffect |
|--------|-----------|-----------------|
| **Timing** | After paint (async) | Before paint (sync) |
| **Blocking** | Non-blocking | Blocks paint |
| **Use Case** | Most side effects | DOM measurements, prevent flicker |
| **Performance** | Better (doesn't block) | Can block if heavy |
| **When to Use** | Data fetching, subscriptions | DOM mutations, measurements |

**Key Points for Interview:**
- `useEffect` = **asynchronous**, runs after paint
- `useLayoutEffect` = **synchronous**, runs before paint
- Use `useLayoutEffect` to **prevent visual flicker**
- Use `useLayoutEffect` for **DOM measurements**
- `useLayoutEffect` can **block browser paint** - use carefully
- **Default to useEffect** - only use useLayoutEffect when needed
- Both have same **API** (function + dependency array)

---

### 6. What is useRef? Real use-cases

**Answer:**
`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. The ref object persists across re-renders and doesn't cause re-renders when changed.

**Key Characteristics:**
- **Mutable** - Can change `.current` without causing re-render
- **Persists** - Value persists across re-renders
- **Not reactive** - Changes don't trigger re-renders
- **DOM access** - Can hold reference to DOM elements

**Syntax:**
```javascript
const ref = useRef(initialValue);
// Access: ref.current
```

**Use Case 1: Accessing DOM Elements**
```javascript
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Direct DOM manipulation
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Auto-focus on mount
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

**Use Case 2: Storing Mutable Values (without re-render)**
```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null); // Store interval ID

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Timer: {seconds}s</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Storing previous value
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value; // Update after render
  });
  
  return ref.current; // Return previous value
}

function Component() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Use Case 3: Storing Previous Props/State**
```javascript
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const prevUserId = usePrevious(userId);

  useEffect(() => {
    if (prevUserId !== userId) {
      console.log(`User changed from ${prevUserId} to ${userId}`);
      fetchUser(userId);
    }
  }, [userId, prevUserId]);
}
```

**Use Case 4: Imperative Handle (exposing methods to parent)**
```javascript
// Child component
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus(); // Call child's method
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

**Use Case 5: Tracking Render Count**
```javascript
function Component() {
  const renderCount = useRef(0);
  renderCount.current += 1; // Doesn't cause re-render

  return <div>Rendered {renderCount.current} times</div>;
}
```

**Use Case 6: Storing Timer/Subscription IDs**
```javascript
function Component() {
  const timerRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);

    subscriptionRef.current = subscribe((data) => {
      console.log(data);
    });

    return () => {
      clearInterval(timerRef.current);
      unsubscribe(subscriptionRef.current);
    };
  }, []);

  return <div>Component</div>;
}
```

**Use Case 7: Avoiding Stale Closures**
```javascript
function Component() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // Update ref when count changes
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Always uses latest count value
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - but still has access to latest count

  return <div>{count}</div>;
}
```

**Use Case 8: Measuring Element Size**
```javascript
function ResizableBox() {
  const boxRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(boxRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={boxRef}>
      Width: {dimensions.width}, Height: {dimensions.height}
    </div>
  );
}
```

**Ref vs State:**
```javascript
function Component() {
  const [state, setState] = useState(0);
  const ref = useRef(0);

  const updateState = () => {
    setState(state + 1); // Triggers re-render
  };

  const updateRef = () => {
    ref.current = ref.current + 1; // No re-render
    console.log(ref.current); // But value is updated
  };

  return (
    <div>
      <p>State: {state}</p>
      <p>Ref: {ref.current}</p>
      <button onClick={updateState}>Update State</button>
      <button onClick={updateRef}>Update Ref</button>
    </div>
  );
}
```

**Key Points for Interview:**
- `useRef` returns mutable object with `.current` property
- **Doesn't cause re-renders** when `.current` changes
- **Persists** across re-renders
- Main use: **DOM access** and **storing mutable values**
- Can store **previous values**, **timer IDs**, **subscriptions**
- Use with `forwardRef` to **expose methods** to parent
- **Not reactive** - changes don't trigger updates

---

### 7. What is useMemo?

**Answer:**
`useMemo` is a Hook that memoizes (caches) the result of an expensive computation. It only recalculates when dependencies change, improving performance by avoiding unnecessary recalculations.

**Syntax:**
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**Example:**
```javascript
function ExpensiveComponent({ items, filter }) {
  // ❌ Without useMemo: Recalculates on every render
  const filteredItems = items.filter(item => 
    item.name.includes(filter)
  );

  // ✅ With useMemo: Only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**Expensive Computation Example:**
```javascript
function Fibonacci({ n }) {
  // Expensive calculation
  const fib = useMemo(() => {
    console.log('Calculating fibonacci...');
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }, [n]); // Only recalculate when n changes

  return <div>Fibonacci({n}) = {fib}</div>;
}
```

**Complex Object Creation:**
```javascript
function UserList({ users, sortBy }) {
  // ❌ Without useMemo: New object created every render
  const sortedUsers = users.sort((a, b) => {
    return a[sortBy].localeCompare(b[sortBy]);
  });

  // ✅ With useMemo: Object only recreated when dependencies change
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]);
    });
  }, [users, sortBy]);

  return (
    <ul>
      {sortedUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Referential Equality:**
```javascript
function Component({ data }) {
  // ❌ Without useMemo: New object every render
  const config = {
    theme: 'dark',
    items: data
  };

  // ✅ With useMemo: Same object reference if data unchanged
  const config = useMemo(() => ({
    theme: 'dark',
    items: data
  }), [data]);

  // Child component won't re-render unnecessarily
  return <ChildComponent config={config} />;
}

// Child with React.memo
const ChildComponent = React.memo(({ config }) => {
  // Only re-renders if config reference changes
  return <div>{config.theme}</div>;
});
```

**When NOT to Use useMemo:**
```javascript
// ❌ Don't use for simple calculations
function Component({ a, b }) {
  // This is cheap - useMemo overhead not worth it
  const sum = useMemo(() => a + b, [a, b]);
  // Just do: const sum = a + b;
}

// ❌ Don't use for primitive values
function Component({ name }) {
  // No benefit - primitives are already compared by value
  const upperName = useMemo(() => name.toUpperCase(), [name]);
  // Just do: const upperName = name.toUpperCase();
}
```

**Performance Optimization:**
```javascript
function DataTable({ data, searchTerm, sortColumn }) {
  // Step 1: Filter
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Step 2: Sort
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return -1;
      if (a[sortColumn] > b[sortColumn]) return 1;
      return 0;
    });
  }, [filteredData, sortColumn]);

  return (
    <table>
      {sortedData.map(row => (
        <tr key={row.id}>{/* render row */}</tr>
      ))}
    </table>
  );
}
```

**Key Points for Interview:**
- Memoizes **expensive computations**
- Only recalculates when **dependencies change**
- Returns **memoized value**
- Use for **performance optimization**
- Helps with **referential equality** (objects/arrays)
- **Don't overuse** - has its own overhead
- Use when computation is **expensive** or for **referential stability**

---

### 8. What is useCallback?

**Answer:**
`useCallback` is a Hook that memoizes a function. It returns the same function reference if dependencies haven't changed, preventing unnecessary re-renders of child components.

**Syntax:**
```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**Example:**
```javascript
// ❌ Without useCallback: New function every render
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = () => {
    console.log('Clicked');
  };

  // handleClick is recreated every render
  // ChildComponent re-renders unnecessarily
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// ✅ With useCallback: Same function reference
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps - function never changes

  // handleClick reference stays same
  // ChildComponent doesn't re-render when name changes
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

const ChildComponent = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

**With Dependencies:**
```javascript
function TodoList({ todos }) {
  const [filter, setFilter] = useState('');

  // Function depends on filter - include in deps
  const handleFilter = useCallback((todo) => {
    return todo.text.includes(filter);
  }, [filter]); // Recreate when filter changes

  const filteredTodos = todos.filter(handleFilter);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Preventing Unnecessary Re-renders:**
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Memoized callback - same reference unless count changes
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No deps needed - setCount is stable

  // Memoized callback with dependency
  const handleReset = useCallback(() => {
    setCount(0);
    setName('');
  }, []); // No deps - values not used in callback

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Counter onIncrement={handleIncrement} onReset={handleReset} />
    </div>
  );
}

const Counter = React.memo(({ onIncrement, onReset }) => {
  console.log('Counter rendered');
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
});
```

**With useEffect:**
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // ❌ Without useCallback: New function every render
  // useEffect runs on every render
  const fetchUser = () => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser changes every render!

  // ✅ With useCallback: Stable function reference
  const fetchUser = useCallback(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]); // Only recreate when userId changes

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Now only runs when userId changes

  return <div>{user?.name}</div>;
}
```

**Event Handlers:**
```javascript
function Form() {
  const [fields, setFields] = useState({});

  // Memoized handlers
  const handleChange = useCallback((field, value) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));
  }, []); // Stable - uses functional setState

  return (
    <form>
      <InputField name="email" onChange={handleChange} />
      <InputField name="password" onChange={handleChange} />
    </form>
  );
}

const InputField = React.memo(({ name, onChange }) => {
  return (
    <input
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
```

**When NOT to Use useCallback:**
```javascript
// ❌ Don't use for simple functions passed to non-memoized components
function Component() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // No benefit - child isn't memoized

  return <button onClick={handleClick}>Click</button>;
}

// ✅ Just use regular function
function Component() {
  const handleClick = () => {
    console.log('clicked');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**Key Points for Interview:**
- Memoizes **function references**
- Returns **same function** if dependencies unchanged
- Prevents **unnecessary re-renders** of memoized children
- Use with **React.memo** for optimization
- Include **all dependencies** in array
- **Don't overuse** - has overhead
- Useful for **callbacks passed to children**

---

### 9. Difference between useMemo and useCallback

**Answer:**
Both optimize performance, but `useMemo` memoizes **values** while `useCallback` memoizes **functions**. They serve different purposes but use the same dependency array pattern.

**Comparison:**

| Aspect | useMemo | useCallback |
|--------|---------|-------------|
| **What it memoizes** | Values (computed results) | Functions |
| **Returns** | Memoized value | Memoized function |
| **Use case** | Expensive computations | Function references |
| **Example** | `const result = useMemo(() => compute(), [deps])` | `const fn = useCallback(() => {}, [deps])` |

**Example:**
```javascript
function Component({ items, filter }) {
  // useMemo: Memoizes the RESULT (array)
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  // useCallback: Memoizes the FUNCTION
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item} onClick={handleClick}>{item}</div>
      ))}
    </div>
  );
}
```

**Side-by-Side Comparison:**
```javascript
function Parent({ data, id }) {
  // useMemo: Memoizes computed value
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);

  // useCallback: Memoizes function
  const handleSubmit = useCallback((formData) => {
    console.log('Submitting:', formData);
    submitToAPI(id, formData);
  }, [id]); // Recreate if id changes

  return (
    <div>
      <p>Total: {expensiveValue}</p>
      <ChildForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**When to Use Each:**
```javascript
// ✅ useMemo: For expensive computations
function DataTable({ rows, sortColumn }) {
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      return a[sortColumn] - b[sortColumn];
    });
  }, [rows, sortColumn]);

  return <table>{/* render sortedRows */}</table>;
}

// ✅ useCallback: For function references
function TodoList({ todos }) {
  const handleDelete = useCallback((id) => {
    deleteTodo(id);
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete} // Stable reference
        />
      ))}
    </ul>
  );
}
```

**They Can Work Together:**
```javascript
function Component({ data }) {
  // useMemo: Memoize computed data
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`
    }));
  }, [data]);

  // useCallback: Memoize handler function
  const handleItemClick = useCallback((itemId) => {
    console.log('Clicked:', itemId);
    // Do something with itemId
  }, []);

  return (
    <ul>
      {processedData.map(item => (
        <li key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.fullName}
        </li>
      ))}
    </ul>
  );
}
```

**Common Mistake:**
```javascript
// ❌ Wrong: Using useMemo for functions
function Component() {
  const handleClick = useMemo(() => {
    return () => console.log('clicked');
  }, []);
  // This works but useCallback is clearer and slightly more efficient
}

// ✅ Correct: Use useCallback for functions
function Component() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
}
```

**Key Points for Interview:**
- `useMemo` = memoize **values/results**
- `useCallback` = memoize **functions**
- Both use **dependency arrays**
- Both prevent **unnecessary recalculations/recreations**
- `useMemo` for **expensive computations**
- `useCallback` for **stable function references**
- Use together for **maximum optimization**

---

### 10. What is useContext?

**Answer:**
`useContext` is a Hook that lets you access React Context values without using the Context.Consumer component. It provides a way to share data across the component tree without prop drilling.

**Syntax:**
```javascript
const value = useContext(MyContext);
```

**Creating Context:**
```javascript
// 1. Create Context
const ThemeContext = createContext('light'); // Default value

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

**Complete Example:**
```javascript
// context/UserContext.js
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      const userData = await response.json();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easier access
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// App.js
function App() {
  return (
    <UserProvider>
      <Header />
      <MainContent />
    </UserProvider>
  );
}

// Components using context
function Header() {
  const { user, logout } = useUser();

  return (
    <header>
      {user ? (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Please login</span>
      )}
    </header>
  );
}

function MainContent() {
  const { user, login, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <LoginForm onLogin={login} />
      )}
    </main>
  );
}
```

**Multiple Contexts:**
```javascript
const ThemeContext = createContext();
const LanguageContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <LanguageContext.Provider value="en">
        <Component />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

  return (
    <div className={`theme-${theme} lang-${language}`}>
      Content
    </div>
  );
}
```

**Context with useReducer:**
```javascript
const TodoContext = createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
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

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text) => {
    dispatch({ type: 'ADD', payload: { id: Date.now(), text, completed: false } });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**Performance Consideration:**
```javascript
// ⚠️ Context value object recreated every render
function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* New object every render - all consumers re-render */}
    </UserContext.Provider>
  );
}

// ✅ Memoize context value
function App() {
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({
    user,
    setUser
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {/* Stable reference - only re-renders when user changes */}
    </UserContext.Provider>
  );
}
```

**Key Points for Interview:**
- Accesses **Context** without Consumer component
- Avoids **prop drilling**
- Must be used within **Context.Provider**
- All consumers **re-render** when context value changes
- **Memoize context value** to prevent unnecessary re-renders
- Can use **multiple contexts** in one component
- Often combined with **useReducer** for state management
- Create **custom hooks** for easier context access

---

### 11. What is a custom hook?

**Answer:**
A custom hook is a JavaScript function that starts with "use" and can call other Hooks. It lets you extract component logic into reusable functions. Custom hooks allow you to share stateful logic between components.

**Rules:**
1. Name must start with **"use"**
2. Can call other Hooks
3. Share logic, not state (each call has its own state)

**Example:**
```javascript
// Custom hook: useCounter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage in components
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function AnotherCounter() {
  const { count, increment } = useCounter(10); // Different initial value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**Common Custom Hooks:**

**1. useFetch (Data Fetching)**
```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

**2. useLocalStorage**
```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Current theme: {theme}
      </button>
    </div>
  );
}
```

**3. usePrevious**
```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**4. useDebounce**
```javascript
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

**5. useWindowSize**
```javascript
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window size: {width} x {height}</p>
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

**6. useToggle**
```javascript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// Usage
function Modal() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      {isOpen && <div>Modal Content</div>}
    </div>
  );
}
```

**Composing Custom Hooks:**
```javascript
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await fetchUser(token);
          setUser(userData);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { user, token } = await authenticate(credentials);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, loading, login, logout };
}

// Use in component
function App() {
  const { user, loading, login, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Dashboard user={user} onLogout={logout} /> : <Login onLogin={login} />;
}
```

**Key Points for Interview:**
- Custom hooks start with **"use"**
- Extract and **reuse stateful logic**
- Each call has **its own state** (not shared)
- Can call **other hooks** inside
- Share **logic**, not state
- Make code more **modular** and **testable**
- Common pattern: **use + descriptive name**
- Can **compose** multiple custom hooks

---

## 🎯 Interview Summary & Key Takeaways

### Quick Reference:

1. **Hooks** - Functions to use React features in functional components
2. **useState** - Manage component state
3. **useEffect** - Side effects, dependency array controls when it runs
4. **Cleanup** - Return function from useEffect to clean up
5. **useLayoutEffect** - Synchronous, runs before paint
6. **useRef** - Mutable ref, doesn't cause re-renders
7. **useMemo** - Memoize computed values
8. **useCallback** - Memoize functions
9. **useContext** - Access context values
10. **Custom Hooks** - Reusable stateful logic

### Common Interview Follow-ups:

- "When would you use useMemo vs useCallback?" → useMemo for values, useCallback for functions
- "What happens if you forget dependencies in useEffect?" → Runs with stale values, potential bugs
- "How do you prevent unnecessary re-renders?" → React.memo, useMemo, useCallback
- "What's the difference between useRef and useState?" → useRef doesn't trigger re-renders
- "How do you share state between components?" → Context API, lifting state up, custom hooks

### Best Practices:

1. **Always include dependencies** in useEffect/useMemo/useCallback
2. **Clean up side effects** (intervals, listeners, subscriptions)
3. **Don't overuse** useMemo/useCallback (has overhead)
4. **Use custom hooks** to extract reusable logic
5. **Memoize context values** to prevent unnecessary re-renders
6. **Follow Rules of Hooks** strictly

Good luck with your React interviews! 🚀
