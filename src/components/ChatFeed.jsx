import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

// props: tất cả thông tin về cuộc trò chuyện
function ChatFeed(props) {
  //   sử dụng destructuring assignment trong JavaScript để gán các giá trị từ đối tượng props vào các biến địa phương (local variables)
  const {
    chats, // Thông tin đoạn chat
    activeChat, // id đoạn chat
    userName, // Tên người chat
    messages, // Object thông tin tin nhắn
  } = props;
  const chat = chats && chats[activeChat]; // Thông tin đoạn chat

  //kết xuất biên nhận đã đọc
  const renderReadReceipts = (message, isMyMessage) =>
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  const renderMessage = () => {
    const keys = Object.keys(messages); //  mảng id tin nhắn củ thể
    return keys.map((key, index) => {
      const message = messages[key]; // id tin nhắn
      const lastMessageKey = index === 0 ? null : keys[index - 1]; // Lấy ra id tin nhắn cuối
      const isMyMessage = userName === message.sender.username; // Tên người nhắn
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
            {/* {renderReadReceipts(message, isMyMessage)} */}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div>Loading...</div>;
  // renderMessage();

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {
            chat.people.map((person) => ` ${person.person.username}`) // Tên người tham gia đoạn chat
          }
        </div>
      </div>
      {renderMessage()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
}

export default ChatFeed;
