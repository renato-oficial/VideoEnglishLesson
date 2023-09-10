const updateUser = (payload, dispatch, type) => {
    dispatch({
        type: type,
        payload: payload
    })
}

export default updateUser