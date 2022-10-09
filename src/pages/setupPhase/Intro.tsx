import * as React from "react"

import { Phase, SetupCommonProps } from "../FirstTimeSetupPage"

import Button from "../../components/Button"
import Layout from "../../Layout"

export default function Intro(props: SetupCommonProps) {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center gap-4 h-full">
                <div>
                    <h1 className="text-white text-center text-4xl mb-2">
                        Peacock Launcher
                    </h1>

                    <p className="text-white text-center">
                        Welcome, let's get started!
                    </p>
                </div>

                <Button kind="primary" onClick={() => props.setPhase(Phase.PickGameVersion)}>Begin Setup</Button>

                {IS_DEVELOPMENT && (
                    <div>
                        <Button kind="secondary"
                            onClick={() => props.setPhase(Phase.Testing)}
                        >
                            Secret testing page
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    )
}
