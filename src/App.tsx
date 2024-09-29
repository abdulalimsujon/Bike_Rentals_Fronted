import { ToastContainer } from "react-toastify";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";

import "react-toastify/dist/ReactToastify.css";
<link rel="stylesheet" href="bower_components/aos/dist/aos.css" />;

function App() {
  return (
    <>
      <MainLayout></MainLayout>
      <ToastContainer />
      <script>AOS.init();</script>
    </>
  );
}

export default App;
