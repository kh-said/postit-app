import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts,likePost } from "../Features/PostSlice";
import {useNavigate} from "react-router-dom"
import moment from 'moment'
import { FaThumbsUp } from "react-icons/fa";


const Posts = () => {
   const {posts} = useSelector(state => state.posts)
   const {user} = useSelector(state => state.users)
 // const posts = useSelector(state =>state.posts.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPosts());
  }, [posts]);
 
  const handleLikePost = (postId)=>{
    const postData={
      postId:postId,
      userId:user._id
    }
   dispatch(likePost(postData))
   navigate("/")
  }

  return (
    <div className="postsContainer">
      <h1>Display Posts</h1>
      <table>
        <tbody>
          {
            posts.map((post,idx)=>(
              <tr>
                 <td>
                     {post.postMsg}
                     <p>{post._id}</p>
                  
                 </td>
                 <td>
                    <p>{moment(post.createdAt).fromNow()}</p>
                    <p>{post.email} </p> 
                    <p>
                      <a href="#" onClick={()=> handleLikePost(post._id)}>
                         <FaThumbsUp />
                      </a>
                      ({post.likes.count})
                    </p>
                  
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div> /* End of posts */
  );
};

export default Posts;
