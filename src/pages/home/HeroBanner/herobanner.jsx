import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/usefetch';
import Img from '../../../components/lazyloadImg/img';
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import "./style.scss";
const herobanner = () => {
    const [background,setbackground]=useState("");
    const [query,setquery]=useState("");
    const navigate=useNavigate();
    const {url}=useSelector((state)=>state.home);
    const {data,loading}=useFetch("/movie/upcoming");
    useEffect(()=>{
       const bg=url.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
       setbackground(bg);
    },[data]);
    const searchqueryhandler=(event)=>{
    if(event.key=="Enter" && query.length>0){
       navigate(`/search/${query}`)
    }
    }
  return (
    <div className='heroBanner'>
    {!loading && <div className='backdrop-Img'> <Img src={background} /></div>}
    <div className='opacity-layer'></div>
    <ContentWrapper>
        <div className='heroBannerContent'>
            <span className='title'>Welcome</span>
            <span className='subTitle'>Millions of movies,TV shows and people to discover. Explore now.</span>
            <div className='searchInput'>
                <input type='text' placeholder='Search for a movie or tv show.....' onChange={(e)=>setquery(e.target.value)} onKeyUp= 
                 {searchqueryhandler}/>
                <button onClick={()=>navigate(`/search/${query}`)}>Search</button>
            </div>
        </div>
    </ContentWrapper>
    </div>
  )
}

export default herobanner
