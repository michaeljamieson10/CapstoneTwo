import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Container, Row, Button,Col } from 'reactstrap';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { useParams, useHistory } from "react-router-dom";
import { userActions } from '../actions/users';
import { avatarDressActions } from '../actions/avatarDress';
import { decode } from "jsonwebtoken";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ClipLoader } from "react-spinners";
import 'react-tabs/style/react-tabs.css';
import dreamSprawlAPI from './dreamSprawlAPI';
import ActualAvatar from './ActualAvatar'

function Dress () {
const userLoggedIn = useSelector(state => state.authentication);
const avatar = useSelector(state => state.avatar);
const state = useSelector(state => state);
const [tabListOne, setTabListOne] = useState({
  'Head':[], 'Legs':[],'Left Arm':[], 'Right Arm':[], 'Torso':[]
})
const { username } = decode(userLoggedIn.user)
const dispatch = useDispatch()
useEffect(() => {
    dispatch(avatarDressActions.getAvatar(username))
    async function getAvatarSelection() {
      const avatarSelection  = await dreamSprawlAPI.getAvatarChoices('');
      avatarSelection.forEach(avatarItem => whichPart(avatarItem))
    }
    getAvatarSelection()
}, []);

  const imageClick = (tabItemUrl) => {

    dispatch(avatarDressActions.changeBodyPart(username,tabItemUrl))
    dispatch(avatarDressActions.getAvatar(username))
  } 

  function whichPart(bodyPart){
    const bodyPartId = bodyPart.public_id;
    /** 
     * checks if has folder body / arm-left / arm-right
     */
    if(bodyPartId.includes('/torso/')){
        setTabListOne(items => ({...items, 'Torso':[...items['Torso'], bodyPart.public_id]}))
    }
    if(bodyPartId.includes('/left_arm/')){
        setTabListOne(items => ({...items, 'Left Arm':[...items['Left Arm'], bodyPart.public_id]}))
      }
      if(bodyPartId.includes('/right_arm/')){
        setTabListOne(items => ({...items, 'Right Arm':[...items['Right Arm'], bodyPart.public_id]}))
      }
      if(bodyPartId.includes('/head/')){
        setTabListOne(items => ({...items, 'Head':[...items['Head'], bodyPart.public_id]}))
      }
      if(bodyPartId.includes('/legs/')){
        setTabListOne(items => ({...items, 'Legs':[...items['Legs'], bodyPart.public_id]}))
    }   
}
  return (
    <Container fluid>
    <Row>
      <Col xs="4">
        {avatar.items && <ActualAvatar chosenAvatar={avatar.items} />}
      </Col>
  <Col xs="8">
  <Tabs>
    <TabList>
      {Object.keys(tabListOne).map(tab => (<Tab>{tab}</Tab>))}
  </TabList>
  {Object.keys(tabListOne).map(tab => (<TabPanel>{tabListOne[tab].map(tabItem => <Image onClick={() => imageClick(tabItem)} cloudName="dreamsprawl" publicId={tabItem}>
    <Transformation width="150" height="200" crop="scale" />
  </Image>)}</TabPanel>))}
   </Tabs>
   </Col>
   </Row>
   </Container>
)
  }
export default Dress;