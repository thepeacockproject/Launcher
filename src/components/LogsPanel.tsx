import * as React from "react"
import "../styles/logs.css"
import { UpdateDispatchingArray } from "../UpdateDispatchingArray"
import Convert from "ansi-to-html"

const convert = new Convert({
    colors: {
        0: "#FFF",
        // dark gray
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
            <div className="title">Logs</div>
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
