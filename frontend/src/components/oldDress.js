import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container,Button } from 'reactstrap';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { useParams, useHistory } from "react-router-dom";
import { userActions } from '../actions/users';
import { avatarDressActions } from '../actions/avatarDress';
import { decode } from "jsonwebtoken";
// import { resetAll } from "./actions/reset";
function Dress() {
// const users = useSelector(state => state.users);

const userLoggedIn = useSelector(state => state.authentication);
const avatar = useSelector(state => state);
const { username } = decode(userLoggedIn.user)
const dispatch = useDispatch()
useEffect(() => {
    // dispatch(userActions.getAll())
    dispatch(avatarDressActions.testDress(username))
}, []);

  console.log(userLoggedIn)
  console.log(avatar)
  console.log(username, 'username')
  const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
  const types = ['Cash', 'Credit Card', 'Bitcoin'];
  function TabGroup() {
    const [active, setActive] = useState(types[0]);
    return (
      <>
        <ButtonGroup>
          {types.map(type => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {type}
            </Tab>
          ))}
        </ButtonGroup>
        <p />
        <p> Your payment selection: {active} </p>
      </>
    );
  }
  // Usage
  <TabGroup/>
  // return (
  //   <div>Customize your own avatar
  //     <Container>
  //       <img src="https://res.cloudinary.com/dreamsprawl/image/upload/v1596401263/head-3_no6as2.png"/>

  //     </Container>
  //     {/* publicId="docs/casual" version="1573726751" cloud_name="demo" */}
  //     {/* <Image cloudName="dreamsprawl" publicId="head-3_no6as2.png" version="1596401263" width="50" crop="scale"/> */}
  // {/* <Button color="danger" onClick={() =>history.push('/register')}>CATS EXIST</Button> */}
  // <Button color="danger" onClick={() => alert('meow')}>Save</Button>
  
  //   </div>

  // );
}

export default Dress;
