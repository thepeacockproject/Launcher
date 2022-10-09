import "../styles/homepage.css"

import * as React from "react"

import Button from "../components/Button"
import Layout from "../Layout"

// @ts-expect-error Untyped asset
import roadmap from "../assets/images/roadmap.png"
import { useNavigate } from "react-router"
import { Routes } from "../main"

export default function HomePage() {
    const nav = useNavigate()

    return (
        <Layout>
            <section>
                <div>
                    {/* TODO: change to tailwind styles */}
                    <div className="container has-text-centered">
                        <div>
                            <img className="roadmap" src={roadmap} alt="" />
                            {/*<p>Placeholder page</p>*/}
                            <div className="button-wrapper">
                                <Button
                                    kind="secondary"
                                    onClick={() => nav(Routes.SetupIntro)}
                                >
                                    Menu
                                </Button>
                                <Button kind="primary">Start Peacock</Button>
                                <Button kind="secondary">v6.9.0</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
