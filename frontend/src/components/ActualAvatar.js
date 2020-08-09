import React, { useEffect } from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import './ActualAvatar.css'
function ActualAvatar({chosenAvatar}) {

    return (
        <div className='theRealAvatar'>
            <Image id='left_arm' cloudName="dreamsprawl" publicId={chosenAvatar['left_arm']}></Image>
            <Image id='torso' cloudName="dreamsprawl" publicId={chosenAvatar['torso']}></Image>
            <Image id='legs' cloudName="dreamsprawl" publicId={chosenAvatar['legs']}></Image>
            <Image id='head' cloudName="dreamsprawl" publicId={chosenAvatar['head']}></Image>
            <Image id='right_arm' cloudName="dreamsprawl" publicId={chosenAvatar['right_arm']}></Image>
        </div>
    // return (
    //     <div className='theRealAvatar'>
    //         <Image id='left-arm' cloudName="dreamsprawl" publicId={chosenAvatar['Left Arm']}></Image>
    //         <Image id='torso' cloudName="dreamsprawl" publicId={chosenAvatar['Torso']}></Image>
    //         <Image id='legs' cloudName="dreamsprawl" publicId={chosenAvatar['Legs']}></Image>
    //         <Image id='head' cloudName="dreamsprawl" publicId={chosenAvatar['Head']}></Image>
    //         <Image id='right-arm' cloudName="dreamsprawl" publicId={chosenAvatar['Right Arm']}></Image>
    //     </div>
        
);
}

export default ActualAvatar;
