import { useSelector } from "react-redux";
import userimg from "../Images/user.png";


const User = () => {
 const {user,isLogin} = useSelector(state => state.users)
  return (
    <div>
      <img src={userimg} className="userImage" alt=""/>
      <p>
        <h6>{user?.name}</h6>  
        <h6>{user?.email}</h6>  
        <h6>{user?._id}</h6>
      </p>
    </div>
  );
};

export default User;
