import * as React from "react"

export interface ButtonProps {
    kind: "primary" | "secondary" | "danger"
    disabled?: boolean
    styles?: string
    children: React.ReactNode
    onClick?: () => void
}

export default function Button(props: ButtonProps) {
    return (
        <button
            type="button"
            className={
                "p-2 rounded " +
                props.styles +
                (props.disabled
                    ? "bg-gray-600 text-white"
                    : props.kind === "primary"
                    ? " bg-green-500 text-white"
                    : props.kind === "secondary"
                    ? " bg-blue-500 text-white"
                    : props.kind === "danger"
                    ? " bg-red-500 text-white"
                    : "")
            }
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
