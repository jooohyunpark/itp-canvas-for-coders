import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app">
      <Button onClick={() => setCount(count + 1)}>Click me</Button>

      {count}
    </div>
  );
}

export default App;
