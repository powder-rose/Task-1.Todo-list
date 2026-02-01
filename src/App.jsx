import { useEffect, useState } from "react";
import styles from "./app.module.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }, []);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {todos.map(({ id, title }) => (
          <li className={styles.listItem} key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
