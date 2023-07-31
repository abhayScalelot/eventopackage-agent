import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../api/baseUrl';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { getProfileDetail } from '../Profile/profileSlice';

const Dashboard = () => {

  const profile = getProfileDetail()
  const agentId = profile._id

  console.log('agentId', agentId)
  // const [profile, setProfile] = useState([])


  console.log('agentId', agentId)
  const token = useSelector(state => state.auth.user.token);

  const [pageNo, setPageNo] = useState(1);
  const [organizers, setOrganizers] = useState([]);

  const limit = 5;
  // const token = localStorage.getItem("Token");
  const header = {
    'Authorization': `Token ${token}`,
  }

  const organizerList = async () => {
    const requestObj = {
      page: pageNo,
      limit: limit,
    }

    try {
      console.log("headerheader", header);
      const response = await axios.post(`${baseUrl}/agent/organisers`, requestObj, { headers: header })


      setOrganizers(response.data.Data.docs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    organizerList();
  }, [pageNo])

  const columns = [
    { field: 'name', header: ' Organizer Name' },
    { field: `email`, header: 'Email' },
    { field: 'mobile', header: 'Phone Number' },
    { field: 'address', header: 'Address' },
    { field: 'mobileverified', header: 'Mobile Verified' },
    { field: 'is_approved', header: 'Is Approved' },
    { field: 'status', header: 'Status' },
  ];


  return (
    <div className="wrapper">
      <div className="flex justify-between items-center pt-4 mb-5" >
        <h1>Organizer List</h1>
        <button
          onClick={() => window.open(`http://localhost:3001/auth/register?agent_id=${agentId}`, '_blank')}
          className="btn-primary small">
          Add Organizer
        </button>
      </div>

      <DataTable value={organizers}>
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  )
}

export default Dashboard
