import * as React from "react"
import { invoke } from "@tauri-apps/api/tauri"
import FirstTimeSetupPage from "./pages/FirstTimeSetupPage"
import HomePage from "./pages/HomePage"

function App() {
    const [isFirstTime, setIsFirstTime] = React.useState<boolean | undefined>(
        undefined
    )

    async function checkFirstTime() {
        const isFirstTime = await invoke<boolean>("is_first_time")
        setIsFirstTime(isFirstTime)
    }

    React.useEffect(() => {
        // ensure we only check once
        if (isFirstTime === undefined) {
            checkFirstTime()
                .then(() => console.log("First time check complete"))
                .catch((err) => console.error("First time check failed", err))
        }
    }, [isFirstTime])

    // TODO: re-enable this check!
    // if (isFirstTime === true) {
    return <FirstTimeSetupPage />
    // }

    return <HomePage />
}

export default App
