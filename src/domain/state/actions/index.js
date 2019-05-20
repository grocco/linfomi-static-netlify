//import store from 'domain/state/store';

export const actionFunctions = {
    HIDE_MODAL: () => {
        return (dispatch, getState) => {
            dispatch(hideModal())
        }
    },
    SOMETHING_USING_ACTION_FUNCTIONS: () => {
        const someParameter = "someValue";
        return actionFunctions['ACTION_FUNCTION_NAME'](someParameter);
    }
}


export const showModal = ( args ) => ({
    type: 'SHOW_MODAL',
    name: args.name,
    args
})

export const hideModal = () => ({
    type: 'HIDE_MODAL'
})


export const screenResize = (width, height) => ({
    type: "SCREEN_RESIZE",
    width,
    height
})

export const setWord = (word) => ({
    type: "SET_WORD",
    word
})

export const changeLanguage = (language) => ({
    type: "CHANGE_LANGUAGE",
    language
})

export const changePage = (page) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        dispatch({
            type: "CHANGE_PAGE",
            page
        });
        resolve();
    })
}

export const toggleHamburger = () => ({
    type: "TOGGLE_HAMBURGER"
})

export const changeMenu = (menu) => ({
    type: "CHANGE_MENU",
    menu
})