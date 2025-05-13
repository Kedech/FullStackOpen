import Button from "./Button"

const Content = ({textArray, setFunctions, values}) => {
    return (
        <div>            
        {
            textArray.map((type, index) => (<Button key={type} text={type} onClick={() => setFunctions[index](values[index] + 1)}/>))
        }                  
        </div>
    )
}

export default Content