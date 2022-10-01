import Layout from "../../Layout"
import * as React from "react"
import { Phase, SetupCommonProps } from "../FirstTimeSetupPage"
import "./../../styles/intro.css"

export default function Intro(props: SetupCommonProps) {
    return (
        <Layout>
            <section className="hero-body">
                <h1 className="title launcher-text">Peacock Launcher</h1>

                {/*{IS_DEVELOPMENT && (*/}
                {/*    <button onClick={() => props.setPhase(Phase.Testing)}>*/}
                {/*        Secret testing page*/}
                {/*    </button>*/}
                {/*)}*/}

                <div className="container middle-child has-text-centered">
                    <div>
                        <p className="title welcome-text">
                            Welcome, let's get started!
                        </p>
                    </div>
                </div>

                <div className="container has-text-centered">
                    <button
                        type="button"
                        className="button is-primary begin-button"
                        onClick={() => props.setPhase(Phase.PickGameVersion)}
                    >
                        Begin Setup
                    </button>
                </div>
            </section>
        </Layout>
    )
}
