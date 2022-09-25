import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"
import Layout from "./Layout"
import FirstTimeSetupPage from "./FirstTimeSetupPage"

const backendPending: unique symbol = Symbol.for("backendPending")

function App() {
    const [isFirstTime, setIsFirstTime] = React.useState<
        boolean | typeof backendPending
    >(backendPending)

    async function checkFirstTime() {
        const isFirstTime = await invoke<boolean>("is_first_time")
        setIsFirstTime(isFirstTime)
    }

    React.useEffect(() => {
        // ensure we only check once
        if (isFirstTime === backendPending) {
            checkFirstTime()
                .then(() => console.log("First time check complete"))
                .catch((err) => console.error("First time check failed", err))
        }
    }, [isFirstTime])

    async function getCock() {
        const cock = await invoke("download_version", { version: "4.2.1" })
        console.log(cock)
    }

    // TODO: re-enable this check!
    // if (isFirstTime === true) {
    return <FirstTimeSetupPage />
    // }

    return (
        <Layout>
            <section>
                <div className="hero-head">
                    <h1 className="title">Peacock Launcher</h1>
                </div>

                <div>
                    <div className="container has-text-centered">
                        <div>
                            <button
                                type="button"
                                className="button"
                                onClick={() => getCock()}
                            >
                                Start Peacock
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default App
