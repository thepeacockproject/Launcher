import * as React from "react"
import Intro from "./setupPhase/Intro"
import PickGameVersion from "./setupPhase/PickGameVersion"
import TestingPanel from "./TestingPanel"

export const enum Phase {
    Intro,
    PickGameVersion,
    Testing,
}

export interface SetupCommonProps {
    setPhase: React.Dispatch<Phase>
}

export default function FirstTimeSetupPage() {
    const [phase, setPhase] = React.useState<Phase>(Phase.Intro)

    switch (phase) {
        case Phase.Intro:
            return <Intro setPhase={setPhase} />
        case Phase.PickGameVersion:
            return <PickGameVersion setPhase={setPhase} />
        case Phase.Testing:
            if (!IS_DEVELOPMENT) {
                console.error(
                    "Testing phase should only be available in development"
                )
                return null
            }

            return <TestingPanel />
        default:
            throw new Error("Invalid phase")
    }
}
