import * as React from "react"

function LabelOption(props: {
    name: string
    group: string
    getSet: [string, React.Dispatch<string>]
}) {
    return (
        <label className="radio">
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
        <form className="box">
            <p className="title">Please select your preferred game version</p>
            <p>
                <i>(You can change this later in settings)</i>
            </p>

            <div className="field">
                <div className="control">
                    <LabelOption
                        name="Epic"
                        group="provider"
                        getSet={[platform!, setPlatform]}
                    />
                    <LabelOption
                        name="Steam"
                        group="provider"
                        getSet={[platform!, setPlatform]}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <LabelOption
                        group="game-version"
                        name="HITMAN&trade; 3"
                        getSet={[version!, setVersion]}
                    />
                    <LabelOption
                        group="game-version"
                        name="HITMAN&trade; 2"
                        getSet={[version!, setVersion]}
                    />
                    <LabelOption
                        group="game-version"
                        name="HITMAN&trade; (2016)"
                        getSet={[version!, setVersion]}
                    />
                </div>
            </div>
        </form>
    )
}
