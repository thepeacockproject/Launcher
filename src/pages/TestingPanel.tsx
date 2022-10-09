import * as React from "react"

import Button from "../components/Button"
import Layout from "../Layout"
import LogsPanel from "../components/LogsPanel"
import { UpdateDispatchingArray } from "../UpdateDispatchingArray"
import { invoke } from "@tauri-apps/api/tauri"
import { listen } from "@tauri-apps/api/event"

/**
 * The logs.
 *
 * This is a global variable because we need to hack around React's state system.
 */
const logs = new UpdateDispatchingArray<string>()

listen<string>("log_message", (log) => {
    logs.push(log.payload)
})
    .then(() => console.log("Successfully registered log_message listener"))
    .catch((e) => console.error(e))

/**
 * This is a panel used for testing code within the launcher.
 * It is not be included in production.
 */
export default function TestingPanel() {
    const [, setInvalidator] = React.useState(0)

    logs.dispatchUpdate = () => {
        setInvalidator(Math.random() * Math.random())
        return undefined
    }

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-center text-4xl text-white">
                    Testing Panel
                </h1>

                <LogsPanel logs={logs} />
                <br />

                <div className="flex gap-2">
                    <Button kind="primary" onClick={() => invoke("unzip_test")}>
                        Extract from zip
                    </Button>

                    <Button
                        kind="primary"
                        onClick={() => invoke("launch_test")}
                    >
                        Launch the thing
                    </Button>
                </div>
            </div>
        </Layout>
    )
}
