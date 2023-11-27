// NotificationCenter.js
import React, { useState, useRef, useEffect } from 'react';
import { HiBell } from 'react-icons/hi'; // This imports the bell icon
import './NotificationCenter.css'; // Ensure you have this CSS file
import { useAuth } from '../../Context/Authcontext.js';


const NotificationCenter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);

    const [notifications, setNotifications] = useState([]);
    const {user} = useAuth();

    // Function to toggle visibility of the dropdown
    const toggleDropdown = () => setIsVisible(!isVisible);

    // Fetch notifications from the backend
    const fetchNotifications = async () => {
        try {
            const response = await fetch(`http://localhost:3500/notifications/getUserNotifications/${user.id}`); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Notifications:", data.notifications);
            setNotifications(data.notifications); // Update the state with fetched notifications
        } catch (error) {
            console.error("Fetching notifications failed: ", error);
        }
    };
    
    // Close the dropdown if clicked outside
    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsVisible(!isVisible);
            }
        };

        fetchNotifications();

        // If the item is visible, listen for clicks
        if (isVisible) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isVisible]);

    return (
      <div className="notification-center">
        <button className="dropdown-button" onClick={() => setIsVisible(!isVisible)}>
          <HiBell size={24} /> {/* Bell icon from Heroicons */}
        </button>
            {isVisible && (
                <div className="dropdown-content">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification-item">
                            <h4>{notification.title}</h4>
                            <p>{notification.description}</p>
                            <span>{new Date(notification.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
