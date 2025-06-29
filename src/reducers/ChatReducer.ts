import { ChatType, Message } from "@/interfaces";

export enum ChatActionType {
  SET_MESSAGE = 'setMessage',
  SET_LOADING = 'setLoading',
  SET_ALL_MESSAGES = 'setAllMessages',
  SET_SHOW_CHAT = 'setShowChat',
}
export type ChatAction =
  | { type: ChatActionType.SET_MESSAGE; message: string }
  | { type: ChatActionType.SET_LOADING; loading: boolean }
  | { type: ChatActionType.SET_ALL_MESSAGES; allMessages: { messages: Message[] } | null }
  | { type: ChatActionType.SET_SHOW_CHAT; showChat: boolean }

export const chatInitialState: ChatType = {
  allMessages: null,
  loading: true,
  message: '',
  showChat: false,
};

export const chatReducer = (state: ChatType, action: ChatAction): ChatType => {
  switch (action.type) {
    case ChatActionType.SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    case ChatActionType.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ChatActionType.SET_ALL_MESSAGES:
      return {
        ...state,
        allMessages: action.allMessages,
      };
    case ChatActionType.SET_SHOW_CHAT:
      return {
        ...state,
        showChat: action.showChat,
      };
  }
};
