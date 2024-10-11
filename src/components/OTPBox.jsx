import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function OTPBox() {
    const [otp, setotp] = useState(new Array(4).fill(""));
    const [isButtonDisabled, setisButtonDisabled] = useState(true);
    const inputRef = useRef([]);

    // When the page reload, first input box will be focused
    useEffect(() => {
      if(inputRef.current[0]){
        inputRef.current[0].focus();
      };
    }, [])
    
    const handleInputChange = (e, index) => {
        const val = e.target.value;
      
        // Allow clearing input
        if (val === "" || Number(val)) {
          // Update OTP state
          const newOTP = [...otp];
          newOTP[index] = val;
          setotp(newOTP);
            
            // Check if all fields are filled
      if (newOTP.every(value => value !== "")) {
        setisButtonDisabled(false);  // Enable the button when all fields are filled
      } else {
        setisButtonDisabled(true);  // Disable the button if any field is empty
      }

          // Submit trigger
          const combinedOTP = newOTP.join("");
          console.log(combinedOTP);
    
          if (index === otp.length - 1 && val) {
            alert(`OTP entered: ${newOTP.join('')}`);
          }

          
          // Move to the next input if current index is filled
          if (val && index < otp.length - 1 && inputRef.current[index + 1]) {
            inputRef.current[index + 1].focus();
          }
        }
      };
      

    const handleKeyDown = (e,index) =>{
        if(e.key === "Backspace" && !otp[index] && index>0 && inputRef.current[index-1] ){
            inputRef.current[index-1].focus();
        }
    }

  return (
       <div className="h-screen w-full flex justify-center items-center">
        <form id="otp-form">
        <p className="text-[15px] text-slate-500 mb-10 text-center">Enter the 4-digit verification code that was sent to your phone number.</p>
                        <div className="flex items-center justify-center gap-3">
                        {otp.map((value,index)=>(
                        <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e)=>handleInputChange(e,index)}
                            onKeyDown={(e)=>handleKeyDown(e,index)}
                            ref={(e)=>( inputRef.current[index] = e )}
                            className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            pattern="\d*" maxLength={1} />
                        ))}
                            
                        </div>
                        <div className="max-w-[260px] mx-auto mt-4">
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={`w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 ${
                            isButtonDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-500 hover:bg-indigo-600 focus:ring focus:ring-indigo-300'
                            }`}> 
                            Verify Account</button>
                        </div>
                    </form>
    </div>
  )
}

export default OTPBox
