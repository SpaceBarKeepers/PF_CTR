import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
    ]);

  return <RouterProvider router={router} />
}

export default App
