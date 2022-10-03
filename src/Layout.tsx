import * as React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <nav>
            <div>{children}</div>
        </nav>
    )
}
