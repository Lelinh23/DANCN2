const authHeader = (token: any) => ({Authorization: `Bearer ${token}`})

export {authHeader}