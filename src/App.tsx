import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"

function App() {
    async function getCock() {
        const cock = await invoke("download_version", { version: "1.16.5" })
        console.log(cock)
    }

    return (
        <div className="container">
            <h1>The Peacock Project</h1>

            <div className="row">
                <div>
                    <button type="button" onClick={() => getCock()}>
                        Start Peacock
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
