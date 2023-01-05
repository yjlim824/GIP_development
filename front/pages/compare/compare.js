import React, { useEffect, useState , useRef }  from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';

import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import Status from '../../components/info/Status';
import ZoneInfo from '../../components/info/ZoneInfo';
import NavBottom from '../../components/common/NavBottom';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Background = styled.div`
  background-color: #f6f9fe;
  
  .darkback {
    background-color: #1b2137;
  }
  .iframeBox {
    width: 100%;
    height: 830px;
  }
  .iframe {
    width: 100%;
    height: 100%;
  }
  .compare_list {
    width: 100%;
    height: 100%;
    float: left;
    margin: 0 0 0 0;
    padding: 5px 10px 0 0;
  }
  .division { 
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
  }

`;

const Compare = () => {
  
  const dispatch = useDispatch();
  const slideEl = useRef(null);
  const [settings, setSettings] = useState({});
  const { me, yearFirst, today, yesterday } = useSelector((state) => state.auth);

  const [zoneInfo1, setZoneInfo1] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo2, setZoneInfo2] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo3, setZoneInfo3] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo4, setZoneInfo4] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo5, setZoneInfo5] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo6, setZoneInfo6] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo7, setZoneInfo7] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo8, setZoneInfo8] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo9, setZoneInfo9] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo10, setZoneInfo10] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo11, setZoneInfo11] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo12, setZoneInfo12] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo13, setZoneInfo13] = useState([0, 0, 0, 0, 0, 0]);
  const [zoneInfo14, setZoneInfo14] = useState([0, 0, 0, 0, 0, 0]);

  //const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077];
  //const zones = [1881, 1883, 1884, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2013, 2015, 2016];
  const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원', 2015, 2016];

  const arrY1 = [0, 0, 0, 0, 0, 0]; //"중심거리1", 
  const arrY2 = [0, 0, 0, 0, 0, 0]; //"중심거리2", 
  const arrY3 = [0, 0, 0, 0, 0, 0]; //"중심거리3", 
  const arrY4 = [0, 0, 0, 0, 0, 0]; //"북동거리", 
  const arrY5 = [0, 0, 0, 0, 0, 0]; //"동남거리", 
  const arrY6 = [0, 0, 0, 0, 0, 0]; //"동방거리", 
  const arrY7 = [0, 0, 0, 0, 0, 0]; //"서방거리", 
  const arrY8 = [0, 0, 0, 0, 0, 0]; //"서남거리", 
  const arrY9 = [0, 0, 0, 0, 0, 0]; //"중심거리3", 
  const arrY10 = [0, 0, 0, 0, 0, 0]; //"북동거리", 
  const arrY11 = [0, 0, 0, 0, 0, 0]; //"동남거리", 
  const arrY12 = [0, 0, 0, 0, 0, 0]; //"동방거리", 
  const arrY13 = [0, 0, 0, 0, 0, 0]; //"서방거리", 
  const arrY14 = [0, 0, 0, 0, 0, 0];

  const zoneName = ["용궁수산시장", "바다케이블카", "삼천포대교공원", "항공우주과학관", "팔포음식특화거리", "삼천포중앙시장", 
  "용두공원", "별주부전테마파크(입구)", "남일대해수욕장", "부잔교갯벌탐방로", "대포항", "초양정류장", "다솔사입구", "수양공원"]

  const getAPIdata = async () => { // 데이터 받아오기
    /**
     * 오늘자 방문객 그래프
     */
    try {       
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`);    

      //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);

      for (let i of responseToday.data) {
        if (i.zone === zones[0]) {
          arrY1[0] = i.data;
        } else if (i.zone === zones[1]) {
          arrY2[0] = i.data;
        } else if (i.zone === zones[2]) {
          arrY3[0] = i.data;
        } else if (i.zone === zones[3]) {
          arrY4[0] = i.data;
        } else if (i.zone === zones[4]) {
          arrY5[0] = i.data;
        } else if (i.zone === zones[5]) {
          arrY6[0] = i.data;
        } else if (i.zone === zones[6]) {
          arrY7[0] = i.data;
        } else if (i.zone === zones[7]) {
          arrY8[0] = i.data;
        } else if (i.zone === zones[8]) {
          arrY9.push(i.data);
        } else if (i.zone === zones[9]) {
          arrY10.push(i.data);
        } else if (i.zone === zones[10]) {
          arrY11.push(i.data);
        } else if (i.zone === zones[11]) {
          arrY12.push(i.data);
        } else if (i.zone === zones[12]) {
          arrY13.push(i.data);
        } else if (i.zone === zones[13]) {
          arrY14.push(i.data);
        }
        
      }
  
    } catch (err) {
        console.error(err);
    }

    /**
     * 이달의 누적 방문객 그래프
     */
    try {       
      const responseYesterdayStack = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${yearFirst}&to=${today}`);    
      //const responseYesterdayStack = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${yearFirst}&to=${today}`); 

      let arr1 = ["용궁수산시장", 0];
      let arr2 = ["바다케이블카", 0];
      let arr3 = ["삼천포대교공원", 0];
      let arr4 = ["항공우주과학관", 0];
      let arr5 = ["팔포음식특화거리", 0];
      let arr6 = ["삼천포중앙시장", 0];
      let arr7 = ["용두공원", 0];
      let arr8 = ["별주부전테마파크(입구)", 0];
      let arr9 = ["남일대해수욕장", 0];
      let arr10 = ["부잔교갯벌탐방로", 0];
      let arr11 = ["대포항", 0];
      let arr12 = ["초양정류장", 0];
      let arr13 = ["다솔사입구", 0];
      let arr14 = ["수양공원", 0];


      for (let i of responseYesterdayStack.data) {
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data)
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data)
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data)
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data)
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data)
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data)
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data)
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data)
        } else if (i.zone === zones[8]) {
          arrY9[1] = arrY9[1] + Number(i.data)
        } else if (i.zone === zones[9]) {
          arrY10[1] = arrY10[1] + Number(i.data)
        } else if (i.zone === zones[10]) {
          arrY11[1] = arrY11[1] + Number(i.data)
        } else if (i.zone === zones[11]) {
          arrY12[1] = arrY12[1] + Number(i.data)
        } else if (i.zone === zones[12]) {
          arrY13[1] = arrY13[1] + Number(i.data)
        } else if (i.zone === zones[13]) {
          arrY14[1] = arrY14[1] + Number(i.data)
        }
      }

      arrY1[1] = arr1[1];
      arrY2[1] = arr2[1];
      arrY3[1] = arr3[1];
      arrY4[1] = arr4[1];
      arrY5[1] = arr5[1];
      arrY6[1] = arr6[1];
      arrY7[1] = arr7[1];
      arrY8[1] = arr8[1];
      arrY9[1] = arr9[1];
      arrY10[1] = arr10[1];
      arrY11[1] = arr11[1];
      arrY12[1] = arr12[1];
      arrY13[1] = arr13[1];
      arrY14[1] = arr14[1];

  
    } catch (err) {
        console.error(err);
    }

    /* 
      * 금년도 누적방문객
    */
    try {
      
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`);    
      const responseYesterdayStack = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${yearFirst}&to=${yesterday}`);
      //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);    
      //const responseYesterdayStack = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${yearFirst}&to=${yesterday}`);

      let arr1 = ["용궁수산시장", 0];
      let arr2 = ["바다케이블카", 0];
      let arr3 = ["삼천포대교공원", 0];
      let arr4 = ["항공우주과학관", 0];
      let arr5 = ["팔포음식특화거리", 0];
      let arr6 = ["삼천포중앙시장", 0];
      let arr7 = ["용두공원", 0];
      let arr8 = ["별주부전테마파크(입구)", 0];
      let arr9 = ["남일대해수욕장", 0];
      let arr10 = ["부잔교갯벌탐방로", 0];
      let arr11 = ["대포항", 0];
      let arr12 = ["초양정류장", 0];
      let arr13 = ["다솔사입구", 0];
      let arr14 = ["수양공원", 0];

      
      for (let i of responseYesterdayStack.data) {
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data)
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data)
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data)
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data)
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data)
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data)
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data)
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data)
        } else if (i.zone === zones[8]) {
          arrY9[1] = arrY9[1] + Number(i.data)
        } else if (i.zone === zones[9]) {
          arrY10[1] = arrY10[1] + Number(i.data)
        } else if (i.zone === zones[10]) {
          arrY11[1] = arrY11[1] + Number(i.data)
        } else if (i.zone === zones[11]) {
          arrY12[1] = arrY12[1] + Number(i.data)
        } else if (i.zone === zones[12]) {
          arrY13[1] = arrY13[1] + Number(i.data)
        } else if (i.zone === zones[13]) {
          arrY14[1] = arrY14[1] + Number(i.data)
        }
      }

      for (let i of responseToday.data) {
        if (i.zone === zones[0]) {
          arrY1[2] = i.data + arr1[1];
        } else if (i.zone === zones[1]) {
          arrY2[2] = i.data + arr2[1];
        } else if (i.zone === zones[2]) {
          arrY3[2] = i.data + arr3[1];
        } else if (i.zone === zones[3]) {
          arrY4[2] = i.data + arr4[1];
        } else if (i.zone === zones[4]) {
          arrY5[2] = i.data + arr5[1];
        } else if (i.zone === zones[5]) {
          arrY6[2] = i.data + arr6[1];
        } else if (i.zone === zones[6]) {
          arrY7[2] = i.data + arr7[1];
        } else if (i.zone === zones[7]) {
          arrY8[2] = i.data + arr8[1];
        } else if (i.zone === zones[8]) {
          arrY9[2] = i.data + arr9[1];
        } else if (i.zone === zones[9]) {
          arrY10[2] = i.data + arr10[1];
        } else if (i.zone === zones[10]) {
          arrY11[2] = i.data + arr11[1];
        } else if (i.zone === zones[11]) {
          arrY12[2] = i.data + arr12[1];
        } else if (i.zone === zones[12]) {
          arrY13[2] = i.data + arr13[1];
        } else if (i.zone === zones[13]) {
          arrY14[2] = i.data + arr14[1];
        } 
      }

  
    } catch (err) {
        console.error(err);
    }

    /**
     * 체류인원 그래프
     */
    try {         
      const responseStay = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`);    
      //const responseStay = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);

      
      for (let i of responseStay.data) {
        if (i.zone === zones[0]) {
          arrY1[3] = i.data;
        } else if (i.zone === zones[1]) {
          arrY2[3] = i.data;
        } else if (i.zone === zones[2]) {
          arrY3[3] = i.data;
        } else if (i.zone === zones[3]) {
          arrY4[3] = i.data;
        } else if (i.zone === zones[4]) {
          arrY5[3] = i.data;
        } else if (i.zone === zones[5]) {
          arrY6[3] = i.data;
        } else if (i.zone === zones[6]) {
          arrY7[3] = i.data;
        } else if (i.zone === zones[7]) {
          arrY8[3] = i.data;
        } else if (i.zone === zones[8]) {
          arrY9[3] = i.data;
        } else if (i.zone === zones[9]) {
          arrY10[3] = i.data;
        } else if (i.zone === zones[10]) {
          arrY11[3] = i.data;
        } else if (i.zone === zones[11]) {
          arrY12[3] = i.data;
        } else if (i.zone === zones[12]) {
          arrY13[3] = i.data;
        } else if (i.zone === zones[13]) {
          arrY14[3] = i.data;
        } 
      }

      
  
    } catch (err) {
        console.error(err);
    }

    /**
     * 체류시간 그래프
     */
    try {       
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime`);   
      console.log(responseTime)

      for (let i of responseTime.data) {
        if (i.zone === zones[0]) {
          arrY1[4] = Math.round(i.data/60);
          console.log(i.data)
        } else if (i.zone === zones[1]) {
          arrY2[4] = Math.round(i.data/60);
        } else if (i.zone === zones[2]) {
          arrY3[4] = Math.round(i.data/60);
        } else if (i.zone === zones[3]) {
          arrY4[4] = Math.round(i.data/60);
        } else if (i.zone === zones[4]) {
          arrY5[4] = Math.round(i.data/60);
        } else if (i.zone === zones[5]) {
          arrY6[4] = Math.round(i.data/60);
        } else if (i.zone === zones[6]) {
          arrY7[4] = Math.round(i.data/60);
        } else if (i.zone === zones[7]) {
          arrY8[4] = Math.round(i.data/60);
        } else if (i.zone === zones[8]) {
          arrY9[4] = Math.round(i.data/60);
        } else if (i.zone === zones[9]) {
          arrY10[4] = Math.round(i.data/60);
        } else if (i.zone === zones[10]) {
          arrY11[4] = Math.round(i.data/60);
        } else if (i.zone === zones[11]) {
          arrY12[4] = Math.round(i.data/60);
        } else if (i.zone === zones[12]) {
          arrY13[4] = Math.round(i.data/60);
        } else if (i.zone === zones[13]) {
          arrY14[4] = Math.round(i.data/60);
        }  
      }
  

  
    } catch (err) {
        console.error(err);
    }

    /**
     * 재방문 그래프
     */
    try {       
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`);  
      //const responseRevisit = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit`);
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`);

      for (let i of responseRevisit.data) {
        if (i.zone === zones[0]) {
          arrY1[5] = i.data;
        } else if (i.zone === zones[1]) {
          arrY2[5] = i.data;
        } else if (i.zone === zones[2]) {
          arrY3[5] = i.data;
        } else if (i.zone === zones[3]) {
          arrY4[5] = i.data;
        } else if (i.zone === zones[4]) {
          arrY5[5] = i.data;
        } else if (i.zone === zones[5]) {
          arrY6[5] = i.data;
        } else if (i.zone === zones[6]) {
          arrY7[5] = i.data;
        } else if (i.zone === zones[7]) {
          arrY8[5] = i.data;
        } else if (i.zone === zones[8]) {
          arrY9[5] = i.data;
        } else if (i.zone === zones[9]) {
          arrY10[5] = i.data;
        } else if (i.zone === zones[10]) {
          arrY11[5] = i.data;
        } else if (i.zone === zones[11]) {
          arrY12[5] = i.data;
        } else if (i.zone === zones[12]) {
          arrY13[5] = i.data;
        } else if (i.zone === zones[13]) {
          arrY14[5] = i.data;
        }
      }

  
    } catch (err) {
        console.error(err);
    }

    setZoneInfo1(arrY1);
    setZoneInfo2(arrY2);
    setZoneInfo3(arrY3);
    setZoneInfo4(arrY4);
    setZoneInfo5(arrY5);
    setZoneInfo6(arrY6);
    setZoneInfo7(arrY7);
    setZoneInfo8(arrY8);
    setZoneInfo9(arrY9);
    setZoneInfo10(arrY10);
    setZoneInfo11(arrY11);
    setZoneInfo12(arrY12);
    setZoneInfo13(arrY13);
    setZoneInfo14(arrY14);
  
    

  }

  useEffect (() => {    

    if (!(me && me.id)) {
        Router.replace('/login');
      }       
   }, [me && me.id]);

  useEffect (() => {
    setSettings({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    waitForAnimate: false,
    autoplaySpeed: 4000, // 4000
    })
    getAPIdata();
    setInterval(getAPIdata, 1800000)
  }, []);
 

  return (  

    <Background>
      <div className={me && me.theme === 'dark'? 'darkback':'lightback'}>
        <Header page={'0'}/>
        <Nav value={'3'}/>
        <Status theme={me && me.theme === 'dark'? 'dark':'light'} />
        <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div>
                <div className='division'>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo1} zoneName={zoneName[0]} zoneIndex="1" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo2} zoneName={zoneName[1]} zoneIndex="2" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo3} zoneName={zoneName[2]} zoneIndex="3" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                </div>
                <div className='division'>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo4} zoneName={zoneName[3]} zoneIndex="4" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo5} zoneName={zoneName[4]} zoneIndex="5" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo6} zoneName={zoneName[5]} zoneIndex="6" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                </div>
                <div className='division'>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo7} zoneName={zoneName[6]} zoneIndex="7" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo8} zoneName={zoneName[7]} zoneIndex="8" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo9} zoneName={zoneName[8]} zoneIndex="9" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                </div>
              </div>
              <div>
                <div className='division'>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo10} zoneName={zoneName[9]} zoneIndex="10" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo11} zoneName={zoneName[10]} zoneIndex="11" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo12} zoneName={zoneName[11]} zoneIndex="12" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                </div>
                <div className='division'>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo13} zoneName={zoneName[12]} zoneIndex="13" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                  <ZoneInfo className='zonebox' zoneInfo={zoneInfo14} zoneName={zoneName[13]} zoneIndex="14" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                </div>
              </div>
            </Slider>
          </div>
        <NavBottom value={'1'} theme={me && me.theme === 'dark'? 'dark':'light'}/>
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

export default Compare;