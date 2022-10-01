import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"
import LogsPanel from "../components/LogsPanel"

/**
 * This is a panel used for testing code within the launcher.
 * It is not be included in production.
 */
export default function TestingPanel() {
    return (
        <div>
            <h1>Testing Panel</h1>

            <LogsPanel />

            <button onClick={() => invoke("unzip_test")}>
                Extract from zip
            </button>
        </div>
    )
}
