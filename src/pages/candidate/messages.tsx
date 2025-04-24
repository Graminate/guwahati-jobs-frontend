import DefaultLayout from "@/layout/DefaultLayout";
import Head from "next/head";
import { useState, useMemo } from "react";
import MessageList, { Message } from "./messages/messageList";
import MessageBody from "./messages/messageBody";

const mockMessages: Message[] = [
  {
    id: 1,
    senderName: "Charlotte Hagemann",
    senderInitials: "CH",
    senderAvatarUrl: undefined,
    jobTitle: "Junior Full-Stack Developer - Graduates (f/m/x)",
    timestamp: "12 days ago",
    previewText:
      "Hallo Borneel, vielen Dank für deine Bewerbung bei Pactos! Wir würden dich ger...",
    fullText:
      "Hallo Borneel,\n\nvielen Dank für deine Bewerbung bei Pactos!\n\nWir würden dich gerne besser kennenlernen und dich zu einem Gespräch mit einem unserer Gründer - Antonio - einladen. Buche dir gerne einen Slot unter https://calendly.com/antonio-zill.\n\nWir freuen uns auf dich!\n\nLiebe Grüße,\nCharlotte",
    companyName: "Pactos",
    companyLogoUrl: "/images/pactos-logo.png",
    jobLink: "https://example.com/job/123",
  },
  {
    id: 2,
    senderName: "John Doe",
    senderInitials: "JD",
    senderAvatarUrl: "/images/user-avatar.png",
    jobTitle: "Senior Frontend Engineer",
    timestamp: "15 days ago",
    previewText:
      "Hi Borneel, thanks for reaching out. Could we schedule a quick chat next...",
    fullText:
      "Hi Borneel,\n\nThanks for reaching out regarding the Senior Frontend Engineer position.\n\nYour profile looks interesting. Could we schedule a quick chat next week to discuss your experience further?\n\nBest regards,\nJohn Doe",
    companyName: "Tech Solutions Inc.",
    companyLogoUrl: undefined,
    jobLink: "https://example.com/job/456",
  },
];

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );

  const selectedMessage = useMemo(() => {
    if (selectedMessageId === null) return null;
    return messages.find((msg) => msg.id === selectedMessageId) || null;
  }, [messages, selectedMessageId]);

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId(id);
  };

  const handleGoBackToList = () => {
    setSelectedMessageId(null);
  };

  const isMessageSelected = selectedMessageId !== null;

  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="View your application messages" />
      </Head>
      <DefaultLayout>
        <div className="flex md:h-screen h-full overflow-hidden bg-white ">
          <div
            className={`
            ${isMessageSelected ? "hidden" : "block"}
            md:block md:w-1/3 lg:w-1/4 w-full
            flex-shrink-0 border-x border-gray-500 
            overflow-hidden md:overflow-y-auto
          `}
          >
            <MessageList
              messages={messages}
              selectedMessageId={selectedMessageId}
              onSelectMessage={handleSelectMessage}
            />
          </div>

          <div
            className={`
            ${!isMessageSelected ? "hidden" : "block"}
             md:block w-full md:flex-grow h-full overflow-hidden
          `}
          >
            {selectedMessage ? (
              <MessageBody
                message={selectedMessage}
                onGoBack={handleGoBackToList}
                user={null}
              />
            ) : (
              <div className="hidden md:flex items-center justify-center h-full text-gray-500  bg-white">
                {/* Nothing here */}
              </div>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MessagesPage;
