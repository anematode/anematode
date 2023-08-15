import React from "react";
import {NavBar} from "./NavBar";

export function Home() {
    return (
        <div className="App">
            <NavBar selected={0} />

            <div className="home-wrapper">
                <h2>Posts</h2>

            </div>
        </div>
    );
}