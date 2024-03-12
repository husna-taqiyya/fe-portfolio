export const delay = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 3000)
});