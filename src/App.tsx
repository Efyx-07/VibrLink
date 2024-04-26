import { useGlobalDataStore } from "./stores"

function App() {

  const { hostName } = useGlobalDataStore();
  console.log(hostName)

  return (
    <>
    Hello World
    </>
  )
}

export default App
