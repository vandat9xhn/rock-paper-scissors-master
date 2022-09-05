import * as React from "react";

import { MessageObj } from "../../type";

import icon_mess from "../../../images/message.png";
import icon_send_mess from "../../../images/send_mess.png";
import "./Chat.scss";

//
export interface ChatContainProps {
  arr_mess: MessageObj[];
  handleSend: (message: string) => void;
}

//
function ChatContain({ arr_mess, handleSend }: ChatContainProps) {
  const [show_chat, setShowChat] = React.useState(false);
  const [value, setValue] = React.useState("");

  // ----

  const showChat = () => {
    setShowChat(true);
  };

  const hideChat = () => {
    setShowChat(false);
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const onSend = () => {
    const mess = value.trim();
    if (!mess) {
      return;
    }

    handleSend(value);
    setValue("");
  };

  //
  return (
    <div className="Chat">
      <div className={`Chat_icon ${show_chat ? "display-none" : ""}`}>
        <img
          className="Chat_icon_mess object-fit-cover"
          src={icon_mess}
          alt=""
          onClick={showChat}
        />
      </div>

      <div className={`Chat_main ${show_chat ? "" : "display-none"}`}>
        <div className="Chat_main_contain">
          <div className="Chat_header">
            <div>Global Chat</div>

            <div className="cursor-pointer" onClick={hideChat}>
              Close
            </div>
          </div>

          <div className="Chat_messages">
            {arr_mess.map((item, ix) => (
              <div key={ix} className="Chat_message">
                <div className="Chat_message_name">{item.name}:</div>

                <div className="Chat_message_content">{item.content}</div>
              </div>
            ))}
          </div>

          <div className="Chat_actions">
            <input
              className="Chat_ip"
              type="text"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />

            <div>
              <img
                className={`Chat_icon_send object-fit-cover ${
                  value.trim()
                    ? "Chat_icon_send-active cursor-pointer"
                    : "Chat_icon_send-inactive pointer-events-none"
                }`}
                src={icon_send_mess}
                alt=""
                onClick={onSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContain;
