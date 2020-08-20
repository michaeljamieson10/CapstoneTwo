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
const [infoLoaded, setInfoLoaded] = useState(false);
const [tabListOne, setTabListOne] = useState({
  'Head':[], 'Legs':[],'Left Arm':[], 'Right Arm':[], 'Torso':[]
})
// const [chosenAvatar, setChosenAvatar] = useState({
  // 'Head':"avatar/head/h-t-blush_v6rqon", 'Legs':"avatar/legs/l-heel_kpee8l",'Left Arm':'avatar/left-arm/la-default_knghhe', 'Right Arm':"avatar/right-arm/ra-bent_meypnn", 'Torso':"avatar/torso/torso-female_tkc6v4"
// })
const { username } = decode(userLoggedIn.user)
const dispatch = useDispatch()
useEffect(() => {
    // dispatch(avatarDressActions.testDress(username))
    dispatch(avatarDressActions.getAvatar(username))
    // setTabListOne(items => ({...items, 'Body':[...items['Body'], 'cats YES']}))
    // await dreamSprawlAPI
    async function getAvatarSelection() {
      const avatarSelection  = await dreamSprawlAPI.getAvatarChoices('');
      // whichPart()
      avatarSelection.forEach(avatarItem => whichPart(avatarItem))
    }
    getAvatarSelection()
    setInfoLoaded(true)
}, []);

  const imageClick = (tabItemUrl) => {
    console.log(tabItemUrl);

    dispatch(avatarDressActions.changeBodyPart(username,tabItemUrl))
    dispatch(avatarDressActions.getAvatar(username))
  } 
  // const tabPanelComponents = tabPa
  function whichPart(bodyPart){
    const bodyPartId = bodyPart.public_id;
    // console.log(bodyPartId,' bodypartId')
    // console.log(bodyPart.url, 'bodyPart')
    // console.log(bodyPart.public_id, 'bodyParradicalt')
    /** 
     * checks if has folder body / arm-left / arm-right
     */
    if(bodyPartId.includes('/torso/')){
        // changeTorso(bodyPartId)
        // tabList.Body.push('IT WORKED')
        setTabListOne(items => ({...items, 'Torso':[...items['Torso'], bodyPart.public_id]}))
        // console.log(tabList)
        // return 'this is body'
    }
    if(bodyPartId.includes('/left_arm/')){
        // changeLeftArm(bodyPartId)
        setTabListOne(items => ({...items, 'Left Arm':[...items['Left Arm'], bodyPart.public_id]}))
        // return 'this is arm left'
      }
      if(bodyPartId.includes('/right_arm/')){
        setTabListOne(items => ({...items, 'Right Arm':[...items['Right Arm'], bodyPart.public_id]}))
        // changeRightArm(bodyPartId)
        // return 'this is arm right'
      }
      if(bodyPartId.includes('/head/')){
        setTabListOne(items => ({...items, 'Head':[...items['Head'], bodyPart.public_id]}))
        // changeHead(bodyPartId)
        
        // return 'this is head '
      }
      if(bodyPartId.includes('/legs/')){
        setTabListOne(items => ({...items, 'Legs':[...items['Legs'], bodyPart.public_id]}))
        // changeLegs(bodyPartId)
        // return 'this is legs'
    }   
}
if(avatar.items){
  console.log(avatar.items)
}
  return (
    <Container fluid>
    <Row>
      <Col xs="4">
  {/* <div>{avatar.items }</div> */}
        {avatar.items && <ActualAvatar chosenAvatar={avatar.items} />}
        {/* <ActualAvatar chosenAvatar={chosenAvatar} /> */}
      </Col>
  <Col xs="8">
  <Tabs>
    <TabList>
      {Object.keys(tabListOne).map(tab => (<Tab>{tab}</Tab>))}
      {/* {tabComponents} */}
       {/* <Tab>Title 1</Tab> */}
       {/* <Tab>Title 2</Tab> */}
  </TabList>
 
     {/* <TabPanel> */}
     {/* <img src="https://res.cloudinary.com/dreamsprawl/image/upload/v1596401263/head-3_no6as2.png"/> */}
     <div>
     {/* emp.filter(item =>!this.data.includes(item.QID)); */}
    {/* {avatar.items && avatar.items.filter(av => (<div>{av.public_id.includes('/head/')}</div>))} */}
    {/* {avatar.items && avatar.items.map(av => (<div>{av.public_id.includes('/head/')}</div>))} */}
    {/* {avatar.items && avatar.items.map(av => (<div>{whichPart(av.public_id)}</div>))} */}
  </div>
     {/* </TabPanel> */}
     {/* <TabPanel> */}
       {/* {Object.keys(tabListOne).map(tab => (<TabPanel><Image onClick={() => imageClick(tabListOne[tab])} publicId={tabListOne[tab]}> */}
      {/* <Transformation width="150" height="150" gravity="face" crop="thumb" /> */}
      {/* </Image>))}</TabPanel>))} */}
  {Object.keys(tabListOne).map(tab => (<TabPanel>{tabListOne[tab].map(tabItem => <Image onClick={() => imageClick(tabItem)} cloudName="dreamsprawl" publicId={tabItem}>
    <Transformation width="150" height="200" crop="scale" />
  </Image>)}</TabPanel>))}

       {/* {Object.keys(tabListOne).map(tab => (<Image  >{tabListOne[tab]}</Image>))} */}
       {/* {Object.keys(tabListOne).map(tab => (<Image >{tabListOne[tab]}</Image>))} */}
      {/* {Object.keys(tabListOne).map(tab => (<TabPanel>{tabListOne[tab].map(tabItemUrl => (<Image onClick={() => imageClick(tabItemUrl)} publicId={tabItemUrl}>
      <Transformation width="150" height="150" gravity="face" crop="thumb" />
      </Image>))}</TabPanel>))} */}
      {/* {Object.keys(tabListOne).map(tab => (<TabPanel>{tabListOne[tab].map(tabItemUrl => (<img onClick={() => imageClick(tabItemUrl)} src={tabItemUrl}/>))}</TabPanel>))} */}
      {/* {tabListOne.Body} */}
       {/* <h2>Any content 2</h2> */}
     {/* </TabPanel> */}
   </Tabs>
   </Col>
   </Row>
   </Container>
)
  }
export default Dress;