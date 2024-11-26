import React, { useState } from 'react';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'TeamLead', permissions: ['Read'] },
    { id: 3, name: 'Admin', permissions: ['Read', 'Write','Delete'] }
  ]);
  const [newRole, setNewRole] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [search, setSearch] = useState('');

  const addRole = () => {
    if (newRole && newPermission) {
      setRoles([...roles, { id: Date.now(), name: newRole, permissions: [newPermission] }]);
      setNewRole('');
      setNewPermission('');
    }
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const startEditing = (role) => {
    setEditingRole(role);
    setNewRole(role.name);
    setNewPermission(role.permissions.join(', '));
  };

  const saveEdit = () => {
    setRoles(roles.map(role => (role.id === editingRole.id ? { ...role, name: newRole, permissions: newPermission.split(', ') } : role)));
    setEditingRole(null);
    setNewRole('');
    setNewPermission('');
  };

  return (
    <div style={{margin:20}}>
      <h2>Role Management</h2>
      <input
        type="text"
        placeholder="Search Roles"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%',borderRadius:10 ,}}
      />
      <br />
      <input
        type="text"
        placeholder="Role Name"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        style={{marginRight:'20px',borderRadius:10}}
      />
      <input
        type="text"
        placeholder="Permissions (comma-separated)"
        value={newPermission}
        onChange={(e) => setNewPermission(e.target.value)}
        style={{marginRight:'20px',borderRadius:10}}
      />
      {editingRole ? (
        <button onClick={saveEdit} style={{marginRight:15}}>Save</button>
      ) : (
        <button onClick={addRole} style={{borderRadius:10}}>Add Role</button>
      )}
      <table border="0.5" style={{ marginTop: '20px', width: '100%',}}>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles
            .filter(role => role.name.toLowerCase().includes(search.toLowerCase()) || 
                            role.permissions.some(permission => permission.toLowerCase().includes(search.toLowerCase())))
            .map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>
                  <button style={{borderRadius:10,marginRight:'15px'}} onClick={() => startEditing(role)}>Edit</button>
                  <button style={{borderRadius:10,marginRight:'15px'}} onClick={() => deleteRole(role.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
