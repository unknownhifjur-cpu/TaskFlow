
import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const completed = tasks.filter((item) => item.completed).length;
  const remaining = tasks.length - completed;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const filteredTasks = tasks.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  function addTask(e) {
    e.preventDefault();
    if (!task.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: task.trim(),
        completed: false,
      },
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <main className="app">
      <div className="dashboard">
        <header className="topbar">
          <a className="brand" href="#home">
            <span className="brand-icon">✓</span>
            <span>taskflow<span className="brand-dot">.</span></span>
          </a>

          <span className="today-badge">
            <span className="status-dot" />
            Your personal workspace
          </span>
        </header>

        <section className="welcome">
          <span className="eyebrow">YOUR PRODUCTIVITY SPACE</span>
          <h1>Make today <span>count.</span></h1>
          <p>Small steps every day lead to big results.</p>
        </section>

        <section className="stats">
          <article className="stat-card total-stat">
            <span className="stat-label">TOTAL TASKS</span>
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-note">All your tasks</span>
            <span className="stat-icon">▤</span>
          </article>

          <article className="stat-card pending-stat">
            <span className="stat-label">IN PROGRESS</span>
            <span className="stat-value">{remaining}</span>
            <span className="stat-note">Still to be done</span>
            <span className="stat-icon">◷</span>
          </article>

          <article className="stat-card done-stat">
            <span className="stat-label">COMPLETED</span>
            <span className="stat-value">{completed}</span>
            <span className="stat-note">{progress}% completion</span>
            <span className="stat-icon">✓</span>
          </article>
        </section>

        <section className="workspace">
          <div className="section-heading">
            <div>
              <h2>My tasks</h2>
              <p>Keep your priorities in sight.</p>
            </div>

            <span className="task-count">{remaining} remaining</span>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Daily progress</span>
              <strong>{progress}%</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Task completion progress"
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <span className="input-plus">＋</span>
            <input
              type="text"
              placeholder="What needs to get done?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              aria-label="New task"
              maxLength={200}
            />
            <button type="submit" disabled={!task.trim()}>
              Add task <span>↗</span>
            </button>
          </form>

          <div className="filters" aria-label="Filter tasks">
            {["all", "active", "completed"].map((value) => (
              <button
                type="button"
                key={value}
                className={filter === value ? "filter active-filter" : "filter"}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
              >
                {value === "all" ? "All tasks" :
                 value === "active" ? "In progress" : "Completed"}
                <span>
                  {value === "all" ? tasks.length :
                   value === "active" ? remaining : completed}
                </span>
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.map((item) => (
              <article
                className={`task-item ${item.completed ? "task-done" : ""}`}
                key={item.id}
              >
                <button
                  type="button"
                  className="check-button"
                  onClick={() => toggleTask(item.id)}
                  aria-label={
                    item.completed ? "Mark as incomplete" : "Complete task"
                  }
                  aria-pressed={item.completed}
                >
                  {item.completed && "✓"}
                </button>

                <span className="task-text">{item.text}</span>

                <span className="task-status">
                  {item.completed ? "Done" : "To do"}
                </span>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </article>
            ))}

            {filteredTasks.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  {filter === "completed" ? "✓" : "✳"}
                </div>
                <h3>
                  {tasks.length === 0
                    ? "A fresh start."
                    : filter === "active"
                    ? "All caught up!"
                    : "Nothing here yet."}
                </h3>
                <p>
                  {tasks.length === 0
                    ? "Add your first task and make today count."
                    : filter === "active"
                    ? "You've completed every task. Nice work!"
                    : "Complete a task and it will show up here."}
                </p>
              </div>
            )}
          </div>

          <footer className="workspace-footer">
            <span>
              <span className="footer-dot" />
              {remaining === 0 && tasks.length > 0
                ? "Everything is complete"
                : `${remaining} task${remaining === 1 ? "" : "s"} left to focus on`}
            </span>
            <span>One step at a time.</span>
          </footer>
        </section>

        <footer className="page-footer">
          Built for better days <span>♥</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
