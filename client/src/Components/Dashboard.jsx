
function Dashboard() {
  return (
   <div class="dashboard-wrapper">
  <div class="chat-container">
   
    <header class="chat-header">
      <h2>Employee Chat</h2>
      <span>Connected</span>
    </header>
    <div class="chat-messages">
      <div class="message admin">
        Hello! How can I help you today?
      </div>
      <div class="message employee">
        Hi! I need help with my order.
      </div>
      <div class="messages-end"></div>
    </div>
    <div class="chat-input">
      <input type="text" placeholder="Type your message..." />
      <button>Send</button>
    </div>
  </div>
</div>

  );
}

export default Dashboard
