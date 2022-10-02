class NotImplementedError extends Error {
    constructor(methodName: string) {
        super(`Not implemented: ${methodName}`)
    }
}

export class UpdateDispatchingArray<T> extends Array<T> {
    dispatchUpdate = () => undefined

    override push(...items: T[]): number {
        const result = super.push(...items)

        this.dispatchUpdate()

        return result
    }

    override pop(): T | undefined {
        const result = super.pop()

        this.dispatchUpdate()

        return result
    }

    override shift(): T | undefined {
        throw new NotImplementedError("shift")
    }

    override unshift(): number {
        throw new NotImplementedError("unshift")
    }

    override splice(): T[] {
        throw new NotImplementedError("splice")
    }

    override sort(compareFn?: (a: T, b: T) => number): this {
        return super.sort(compareFn)
    }

    override reverse(): this {
        throw new NotImplementedError("reverse")
    }

    override fill(): this {
        throw new NotImplementedError("fill")
    }

    override copyWithin(): this {
        throw new NotImplementedError("copyWithin")
    }

    override map<NewType>(
        callbackFn: (value: T, index: number, array: T[]) => NewType,
        thisArg?: never
    ): NewType[] {
        return super.map(callbackFn, thisArg)
    }
}
