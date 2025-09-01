import DDoneButton from './DDoneButton';

interface Inputs {
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    successMessage?: string;
    isSuccess?: boolean;
}

const ConfirmationPopUp = ({ message, onConfirm, onCancel, successMessage, isSuccess }: Inputs) => {
    return (
        <div className="confirmation-popup">
            <div className="confirmation-popup-content">
                <p>{isSuccess ? successMessage : message}</p>
                {!isSuccess && (
                    <div className="button-container">
                        <DDoneButton text="Cancel" onClick={() => onCancel && onCancel()} width="100px" />
                        <DDoneButton text="Confirm" onClick={() => onConfirm && onConfirm()} width="100px" />
                    </div>
                )}
            </div>
        </div>
    );
};

export {ConfirmationPopUp}

const InformationPopUp = ({ message, onConfirm}: Inputs) => {
    return (
        <div className="confirmation-popup">
            <div className="confirmation-popup-content">
                <p>{message}</p>
                    <div className="button-container">
                        <DDoneButton text="Got it!" onClick={() => onConfirm && onConfirm()} width="100px" />
                    </div>
            </div>
        </div>
    );
};

export {InformationPopUp}