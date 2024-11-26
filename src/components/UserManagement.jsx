import React, { useState } from 'react';

const UserManagement = () => {
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Employee_1', role: 'Admin' },
    { id: 2, name: 'Employee_2', role: 'Viewer' },
    { id: 3, name: 'Employee_3', role: 'Editor' }
  ]);
  const [newUser, setNewUser] = useState('');
  const [newRole, setNewRole] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState('');

  const addUser = () => {
    if (newUser && newRole) {
      setUsers([...users, { id: Date.now(), name: newUser, role: newRole }]);
      setNewUser('');
      setNewRole('');
    }
  };

  
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };


  const startEditing = (user) => {
    setEditingUser(user);
    setNewUser(user.name);
    setNewRole(user.role);
  };


  const saveEdit = () => {
    setUsers(users.map(user => (user.id === editingUser.id ? { ...user, name: newUser, role: newRole } : user)));
    setEditingUser(null);
    setNewUser('');
    setNewRole('');
  };

  return (
    <div style={{margin:20}}>
      <h2 style={{textAlign:'center'}}>User Management</h2>
      <input
        type="text"
        placeholder="Search Users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px',paddingRight:'5px', width: '100%' ,borderRadius:10}}
      />
      <br />
      <input
        type="text"
        placeholder="User Name"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        style={{marginRight:'20px',borderRadius:'10px'}}
      />
      <input
        type="text"
        placeholder="Role"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        style={{marginRight:'20px',borderRadius:'10px'}}
      />
      {editingUser ? (
        <button style={{marginRight:'20px'}} onClick={saveEdit}>Save</button>
      ) : (
        <button style={{marginRight:'20px',borderRadius:'10px'}} onClick={addUser}>Add User</button>
      )}
      <table border="0.5" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
            .map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button style={{borderRadius:'10px',marginRight:'15px'}} onClick={() => startEditing(user)}>Edit</button>
                  <button style={{borderRadius:'10px',marginRight:'15px'}} onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
