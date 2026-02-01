"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    isMe: boolean;
}

interface Conversation {
    id: string;
    participantName: string;
    participantRole: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
    const [newMessage, setNewMessage] = useState("");

    const conversations: Conversation[] = [
        {
            id: "1",
            participantName: "John Kamau",
            participantRole: "Landlord",
            lastMessage: "The plumber will arrive tomorrow at 10am",
            lastMessageTime: "2:30 PM",
            unreadCount: 2,
        },
        {
            id: "2",
            participantName: "Property Admin",
            participantRole: "Admin",
            lastMessage: "Your lease renewal has been approved",
            lastMessageTime: "Yesterday",
            unreadCount: 0,
        },
    ];

    const messages: Message[] = [
        {
            id: "1",
            content: "Hi, I wanted to follow up on the maintenance request for the leaking faucet.",
            senderId: "me",
            senderName: "You",
            timestamp: "Jan 28, 10:30 AM",
            isMe: true,
        },
        {
            id: "2",
            content: "Hello! Thank you for reaching out. I've contacted a plumber and they can come tomorrow morning.",
            senderId: "landlord",
            senderName: "John Kamau",
            timestamp: "Jan 28, 11:15 AM",
            isMe: false,
        },
        {
            id: "3",
            content: "That works perfectly. What time should I expect them?",
            senderId: "me",
            senderName: "You",
            timestamp: "Jan 28, 11:20 AM",
            isMe: true,
        },
        {
            id: "4",
            content: "The plumber will arrive tomorrow at 10am. Please make sure someone is available to let them in.",
            senderId: "landlord",
            senderName: "John Kamau",
            timestamp: "Jan 28, 2:30 PM",
            isMe: false,
        },
    ];

    const handleSend = () => {
        if (!newMessage.trim()) return;
        // Send message to API
        console.log("Sending:", newMessage);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader
                title="Messages"
                description="Communicate with your landlord and property management"
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Conversations List */}
                <div className="w-80 border-r flex flex-col bg-card">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold">Conversations</h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv.id)}
                                className={cn(
                                    "w-full p-4 text-left hover:bg-muted/50 transition-colors border-b",
                                    selectedConversation === conv.id && "bg-muted"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold truncate">{conv.participantName}</p>
                                            <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{conv.participantRole}</p>
                                        <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                                    </div>
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b bg-card">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            {conversations.find((c) => c.id === selectedConversation)?.participantName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {conversations.find((c) => c.id === selectedConversation)?.participantRole}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn("flex", message.isMe ? "justify-end" : "justify-start")}
                                    >
                                        <div
                                            className={cn(
                                                "max-w-[70%] rounded-lg p-3",
                                                message.isMe
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                            )}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                            <p
                                                className={cn(
                                                    "text-xs mt-1",
                                                    message.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                                                )}
                                            >
                                                {message.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t bg-card">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSend}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            Select a conversation to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
