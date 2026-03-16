import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

function Sidebar({ users, room, show, onClose }) {
    const socket = useSocket();
    const [activityLogs, setActivityLogs] = useState([]);

    useEffect(() => {
        const handleActivityLog = (log) => {
            setActivityLogs((prev) => {
                const updated = [log, ...prev];
                return updated.slice(0, 5);
            });
        };

        socket.on("activity_log", handleActivityLog);

        return () => {
            socket.off("activity_log", handleActivityLog);
        };
    }, [socket]);

    return (
        <>
            {show && <div className="sidebarOverlay" onClick={onClose} />}

            <div className={`sidebar ${show ? "open" : ""}`}>
                <div className="sidebarHeader">
                    <h4>#{room}</h4>
                    <button className="closeSidebar" onClick={onClose}>✕</button>
                </div>

                <div className="sidebarSection">
                    <p className="sidebarLabel">
                        PARTICIPANTS ({users.length})
                    </p>

                    {users.length > 0 ? (
                        users.map((u) => (
                            <div className="userItem" key={u.socketId}>
                                <div className="userAvatar">
                                    {u.username.charAt(0).toUpperCase()}
                                </div>
                                <span>{u.username}</span>
                                <span className="onlineDot" />
                            </div>
                        ))
                    ) : (
                        <p className="noUsers">Aucun utilisateur</p>
                    )}
                </div>

                <div className="sidebarSection">
                    <p className="sidebarLabel">ACTIVITÉ RECENTE</p>

                    {activityLogs.length > 0 ? (
                        activityLogs.map((log, index) => (
                            <p className="activityItem" key={index}>
                                {log.username} {log.action} #{log.room} à {log.time}
                            </p>
                        ))
                    ) : (
                        <p className="noUsers">Aucune activité récente</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Sidebar;