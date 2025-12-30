import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage';
import { useUser } from '@clerk/clerk-react';

function App() {

    const {isSignedIn} = useUser();

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/problems' element={isSignedIn? <ProblemsPage/> : <Navigate to="/" />}/>
        </Routes>
    )
}

export default App
