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
        
);
}

export default ActualAvatar;
