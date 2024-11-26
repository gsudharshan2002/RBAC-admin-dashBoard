import React from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';

const App = () => {
  return (
    <div style={{position:'absolute',top:'15px', left:'25%', width:'50%',backgroundColor:'lightblue', boxShadow:'0 4px 8px 0 rgba(0,0,0,0.5),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
      <h1 style={{marginTop:'20px',textAlign:'center'}}>RBAC Admin Dashboard</h1>
      <UserManagement />
      <RoleManagement />
    </div>
  );
};

export default App;
