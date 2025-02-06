import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers = [] } = useSelector(store => store.auth); // ✅ Prevents `undefined` error

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                    <div key={user?._id || Math.random()} className='flex items-center justify-between my-5'>
                        <div className='flex items-center gap-2'>
                            <Link to={`/profile/${user?._id}`}>
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture || '/default-avatar.png'} alt="user_avatar" />
                                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <h1 className='font-semibold text-sm'>
                                    <Link to={`/profile/${user?._id}`}>{user?.username || 'Unknown User'}</Link>
                                </h1>
                                <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                            </div>
                        </div>
                        <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-sm mt-5">No suggestions available.</p>
            )}
        </div>
    );
}

export default SuggestedUsers;
