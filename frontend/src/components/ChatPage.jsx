import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");

    // Get data from Redux
    const dispatch = useDispatch();
    const { user, suggestedUsers = [], selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages = [] } = useSelector(store => store.chat);

    // Send message function
    const sendMessageHandler = async (receiverId) => {
        if (!receiverId || !textMessage.trim()) return;

        try {
            const res = await fetch(`https://instagram-clone-2-hokl.onrender.com/api/v1/message/send/${receiverId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Same as Axios `withCredentials: true`
                body: JSON.stringify({ textMessage }),
            });

            const data = await res.json();
            if (data.success) {
                dispatch(setMessages([...messages, data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className='flex ml-[16%] h-screen'>
            {/* Sidebar for suggested users */}
            <section className='w-full md:w-1/4 my-8'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />

                <div className='overflow-y-auto h-[80vh]'>
                    {suggestedUsers.length > 0 ? (
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div 
                                    key={suggestedUser._id} 
                                    onClick={() => dispatch(setSelectedUser(suggestedUser))} 
                                    className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'
                                >
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                                            {isOnline ? 'online' : 'offline'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center">No suggested users</p>
                    )}
                </div>
            </section>

            {/* Chat Section */}
            {selectedUser ? (
                <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                    <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                        <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span>{selectedUser?.username}</span>
                        </div>
                    </div>
                    
                    {/* Messages Component */}
                    <Messages selectedUser={selectedUser} />

                    {/* Message Input Box */}
                    <div className='flex items-center p-4 border-t border-t-gray-300'>
                        <Input 
                            value={textMessage} 
                            onChange={(e) => setTextMessage(e.target.value)} 
                            type="text" 
                            className='flex-1 mr-2 focus-visible:ring-transparent' 
                            placeholder="Messages..." 
                        />
                        <Button disabled={!selectedUser || !textMessage.trim()} onClick={() => sendMessageHandler(selectedUser?._id)}>
                            Send
                        </Button>
                    </div>
                </section>
            ) : (
                <div className='flex flex-col items-center justify-center mx-auto'>
                    <MessageCircleCode className='w-32 h-32 my-4' />
                    <h1 className='font-medium'>Your messages</h1>
                    <span>Send a message to start a chat.</span>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
