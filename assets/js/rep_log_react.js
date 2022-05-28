import React from 'react';
import {createRoot} from 'react-dom/client';
import RepLogApp from "./RepLog/RepLogApp";

const shouldShowHeart = true;

createRoot(document.getElementById('lift-stuff-app')).render(
    <div>
        <RepLogApp withHeart={shouldShowHeart}/>
    </div>
);

console.log(<RepLogApp/>);
