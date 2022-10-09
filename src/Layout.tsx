import * as React from "react"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <section className="h-full w-full">
            <div className="h-full w-full">{children}</div>
        </section>
    )
}
