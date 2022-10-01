/// <reference types="vite" />

declare const IS_DEVELOPMENT: boolean

declare module "ansi-html-community" {
    // noinspection JSUnusedGlobalSymbols
    export default function ansiHTML(input: string): string
}
