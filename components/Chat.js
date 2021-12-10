import React from "react";

const Chat = ({ supabase }) => {
  const [messages, setMessages] = React.useState([]);

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

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
};

export default Chat;
