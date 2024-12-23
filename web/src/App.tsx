import ResetPassword from "./Pages/Authentication/Reset/Reset";
import Login from "./Pages/Authentication/Login/Login";
import SignUp from "./Pages/Authentication/Signup/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpensesPage from "./Pages/Expenses/ExpensePage";
import UserPage from "./Pages/Users/Users";
import ProtectedRoute from "./Components/protectedRoute";
import Logout from "./Pages/Authentication/Logout/Logout";
import AnalysisPage from "./Pages/Analytics/Analytics";
import ProfileScreen from "./Pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/expense-table"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-page"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-screen"
          element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
