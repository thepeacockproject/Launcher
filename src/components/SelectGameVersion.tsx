import * as React from "react"

function LabelledOption(props: {
    name: string
    group: string
    getSet: [string, React.Dispatch<string>]
}) {
    return (
        <label className="hover:text-neutral-300">
            <input
                type="radio"
                name={props.group}
                onChange={() => props.getSet[1](props.name)}
                checked={props.getSet[0] === props.name}
            />
            {` ${props.name}`}
        </label>
    )
}

export default function SelectGameVersion() {
    const [version, setVersion] = React.useState<string | undefined>(undefined)
    const [platform, setPlatform] = React.useState<string | undefined>(
        undefined
    )

    // const invalidConditions = [
    //     () => version === undefined,
    //     () => platform === undefined,
    //     () => version === "H2" && platform === "Epic",
    // ]
    //
    // const valid = React.useMemo(
    //     () => !invalidConditions.some((condition) => condition()),
    //     [version, platform]
    // )

    return (
        <form className="bg-zinc-700 text-white flex gap-8 rounded p-4">
            <div>
                <h2 className="text-2xl">
                    Please select your preferred game version
                </h2>
                <i>You can change this later in the Settings page.</i>
            </div>

            <div>
                <LabelledOption
                    group="game-version"
                    name="HITMAN&trade; 3"
                    getSet={[version!, setVersion]}
                />
                <br />
                <LabelledOption
                    group="game-version"
                    name="HITMAN&trade; 2"
                    getSet={[version!, setVersion]}
                />
                <br />
                <LabelledOption
                    group="game-version"
                    name="HITMAN&trade; (2016)"
                    getSet={[version!, setVersion]}
                />
            </div>

            <div>
                <LabelledOption
                    name="Epic"
                    group="provider"
                    getSet={[platform!, setPlatform]}
                />
                <br />
                <LabelledOption
                    name="Steam"
                    group="provider"
                    getSet={[platform!, setPlatform]}
                />
            </div>
        </form>
    )
}
