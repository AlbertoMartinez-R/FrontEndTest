import './App.css'
import {Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import Footer from "./components/Layout/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AllWords from "./components/Admin/AllWords.jsx";
import AllUsers from "./components/Admin/AllUsers.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import AppBar from "./components/Layout/AppBar.jsx";
import LoginRegisterPage from "./pages/LoginRegisterPage.jsx";
import AllMonthlyWords from "./components/Admin/WordsCalendar.jsx";


function App() {

    return (
        <Router>
            <div className="app">
                {/* Navbar */}
                <AppBar/>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/admin/dashboard/months" element={<AllMonthlyWords/>}/>
                        <Route path="/leaderboard" element={<LeaderboardPage/>}/>
                        <Route path="/admin/dashboard/words" element={<AllWords/>} />
                        <Route path="/admin/dashboard/users" element={<AllUsers/>} />
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/admin" element={<AdminDashboardPage/>}/>
                        <Route path="/friends/:username/friend-list" element={<FriendsPage/>}/>
                        <Route path="/statistics" element={<StatisticsPage/>}/>
                        <Route path="/authenticate" element={<LoginRegisterPage/>}/>
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