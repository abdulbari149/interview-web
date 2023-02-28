import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./component/form/Form";
import Start from "./component/start/Start";
import Questions from "./component/questions/Questions";
import Result from "./component/result/Result";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/start" element={<Start />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;
