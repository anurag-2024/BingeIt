import { useEffect} from 'react'
import { fetchDatafromApi } from './utilis/api';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from './store/homeSlice';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/home";
import Details from "./pages/details/details";
import SearchResult from "./pages/searchResult/searchresult";
import Explore from "./pages/Explore/explore";
import PageNotFound from "./pages/404/PageNotFound"; 
function App() {
  const dispatch = useDispatch();
  const {url}=useSelector((state)=>state.home);
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  const fetchApiConfig=()=>{
    fetchDatafromApi("/configuration")
      .then((res)=>{
        // console.log(res);
        const url={
          backdrop:res.images.secure_base_url+"original",
          poster:res.images.secure_base_url+"original",
          profile:res.images.secure_base_url+"original",
        }
        // console.log(url);
        dispatch(getApiConfiguration(url));
      })
      .catch((err)=>{
        console.log(err);
        
      })
  }
  const genresCall=async()=>{
    let promises=[];
    let endPoints=["tv","movie"];
    let allGenres={};
    endPoints.forEach((url)=>{
      promises.push(fetchDatafromApi(`/genre/${url}/list`));
    });
    // console.log(promises);
    const data=await Promise.all(promises);
    // console.log(data);
    data.map(({genres})=>{
       return genres.map((item)=>(
          allGenres[item.id]=item
       ))
    })
    // console.log(allGenres);
    dispatch(getGenres(allGenres));
  }
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
     <Footer /> 
    </BrowserRouter>
  )
}

export default App
