import { ChatEngine } from 'react-chat-engine'; // cung cấp các thành phần và công cụ để xây dựng tính năng trò chuyện (chat) trong ứng dụng
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = 'cc1de87c-b9f9-46f8-a133-e0ffd30df04f';
function App() {
  if (!localStorage.getItem('username')) return <LoginForm />;
  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => { // chatAppProps thông tin đoạn chat
        return <ChatFeed {...chatAppProps} />
      }} //được sử dụng để hiển thị các tin nhắn và nội dung trong phần giao diện trò chuyện (chat feed) của ứng dụng.
    // onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
}


export default App;
