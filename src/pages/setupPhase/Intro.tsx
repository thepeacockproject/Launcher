import Layout from "../../Layout"
import * as React from "react"
import { Phase, SetupCommonProps } from "../FirstTimeSetupPage"

export default function Intro(props: SetupCommonProps) {
    return (
        <Layout>
            <section className="hero-body">
                <h1 className="title">Peacock Launcher</h1>

                <div className="container middle-child has-text-centered">
                    <div>
                        <p className="title">Welcome, let's get started!</p>
                    </div>
                </div>

                <div className="container has-text-centered">
                    <button
                        type="button"
                        className="button is-primary"
                        onClick={() => props.setPhase(Phase.PickGameVersion)}
                    >
                        Begin Setup
                    </button>
                </div>
            </section>
        </Layout>
    )
}
