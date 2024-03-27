import Logo from '../../assets/logo2.png';
import styles from './header.module.css';
import { useEffect, useState } from 'react';
import { FaSignOutAlt, FaCog } from "react-icons/fa"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase"; 
import { useAuth } from '../../contexts/authContext';

export const Home = () => {
  const { currentUser } = useAuth()
  return (
      <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
  )
}

export function Profile({ user, onClose }) {
  // if (!user) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h1>User Profile</h1>
        <p>Email: </p>
        <p> {user.email} </p>
        <p>UID: </p> 
        <p> {user.uid} </p>
      </div>
    </div>
  );
}

export function Header({ handleAddTask, userEmail, handleLogout }) { 
  const [title, setTitle] = useState('');
  const [authUser, setAuthUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  function toggleUserProfile() {
    setIsProfileVisible(!isProfileVisible);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          setAuthUser(user);
          console.log("Authenticated user:", user); // Debugging 
          setUserDetails({
            email: user.email,
            uid: user.uid,
            creationTime: user.metadata.creationTime
          });
      } else {
          setAuthUser(null);
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  function handleLogoutWrapper() {
    signOut(auth).then(() => {
      console.log("Logout successful");
      handleLogout(); // Directly call handleLogout received as a prop
    }).catch((error) => {
      console.error("Logout error", error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      alert("fill in task first");
      return;
    }
    handleAddTask(title.trim());
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  } 

  return (
    <>
      <header className={styles.header}>
        <img src={Logo} />
        <h2> 
          Hilkia Kennan Latjandu
          <br/>
          2602174485
        </h2>

        <h2>
          To-Do List
        </h2>

        <div className={styles.userInfoWrapper}> 
          <span className={styles.userInfo} onClick={toggleUserProfile}>
            <FaCog size={20} />
          </span>
        </div>
        <div>
          <button onClick={handleLogoutWrapper} className={styles.logoutButton}>
            <FaSignOutAlt size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.addTask}>
          <input placeholder="write here..." type="text" onChange={onChangeTitle} value={title} />
          <button> + </button>
        </form>
      </header>
      <br/>
      <footer className={styles.footer}>
        <h2>
          <Home />
        </h2>
      </footer>
      {isProfileVisible && <Profile user={userDetails} onClose={toggleUserProfile} />}
    </>
  )
}