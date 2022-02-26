import Routes from "./Routes.js";
import PhoneBookProvider from "./hooks/usePhoneBook.js";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
   return (
      <Router>
         <PhoneBookProvider>
            <Routes />
         </PhoneBookProvider>
      </Router>
   );
}

export default App;
