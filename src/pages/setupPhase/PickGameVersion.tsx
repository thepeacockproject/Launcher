import { SetupCommonProps } from "../FirstTimeSetupPage"
import Layout from "../../Layout"
import * as React from "react"
import "../../styles/gameVersion.css"
import SelectGameVersion from "../../components/SelectGameVersion"

export default function PickGameVersion(props: SetupCommonProps) {
    return (
        <Layout>
            <h1 className="text-white p-4 text-center text-4xl launcher-text">
                Peacock Launcher
            </h1>

            <div className="game-version">
                <SelectGameVersion />
            </div>

            <div className="text-center next-button-wrapper">
                <button
                    type="button"
                    className="rounded bg-green-600 text-white pt-1 pb-1 pl-2 pr-2"
                    onClick={() => props.setPhase(null!)}
                >
                    Next
                </button>
            </div>
        </Layout>
    )
}
