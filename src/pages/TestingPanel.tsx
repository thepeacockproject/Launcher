import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"
import LogsPanel from "../components/LogsPanel"
import { listen } from "@tauri-apps/api/event"
import { UpdateDispatchingArray } from "../UpdateDispatchingArray"
import Layout from "../Layout"

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
            <section>
                <h1 className="text-center title text-white">Testing Panel</h1>

                <LogsPanel logs={logs} />

                <button
                    className="rounded bg-white p-2"
                    onClick={() => invoke("unzip_test")}
                >
                    Extract from zip
                </button>

                <button
                    className="rounded bg-white p-2"
                    onClick={() => invoke("launch_test")}
                >
                    Launch the thing
                </button>
            </section>
        </Layout>
    )
}
