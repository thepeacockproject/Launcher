import * as React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <section>
            <div>{children}</div>
        </section>
    )
}
