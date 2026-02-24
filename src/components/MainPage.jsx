import styles from "../app.module.css";
import TodoElements from "./TodoElement.jsx";
import {useState, useContext } from "react";
import {TodoContext} from "../context/TodoContext.jsx";

export default function MainPage () {
  const [error, setError] = useState("")
  const [isSorting, setIsSorting] = useState(false)

  const {todos, setTodos, inputText, setInputText} = useContext(TodoContext);

  const todoFieldOnChange = ({target}) => {
    const value = target.value
    setInputText(value)
    if (error) setError("")
  }

  const requestAddTodo = (event) => {
    event.preventDefault()

    if (inputText === "") {
      setError("Введите то, что планируете сделать")

    }
    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputText,
      }),
    })
        .then((res) => res.json())
        .then((newTodo) => setTodos((prevTodos) => [...prevTodos, newTodo]))
        .finally(() => setInputText(""))
  }

  const sortByAlphabet = () => {
    setTodos((prevTodos) =>
        [...prevTodos].sort((a, b) =>
            isSorting
                ? a.title.localeCompare(b.title, "ru")
                : b.title.localeCompare(a.title, "ru")
        )
    )
    setIsSorting((prev) => !prev)
  }

return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={requestAddTodo} className={styles.form}>
        <input
            value={inputText}
            className={styles.field}
            onChange={todoFieldOnChange}
            type="text"
        />

        <button className={styles.addBtn}>Добавить</button>
        <button
            type="button"
            title="Сортировать"
            className={styles.sortBtn}
            onClick={sortByAlphabet}
        >
          ↑↓
        </button>
      </form>
      <TodoElements />
    </div>
)

}