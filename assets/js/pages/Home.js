import React from "react";
import LinkButton from "../components/LinkButton";

function Home() {
    return (
        <div>
            <div>Home Page</div>
            <ul>
                <li>
                    <LinkButton to={'/replogs'} name={'Rep logs'}/>
                </li>
            </ul>
        </div>
    );
}

export default Home;
