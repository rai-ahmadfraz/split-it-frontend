'use client';
import React, { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import { User } from '@/interfaces/user';
import { friendService } from '@/services/friendService';



const AddFriend: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingFriend, setAddingFriend] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Debounced search
  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length < 3) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const results = await userService.searchUsers(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

//   const handleAddFriend = async (userId: number) => {
//     setAddingFriend(userId);
//     setMessage(null);

//     try {
//       await userService.addFriend(userId);
//       setMessage({ type: 'success', text: 'Friend added successfully!' });
//       setSearchQuery('');
//       setSearchResults([]);
      
//       // Notify parent component if needed
//       if (onFriendAdded) {
//         onFriendAdded();
//       }
//     } catch (error: any) {
//       setMessage({ 
//         type: 'error', 
//         text: error.message || 'Failed to add friend' 
//       });
//     } finally {
//       setAddingFriend(null);
//     }
//   };

  const clearMessage = () => {
    setMessage(null);
  };

  const addFriend = async (friendId:number) => {
    const results = await friendService.addNewFriend(friendId);
  }

  return (
    <div className="container-fluid py-3 bg-light" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 mb-0">Add Friends</h1>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
          <p className="text-muted small mt-1">Search and connect with friends</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
            <div className="card-body">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ fontSize: '0.9rem' }}
                />
                {searchQuery && (
                  <button
                    className="btn btn-link text-muted border-0"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div className="row mb-3">
          <div className="col-12">
            <div 
              className={`alert alert-dismissible ${
                message.type === 'success' ? 'alert-success' : 'alert-danger'
              }`}
              style={{ borderRadius: '12px' }}
            >
              {message.text}
              <button
                type="button"
                className="btn-close"
                onClick={clearMessage}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="row">
        <div className="col-12">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted small mt-2">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="card shadow-sm" style={{ border: 'none', borderRadius: '12px' }}>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {searchResults.map((user) => (
                    <div
                      key={user.email}
                      className="list-group-item d-flex justify-content-between align-items-center p-3"
                      style={{ border: 'none' }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <i className="bi bi-person text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">{user.name}</h6>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                      <button className='btn btn-sm' onClick={() => addFriend(user.id)}>Add</button>
                      {/* <button
                        className={`btn btn-sm ${
                          addingFriend === user.id
                            ? 'btn-outline-secondary'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => handleAddFriend(user.id)}
                        disabled={addingFriend === user.id}
                        style={{ borderRadius: '8px', minWidth: '80px' }}
                      >
                        {addingFriend === user.id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Adding
                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus me-1"></i>
                            Add
                          </>
                        )}
                      </button> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : searchQuery.length >= 3 && !loading ? (
            <div className="text-center py-4">
              <i className="bi bi-search display-4 text-muted mb-3"></i>
              <p className="text-muted">No users found</p>
              <small className="text-muted">
                Try searching with a different name or email
              </small>
            </div>
          ) : (
            <div className="text-center py-4">
              <i className="bi bi-person-plus display-4 text-muted mb-3"></i>
              <p className="text-muted">Search for friends to add</p>
              <small className="text-muted">
                Enter at least 3 characters to start searching
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;