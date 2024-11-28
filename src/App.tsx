import { Outlet } from "react-router-dom";
import Navbar from "./components and functions/assetsForDesign/NavBar";
import Footer from "./components and functions/assetsForDesign/Footer";
import { UserProvider } from "./UserContext"; // Import UserProvider

//npm install bootstrap jquery popper.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'; 

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);



  // const logUserInfo = () => {
  //   if (user) {
  //     console.log(user[0].username);
  //   } else {
  //     console.log('No user is logged in.');
  //   }
  // };

  return (
    <div>
      <UserProvider>
        <Navbar />
        {/* <button onClick={logUserInfo}>Log Uaser Info</button> */}
        <Outlet />
        <Footer/>
      </UserProvider>
    </div>
  );
}

export default App;
