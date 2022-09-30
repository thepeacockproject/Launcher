import * as React from "react"
import Layout from "../Layout"

// export interface HomePageProps {
//
// }

export default function HomePage() {
    // props: HomePageProps
    return (
        <Layout>
            <section>
                <div className="hero-head">
                    <h1 className="title">Peacock Launcher</h1>
                </div>

                <div>
                    <div className="container has-text-centered">
                        <div>
                            <p>Placeholder page</p>
                            <button type="button" className="button">
                                Start Peacock
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
