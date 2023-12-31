import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/bingeit.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
     window.scrollTo(0,0);
    },[location]);

    const gotoHome=()=>{
      navigate("/");
    }
    const openSearch=()=>{
      setShowSearch(true);
      setMobileMenu(false);
    }
    const openMobileMenu=()=>{
      setMobileMenu(true);
      setShowSearch(false);
    }
    const searchqueryhandler=(event)=>{
      if(event.key=="Enter" && query.length>0){
         navigate(`/search/${query}`)
         setShowSearch(false);
      }
      // setTimeout(() => {
      //   setShowSearch(false);
      // }, 3000);
      }
    const navigationhandler=(type)=>{
          navigate(`/explore/${type}`);
          setMobileMenu(false);
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if(currentScrollY>100){
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    }else{
      setShow("top");
    }
    setLastScrollY(currentScrollY);
    }
    useEffect(()=>{
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    },[lastScrollY]);
    return (
        <header className={`header ${mobileMenu? "mobileView":""} ${show}`}> 
          <ContentWrapper>
            <div className="logo">
              <img src={logo} alt="" onClick={gotoHome}/>
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigationhandler("movie")}>Movies</li>
              <li className="menuItem" onClick={()=>navigationhandler("tv")}>TV Shows</li>
              <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch} />
              {mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
            </div>
          </ContentWrapper>
          {showSearch && <div className="searchBar">
            <ContentWrapper >
            <div className="searchInput">
            <input type='text' placeholder='Search for a movie or tv show.....' onChange={(e)=>setQuery(e.target.value)} onKeyUp= 
                 {searchqueryhandler}/>
            <VscChromeClose onClick={()=>setShowSearch(false)} />
            </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};
export default Header;