import { useContext, useState } from "react";
import styles from "../app.module.css"
import { TodoContext } from "../context/TodoContext.jsx";


export default function TodoElements () {

  const [editingText, setEditingText] = useState("")
  const [editingTodoId, setEditingTodoId] = useState(null)

  const {todos, setTodos, setInputText} = useContext(TodoContext)

  const requestEditTodo = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editingText,
      }),
    })
        .then((res) => res.json())
        .then((editedTodo) => {
          setTodos((prevTodos) =>
              prevTodos.map((todo) => (todo.id === id ? editedTodo : todo))
          )
        })
    setEditingTodoId(null)
    setInputText("")
  }

  const startEditingTodo = (id, title) => {
    setEditingTodoId(id)
    setEditingText(title)
  }

  const cancelEdit = () => {
    setEditingTodoId(null)
    setEditingText("")
  }

  const requestDeleteTodo = (id) => {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    })
  }

  return (
      <>
      <ul className={styles.list}>
        {todos.map(({ id, title }) => (
            <li key={id} className={styles.listItem}>
              {editingTodoId === id ? (
                  <div className={styles.editFormContainer}>
                    <input
                        className={styles.editField}
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button
                        title="Сохранить"
                        className={styles.saveBtn}
                        onClick={() => requestEditTodo(id)}
                    >
                      💾
                    </button>
                    <button
                        title="Отмена"
                        onClick={() => cancelEdit(id)}
                        className={styles.deleteBtn + " " + styles.cancelBtn}
                    >
                      X
                    </button>
                  </div>
              ) : (
                  <>
                    {title}
                    <div className={styles.buttonsContainer}>
                      <button
                          title="Редактировать"
                          onClick={() => startEditingTodo(id, title)}
                          className={styles.editBtn}
                      />
                      <button
                          title="Удалить"
                          onClick={() => requestDeleteTodo(id)}
                          className={styles.deleteBtn}
                      >
                        X
                      </button>
                    </div>
                  </>
              )}
            </li>
        ))}
      </ul>
      </>
  )
}