import React, {useRef} from 'react';

type OTPInputProps = {
    onChangeOTP: (otp: string) => void;
};


const OTPInput = ({onChangeOTP}: OTPInputProps) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const inputs = inputRefs.current;
        const target = event.target as HTMLInputElement;

        if (event.key === 'Backspace') {
            target.value = '';
            if (index !== 0 && inputs[index - 1]) {
                inputs[index - 1]?.focus();
            }
            onInputChange();
        } else if (event.key >= '0' && event.key <= '9') {
            target.value = event.key;
            if (index !== inputs.length - 1 && inputs[index + 1]) {
                inputs[index + 1]?.focus();
            }
            onInputChange();
            event.preventDefault();
        } else if (event.key == 'ArrowLeft' && index > 0) {
            inputs[index - 1]?.focus();
            inputs[index - 1]?.select();
            event.preventDefault();
        } else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
            inputs[index + 1]?.focus();
            inputs[index - 1]?.select();
            event.preventDefault();
        } else {
            event.preventDefault();
        }
    }

    const onInputChange = () => {
        const otp = inputRefs.current.map(input => input.value).join("");
        onChangeOTP(otp);
    };

    return (
        <div id="otp" className="flex flex-row justify-center text-center px-2 mt-2">
            {
                Array.from({length: 6}).map((_, index: number) => (
                    <input key={index} className="m-2 border h-10 w-10 text-center form-control rounded" type="text"
                           ref={(el: HTMLInputElement) => inputRefs.current[index] = el}
                           id={`otp-${index}`}
                           onKeyDown={(event) => handleKeydown(event, index)}
                           maxLength={1}/>
                ))
            }
        </div>
    );
};


export default OTPInput;