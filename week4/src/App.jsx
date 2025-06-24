import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <p>You clicked {count} times!</p>
    </div>
  );
}

export default App;
