import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFetch } from "../hook/useFetch";
import { useAuth } from "../contexts/AuthAdminProvider";

/* Zod Schema */
const messageSchema = z.object({
  message: z.string().min(3, "Minimum 3 characters"),
});

function Chats() {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [messages, setMessages] = useState([]);

  const { Data, error, loading } = useFetch("http://localhost:7000/messages");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  /* Send Message */
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:7000/create/message", {
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
      await fetch(`http://localhost:7000/message/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  /* Edit Message */
  const editMessage = async (id, message) => {
    try {
      await fetch(`http://localhost:7000/message/update/${id}`, {
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

          {Data?.messages?.map((msg) => (
            <div key={msg._id} className="alert alert-info p-2">

              {editingId === msg._id ? (
                <input
                  className="form-control"
                  defaultValue={msg.message}
                  autoFocus
                  onBlur={(e) => editMessage(msg._id, e.target.value)}
                />
              ) : (
                <div className="d-flex justify-content-between">
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