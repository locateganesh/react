
export const getData = new Promise((resolve, reject) => {
    if ('localStorage' in window && window['localStorage'] !== null) {
        const data = localStorage.getItem('facts');
        setTimeout(() => {
            if (data) {
                resolve(JSON.parse(data));
            } else {
                resolve([]);
            }
        }, 500);
    } else {
        reject('Something went wrong!')
    }
});

export function setData(data) {
    return (
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if ('localStorage' in window && window['localStorage'] !== null) {
                    const getItem = localStorage.getItem('facts');
                    if (getItem) {
                        const parsedData = JSON.parse(getItem);
                        parsedData.push(data);
                        localStorage.setItem('facts', JSON.stringify(parsedData));
                        resolve(parsedData);
                    } else {
                        localStorage.setItem('facts', JSON.stringify([data]));
                        resolve([data]);
                    }
                } else {
                    reject('Something went wrong!')
                }
            }, 500);
        })
    )
}