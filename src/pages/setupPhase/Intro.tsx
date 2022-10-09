import * as React from "react"

import Button from "../../components/Button"
import Layout from "../../Layout"
import { useNavigate } from "react-router"
import { Routes } from "../../main"

export default function Intro() {
    const nav = useNavigate()

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center gap-4 h-full">
                <div>
                    <h1 className="text-white text-center text-4xl mb-2">
                        Peacock Launcher
                    </h1>

                    <p className="text-white text-center">
                        Welcome, let's get started!
                    </p>
                </div>

                <Button
                    kind="primary"
                    onClick={() => nav(Routes.SetupGameVersion)}
                >
                    Begin Setup
                </Button>

                {IS_DEVELOPMENT && (
                    <div>
                        <Button
                            kind="secondary"
                            onClick={() => nav(Routes.TestingPanel)}
                        >
                            Secret testing page
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    )
}
