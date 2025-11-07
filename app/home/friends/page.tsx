"use client";
import React, { useEffect, useState } from 'react';
import { friendService } from '@/services/friendService';
import { getRandomColor,getInitials } from '@/lib/commonFilter';
import Link from 'next/link';
interface Friend {
  id: number;
  name: string;
  email: string;
}

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendService.getFriends();
        setFriends(data); 
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Add Friend Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h2 text-dark fw-bold mb-1">Friends</h1>
            <p className="text-muted mb-0">Your friends list ({friends.length} friends)</p>
          </div>
            <Link href={'friends/add'}>
                <button className="btn btn-primary">
                    <i className="fas fa-user-plus me-2"></i>
                    Add New Friend
                </button>
            </Link>

        </div>

        {/* Friends List */}
            <div className="d-flex flex-column gap-3">
                {friends.map((friend) => (
                    <div key={friend.id} className="card shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <div
                            className={`rounded-circle bg-${getRandomColor(friend.name)} bg-opacity-10 d-flex align-items-center justify-content-center me-3`}
                            style={{ 
                                width: '50px', 
                                height: '50px',
                                minWidth: '50px'
                            }}
                            >
                            <span className={`text-${getRandomColor(friend.name)} fw-bold`}>
                                {getInitials(friend.name)}
                            </span>
                            </div>
                            <div>
                            <h6 className="mb-0 text-dark fw-semibold">{friend.name}</h6>
                            <small className="text-muted">{friend.email}</small>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
      </div>
    </div>
  );
};

export default Friends;