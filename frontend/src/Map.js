import React, { useEffect } from 'react';
import KakaoMapScript from "./KakaoMapScript";

export default function Map({ lat, lng}) {

    useEffect(() => {
        KakaoMapScript(lat, lng);
    }, [lat, lng]);

    return (
        <div id='myMap' className="myMap" style={{
            width: '70vw',
            height: '70vh',
            margin : '0 auto',
        }}></div>
    );
}
