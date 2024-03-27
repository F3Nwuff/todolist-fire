import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Footer from "./components/footer";
import App from "./App.jsx";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function Lognote() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/notes",
      element: <App />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
      <Footer />
    </AuthProvider>
  );
}

export default Lognote;
