import { useGlobalDataStore } from "./stores";
import { Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage";

function App() {

  const { hostName } = useGlobalDataStore();
  console.log(hostName)

  return (
    <div>
      <Routes>
        <Route index path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
