import React from "react";
import { home, chart, power, pcc, vishnu, logo, vishnu1, growth,green_fusion,gfit } from "../constants";
import { Link } from "react-router-dom";
import { Dropdown, Avatar } from "rsuite";

const Sidebar = () => {
  const renderToggle = (props) => <Avatar circle {...props} src={pcc} />;

  return (
    <div className="bg-[#2c2c2c] flex md:flex-col flex-row justify-between md:w-fit dark:bg-[#2c2c2c]">
      <ul className="flex md:flex-col gap-4 flex-row text-nowrap mx-5 md:my-4 justify-between">
        <li className="w-full text-lg font-medium rounded-lg md:my-2 my-6 md:mx-[8px] ">
          {/* <img src={vishnu1} className="w-8" alt="add" /> */}
          <img src={gfit} className="w-10" alt="" /> 
        </li>
        <li className="w-full text-lg font-medium cursor-pointer md:my-8 md:mx-2 ml-5 my-6">
          <Link to="/">
            <img src={home} alt="add" className="w-[30px]" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-2 md:ml-2 ml-4  my-6">
          <Link to="/graphs">
            <img src={chart} alt="add" />
          </Link>
        </li>
        <li className="w-full text-lg font-medium rounded-lg cursor-pointer md:my-9 md:mx-2 ml-5 my-6">
        <Dropdown renderToggle={renderToggle} className="absolute">
          <div className="bg-[#2c2c2c] p-2 mt-2 border rounded-lg text-white">
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black"><Link to='/pcc1'>PCC1</Link></Dropdown.Item>
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black"><Link to='/pcc2'>PCC2</Link></Dropdown.Item>
            <Dropdown.Item className="hover:bg-white px-2 rounded-sm hover:text-black"><Link to='/pcc3'>PCC3</Link></Dropdown.Item>
            </div>
          </Dropdown>
        </li>
        <li className="w-full text-lg font-medium rounded-lg md:my-6 md:ml-2 ml-4  my-6">
          <Link to="/sensordata">
            <img src={growth} alt="add" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
