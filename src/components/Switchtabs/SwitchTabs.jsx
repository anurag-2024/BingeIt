import React ,{useState} from 'react';
import "./style.scss";
const SwitchTabs = ({data,onTabChange}) => {
    const [selectedtab,setSelectedTab]=useState(data[0]);
    const [left,setleft]=useState(0);
    const activeTab=(tab,index)=>{
        setleft(index*100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab,index);
    }
  return (
    <div className='switchingTabs'>
        <div className='tabItems'>
            {data.map((tab,index)=>(
                <span className='tabItem' key={index} onClick={()=>activeTab(tab,index)}>{tab}</span>
            ))}
            <span className='movingBg' style={{left}} />
        </div>
    </div>
  )
}

export default SwitchTabs
