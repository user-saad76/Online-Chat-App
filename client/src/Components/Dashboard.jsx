
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";

/* Zod Schema */
const messageSchema = z.object({
  message: z.string().min(1, "Message is required").min(3, "Minimum 3 characters"),
});

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });
  
 const {Data,error,loading} = useFetch('http://localhost:7000/messages')
 console.log("messages",Data)


  /* Fetch Messages */
  // const fetchMessages = async () => {
  //   try {
  //     const res = await fetch("http://localhost:7000/messages",{
  //     method: "GET",
  //     credentials: "include", // ⭐ cookie (jwt-token) will be sent
  //   });
  //     const data = await res.json();
  //     setMessages(data.messages);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
 const deleteMessage = async (id) => {
  try {
    const res = await fetch(`http://localhost:7000/message/delete/${id}`, {
      method: "DELETE",
       credentials: "include"
    });

    if (!res.ok) throw new Error("Failed to delete message");

    // Remove the deleted message from state
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
     window.location.href = '/'

  } catch (err) {
    console.log(err);
  }
};

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
     window.location.href = '/'
   // fetchMessages();
  } catch (err) {
    console.log(err);
  }
};



  // /* Load messages on page load */
  // useEffect(() => {
  //   fetchMessages();
  // }, []);

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

      if (!res.ok) throw new Error("Failed to send message");

      reset();

      window.location.href = '/'

      //fetchMessages(); // refresh chat after sending
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="dashboard-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="chat-container card shadow p-3" style={{ width: "400px" }}>

        {/* Header */}
        <div className="chat-header mb-3 border-bottom pb-2">
          <h5 className="mb-0">Manager</h5>
          <small className="text-success">Online</small>
        </div>

        {/* Messages */}
        <div
          className="chat-messages mb-3"
          style={{ height: "200px", overflowY: "auto" }}
        >
         {Data?.messages?.map((msg) => (
  <div key={msg._id} className="alert alert-primary p-2">

    {editingId === msg._id ? (
      <>
        <input
          defaultValue={msg.message}
          className="form-control mb-2"
          onBlur={(e) => editMessage(msg._id, e.target.value)}
          autoFocus
        />
      </>
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
