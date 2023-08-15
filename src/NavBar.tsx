import React from "react";
import {useNavigate} from "react-router-dom";

export type NavBarSel = {
    selected: 0 | 1 | 2 | 3
}

export function NavBar(props: NavBarSel) {
    let n = useNavigate()
    let nav = (s: string) => () => n(s)

    let s = props.selected
    
    function sel(i: number) {
        return i == s ? "nav-item selected" : "nav-item"
    }
    
    return (
        <div className="App-header">
            <p className="username">anematode</p>
            <div className="separator"></div>
            <div className="header-buttons">
            <p className={sel(0)} onClick={nav("/")}>Home</p>
            <p className={sel(1)} onClick={nav("/miscellany")}>Miscellany</p>
            <p className={sel(2)} onClick={nav("/about")}>About</p>
            </div>
        </div>
    )
}