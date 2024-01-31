import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<h1>Test</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
