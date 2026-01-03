import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar"
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";
import WelcomeSection from "../Components/WelcomeSection";
import StatsCard from "../Components/StatsCard";
import ActiveSessions from "../Components/ActiveSessions";
import RecentSessions from "../Components/RecentSessions";
import CreateSessionsModal from "../Components/CreateSessionsModal";

export const DashboardPage = () => {
    document.title = "Dashboard";

    const navigate = useNavigate();
    const {user} = useUser();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [roomConfig, setRoomConfig] = useState({problem: "", difficulty: ""});
    
    const createSessionMutation = useCreateSession();
    const {data: activeSessionData, isLoading: loadingActiveSessions} = useActiveSessions();
    const {data: recentSessionsData, isLoading: loadingRecentSessions} = useMyRecentSessions();
    
    const handleCreateRoom = () =>{
        if(!roomConfig.problem || !roomConfig.difficulty) return;
        
        createSessionMutation.mutate({
            problem: roomConfig.problem,
            difficulty: roomConfig.difficulty.toLowerCase()
        },
            {
                onSuccess: (data) => {
                    setShowCreateModal(false);
                    navigate(`/session/${data.sessions._id}`)
                } 
            }
        )
    }

    const activeSessions = activeSessionData?.sessions ?? [];
    const recentSessions = recentSessionsData?.sessions ?? [];
    
    const isUserInSession = (session) => {
        if(!user.id) return false;
        
        return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
    }

    return (
        <>
            <div className="min-h-screen bg-base-300 "> 
                <Navbar/>
                <WelcomeSection onCreateSession={() => setShowCreateModal(true)}/>
                {/*GRID LAYOUT*/}
                <div className="container mx-auto px-6 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <StatsCard 
                            recentSessionsCount={recentSessions.length}
                            activeSessionsCount={activeSessions.length} />
                        <ActiveSessions
                            sessions={activeSessions}
                            isLoading={loadingActiveSessions}
                            isUserInSession={isUserInSession}
                        />
                    </div>
                    <RecentSessions
                        sessions={recentSessions}
                        isLoading={loadingRecentSessions}
                    /> 
                </div>
            </div>
            <CreateSessionsModal isOpen={showCreateModal} 
                onClose={() => setShowCreateModal(false)}
                roomConfig={roomConfig}
                setRoomConfig={setRoomConfig}
                onCreateRoom={handleCreateRoom}
                isCreating={createSessionMutation.isPending}
            />
        </>
    )
}
