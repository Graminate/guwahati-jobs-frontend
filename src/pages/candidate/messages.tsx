import DefaultLayout from "@/layout/DefaultLayout";
import Head from "next/head";
import { useState, useMemo, useEffect } from "react";
import MessageList, { Message } from "./messages/messageList";
import MessageBody from "./messages/messageBody";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/utils/axiosInstance";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
};

const mockMessages: Message[] = [
  {
    id: 1,
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
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user: authUser, isLoggedIn, isLoadingAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      if (isLoadingAuth) return;

      if (!isLoggedIn || !authUser) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/users/${authUser.userId}`);
        const data: User = response.data;
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, authUser, isLoadingAuth]);

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

  if (isLoading || isLoadingAuth) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <span className="ml-4 text-xl">Loading Messages...</span>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Messages</title>
        <meta name="description" content="View your application messages" />
      </Head>
      <DefaultLayout>
        <div className="flex min-h-screen h-full overflow-hidden bg-white">
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
                user={userData || undefined}
              />
            ) : (
              <div className="hidden md:flex items-center justify-center h-full text-gray-300">
                <div className="text-center">
                  <p className="text-lg">No message selected</p>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MessagesPage;
