import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Tasks } from "./components/tasks";
import { db, auth } from "./firebase/firebase"; 
import { writeBatch, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/auth/login";
import { AuthProvider } from "./contexts/authContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        loadTasks(); // Load tasks when user is authenticated
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
        setTasks([]); // Clear tasks when user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  async function loadTasks() {
    const user = auth.currentUser;
    if (user) {
      const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(tasksQuery);
      const loadedTasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(loadedTasks);
    }
  }

  async function addTask(taskTitle) {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        isCompleted: false,
        userId: user.uid,
        createdAt: new Date().toISOString().split('T')[0]
      });
      loadTasks(); 
    }
  }

  async function deleteTaskById(taskId) {
    await deleteDoc(doc(db, "tasks", taskId));
    loadTasks(); 
  }

  async function onDeleteAllCompleted() {
    console.log("db", db)
    const tasksSnap = query(collection(db, "tasks"), where("isCompleted", "==", true));
    const tasksSnapshot = await getDocs(tasksSnap);
    
    // Get all the completed tasks
    const batch = writeBatch(db);
    tasksSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    // Delete all the completed tasks
    await batch.commit();
    location.reload();
  }


  async function toggleTaskCompletedById(taskId) {
    const taskRef = doc(db, "tasks", taskId);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      await updateDoc(taskRef, {
        isCompleted: !task.isCompleted
      });
      loadTasks(); 
    }
  }

  return (
    <AuthProvider>
      {!isAuthenticated ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Header 
            handleAddTask={addTask} 
            userEmail={userEmail} 
            handleLogout={() => signOut(auth)} />
          <Tasks
            tasks={tasks}
            onDelete={deleteTaskById}
            onComplete={toggleTaskCompletedById}
            onDeleteAllCompleted={onDeleteAllCompleted}
          />
        </>
      )}
    </AuthProvider>
  )
}

export default App;