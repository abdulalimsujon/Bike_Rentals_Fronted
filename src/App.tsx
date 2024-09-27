import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <MainLayout></MainLayout>
      <ToastContainer />
    </>
  );
}

export default App;
