import "./App.css";
import { Router } from "@reach/router";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Register path="/" />
        <Login path="client/signin" />
      </Router>
    </div>
  );
}

export default App;
