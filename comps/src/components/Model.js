import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

function Modal({ children, onClose, actionBar }) {
  const handleClick = (e) => {
    if (e.target.className.includes('grayArea')) {
      onClose();
    }
  };


  useEffect(() => {

    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };

  }, []);

  return ReactDOM.createPortal(
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 w-screen h-screen bg-slate-500 opacity-95 z-10 flex justify-center items-center grayArea "
    >
      <div className="  bg-white border flex flex-col justify-center items-center h-fit w-fit p-10 m-4 ">
        {children}

        {actionBar}
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;
