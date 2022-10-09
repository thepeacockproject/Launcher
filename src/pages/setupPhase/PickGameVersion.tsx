import * as React from "react"

import Button from "../../components/Button"
import Layout from "../../Layout"
import SelectGameVersion from "../../components/SelectGameVersion"
import { useNavigate } from "react-router"
import { Routes } from "../../main"

export default function PickGameVersion() {
    const nav = useNavigate()

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center gap-4 h-full">
                <h1 className="text-white text-center text-4xl">
                    Peacock Launcher
                </h1>

                <SelectGameVersion />

                <Button kind="primary" onClick={() => nav(Routes.Home)}>
                    Next
                </Button>
            </div>
        </Layout>
    )
}
