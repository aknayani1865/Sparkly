import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Verification from './components/AuthForm/verification';
import Forgot from './components/AuthForm/forgot';
import Chat from "./pages/ChatPage/Chat";
import  useStore  from "./store/chatUser";

function App() {
	const [authUser] = useAuthState(auth);
	return (
		
			<PageLayout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				<Route path='/:username' element={<ProfilePage />} />
				<Route path='/otp' element={!authUser ? <Verification /> : <Navigate to='/' />} />
				<Route path='/forgot' element={!authUser ? <Forgot /> : <Navigate to='/' />} />
				<Route path='/chat' element={authUser? <Chat /> : <Navigate to='/auth' />} />
				{/* <Route path='/chat' element={userData && authUser? <Chat /> : <Navigate to='/auth' />} /> */}
			</Routes>
		</PageLayout>
	);
}

export default App;
