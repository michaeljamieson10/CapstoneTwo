import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {Image, Transformation} from 'cloudinary-react';
import { avatarDressActions } from '../actions/avatarDress';
import { decode } from "jsonwebtoken";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import dreamSprawlAPI from './dreamSprawlAPI';
import ActualAvatar from './ActualAvatar'

/**
 * dress creates creates actualavatar (your avatar) component and a list of options to choose from 
 * a cloudinary api
 */
function Dress () {
  //Token
const userLoggedIn = useSelector(state => state.authentication);
const avatar = useSelector(state => state.avatar);
/**
 * react hook useState is because this will only be used on this page
 * do not need prop drilling or wide use of this data, so redux is not used.
 */
const [tabListOne, setTabListOne] = useState({
  'Head':[], 'Legs':[],'Left Arm':[], 'Right Arm':[], 'Torso':[]
})
/**
 * this takes the username out of the token
 */
const { username } = decode(userLoggedIn.user)
const dispatch = useDispatch()
useEffect(() => {
  /** on page load out gets user's avatar from db */
    dispatch(avatarDressActions.getAvatar(username))
    async function getAvatarSelection() {
      /** get avatar choices from db */
      const avatarSelection  = await dreamSprawlAPI.getAvatarChoices('');
      /** puts avatar body part item into proper avatar place */
      avatarSelection.forEach(avatarItem => whichPart(avatarItem))
    }
    getAvatarSelection()
}, []);
/**
 * dispatches change body part, which sends a request axios.patches the body part of the db of the user
 * then refreshes the avatar by dispatching another request, getAvatar. 
 */
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
    {/* takes hard coded tab list body parts keys and makes them the tab name */}
    <TabList>
      {Object.keys(tabListOne).map(tab => (<Tab>{tab}</Tab>))}
  </TabList>
  {/* this is the data that is pulled from the cloudinary api,
  it uses image which is a cloudinary react component which all take the function imageclick
  */}
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