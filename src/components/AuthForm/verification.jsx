import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import {  Text } from "@chakra-ui/react";
import {  Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import fontbolt from './fontbolt.png'
const verification = ({ inputs1 }) => {

	const { loading, error, signup } = useSignUpWithEmailAndPassword();

	const [inputs, setInputs] = useState({
		otp: "",
	});
	
	const [otpSent, setOtpSent] = useState(false);

	let otp = 1;
    useEffect(() => {
		// const isOtpSent = localStorage.getItem('otpSent');
        if (!otpSent && inputs1 && otp==1 ) { // Add a check to ensure inputs1 is not null/undefined
            sendOTP();
			otp++;
			// localStorage.setItem('otpSent', true);
        }
    }, []); // Run effect only when the component mounts
	const sendOTP = async () => {
        try {
			const { email } = inputs1;
            const response = await fetch("http://localhost:3001/api/sendOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
				body: JSON.stringify({ email }),
            });

            if (response.ok) {
                console.log("OTP sent successfully");
            } else {
                console.error("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };
	const handleRegister = async () => {
        // Make an API call to verify the OTP
        try {
			const { email } = inputs1;
            const response = await fetch("http://localhost:3001/api/verifyOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
					email,
                    otp: inputs.otp,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // If OTP verification is successful, proceed with registration
                registerUser();
            } else {
                // If OTP verification fails, show an error message
                console.error("OTP verification failed");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };
	const registerUser = async () => {
        // Make an API call to register the user
        try {
			signup(inputs1);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };
	return (
		
        <>
			<Input
				placeholder='Otp'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, otp: e.target.value })}
				// onClick={() => { if (otp==0) sendOTP(); }}
			/>
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				// onClick={() => signup(signupData)}
				onClick={handleRegister}
			>
				Register
			</Button>		
		</>
     
	);
};

export default verification;
