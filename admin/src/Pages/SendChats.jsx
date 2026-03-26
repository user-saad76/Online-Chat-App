import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";
import { useAuth } from "../contexts/AuthAdminProvider";


/* Zod Schema */
const messageSchema = z.object({
  message: z.string().min(1, "Message is required").min(3, "Minimum 3 characters"),
});

function SendChats() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { admin } = useAuth();
  console.log("admin message data",admin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const { Data, error, loading } = useFetch("http://localhost:7000/admin/messages");
  console.log(" Admin messages", Data);

  /* Set messages from API */
  useEffect(() => {
    if (Data?.messages) {
      setMessages(Data.messages);
    }
  }, [Data]);

  /* Delete */
  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/message/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  /* Edit */
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

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, message } : msg
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  /* Send */
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

      const newMsg = await res.json();

      // ✅ Ensure proper structure (IMPORTANT FIX)
      const messageObj = newMsg.message || newMsg.data;

      setMessages((prev) => [...prev, messageObj]); // instant UI update
      reset();

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-3" style={{ width: "400px" }}>

        {/* Header */}
        <div className="border-bottom pb-2 mb-3 d-flex align-items-center">
          {admin && (
            <>
              <img
                src={ admin?.data?.image?.secure_url|| "https://via.placeholder.com/40"}
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
        <div style={{ height: "200px", overflowY: "auto" }} className="mb-3">
          {loading && <p>Loading...</p>}
          {error && <p>Error loading messages</p>}

          {messages?.map((msg) => (
            <div key={msg._id} className="alert alert-primary p-2">

              {editingId === msg._id ? (
                <input
                  defaultValue={msg.message}
                  className="form-control mb-2"
                  onBlur={(e) => editMessage(msg._id, e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <span>{msg.message}</span>

                  <div>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => setEditingId(msg._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteMessage(msg._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // ✅ FIX: stop page refresh
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="input-group">
            <input
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              placeholder="Type a message"
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

export default SendChats;