import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import {  Text } from "@chakra-ui/react";
import {  Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import fontbolt from './fontbolt.png'
import { useNavigate } from "react-router-dom";
import checkUser from "../../hooks/useForgot";
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const Forgot = () => {
	// const history = useHistory();
	const navigate = useNavigate();
	const [inputs2, setInputs] = useState({
		email: ""
	});
	const { loading, error, signup1 } = checkUser();
	const handleSubmit = async () => {
        const success = await signup1(inputs2);
		
        if (success) {
			await handlePassword();
        }
		else{
			console.error("Not Exists");
		}
    };
	const handlePassword = async () => {
		await sendPasswordResetEmail(auth, inputs2.email)
		.then(() => {
			alert("Password reset email sent 🚀");
			navigate('/');
		})
		.catch(error => console.log(error.message));
	  };
	return (
		
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					<VStack spacing={4} align={"stretch"}>
					<Box border={"1px solid gray"} borderRadius={4} padding={5}>
				<VStack spacing={4}>
					<Image src={fontbolt} h={16} cursor={"pointer"} alt='Instagram' />
					<Input
				placeholder='Enter Email'
				fontSize={14}
				type='text'
				size={"sm"}
				value={inputs2.email}
				onChange={(e) => setInputs({ ...inputs2, email: e.target.value })}
			/>
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={handleSubmit}
			>
				Forgot
			</Button>				

				</VStack>
			</Box>

			
					</VStack>
				</Flex>
			</Container>
		</Flex>
     
	);
};

export default Forgot;
