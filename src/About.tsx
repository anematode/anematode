import React from "react";
import {NavBar} from "./NavBar";

function LinksWrapper(props: { c: string }) {
    return (
    <div className={props.c}>
        <h2>Links</h2>
        <div className="links">
            <a href="https://github.com/anematode"><img className="ext-link" src="github.png" alt="GitHub logo"></img></a>
            <a href="https://youtube.com/gubgubbubbub"><img className="ext-link" src="youtube.png" alt="YouTube logo"></img></a>
        </div>
    </div>
    )
}

export function About() {
    return (
        <div className="App">
            <NavBar selected={2} />

            <div className="about-wrapper">
                <div className="about-desc">
                    <h2>About me</h2>
                    <p>I'm Timothy Herchen, a student at the <a href="https://en.wikipedia.org/wiki/University_of_California,_San_Diego" className="App-link">University of California, San Diego</a> in the Class of 2025, majoring in computer science.<br /><br />

                    I have loved programming, mathematics, music, writing since I was young. I especially love working in any intersections of these interests: most of my personal projects pull from at least two of them. I am adept in C, C++, JavaScript, LaTeX, x86 assembly and TypeScript, and proficient in Python and ARM assembly. My current projects include a disassembly visualizer and an online/desktop graphing calculator.</p>
                    <LinksWrapper c={"link-wrapper link-wrapper-w"} />
                </div>
                <div className="about-img">
                    <img src="headshot.png" alt="Portrait of Timothy Herchen"></img>
                    <p>January 2022 (<a href="https://www.google.com/maps/search/37.3202,+-122.1991">37°19'12.7"N 122°11'56.8"</a>)</p>
                </div>
                <LinksWrapper c={"link-wrapper link-wrapper-n"} />
            </div>
        </div>
    );
}