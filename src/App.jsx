import "./App.css";
// import Footer from './Components/Footer'
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AllRoutes from "./Routes/Routes";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div style={{ 
        position: "sticky",
        top: "0",
        zIndex: "2",
      }}>
        <Header />
      </div>
      <AllRoutes />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
