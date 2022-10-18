//import propTypes from 'prop-types';
import Button from './Button.js';
const Header = ({ title, showTasks, btnContent, onclick, addFormBtnContent }) => {
    return (
            <header className='header'>
                <h1> {title} </h1>
                <div style={{float:'right'}}>
                    <Button content={addFormBtnContent?"Close":"Add"} color={addFormBtnContent?"Red":"Green"} onclick={onclick} />
                    <Button content={btnContent} color="Green" onclick={showTasks} />
                </div>
            </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
}

// Header.propTypes = {
//     title: propTypes.string.isRequired
// }

export default Header