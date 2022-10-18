import propTypes from 'prop-types';
const Button = ({color,content,onclick}) => {
    
    return (
        <button onClick={()=>onclick()} style={{backgroundColor:color}} className="btn">
           {content}
        </button>
    )
}
Button.propTypes = {
    content: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
    onclick: propTypes.func.isRequired,
}

export default Button
