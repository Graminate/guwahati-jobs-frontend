import React from "react";

export type Message = {
  id: number;
  senderName: string;
  senderInitials: string;
  senderAvatarUrl?: string;
  jobTitle: string;
  timestamp: string;
  previewText: string;
  fullText: string;
  companyName: string;
  companyLogoUrl?: string;
  jobLink?: string;
};

type MessagePreviewProps = {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
};

const MessagePreview = ({
  message,
  isSelected,
  onClick,
}: MessagePreviewProps) => {
  const baseClasses =
    "p-4 border-b border-gray-500 cursor-pointer hover:bg-gray-500 transition duration-150 ease-in-out";
  const selectedClasses = "bg-light";
  const unselectedClasses = "bg-white";

  return (
    <div
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-sm md:text-base">
          {message.senderName}
        </h3>
        <span className="text-xs flex-shrink-0 ml-2">{message.timestamp}</span>
      </div>
      <p className="text-sm font-medium mb-1">{message.jobTitle}</p>
      <p className="text-sm truncate text-gray-600">{message.previewText}</p>
    </div>
  );
};

type MessageListProps = {
  messages: Message[];
  selectedMessageId: number | null;
  onSelectMessage: (id: number) => void;
};

const MessageList = ({
  messages,
  selectedMessageId,
  onSelectMessage,
}: MessageListProps) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 border-b border-gray-500 flex-shrink-0">
        <h1 className="text-2xl font-bold text-black">Messages</h1>
      </div>

      <div className="overflow-y-auto flex-grow">
        {messages.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No messages found.</p>
        ) : (
          messages.map((message) => (
            <MessagePreview
              key={message.id}
              message={message}
              isSelected={message.id === selectedMessageId}
              onClick={() => onSelectMessage(message.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
