import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Report from "./components/Report";
import Task from "./components/Task";
import TransactionDetails from "./components/TransactionDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/task" element={<Task />} />
        <Route path="/transactiondetails" element={<TransactionDetails />} />
      </Routes>
    </div>
  );
}

export default App;
