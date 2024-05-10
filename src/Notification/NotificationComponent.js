import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState(["asdasda"]);

    useEffect(() => {
        
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(localStorage.api_url+"notificationhub")
            .build();
        
        connection.start()
            .then(() => console.log('Connection established'))
            .catch(err => console.error('Error connecting:', err));

        connection.on("ReceiveNotification", message => {
           // console.log(message)
            setNotifications([...notifications, message]);
        });

        return () => {
            connection.stop();
        };
    }, [notifications]);

    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index}>{notification}</div>
            ))}
        </div>
    );
};

export default NotificationComponent;
