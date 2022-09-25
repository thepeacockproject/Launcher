import * as React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <nav className="level">
            <div className="level-item has-text-centered">
                <div>{children}</div>
            </div>
        </nav>
    )
}
