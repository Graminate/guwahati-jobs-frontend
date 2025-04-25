import Button from "@/components/ui/Button";
import {
  faFlag,
  faPaperclip,
  faArrowLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { Message } from "./messageList";

type User = {
  first_name: string;
  last_name: string;
};

type MessageBodyProps = {
  message: Message;
  onGoBack: () => void;
  user?: User;
};

const MessageBody = ({ message, onGoBack, user }: MessageBodyProps) => {
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    console.log("Sending reply:", replyText);
    setReplyText("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-500 flex items-center justify-between gap-3 flex-shrink-0">
        <button
          onClick={onGoBack}
          className="p-1.5 -ml-1.5 md:hidden text-gray-600 hover:bg-gray-100 rounded-full"
          aria-label="Back to messages"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="size-5" />
        </button>

        <div className="flex items-center gap-3 flex-grow min-w-0">
          {message.companyLogoUrl ? (
            <Image
              src={message.companyLogoUrl}
              alt={`${message.companyName} Logo`}
              width={32}
              height={32}
              className="rounded flex-shrink-0"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0 items-center justify-center text-sm font-semibold text-gray-600">
              {message.companyName?.substring(0, 1)?.toUpperCase() || "?"}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="font-semibold text-gray-800 truncate text-sm md:text-base">
              {message.companyName}
            </h2>
            <p className="text-xs md:text-sm text-gray-600 truncate">
              Applied for{" "}
              <a
                href={message.jobLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {message.jobTitle}
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {message.jobLink && (
            <Button
              type="button"
              text="View Job Ad"
              style="secondary"
              onClick={() => window.open(message.jobLink, "_blank")}
            />
          )}
          <button
            className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-500"
            aria-label="Flag message"
          >
            <FontAwesomeIcon icon={faFlag} className="size-4 text-yellow-200" />
          </button>
        </div>

        <button
          className="p-1.5 md:hidden text-gray-600 hover:bg-gray-100 rounded-full"
          aria-label="More options"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="size-5" />
        </button>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex items-start gap-3 mb-6">
          {message.senderAvatarUrl ? (
            <Image
              src={message.senderAvatarUrl}
              alt={`${message.senderName} Avatar`}
              width={40}
              height={40}
              className="rounded-full flex-shrink-0 mt-1"
            />
          ) : (
            <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-semibold text-white mt-1">
              {message.senderInitials}
            </div>
          )}
          <div className="flex-grow">
            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="font-semibold text-gray-800">
                {message.senderName}
              </h3>
              <span className="text-xs">{message.timestamp}</span>
            </div>

            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {message.fullText}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-500 flex-shrink-0">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img
              src={`https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                user?.first_name || "U"
              )}+${encodeURIComponent(
                user?.last_name || "N"
              )}&size=250&background=e0e7ff&color=4f46e5`}
              alt="Your avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </div>
          <div className="flex-grow">
            <textarea
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none bg-white text-black placeholder-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder={`Reply to ${message.senderName}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              maxLength={2500}
              aria-label={`Reply to ${message.senderName}`}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <button
                  className="text- hover:text-gray-700"
                  aria-label="Attach file"
                >
                  <FontAwesomeIcon icon={faPaperclip} className="size-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs" aria-live="polite">
                  {replyText.length} / 2500
                </span>
                <Button
                  type="button"
                  text="Send"
                  style={replyText.trim() ? "primary" : "ghost"}
                  isDisabled={!replyText.trim()}
                  onClick={handleSendReply}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
