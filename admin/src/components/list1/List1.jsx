import "./list1.scss";
import { Skeleton, Table } from "antd";
import {UilTimes, UilCheck } from '@iconscout/react-unicons';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const List1 = ({columns}) => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];

   const [list, setList] = useState();
   const { data, loading, error } = useFetch(`/${path}/check/pending`);

   useEffect(() => {
    if (error) {
      toast.error('Oops! Something went wrong.');
    } else {
      setList(data);
    }
  }, [error, data]);


  const renderActions = (text, record) => {
    return (
      <div className="btns">
        <div className="edit button" onClick={() => handleAccept(record)}><UilCheck /></div>
        <div className="delete button" onClick={() => handleReject(record)}><UilTimes/></div>
      </div>
    );
  };

  const handleAccept = async (record) => {
    try {
      await axios.put(`/${path}/pending/${record._id}/resolve`, { status: 'A' });
      setList((prevList) => prevList.filter(item => item._id !== record._id));
      toast.success('Record resolved successfully');
    } catch (err) {
      console.log(err);
      toast.error('Unknown error occurred!');
    }
  }

  // Handle delete action
  const handleReject = async (record) => {
    try {
      await axios.put(`/${path}/pending/${record._id}/resolve`, { status: 'R' });
      setList((prevList) => prevList.filter(item => item._id !== record._id));
      toast.success('Record rejected successfully');
    } catch (err) {
      console.log(err);
      toast.error('Unknown error occurred!');
    }
  };

  const actionColumn = {
    title: "Action",
    key: "action",
    width: 200,
    align: 'center',
    render: renderActions, // Apply custom rendering function
  };


  return (
    <div className="list1">
      <Toaster
          position="bottom-right" 
          toastOptions={{ 
            style: { 
              minWidth: '400px',
              padding: '25px', // Adjust padding as needed
              background: '#fcf5f3'
            } 
          }} 
        />
      {loading ? (
         <div className="skeleton-container" style={{ height: "100vh" }}>
         <Skeleton className="skeleton" active paragraph={{rows: 15}}/>
         </div>
      ) : (
        <Table columns={[...columns, actionColumn]} dataSource={ list}  search={true}  pagination={{ pageSize: 8 }} scroll={{ x: true }} rowKey="_id"/>
      )}
    </div>
  )
}

export default List1;