import * as React from "react"
import ansiHTML from "ansi-html-community"
import { invoke } from "@tauri-apps/api/tauri"
import "../styles/logs.css"
import { UpdateDispatchingArray } from "../UpdateDispatchingArray"

export interface LogsPanelProps {
    logs: UpdateDispatchingArray<string>
}

export default function LogsPanel(props: LogsPanelProps) {
    return (
        <div>
            <button onClick={() => invoke("launch_test")}>
                Launch the thing
            </button>
            <div className="panel-heading">Logs</div>
            <div>
                <div className="log-group">
                    {props.logs.map((log, i) => {
                        return (
                            <code
                                className="log-line log-line-item"
                                key={i}
                                dangerouslySetInnerHTML={{
                                    __html: ansiHTML(log),
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
