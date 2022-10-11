import "../styles/logs.css"

import * as React from "react"

import Convert from "ansi-to-html"
import { UpdateDispatchingArray } from "../UpdateDispatchingArray"

const convert = new Convert({
    colors: {
        0: "#FFF",
        1: "#A00",
        2: "#0A0",
        3: "#A50",
        4: "#5959ff",
        5: "#A0A",
        6: "#0AA",
        7: "#AAA",
        8: "#6b6b6b",
        9: "#F55",
        10: "#5F5",
        11: "#FF5",
        12: "#55F",
        13: "#F5F",
        14: "#5FF",
        15: "#AAA",
    },
    fg: "#FFF",
})

export interface LogsPanelProps {
    logs: UpdateDispatchingArray<string>
}

export default function LogsPanel(props: LogsPanelProps) {
    return (
        <div>
            <h2 className="text-3xl text-white mb-2">Logs</h2>
            <div>
                <div className="log-group">
                    {props.logs.map((log, i) => {
                        return (
                            <code
                                className="log-line log-line-item"
                                key={i}
                                dangerouslySetInnerHTML={{
                                    __html: convert.toHtml(`\x1b[30m${log}`),
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
