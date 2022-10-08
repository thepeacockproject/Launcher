import * as React from "react"
import Layout from "../Layout"
import "../styles/homepage.css"
// @ts-expect-error Untyped asset
import roadmap from "../assets/images/roadmap.png"

// export interface HomePageProps {
//
// }

export default function HomePage() {
    // props: HomePageProps
    return (
        <Layout>
            <section>
                <div>
                    <div className="container has-text-centered">
                        <div>
                            <img className="roadmap" src={roadmap} alt="" />
                            {/*<p>Placeholder page</p>*/}
                            <div className="button-wrapper">
                                <button
                                    type="button"
                                    className="button margin-button"
                                >
                                    Menu
                                </button>
                                <button
                                    type="button"
                                    className="button margin-button"
                                >
                                    Start Peacock
                                </button>
                                <button
                                    type="button"
                                    className="button launch-button"
                                >
                                    v6.9.0
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
