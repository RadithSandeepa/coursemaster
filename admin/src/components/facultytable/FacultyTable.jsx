import "./facultytable.scss";
import { Skeleton, Table } from "antd";
import { UilTrashAlt,  UilEye, UilPlusCircle } from '@iconscout/react-unicons';
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const FacultyTable = ({columns}) => {

    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const path2 = location.pathname.split("/")[2];
    const { user } = useContext(AuthContext);
   
     const [list, setList] = useState();
     const { data, loading, error } = useFetch(`/${path}/${user.details._id}/assigned`);
  
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
        <Link to={`/${path}/${path2}/${record._id}`}>
        <div className="edit button">< UilEye /></div>
        </Link>
        {path !== 'courses' && (
        <div className="delete button" onClick={() => handleDelete(record._id)}><UilTrashAlt /></div>
        )}
      </div>
      );
    };
  
    // Handle delete action
    const handleDelete = async (id) => {
      try{
        await axios.delete(`/${path}/${user.details._id}/myBookings/${id}`)
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
    <div className="facultytable">
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
        {path !== 'courses' && (
        <div className="add-container">
          <Link to={`/${path}/${path2}/add`}>
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

export default FacultyTable;