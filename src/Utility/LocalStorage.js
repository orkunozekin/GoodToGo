export default {


    addToLocalStorage: (name, value) => {
        window.localStorage.setItem(name, value)
    },

    getFromLocalStorage: (name) => {
        return window.localStorage.getItem(name)
    },

    deleteFromLocalStorage(name) {
        localStorage.removeItem(name)
    }


}