export function popRadomElements<T>(selection: T[], count: number): T[] {
    const random = [];
    while (random.length < count) {
        const index = Math.floor(Math.random() * selection.length);
        random.push(selection[index]);
    }
    return random;
}