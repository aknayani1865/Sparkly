import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import checkUser from "../../hooks/checkUser";
// import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { createBrowserHistory } from "history";
// import {sendOTP} from './verification';
import { useNavigate } from "react-router-dom";
import Verification from "./verification";
const Signup = () => {
    const navigate = useNavigate();
	const [loading1, setLoading] = useState(false);
    const [error1, setError] = useState(null);
    const [showOTPComponent, setShowOTPComponent] = useState(false); 
	const { loading, error, signup1 } = checkUser();
	const [inputs1, setInputs] = useState({
		firstname: "",
		lastname:"",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	
	const handleSignup = async () => {
		const fullName = `${inputs1.firstname} ${inputs1.lastname}`;
		setInputs(prevState => ({
			...prevState,
			fullName: fullName,
		}));
        const success = await signup1(inputs1);
		setLoading(true);
			// Simulating asynchronous action
			setTimeout(() => {
				setLoading(false);
				setError(null); // Clear any previous error
				// Check if signup was successful
				if (success) {
					// If signup successful, show OTP component
					setShowOTPComponent(true);
				} else {
					// If signup failed, display error message
					setError({ message: "Signup failed. Please try again." });
				}
			}, 2000); 
    };
	return (
		<>
		{!showOTPComponent && ( 
		<>
			<Input
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs1.email}
				onChange={(e) => setInputs({ ...inputs1, email: e.target.value })}
			/>
			<Input
				placeholder='Username'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs1.username}
				onChange={(e) => setInputs({ ...inputs1, username: e.target.value })}
			/>
			<Input
				placeholder='Fistname'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs1.firstname}
				onChange={(e) => setInputs({ ...inputs1, firstname: e.target.value })}
			/>
			<Input
				placeholder='Lastname'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs1.lastname}
				onChange={(e) => setInputs({ ...inputs1, lastname: e.target.value })}
			/>
			<InputGroup>
				<Input
					placeholder='Password'
					fontSize={14}
					type={showPassword ? "text" : "password"}
					value={inputs1.password}
					size={"sm"}
					onChange={(e) => setInputs({ ...inputs1, password: e.target.value })}
				/>
				<InputRightElement h='full'>
					<Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>

			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)}

			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={handleSignup}
			>
				Sign Up
			</Button>
		</>
		)}

		{showOTPComponent && <Verification inputs1={inputs1} />} 
	</>
		
	);
};

export default Signup;
