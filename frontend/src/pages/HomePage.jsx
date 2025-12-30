import { SignInButton, SignOutButton, SignedOut, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'

function HomePage() {
    return (
        <>
            
            <h1>Welcome to GetHired</h1>

            <SignedOut>
                <SignInButton mode='modal'>
                    <button className='btn btn-primary'>Login</button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <SignOutButton>
                    <button className='btn btn-primary'>Logout</button>
                </SignOutButton>
            </SignedIn>
            <Toaster/>
        </>
    )
}

export default HomePage


// TODO: react-query aka tansack query and axios

