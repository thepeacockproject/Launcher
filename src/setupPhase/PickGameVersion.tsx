import { SetupCommonProps } from "../FirstTimeSetupPage"
import Layout from "../Layout"
import * as React from "react"

export default function PickGameVersion(props: SetupCommonProps) {
    return (
        <Layout>
            <section className="hero-body">
                <h1 className="title">Peacock Launcher</h1>

                <div className="container middle-child has-text-centered">
                    <p className="title">
                        Please select your preferred game version
                    </p>
                    <p className="subtitle">
                        (You can change this later in settings)
                    </p>
                </div>

                <div className="has-text-centered">
                    <button
                        type="button"
                        className="button is-primary"
                        onClick={() => props.setPhase(null!)}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    )
}
