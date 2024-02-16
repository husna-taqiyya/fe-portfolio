export const joierror = (error) => {
    const data = {};
    for (const e of error.details) {
        const key = e.context.key;
        const message = e.message;
        data[key] = message;
    }

    return data;
}