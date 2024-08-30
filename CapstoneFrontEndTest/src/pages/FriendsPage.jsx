import FriendList from "../components/Friends/FriendList.jsx";
import RequestsList from "../components/Friends/FriendRequests.jsx";


const FriendsPage = () => {
    return (
        <div className="friends-page">
            <h1>Manage Friends</h1>
            <p>Here you can manage your friends, send requests, and accept invitations.</p>
            <div><FriendList/></div>
            <div><RequestsList/></div>
        </div>
    );
};

export default FriendsPage;