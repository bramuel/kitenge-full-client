import React, { useState } from "react";
// import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./RightMenu";
import { message } from "antd";
import { Link, withRouter } from "react-router-dom";
import { searchItems } from "../../_actions/searchActions";
import { useDispatch } from "react-redux";
import {
  SearchIcon,
  MenuIcon,
  CreditCardIcon,
  ClockIcon,
  ThumbUpIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/solid";
import styled from "styled-components";
import { CameraIcon } from "@heroicons/react/outline";

function NavigationBar({ props, activateOption }) {
  const [visible, setVisible] = useState("hidden");
  const [sidebar, setSidebar] = useState(false);
  const activate = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  async function onSearch() {
    dispatch(searchItems({ keyword: "amazing", min_videos: "1" }));
    message.info("Waaaaaaat!!!");
    // await axios.post('/andeyo',{keyword:"amazing",min_videos:1}).then(response=>{
    //   setPosts(response.data)
    //   console.log(posts)
    // }).catch(err=>console.log(err))
    setTimeout(() => {
      props.history.push("/searched");
    }, 1000);
  }

  return (
    <>
      <Navbar className="desktop__navbar shadow-lg" data-testid="nav">
        <div className="p-2 flex flex-row space-x-2 items-center">
          <MenuIcon
            className="h-5 text-gray-800"
            onClick={activateOption ? activate : null}
          />
          <Link to="/" className="text-gray-700 font-semibold text-xl">
            Do3ensKE
          </Link>
          {/* <Row justify="center">
          <Col span={6}>
            <Search placeholder="Search.." onSearch={onSearch} />
          </Col>
        </Row> */}
        </div>

        <div
          style={{ width: "30rem" }}
          className="bg-gray-100 flex flex-row items-center content-center space-x-2 rounded-full"
        >
          <div className="flex flex-row content-center items-center">
          <CameraIcon className="h-10 p-2 mr-1 text-gray-400" />
          
          </div>


          <input
            placeholder="Search..."
            className=" text-sm w-full focus:outline-none bg-transparent"
            onClick={() => setVisible("visible")}
          />
         <SearchIcon className="h-10 text-gray-400 p-1.5" />

        </div>
        {/* <div
          style={{
            position: "fixed",
            width: "50%",
            height: "100px",
            top: "53px",
            backgroundColor: "white",
            zIndex: "4",
            left: "50%",
            right: "50%",
            transform: " translate(-50%, 0%)",
            visibility: visible,
          }}
          className="rounded-md shadow-md p-2"
        >
          <XIcon className="h-5" onClick={() => setVisible("hidden")} />
          Searchin...
        </div> */}

        <div>
          <RightMenu mode="horizontal" />
        </div>
      </Navbar>
      <Sidenav
        className={
          sidebar
            ? "nav-menu active flex flex-row items-center content-center"
            : "nav-menu"
        }
      >
        <ul className="leading-8 ">
          <Li>
            <HomeIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className=" text-sm text-gray-700">Home</div>
          </Li>

          <hr className="text-white p-2" />
          <Li>
            <CreditCardIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <div className="text-sm text-gray-700">Purchases </div>
          </Li>
          <Li>
            <ShoppingBagIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <div className="text-sm text-gray-700">Your products </div>
          </Li>

          <Li>
            <ClockIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className="text-sm text-gray-700">Recent purchases </div>
          </Li>
          <hr className="text-white py-2" />
          <Li>
            <ThumbUpIcon className="h-5 ml-3  text-gray-500 mr-4" />
            <div className="text-sm  text-gray-700">Liked Items</div>
          </Li>
          <Li>
            <DotsCircleHorizontalIcon className="h-5 ml-3 text-gray-500 mr-4" />
            <div className="text-sm  text-gray-700">More Items</div>
          </Li>
        </ul>
      </Sidenav>
    </>
  );
}

export default withRouter(NavigationBar);

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0%;
  z-index: 20;
  padding: 0.3rem;
  background-color: white;
`;

const Sidenav = styled.nav`
  padding-top: 3.77rem;
  width: 17%;
  height: 100%;
  background-color: white;
  display: fixed;
  z-index: 1;
  text-align: center;
`;

const Li = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  align-content: center;
  padding: 0.2rem;
  :hover {
    cursor: pointer;
    color: gray;
    /* background-color: white; */
  }
  color: black;
  margin: 0.3rem;
`;
