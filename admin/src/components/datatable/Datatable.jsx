import "./datatable.scss";
import { Table, Skeleton } from "antd";
import { UilTrashAlt,  UilEye, UilPlusCircle } from '@iconscout/react-unicons';
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

   const [list, setList] = useState();
   const { data, loading, error } = useFetch(`/${path}`);

  //  useEffect(() => {
  //       setList(data);
  //  }, [data]);

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
            <Link to={`/${path}/${record._id}`}>
            <div className="edit button">< UilEye /></div>
            </Link>
            <div className="delete button" onClick={() => handleDelete(record._id)}><UilTrashAlt /></div>
          </div>
        );
      };
    
      // Handle delete action
      const handleDelete = async (id) => {
          try{
            await axios.delete(`/${path}/${id}`)
            toast.success('Record has been deleted');
          }catch(err){
            console.log(err);
            if (err.response && err.response.status === 403) {
              toast.error(err.response.data);
          } else {
              toast.error('Oops! Something went wrong.');
          }
          }
          setList(list.filter(item => item._id !== id));
      };

      const actionColumn = {
        title: "Action",
        key: "action",
        width: 200,
        align: 'center',
        render: renderActions, // Apply custom rendering function
      };
    

  return (
    <div className="datatable">
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
          <div>
          {path !== 'bookings' && (
          <div className="add-container">
            <Link to={`/${path}/add`}>
              <UilPlusCircle className="add" />
            </Link>
          </div>
          )}
          <div className="container">
          <Table className="table" columns={[...columns, actionColumn]} dataSource={ list}  search={true}  pagination={{ pageSize: 8 }} scroll={{ x: true }} rowKey="_id"/>
          </div>
        
         </div>
      )}
    </div>
  )
}

export default Datatable;