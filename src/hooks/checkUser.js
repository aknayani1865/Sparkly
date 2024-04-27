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
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);


        const e = query(usersRef, where("email", "==" , inputs.email));
        const eSnapshot = await getDocs(e);
		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return false;
		}
        if(!eSnapshot.empty){
            showToast("Error" , "Email already exists" , "error");
            return false;
        }
        try {
            // await createUserWithEmailAndPassword(inputs.email, inputs.password);
            return true; 
        } catch (error) {
            showToast("Error", error.message, "error");
            return false; 
        }
	};

	return { loading, error, signup1 };
};

export default checkUser;
