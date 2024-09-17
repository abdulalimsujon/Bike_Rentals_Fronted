import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ProtectedRoute role={undefined}>
        <MainLayout></MainLayout>
        <ToastContainer />
      </ProtectedRoute>
    </>
  );
}

export default App;
