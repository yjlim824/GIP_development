import React, { useEffect, useState , useRef }  from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Image from 'next/image';
import Head from 'next/head';

import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import DashTotalInfo from '../components/info/DashTotalInfo';
import DashSoleInfo from '../components/info/DashSoleInfo';
import charticon from '../public/images/chart_icon.png';
import { LOAD_MY_INFO_REQUEST } from '../reducers/auth';
import wrapper from '../store/configureStore';

import DoughnutChart from '../components/charts/dashDoughnutChart';
import LineChart from '../components/charts/dashLineChart';
import BarChart from '../components/charts/dashBarChart';


const Background = styled.div`
  height:880px;
  .iframeBox {
    position:relative
    width: 100%;
    height: 820px;

  }
  .iframe {
    width: 100%;
    height: 100%;
  }
  .overlayleft {
    position:absolute;
    display: grid;
    grid-template-columns: 5fr 1fr;
    width: 50px;
    height: 820px;
  }
  .overlaydash {
    width: 450px;
    height: 820px;
    background: rgba(255,255,255,0.7);
    transform: translate(0px, 0px);
    transition-duration: 0.5s;
  }

  .trans {
    transform: translate(-500px, 0px);
    transition-duration: 0.5s;
  }

  .reverse {
    transform: scaleX(-1) translate(500px, 0px);
  }

  
  .column {
    width: 95%;
    margin: 5px 2.5% 5px 2.5%;
    display: grid;
    text-align: center;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
    font-weight: bold;
  }

  .overlayright {
    position:absolute;
    right: 0;
    display: grid;
    width: 430px;
    height: 820px;
    background: rgba(255,255,255,0.8);
    //text-align: center;
    
  }

  .overlaychart {
    width: 80%;
    height: 820px;
    margin-left: 12%;
  }


  .chart {
    height: 150px;
  }

  .chartd {
    width: 80%;
    margin-left: 10%;
  }

  .charttitle {
    font-weight:bold;
    font-size: 11pt;
    color: black;
    margin-bottom:15px;
    margin-left: -20px;
  }
 
  .darkback{
    .overlay{
    background: rgba(146,155,180,0.4);
  }}

  .scannerbtn {
    margin: 30px;
  }

`;

const Home = () => {
  
  const dispatch = useDispatch();
  const { me, lastMonday, lastSunday, today, ago7day, yesterday } = useSelector((state) => state.auth); 

  const [allWeekInfo, setAllWeekInfo] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [lastWeekRevisit, setLastWeekRevisit] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [todayVisitorTotalChartDatas, setTodayVisitorTotalChartDatas] = useState([0,0,0,0,0,0,0,0]);
  const [todayCurrentVisitorChartDatas, setTodayCurrentVisitorChartDatas] = useState([0,0,0,0,0,0,0,0]);

  const [daylabel1, setDaylabel1] = useState([]);
  const [daylabel2, setDaylabel2] = useState([]);
  //const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077];
  const mainzones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '무지개빛 해안도로(부잔교갯벌탐방)', '팔포음식특화거리', '남일대해수욕장', '무지개빛 해안도로(대포항)'];
  const zoneAll = '사천 관광지 전체 1차 & 2차';

  useEffect (() => {

  if (!(me && me.id)) {
      Router.replace('/login');
    }
   }, [me && me.id]);

   const getAPIdata = async () => {
    //console.log('시작');
 
    
    try {

       //지난주 방문객 추이
        const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=`+ago7day+'&to='+yesterday); 
        //const response1 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=2021-10-01&to=2021-10-07`);    
        
  
        var zone_all = [];         
        var dayLabel = [];
        var lastdata = 0;
        var lastday = 0;
            
        for (let i of response1.data) {
          console.log(i)
          if(i.time.slice(0,10) !== yesterday) {
            if (i.zone === zoneAll) {
                zone_all.push(i.data);
                dayLabel.push(i.time.slice(5,10));
                console.log(i.data);
            }   
          }
          if(i.time.slice(0,10) === yesterday) {
            if (i.zone === zoneAll) {
                lastdata = i.data;
                lastday = i.time.slice(5,10);
            }   
          }
        }


        setAllWeekInfo(zone_all);
        setDaylabel1(dayLabel);
        //console.log('지난주방문객추이')

     

    } catch (err) {
        console.error(err);
    }


   try {      
    // 현재존별방문객비율
    const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`);

    //const response3 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);
    
    //let resultList = [];
    var zoneData = [0,0,0,0,0,0,0,0]
    for (let i of response3.data) {
      if (i.zone === mainzones[0]) {
        zoneData[0] = i.data;
      } else if (i.zone === mainzones[1]) {
       zoneData[1] = i.data;
      } else if (i.zone === mainzones[2]) {
       zoneData[2] = i.data;
      } else if (i.zone === mainzones[3]) {
       zoneData[3] = i.data;
      } else if (i.zone === mainzones[4]) {
       zoneData[4] = i.data;
      } else if (i.zone === mainzones[5]) {
       zoneData[5] = i.data;
      } else if (i.zone === mainzones[6]) {
       zoneData[6] = i.data;
      } 
    }

    setTodayCurrentVisitorChartDatas(zoneData);
    //console.log('현재방문객추이',todayCurrentVisitorChartDatas);
    

  } catch (err) {
      console.error(err);
  }

  try {      
    // 지난주 재방문객

    //const response4 = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from=2021-10-01&to=2021-10-07`);
    const response4 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit?from=`+ago7day+'&to='+yesterday);

    
    var day_all = []; 
    var dayLabels = [];   
    var lastdata = 0;
    var lastday = 0;     

            

        for (let i of response4.data) {
          if(i.time.slice(0,10) !== yesterday) {
            if (i.zone === zoneAll) {
                day_all.push(i.data);
                dayLabels.push(i.time.slice(5,10));
            }   
          }
          if(i.time.slice(0,10) === yesterday) {
            if (i.zone === zoneAll) {
                lastdata = i.data;
                lastday = i.time.slice(5,10);
            }   
          }
        }


        setLastWeekRevisit(day_all);
        setDaylabel2(dayLabels);
    

  } catch (err) {
      console.error(err);
  }

}

useEffect (() => {
  getAPIdata();
  setInterval(getAPIdata, 1800000)
}, []);
 



  return (  

    <Background>
      <div className='lightback'>
        <Header/>
        <Nav value={'1'}/>
        <div className='overlayleft'>
          <div className='overlaydash' >
            <DashTotalInfo theme={me? me.theme:''}/>
            <DashSoleInfo />
          </div>
        </div>
        <div className='overlayright'>      
          <div className='overlaychart'>
            <br />
            <div>
              <div className='charttitle' ><Image src={charticon} width={10} height={10} /> 전체 관광지 지난주 방문객 추이</div>
              <BarChart className="chart" datas = {allWeekInfo} daylabel={daylabel1}/> 
            </div>  
            <br />
            <div>
              <div className='charttitle' ><Image src={charticon} width={10} height={10} /> 전체 광광지 지난주 재방문객 추이</div>
              <LineChart className="chart" datas = {lastWeekRevisit} daylabel={daylabel2}/>
            </div>
            <br />
            <div >
             <div className='charttitle' ><Image src={charticon} width={10} height={10} /> 주요 관광지 실시간 방문객</div>
              <div className="chartd" ><DoughnutChart datas = {todayCurrentVisitorChartDatas}/></div>
            </div>
            
            
          </div>  
        </div>
        <div className='iframeBox'><iframe className='iframe' src="./map" /></div>        
      </div>      
    </Background>

  )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
  const cookie = req ? req.headers.cookie : '';
  //쿠키 공유되는 문제 해결
  axios.defaults.headers.Cookie = ''; 
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;