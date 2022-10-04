import { SetupCommonProps } from "../FirstTimeSetupPage"
import Layout from "../../Layout"
import * as React from "react"
import SelectGameVersion from "../../components/SelectGameVersion"

export default function PickGameVersion(props: SetupCommonProps) {
    return (
        <Layout>
            <h1 className="text-white p-4 text-center text-4xl">
                Peacock Launcher
            </h1>

            <SelectGameVersion />

            <div className="text-center">
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
