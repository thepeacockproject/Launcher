import { SetupCommonProps } from "../FirstTimeSetupPage"
import Layout from "../Layout"
import * as React from "react"
import SelectGameVersion from "../components/SelectGameVersion"

export default function PickGameVersion(props: SetupCommonProps) {
    return (
        <Layout>
            <section className="hero-body">
                <h1 className="title">Peacock Launcher</h1>

                <SelectGameVersion />

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
