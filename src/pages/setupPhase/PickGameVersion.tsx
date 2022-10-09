import * as React from "react"

import Button from "../../components/Button"
import Layout from "../../Layout"
import SelectGameVersion from "../../components/SelectGameVersion"
import { SetupCommonProps } from "../FirstTimeSetupPage"

export default function PickGameVersion(props: SetupCommonProps) {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center gap-4 h-full">
                <h1 className="text-white text-center text-4xl">
                    Peacock Launcher
                </h1>

                <SelectGameVersion />

                {/* TODO: go to homepage */}
                <Button kind="primary" onClick={() => props.setPhase(null!)}>
                    Next
                </Button>
            </div>
        </Layout>
    )
}
