import React, { useState, useEffect } from 'react';
import api from '../../services/API';
import { showToast } from '../../utils/toast';
import EditUserModal from './EditUserModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Layout from '../Layout/Layout';
import "../../styles/AdminDashboard.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/get-all-users');
      setUsers(response.data.users);
    } catch (error) {
      showToast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/admin/remove-user/${userToDelete._id}`);
      setUsers(users.filter(user => user._id !== userToDelete._id));
      showToast.success('User deleted successfully');
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      showToast.error('Failed to delete user');
    }
  };

  const handleSuspendUser = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/update-user-status/${userId}`, {
        status: currentStatus === 'suspended' ? 'active' : 'suspended'
      });
      setUsers(users.map(user => {
        if (user._id === userId) {
          return { ...user, status: currentStatus === 'suspended' ? 'active' : 'suspended' };
        }
        return user;
      }));
      showToast.success(`User ${currentStatus === 'suspended' ? 'reactivated' : 'suspended'} successfully`);
    } catch (error) {
      showToast.error('Failed to update user status');
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await api.put(`/admin/update-user/${userData._id}`, userData);
      setUsers(users.map(user => 
        user._id === userData._id ? { ...user, ...userData } : user
      ));
      setShowEditModal(false);
      showToast.success('User updated successfully');
    } catch (error) {
      showToast.error('Failed to update user');
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <Layout>
      <div className="user-management">
        <h2>User Records</h2>
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className={user.status === 'suspended' ? 'suspended' : ''}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status || 'active'}</td>
                  <td className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className={`suspend-btn ${user.status === 'suspended' ? 'reactivate' : ''}`}
                      onClick={() => handleSuspendUser(user._id, user.status)}
                    >
                      {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editingUser && (
          <EditUserModal
            isOpen={showEditModal}
            user={editingUser}
            onClose={() => {
              setShowEditModal(false);
              setEditingUser(null);
            }}
            onSave={handleEditUser}
          />
        )}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          userName={userToDelete?.name || ''}
          onClose={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
          onConfirm={handleDeleteUser}
        />
      </div>
    </Layout>
  );
};

export default UserManagement;
