import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useFetch } from "../hook/useFetch";
import { useAuth } from "../contexts/AuthProvider";
import socket from "../utlis/socket";

/* Zod Schema */
const messageSchema = z.object({
  message: z.string().min(19, "Minimum 19 characters"),
});

function AdminNotifications() {
  const {user } = useAuth();
  // const [editingId, setEditingId] = useState(null);
  // const [messages, setMessages] = useState([]);
   const [notifications, setNotifications] = useState([]);

  const { Data, error, loading } = useFetch("http://localhost:7000/messages");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  // ⭐ Load notifications from localStorage on page load
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");

    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []); 


   useEffect(() => {
  
      const handleNewMessage = (data) => {
  
        setNotifications((prev) => {
  
          const updatedNotifications = [...prev, data];
  
          // save in localStorage
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
  
          return updatedNotifications;
        });
  
        console.log("******", data);
      };
  
      socket.on("new-message", handleNewMessage);
  
      return () => {
        socket.off("new-message", handleNewMessage);
      };
  
    }, []);
  
    // ✅ DELETE NOTIFICATION FUNCTION
    const deleteNotification = async (id) => {
      try {
  
        await fetch(`http://localhost:7000/message/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
  
        setNotifications((prev) => {
  
          const updatedNotifications = prev.filter(
            (notification) => notification._id !== id
          );
  
          // update localStorage
          localStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
  
          return updatedNotifications;
        });
  
      } catch (error) {
        console.log(error);
      }
    };
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-3" style={{ width: "420px" }}>

        {/* Header */}
        <div className="border-bottom pb-2 mb-3 d-flex align-items-center">
          {user && (
            <>
              <img
                src={user?.data?.image || "https://via.placeholder.com/40"}
                className="rounded-circle me-2"
                width="40"
                height="40"
                alt="profile"
              />
              <div>
                <h6 className="mb-0">{user?.data?.name}</h6>
                <small className="text-success">Online</small>
              </div>
            </>
          )}
        </div>

        {/* Messages */}
        <div style={{ height: "220px", overflowY: "auto" }} className="mb-3">

          {loading && <p>Loading...</p>}
          {error && <p>Error loading messages</p>}

          {notifications?.map((msg) => (
            <div key={msg._id} className="d-flex mb-2">
              <div className="bg-light border rounded px-3 py-2 w-100">

                {/* {editingId === msg._id ? ( */}
                  {/* <input
                    className="form-control"
                    defaultValue={msg.message}
                    autoFocus
                    onBlur={(e) => editMessage(msg._id, e.target.value)}
                  /> */}
                
                  <>
                    <div className="d-flex align-items-center mb-1">
                      <img
                        src={msg.admin?.image?.secure_url}
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                        alt=""
                      />
                      <strong style={{ fontSize: "13px" }}>
                        {msg?.admin?.name}
                      </strong>
                    </div>

                    <div style={{ fontSize: "14px" }}>
                      {msg.message}
                    </div>

                    <div className="text-end">
                      <small className="text-muted">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString()
                          : ""}
                      </small>
                    </div>

                    <div className="text-end mt-1">

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteNotification(msg._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
               

              </div>
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
}

export default AdminNotifications;