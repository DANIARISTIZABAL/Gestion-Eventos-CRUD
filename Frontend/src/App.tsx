import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/evensts" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/create-event" 
          element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} 
        />
        <Route 
          path="/edit-event/:id" 
          element={<ProtectedRoute><EditEventPage /></ProtectedRoute>} 
        />
      </Routes>
    </>
  );
}

export default App;
