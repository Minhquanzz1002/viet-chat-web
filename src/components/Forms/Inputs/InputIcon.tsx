import React from "react";
interface InputIconProps {
    children: React.ReactNode;
    placeholder: string;
    type: "text" | "tel" | "password";
    autoComplete?: "current-password" | "tel" | "off" | "new-password"
    id: string;
    value: string | number | readonly string[] | undefined;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    ref?: React.RefObject<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}
const InputIcon = ({children, placeholder, type = "text", autoComplete, id, onChange, value, name, onBlur, ref, onKeyDown} : InputIconProps) => {
    return (
        <div className="relative border-b-2 mb-5 pb-2">
            <div className="pointer-events-none absolute left-0 top-0 flex items-center pl-3">
                {children}
            </div>
            <input onKeyDown={onKeyDown} ref={ref} value={value} onChange={onChange} type={type} onBlur={onBlur} name={name} id={id} autoComplete={autoComplete} className="w-full block appearance-none outline-none pl-10 text-sm disable" placeholder={placeholder}/>
        </div>
    );
};

export default InputIcon;