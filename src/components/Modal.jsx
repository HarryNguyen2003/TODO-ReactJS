import { createPortal } from 'react-dom';
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });

    return createPortal(
        <dialog
            ref={dialog}
            className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'
        >
            {children}
            <form
                method='dialog'
                className='mt-4 text-right'
            >
                <button className='px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100'>
                    {buttonCaption}
                </button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;
