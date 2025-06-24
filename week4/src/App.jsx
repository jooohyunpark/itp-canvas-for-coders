import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
      <div className="button-container">
        <Button variant="solid" onClick={() => setCount(count + 1)}>
          Click me
        </Button>
        <Button variant="outline" onClick={() => setCount(count + 1)}>
          Click me
        </Button>
      </div>
      <p>You clicked {count} times!</p>
    </div>
  );
}

export default App;
