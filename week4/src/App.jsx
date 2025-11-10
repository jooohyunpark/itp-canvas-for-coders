import { useState } from "react";
import Button from "@/components/Button";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div id="app">
      <div className="button-container">
        <Button onClick={handleClick}>Click me</Button>
        <Button variant="outline" onClick={handleClick}>
          Click me
        </Button>
        <Button variant="subtle" onClick={handleClick}>
          Click me
        </Button>
      </div>
      <p>You clicked {count} times!</p>
    </div>
  );
}

export default App;
