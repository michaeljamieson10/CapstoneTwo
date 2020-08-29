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
    <div>Welcome to DreamSprawl!</div>
  );
}

export default HomePage;
