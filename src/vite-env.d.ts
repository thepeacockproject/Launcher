/// <reference types="vite" />

declare const IS_DEVELOPMENT: boolean

declare module "ansi-html-community" {
    // noinspection JSUnusedGlobalSymbols
    export default function ansiHTML(input: string): string

    interface Colors {
        [name: string]: string | [string, string]
    }

    export function setColors(colors: Colors): void
}
