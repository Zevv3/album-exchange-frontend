let token = localStorage.getItem('userId')

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async (data:any) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },

    update: async (token:any, id:string, data:any = {}) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    },

    getOne: async (token:any, id:string) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums/${token}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    delete: async (id:string) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    review: async (token:any, id:string, data:any) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/albums/review/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    sendToExchange: async (token:any, data:any) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/exchange/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create new data on server')
        }
        return await response.json()
    },

    getExchange: async () => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/exchange`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        console.log(response)
        return await response.json()
    },

    reviewExchange: async (token:any, id:string, data:any) => {
        // I definitely want the token and id here, I'll want to check that the token matches the one given to the album 
        // during the exchange randomization
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/exchange/review/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    startExchange: async (token:any) => {
        const response = await fetch(`https://yummy-charming-promise.glitch.me/api/exchange/review/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    }
};