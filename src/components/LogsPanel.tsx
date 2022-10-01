import * as React from "react"
import ansiHTML from "ansi-html-community"
import { listen } from "@tauri-apps/api/event"
import { invoke } from "@tauri-apps/api/tauri"

export default function LogsPanel() {
    const [logs, setLogs] = React.useState<string[]>([])

    React.useEffect(() => {
        listen<string>("log_message", (log) => {
            setLogs((logs) => [...logs, log.payload])
        })
            .then(() => void 0)
            .catch((e) => console.error(e))
    })

    return (
        <div className="panel panel-default">
            <button onClick={() => invoke("launch_test")}>
                Launch the thing
            </button>
            <div className="panel-heading">Logs</div>
            <div className="panel-body">
                <ul className="list-group">
                    {logs.map((log, i) => (
                        <li
                            key={i}
                            className="list-group-item"
                            dangerouslySetInnerHTML={{ __html: ansiHTML(log) }}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}
