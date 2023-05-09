function MyMessage({ message }) {
  function stripHtml(html) {
    // Loại bỏ thẻ html khỏi chuỗi
    return html.replace(/<[^>]*>/g, "");
  }
  if (message.attachments && message.attachments.length > 0) {
    // Nếu có tập tin
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right" }}
      />
    );
  }

  return (
    <div
      className="message"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3B2A50",
      }}
    >
      {stripHtml(message.text)}
    </div>
  );
}

export default MyMessage;
