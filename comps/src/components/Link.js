import classNames from 'classnames';
import useNavigation from '../hooks/useNavigation';


function Link({ children, to, className, ...rest}) {


    const {navigate} = useNavigation();
    const handleClick = (e) => {
        if(e.ctlKey || e.metaKey || e.altKey || e.shiftKey) {
            return;
        }

        e.preventDefault();
        navigate(to);
    }


    const finalClassName = classNames(
        'text-blue-500 hover:text-blue-700 active:text-purple-800 focus:text-purple-800 p-2 rounded-md border m-1',
        className
    );


    return (
        <a onClick={handleClick} className={finalClassName} {...rest} >
            {children}
        </a>
    )
}

export default Link;



