import React from 'react';
import { Button } from 'reactstrap';

// import { resetAll } from "./actions/reset";

/** 
 * This is the homepage to check if anything was called yet by the api and stored in the selector
 * if someone did click the button causing this to occur you can choose to reset to fresh explroation
 * I like how they use loaded, if it is undefined nothing will load
 * 
*/
function HomePage() {

  return (
    <>
    <p>Welcome to DreamSprawl!</p>
    <p>You can create a custom avatar!</p>
    <p>If you no longer feel like playing you may delete your account in the profile section</p>
    <p>If you become an admin you can delete other players</p>
    </>
  );
}

export default HomePage;
