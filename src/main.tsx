import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/style.css"
import "./styles/bulma-excerpts.css"
import { createHashRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
// import { invoke } from "@tauri-apps/api/tauri"
import Intro from "./pages/setupPhase/Intro"
import PickGameVersion from "./pages/setupPhase/PickGameVersion"
import TestingPanel from "./pages/TestingPanel"

export const enum Routes {
    Home = "/",
    SetupIntro = "/setup/intro",
    SetupGameVersion = "/setup/game-version",
    TestingPanel = "/testing-panel",
}

const router = createHashRouter([
    {
        path: Routes.Home,
        element: <HomePage />,
    },
    {
        path: Routes.SetupIntro,
        element: <Intro />,
    },
    {
        path: Routes.SetupGameVersion,
        element: <PickGameVersion />,
    },
    {
        path: Routes.TestingPanel,
        element: <TestingPanel />,
    },
])

// function App() {
//     const [isFirstTime, setIsFirstTime] = React.useState<boolean | undefined>(
//         undefined
//     )
//
//     async function checkFirstTime() {
//         const isFirstTime = await invoke<boolean>("is_first_time")
//         setIsFirstTime(isFirstTime)
//     }
//
//     React.useEffect(() => {
//         // ensure we only check once
//         if (isFirstTime === undefined) {
//             checkFirstTime()
//                 .then(() => console.log("First time check complete"))
//                 .catch((err) => console.error("First time check failed", err))
//         }
//     }, [isFirstTime])
//
//     // if (isFirstTime === true) {
//     // return <HomePage />
//     // return <FirstTimeSetupPage />
//     // }
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
