import * as React from "react"
import Layout from "../Layout"
import "./../styles/homepage.css"
// @ts-expect-error Untyped asset
import julyroadmap from "../assets/images/julyroadmap.png"
// @ts-expect-error Untyped asset
import YES_Vikov from "../assets/images/YES_Vikov.png"

// export interface HomePageProps {
//
// }

export default function HomePage() {
    // props: HomePageProps
    return (
        <Layout>
            <section className="hero-body">
                <div className="hero-head">
                    <h1 className="title launcher-text">Peacock Launcher</h1>
                </div>

                <div>
                    <div className="container has-text-centered middle-child">
                        <img
                            className="roadmap"
                            src={julyroadmap}
                            alt="Peacock Roadmap"
                        ></img>
                        <br />
                    </div>
                    <span className="patcherState">
                        <p>Patcher state:</p>
                        {/*<img src={$patcherState}></img>*/}
                        <img src={YES_Vikov}></img>
                    </span>
                    <span className="cockVersion bottom-page-margin">
                        {/*$cockVersion*/}
                        Peacock v.6.9.0
                    </span>
                    <button
                        type="button"
                        className="button launch-button bottom-page-margin"
                    >
                        Start Peacock
                    </button>
                </div>
            </section>
        </Layout>
    )
}
