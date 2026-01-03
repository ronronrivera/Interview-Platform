import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import { useAuth } from "@clerk/clerk-react";


export const useCreateSession = () =>{
    const { getToken } = useAuth();

    const result = useMutation({
        mutationKey: ["createSession"],
        mutationFn: async (data) => {
            const token = await getToken();
            return sessionApi.createSession(data, token);
        },
        onSuccess: () =>{
            toast.success("Session created successfully!");
        },
        onError: (error) =>{
            toast.error(error.response?.data?.message || "Failed to create room");
        }
    });
    
    return result;
}

export const useActiveSessions = () =>{
    const { getToken } = useAuth();

    const result = useQuery({
        queryKey: ["activeSessions"],
        queryFn: async () => {
            const token = await getToken();
            return sessionApi.getActiveSession(token);
        }
    });

    return result;
}

export const useMyRecentSessions = () =>{
    const { getToken } = useAuth();

    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: async () => {
            const token = await getToken();
            return sessionApi.getMyRecentSessions(token);
        },
    });

    return result;
}


export const useSessionById = (id) =>{
    const { getToken } = useAuth();

    const result = useQuery({
        queryKey: ["session", id],
        queryFn: async () => {
            const token = await getToken();
            return sessionApi.getSessionById(id, token);
        },
        enabled: !!id,
        refetchInterval: 5000, ///refetch every 5 secs to detect session status changes
    });

    return result;
}

export const useJoinSession = (id) =>{
    const { getToken } = useAuth();

    const result = useMutation({
        mutationKey: ["joinSession"],
        mutationFn: async () => {
            const token = await getToken();
            return sessionApi.joinSession(id, token);
        },
        onSuccess: () => toast.success("Joined session successfully"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to join a session"),
    })
    
    return result;
}


export const useEndSession = (id) =>{
    const { getToken } = useAuth();

    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: async () => {
            const token = await getToken();
            return sessionApi.endSession(id, token);
        },
        onSuccess: () => toast.success("Session ended successfully"),
        onError: (error) => toast.error(error.response?.data?.message || "Failed to end a session"),
    })
    
    return result;
}
