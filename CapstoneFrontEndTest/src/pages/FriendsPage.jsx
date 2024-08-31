import FriendListContainer from "../components/Friends/FriendContainer.jsx";
import FriendReqContainer from "../components/Friends/FriendReqContainer.jsx";


const FriendsPage = () => {
    return (
        <div className="friends-page">
            <h1>Manage Friends</h1>
            <p>Here you can manage your friends, send requests, and accept invitations.</p>
            <div><FriendListContainer/></div>
            <div><FriendReqContainer/></div>
        </div>
    );
};

export default FriendsPage;