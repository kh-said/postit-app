import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";

import {useDispatch, useSelector} from "react-redux"
import { savePost } from "../Features/PostSlice";
const SharePosts = () => {
  const {user} = useSelector(state => state.users)
  const [postMsg,setMsg] = useState("")
  const dispatch = useDispatch()
  const handlePost = ()=>{
    
   const postData= {
       postMsg:postMsg, 
       email: user.email
      }
      dispatch(savePost(postData))

  }

  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            onChange={e => setMsg(e.target.value)}
          />
          <Button onClick={handlePost}>PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
