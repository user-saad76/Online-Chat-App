import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useFetch } from "../hook/useFetch";
import { useAuth } from "../contexts/AuthAdminProvider";
import socket from "../utlis/socket";

/* Zod Schema */
const messageSchema = z.object({
  message: z.string().min(3, "Minimum 3 characters"),
});

function Chats() {
  const { admin } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [messages, setMessages] = useState([]);
   const [notifications, setNotifications] = useState([]);

  const { Data, error, loading } = useFetch("http://localhost:7000/admin/messages");

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
  



  /* Send Message */
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:7000/create/admin/message", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      reset();
      window.location.reload();
    } catch (err) {
      alert("Please login first");
    }
  };

  /* Delete Message */
  const deleteMessage = async (id) => {
    try {
      await fetch(`http://localhost:7000/admin/message/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  /* Edit Message */
  const editMessage = async (id, message) => {
    try {
      await fetch(`http://localhost:7000/admin/message/update/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      setEditingId(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //const allMessages = [...(Data?.messages || []), ...messages];

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-3" style={{ width: "420px" }}>

        {/* Header */}
        <div className="border-bottom pb-2 mb-3 d-flex align-items-center">
          {admin && (
            <>
              <img
                src={admin?.data?.image?.secure_url || "https://via.placeholder.com/40"}
                className="rounded-circle me-2"
                width="40"
                height="40"
                alt="profile"
              />
              <div>
                <h6 className="mb-0">{admin?.data?.name}</h6>
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
                        src={msg.user?.image?.secure_url}
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                        alt=""
                      />
                      <strong style={{ fontSize: "13px" }}>
                        {msg?.user?.name}
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

        {/* Send Message */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              placeholder="Type a message..."
              {...register("message")}
            />

            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </div>

          {errors.message && (
            <small className="text-danger">{errors.message.message}</small>
          )}
        </form>

      </div>
    </div>
  );
}

export default Chats;