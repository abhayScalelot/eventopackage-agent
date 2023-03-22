import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {

 const agentId = useSelector(state => state.auth.user.agentid);

  return (
    <div className="wrapper">
      <div className="flex justify-between items-center pt-4" >
        <h1>Organizer List</h1>

        <button
          className="btn-primary small">
          <a href={`https://eventopackage.com/auth/register?agent_id=${agentId}`} target={"_blank"}>
          Add Organizer</a>
        </button>
      </div>
    </div>

  )
}

export default Dashboard
