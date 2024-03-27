import { Task } from '../task';
import { DateTimeDisplay } from '../task';
import styles from './tasks.module.css';
import { useState } from 'react';
import { TbTrash } from 'react-icons/tb';


export function Tasks({ tasks, onDelete, onDeleteAllCompleted, onComplete }) {
  const [showCompleted, setShowCompleted] = useState(false);

  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const currentTasks = tasks.filter(task => !task.isCompleted);

  function handleShowCompleted() {
    setShowCompleted(true);
  }

  function handleShowCurrent() {
    setShowCompleted(false);
  }

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
      <div>
        <div onClick={handleShowCurrent}>
          <button className={styles.currTaskBtn}>Current Tasks</button>
        </div>
        <span>{tasksQuantity-completedTasks} of {tasksQuantity}</span>
        <div onClick={handleShowCompleted}>
          <button className={styles.completedTaskBtn}>Completed tasks </button>
        </div>
        <span>{completedTasks} of {tasksQuantity}</span>
      </div>
      <div>
      <span>{tasksQuantity}</span>
      <button className={styles.deleteButton} onClick={() => onDeleteAllCompleted()}>
        <TbTrash size={20} />
      </button>
      </div>
      </header>

      <div className={styles.list}>
        {(showCompleted ? tasks.filter(task => task.isCompleted) : currentTasks).map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} />
        ))}
      </div>
    </section>
  )
}
