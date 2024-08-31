
import classNames from 'classnames';

function Panel({ children ,className, ...rest}) {

    const finalClassName = classNames(
        'border rounded p-3 w-full bg-white shadow-md',
        className
    );
    console.log(finalClassName,rest);
    return (
        <div className={finalClassName} {...rest} >
            {children}
        </div>
    )
}

export default Panel;