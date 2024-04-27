import { useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const checkUser = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const signup1 = async (inputs) => {
		if (!inputs.email ) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		const usersRef = collection(firestore, "users");

		


        const e = query(usersRef, where("email", "==" , inputs.email));
        const eSnapshot = await getDocs(e);
		
        if(eSnapshot.empty){
            showToast("Error" , "Email not exists" , "error");
            return false;
        }
        try {
            return true; 
        } catch (error) {
            showToast("Error", error.message, "error");
            return false; 
        }
	};

	return { loading, error, signup1 };
};

export default checkUser;
