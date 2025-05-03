
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Button({children,
    to,
    primary,
    secondary,
    danger,
    success,
    warning,
    outline,
    rounded,
    onClick,
    ...rest}:{children:ReactNode,to:string,primary?:boolean,secondary?:boolean,danger?:boolean,success?:boolean,warning?:boolean,outline?:boolean,rounded?:boolean,onClick?:() =>void}) {

    const classes = twMerge(
        classNames( rest.className ,'flex items-center justify-center px-3 py-1.5 border ', {
          'border-blue-600 text-white bg-blue-500 hover:bg-blue-700': primary,
          'border-gray-900 text-white bg-gray-900': secondary,
          'border-red-500 text-white bg-red-500': danger,
          'border-yellow-400 text-white bg-yellow-400': warning,
          'border-green-600 text-white bg-green-500': success,
          'bg-white': outline,
          'rounded-full': rounded,
          'text-blue-500': outline && primary,
          'text-gray-900': outline && secondary,
          'text-red-500': outline && danger,
          'text-yellow-400': outline && warning,
          'text-green-500': outline && success,
        })
      );


    return (
        <Link to={to} className={classes} onClick={onClick}>
            {children}
        </Link>
    );
}