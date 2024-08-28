import './App.css'
import {Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AllWords from "./components/Admin/AllWords.jsx";
import AllUsers from "./components/Admin/AllUsers.jsx";


function App() {

    return (
        <Router>
            <div className="app">
                {/* Navbar */}
                <Navbar/>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/admin/dashboard/words" element={<AllWords/>} />
                        <Route path="/admin/dashboard/users" element={<AllUsers/>} />
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/admin" element={<AdminDashboardPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/friends" element={<FriendsPage/>}/>
                        <Route path="/statistics" element={<StatisticsPage/>}/>
                        <Route path="/login" element={<RegisterPage/>}/>
                        {/* Catch-all route for undefined paths */}
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </main>

                {/* Footer */}
                <Footer/>
            </div>
        </Router>
    )
}

export default App