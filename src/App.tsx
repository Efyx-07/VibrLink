import { Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage";

const App = () => {

  return (
    <div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
