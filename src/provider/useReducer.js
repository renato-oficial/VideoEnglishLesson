const reducerController = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                ...action.payload
            }

        default:
            throw new Error()
    }
}


export default reducerController