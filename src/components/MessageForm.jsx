import { useState } from "react";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";
import {
  sendMessage, // Gửi tin nhắn
  isTyping, // Trạng thái đăng nhập
} from "react-chat-engine";

function MessageForm(props) {
  // props thông tin đoạn chat
  const [value, setValue] = useState(""); // Giá trị nhận ô chat
  const { chatId, creds } = props;
  //creds: thông tin tin nhắn

  const handleSubmit = (e) => {
    // Ngăn sự kiện gửi đi
    e.preventDefault();

    const text = value.trim(); // Giá trị ô chat
    // Add tin nhắn vào đoạn chat
    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
}

export default MessageForm;
