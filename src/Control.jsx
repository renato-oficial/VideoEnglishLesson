import UpdatedComponent from "./hoc/UpdatedComponent"


const Control = ({ control }) => {
    console.log(control)
    return (
        <div className="m-2 flex space-x-1">
            <button
                className="px-3 bg-cyan-500"
                type="button"
            >
                Play
            </button>
            <button
                className="px-3 bg-cyan-500"
            >Próximo</button>
        </div>
    )
}


export default UpdatedComponent(Control)