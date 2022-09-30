import * as React from "react"
import Intro from "./setupPhase/Intro"
import PickGameVersion from "./setupPhase/PickGameVersion"

export const enum Phase {
    Intro,
    PickGameVersion,
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
        default:
            throw new Error("Invalid phase")
    }
}
