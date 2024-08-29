import PropTypes from 'prop-types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

function Button({
  children,
  primary,
  secondary,
  danger,
  success,
  warning,
  outline,
  rounded,
  ...rest
}) {

  const classes = twMerge(
    classNames( rest.className ,'flex items-center justify-center px-3 py-1.5 border ', {
      'border-blue-600 text-white bg-blue-500': primary,
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

  return <button {...rest} className={classes}>{children}</button>;
}

Button.propTypes = {
  checkVariantValue: (props) => {
    console.log(props);
    // only one of primary, secondary, danger, warning, success can be true
    const count =
      Number(!!props.primary) +
      Number(!!props.secondary) +
      Number(!!props.danger) +
      Number(!!props.warning) +
      Number(!!props.success);
    if (count > 1) {
      return new Error(
        'only one of primary, secondary, danger, warning, success can be true'
      );
    }
  },
};

export default Button;
