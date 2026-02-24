import { useEffect, useState } from "react"
import styles from "./app.module.css"
import MainPage from "./components/MainPage.jsx";
import TodoElements from "./components/TodoElement.jsx";
import {TodoContext} from "./context/TodoContext.jsx";

function App() {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState("")
  useEffect(() => {
    fetch("http://localhost:3005/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }, [])

  return (
      <TodoContext value={{ todos, setTodos, inputText, setInputText }}>
<div className={styles.container}>
  <MainPage />
</div>
      </TodoContext>
  )
}

export default App
