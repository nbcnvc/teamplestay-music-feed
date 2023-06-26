import { useSelector } from "react-redux";
function App() {

  const state = useSelector(state => state)
  console.log(state)
  return (
    <h2>music feed</h2>
  );
}

export default App;
