import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container,Button } from 'reactstrap';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import { useParams, useHistory } from "react-router-dom";
import { userActions } from '../actions/users';
import { avatarDressActions } from '../actions/avatarDress';
import { decode } from "jsonwebtoken";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 
function Dress () {
const userLoggedIn = useSelector(state => state.authentication);
const avatar = useSelector(state => state);
const { username } = decode(userLoggedIn.user)
const dispatch = useDispatch()
useEffect(() => {
    // dispatch(userActions.getAll())
    dispatch(avatarDressActions.testDress(username))
    
}, []);
  const tabList = ['Head', 'Legs','Arm']
  const tabComponents = tabList.map(tab => (<Tab>{tab}</Tab>))
  return (
  <Tabs>
    <TabList>
  {tabComponents}
      {/* <Tab>Title 1</Tab> */}
      {/* <Tab>Title 2</Tab> */}
    </TabList>
 
    <TabPanel>
    <img src="https://res.cloudinary.com/dreamsprawl/image/upload/v1596401263/head-3_no6as2.png"/>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
)
  }
export default Dress;