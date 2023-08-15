import {NavBar} from "./NavBar";
import React from "react";

let miscellanyItems: any = undefined
let error: any = false

function MiscellanyItem(props: {title: string, content: string, image: string, path: string, year: number}) {
    return <div className="miscellany-item">
        <div className="miscellany-item-desc">
            <a href={props.path}><h3>{props.title}</h3></a>
            <p className={"date"}>{props.year}</p>
            <div className="break"></div>
            <p>{props.content}</p>
        </div>
        <div className="separator"></div>
        <div className={"miscellany-item-image"}>
            <img src={props.image} alt={""}/>
        </div>
    </div>
}

export class Miscellany extends React.Component {
    state: {sort: "new" | "old" | "interesting"} = {sort: "new"}

    constructor(props: any) {
        super(props)
        this.setState({sort: "new"})
    }

    setSort(sort: typeof Miscellany.prototype.state.sort) {
        this.setState({sort: sort})
    }

    loadMiscellany () {
        if (!miscellanyItems) {
            fetch("/miscellany/index.json").then(s => s.json())
                .then(s => {
                    miscellanyItems = s
                    this.forceUpdate()
                }).catch(e => error = e)
        }
    }

    render() {
        let sort = this.state.sort

        function sel(x: string) {
            return sort == x ? "sort-item selected" : "sort-item"
        }

        this.loadMiscellany()

        return <div className="App">
            <NavBar selected={1} />

            <div className="misc-wrapper">
                <h2>Miscellany</h2>
                <div className="separator"></div>
                <div className="sort-order">
                    <p>Sort order:</p>
                    <a className={sel("new")} onClick={() => this.setSort("new") }>New</a>
                    <a className={sel("old")} onClick={() => this.setSort("old") }>Old</a>
                    <a className={sel("interesting")} onClick={() => this.setSort("interesting") }>Interesting</a>
                </div>
                <div className="break"></div>
                <div className="miscellany">
                    {error ? <p className={"load-error"}>Failed to load items.</p> : ""}
                    {miscellanyItems ? miscellanyItems.projects.sort((a: any, b: any) => {
                            if (sort == "new") {
                                return b.date - a.date
                            } else if (sort == "old") {
                                return a.date - b.date
                            } else {
                                return b.interest - a.interest
                            }
                        }).map((item: any) => {
                            return <MiscellanyItem title={item.title} content={item.description} image={item.image}
                                                   path={item.path} year={item.year}/>
                        }) :
                        <p className={"load-error"}>Loading...</p>
                    }
                </div>
            </div>
        </div>
    }
}