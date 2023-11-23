import AsyncStorage from "@react-native-async-storage/async-storage";

const setLanDauUse = () => {
    AsyncStorage.setItem('isLanDauUse', 'true')
}

const getLanDauUse = () => {
    return AsyncStorage.getItem('isLanDauUse')
}

const setToken = (token: string) => {
    AsyncStorage.setItem('token', token)
}

const getToken = () => {
    return AsyncStorage.getItem('token')
}

export {setLanDauUse, getLanDauUse, setToken, getToken}