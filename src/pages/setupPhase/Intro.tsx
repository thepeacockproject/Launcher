import Layout from "../../Layout"
import * as React from "react"
import { Phase, SetupCommonProps } from "../FirstTimeSetupPage"

export default function Intro(props: SetupCommonProps) {
    return (
        <Layout>
            <h1 className="text-white text-center text-4xl pt-10">
                Peacock Launcher
            </h1>

            <p className="text-white text-center pt-5">
                Welcome, let's get started!
            </p>

            <div className="flex justify-center pt-5">
                <button
                    type="button"
                    className="justify-center bg-green-500 rounded p-2"
                    onClick={() => props.setPhase(Phase.PickGameVersion)}
                >
                    Begin Setup
                </button>
            </div>

            {IS_DEVELOPMENT && (
                <div>
                    <button
                        className="bg-gray-600 text-white rounded p-2"
                        onClick={() => props.setPhase(Phase.Testing)}
                    >
                        Secret testing page
                    </button>
                </div>
            )}
        </Layout>
    )
}
