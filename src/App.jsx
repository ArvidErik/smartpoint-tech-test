import { useState } from "react"


function App() {

  const [boardSize, setBoardSize] = useState(5)


  return (
    <>
      <div id="app" className="flex">
        <h1>Simple Board Game</h1>
        <h2>Please select a board size!</h2>
        <input type="number" min="5" max="100" placeholder={boardSize} />
        <button className="my-button">start</button>
      </div>
    </>
  )
}

export default App
