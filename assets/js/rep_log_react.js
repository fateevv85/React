import React from 'react';
import { createRoot } from 'react-dom/client';

const el = <h2>
    Lift Stuff!
    <span>'❤️'</span>
    <span>'another one️'</span>
</h2>

createRoot(document.getElementById('lift-stuff-app')).render(el);

console.log(el);