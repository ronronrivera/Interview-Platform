import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import { useUser } from '@clerk/clerk-react';
import { DashboardPage } from './pages/DashboardPage';
import { Loader2 } from 'lucide-react';
import { ProblemsPage } from './pages/ProblemsPage';
import ProblemPage from './pages/ProblemPage';
import { Toaster } from 'react-hot-toast';

function App() {

    const {isSignedIn, isLoaded} = useUser();
   
    //git rid of flickering effect
    
    if (!isLoaded)
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <Loader2 className="animate-spin size-20" />
            </div>
        );
    return (
        <>
            <Toaster />
            <Routes>
                <Route path='/' element={!isSignedIn? <HomePage/> : <Navigate to={"/dashboard"}/>}/>
                <Route path='/dashboard' element={isSignedIn? <DashboardPage/> : <Navigate to={"/"}/>}/>
                <Route path='/problems' element={isSignedIn? <ProblemsPage/> : <Navigate to={"/"}/>}/>
                <Route path='/problem/:id' element={isSignedIn? <ProblemPage/> : <Navigate to={"/"}/>}/> 
            </Routes>
        </>
    )
}

export default App
