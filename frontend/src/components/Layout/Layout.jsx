import MainHeader from "./MainHeader.jsx";
import Sidebar from "./Sidebar.jsx";
import "../../styles/Layout.css"

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="header">
        <MainHeader />
      </div>
      <div className="content">
        <div className="left-content">
          <Sidebar />
        </div>
        <div className="right-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
