import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./addcontent.scss";

const AddContent = () => {
  return (
    <div className="addcontent">
         <Sidebar />
        <div className="right">
           <Navbar  />
           <div className="box">
            <div className="leftbox">
              <div className="wrapper">
                   
              </div>
            </div>
            <div className="rightbox">
              <div className="title">
                <h1>Content</h1> 
              </div>
             
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddContent;