import React from 'react';
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

// import { resetAll } from "./actions/reset";

/** 
 * This is the homepage to check if anything was called yet by the api and stored in the selector
 * if someone did click the button causing this to occur you can choose to reset to fresh explroation
 * I like how they use loaded, if it is undefined nothing will load
 * 
*/
function HomePage() {
//   const loaded = useSelector(st => st.films[1] !== undefined);
//   const dispatch = useDispatch();

//   function reset() {
//     dispatch(resetAll());
//   }

  return (
    <div>Hello world
      
    <Button color="danger">CATS EXIST</Button>
    </div>
    // <>
    //   {loaded ? (
    //     <button
    //       className="btn btn-danger btn-block btn-lg"
    //       onClick={reset}
    //     >
    //       Reset To Fresh Exploration
    //     </button>
    //   ) : (
    //     <Link to="/films/1" className="btn btn-primary btn-block btn-lg">
    //       Start with &ldquo;A New Hope&rdquo;
    //     </Link>
    //   )}
    //   <img
    //     className="mt-3 mb-5 w-100"
    //     alt="StarWars.ly"
    //     src="https://vignette.wikia.nocookie.net/starwars/images/c/cc/Star-wars-logo-new-tall.jpg"
    //   />
    // </>
  );
}

export default HomePage;
