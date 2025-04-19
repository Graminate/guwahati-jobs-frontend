import { useEffect, useState } from "react";

interface Notification {
  id: number;
  user_id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded user id = 1 for demo.
    fetch("http://localhost:3000/notifications/1")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
      </header>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <p className="text-gray-700">{notification.message}</p>
              <p className="text-gray-500 text-sm">
                Received: {new Date(notification.created_at).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                Status: {notification.is_read ? "Read" : "Unread"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
