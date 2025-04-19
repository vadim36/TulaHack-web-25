export type Maybe<T> = {
    ok: boolean,
    res?: T
}

export async function handleErr<T>(cb: (...args: any[]) => Promise<T>): Promise<Maybe<T>> {
    try {
        const res = await cb();
        return { ok: true, res }
    } catch (err) {
        console.log(err);
        return { ok: false }
    }
}