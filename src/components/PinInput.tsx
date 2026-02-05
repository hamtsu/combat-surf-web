import React, { useState, useEffect, useRef, FC } from "react";

interface PinInputProps {
  handleSubmit: (pin: string) => void;
  inputDisabled?: boolean;
}

const PinInput: FC<PinInputProps> = ({ handleSubmit, inputDisabled }) => {
  const [pin, setPin] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPin = pin.split("");
      newPin[index] = value;
      setPin(newPin.join(""));

      if (value) {
        if (index < 8) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !pin[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (index === 8) {
      handleSubmit(pin);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (inputDisabled) return;
    e.preventDefault();
    const cleanedText = e.clipboardData.getData("text").replace(/\D/g, "");
    setPin(cleanedText.slice(0, 9));
    handleSubmit(cleanedText.slice(0, 9));
  };

  return (
    <div className="flex justify-center">
      {Array.from({ length: 9 }, (_, index) => (
        <div key={index}>
          {index === 0 ? null : index % 3 === 0 ? (
            <span className="w-1 md:w-4 bg-stone-500 rounded-md h-1 my-auto ml-1 md:ml-2 mx-auto" />
          ) : null}
          <input
            type="text"
            disabled={inputDisabled}
            maxLength={1}
            value={pin[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={`${inputDisabled ? "opacity-50 cursor-not-allowed" : ""} w-8 h-8 md:w-12 md:h-12 ml-2 text-xl text-center text-stone-200 font-bold bg-stone-800 rounded-md`}
          />
        </div>
      ))}
    </div>
  );
};

export default PinInput;
