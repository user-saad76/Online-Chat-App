
function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="chat-container">

        {/* Header */}
        <div className="chat-header">
          <div className="user-info">
            <div className="avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div>
              <h3>Admin Support</h3>
              <span>
                <i className="fas fa-circle online-icon"></i> online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <div className="message admin">
            <i className="fas fa-headset"></i> Hello! How can I help you today?
          </div>

          <div className="message employee">
            Hi! I need help with my order.
          </div>
        </div>

        {/* Input */}
        <div className="chat-input">
          <input type="text" placeholder="Type a message" />
          <button>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
