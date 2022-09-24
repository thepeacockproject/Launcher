import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"

function App() {
    async function getCock() {
        const cock = await invoke("download_version", { version: "1.16.5" })
        console.log(cock)
    }

    return (
        <section className="hero is-large is-info">
            <div className="hero-head">
                <h1 className="title">Peacock Launcher</h1>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <div>
                        <button type="button" className="button" onClick={() => getCock()}>
                            Start Peacock
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default App
