import * as React from "react";
import { MessageObj } from "../../type";

import '../../styles/style.scss'

import ChatContain from "./ChatContain";


// 
const arr_mess: MessageObj[] = Array.from({ length: 20 }, (v, k) => ({
  name: "Cde",
  content: `Message ${k + 1}`,
}));
const handleSend = (mess: string) => {
  arr_mess.unshift({ name: "Abc", content: mess });
};

//
export default {
  title: "ChatContain",
  component: ChatContain,
};

export const ChatContainSb = () => {
  return (
    <div>
      <ChatContain arr_mess={arr_mess} handleSend={handleSend} />
    </div>
  );
};
