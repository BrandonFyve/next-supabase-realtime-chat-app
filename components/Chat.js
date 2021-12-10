import React from "react";

const Chat = ({ session, supabase }) => {
  const [messages, setMessages] = React.useState([]);

  const message = React.useRef();

  React.useEffect(async () => {
    const getMessages = async () => {
      let { data: messages, error } = await supabase
        .from("message")
        .select("*");
      setMessages(messages);
    };

    await getMessages();

    const setupMessageSubscription = async () => {
      await supabase
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((previous) => [].concat(previous, payload.new));
        })
        .subscribe();
    };

    await setupMessageSubscription();
  }, []);

  const sendMessage = async (evt) => {
    evt.preventDefault();

    try {
      const content = message.current.value;

      await supabase
        .from("message")
        .insert([{ content, user_id: session.user.id }]);

      message.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          required
          type="text"
          placeholder="Write your message"
          ref={message}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
