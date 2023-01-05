import React, { useEffect, useState , useRef }  from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { CSVLink, CSVDownload } from "react-csv";
import Head from 'next/head';

import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import StackStatistics from '../../components/info/StackStatistics';
import FloatPopulationInfo from '../../components/info/FloatPopulationInfo';
import NavBottom from '../../components/common/NavBottom';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Background = styled.div`
  background-color: #f6f9fe;

  .Sel_date {
    width: 40%;
    background-color: white;
    box-shadow: 0px 0px 5px #cccccc;
    margin: 5px auto 5px auto;
    padding: 5px 0 5px 0;
    border-radius: 5px;
    text-align: center;
    color: black;    
  }
  .stackinfo {
    box-shadow: 0px 0px 5px #cccccc;
  }
  .button {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: white;
    font-size: 13px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 3px 15px 3px 15px;
    margin: 2px 4px 0px 4px;
    border-radius: 5px;
    background: #7b8df8;

    &:hover {
      background: #d59866;
    }
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
    margin: 0 5% 0 5%;
  }
  .csv {
    color:white;
    text-decoration: none;
  }

  .darkback {
    background-color: #1b2137;

    .Sel_date {
      background-color: #3c496e;
      box-shadow: 0px 0px 0px #b1b1b1;
      color: white;    
    }
    .csv {
      color:white;
      text-decoration: none;
    }
  }
`;

const Floatpopulation = () => {
  
const { me, ago7day, today } = useSelector((state) => state.auth);
const [sttdate, setSttdate] = useState(ago7day);
const [enddate, setEnddate] = useState(today);
const [zoneInfo1, setZoneInfo1] = useState([0, 0, 0, 0, 0]); // [0]: 방문자수 [1]: 재방문자수 [2]: 체류시간 [3]: 체류인원
const [zoneInfo2, setZoneInfo2] = useState([0, 0, 0, 0, 0]);
const [zoneInfo3, setZoneInfo3] = useState([0, 0, 0, 0, 0]);
const [zoneInfo4, setZoneInfo4] = useState([0, 0, 0, 0, 0]);
const [zoneInfo5, setZoneInfo5] = useState([0, 0, 0, 0, 0]);
const [zoneInfo6, setZoneInfo6] = useState([0, 0, 0, 0, 0]);
const [zoneInfo7, setZoneInfo7] = useState([0, 0, 0, 0, 0]);
const [zoneInfo8, setZoneInfo8] = useState([0, 0, 0, 0, 0]);
const [zoneInfo9, setZoneInfo9] = useState([0, 0, 0, 0, 0]);
const [zoneInfo10, setZoneInfo10] = useState([0, 0, 0, 0, 0]);
const [zoneInfo11, setZoneInfo11] = useState([0, 0, 0, 0, 0]);
const [zoneInfo12, setZoneInfo12] = useState([0, 0, 0, 0, 0]);
const [zoneInfo13, setZoneInfo13] = useState([0, 0, 0, 0, 0]);
const [zoneInfo14, setZoneInfo14] = useState([0, 0, 0, 0, 0]);
const [allInfo, setAllInfo] = useState([0, 0, 0, 0, 0]);
const [excelData, setExcelData] = useState([]);

const [settings, setSettings] = useState({});
const slideEl = useRef(null);

//const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078];
const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원', '사천 관광지 전체 1차 & 2차', 2016];
//const zones = [1859, 1860, 1861, 1862, 1910, 1911, 1912, 1913];

const arrY1 = [0, 0, 0, 0]; //"중심거리1", 
const arrY2 = [0, 0, 0, 0]; //"중심거리2", 
const arrY3 = [0, 0, 0, 0]; //"중심거리3", 
const arrY4 = [0, 0, 0, 0]; //"북동거리", 
const arrY5 = [0, 0, 0, 0]; //"동남거리", 
const arrY6 = [0, 0, 0, 0]; //"동방거리", 
const arrY7 = [0, 0, 0, 0]; //"서방거리", 
const arrY8 = [0, 0, 0, 0]; //"서남거리",
const arrY9 = [0, 0, 0, 0]; //"중심거리3", 
const arrY10 = [0, 0, 0, 0]; //"북동거리", 
const arrY11 = [0, 0, 0, 0]; //"동남거리", 
const arrY12 = [0, 0, 0, 0]; //"동방거리", 
const arrY13 = [0, 0, 0, 0]; //"서방거리", 
const arrY14 = [0, 0, 0, 0]; //"서남거리",  
const arrYall = [0, 0, 0, 0]; //전체

const excels = [];


const getAPIdata = async () => {

  /**
   * 방문객 수
   */

    try {       
      const responseVisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}`);
      //const responseVisit = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+sttdate+'&to='+enddate);  
      

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
      let arr15 = ["전체", 0];


      for (let i of responseVisit.data) {
        i.gbname = '방문객수'
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data);
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data);
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data);
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data);
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data);
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data);
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data);
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[8]) {
          arr9[1] = arr9[1] + Number(i.data);
        } else if (i.zone === zones[9]) {
          arr10[1] = arr10[1] + Number(i.data);
        } else if (i.zone === zones[10]) {
          arr11[1] = arr11[1] + Number(i.data);
        } else if (i.zone === zones[11]) {
          arr12[1] = arr12[1] + Number(i.data);
        } else if (i.zone === zones[12]) {
          arr13[1] = arr13[1] + Number(i.data);
        } else if (i.zone === zones[13]) {
          arr14[1] = arr14[1] + Number(i.data);
        } else if (i.zone === zones[14]) {
          arr15[1] = arr15[1] + Number(i.data);
        }
        
        excels.push(i)
      }

      arrY1[0] = arr1[1];
      arrY2[0] = arr2[1];
      arrY3[0] = arr3[1];
      arrY4[0] = arr4[1];
      arrY5[0] = arr5[1];
      arrY6[0] = arr6[1];
      arrY7[0] = arr7[1];
      arrY8[0] = arr8[1];
      arrY9[0] = arr9[1];
      arrY10[0] = arr10[1];
      arrY11[0] = arr11[1];
      arrY12[0] = arr12[1];
      arrY13[0] = arr13[1];
      arrY14[0] = arr14[1];
      arrYall[0] = arr15[1];

  
    } catch (err) {
        console.error(err);
    }


    /**
   * 재방문객 수
   */

    try {       
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit?from=${sttdate}&to=${enddate}`);
      //const responseRevisit = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from='+sttdate+'&to='+enddate);  

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
      let arr15 = ["전체", 0];


      for (let i of responseRevisit.data) {
        i.gbname = '재방문객수'
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data);
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data);
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data);
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data);
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data);
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data);
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data);
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[8]) {
          arr9[1] = arr9[1] + Number(i.data);
        } else if (i.zone === zones[9]) {
          arr10[1] = arr10[1] + Number(i.data);
        } else if (i.zone === zones[10]) {
          arr11[1] = arr11[1] + Number(i.data);
        } else if (i.zone === zones[11]) {
          arr12[1] = arr12[1] + Number(i.data);
        } else if (i.zone === zones[12]) {
          arr13[1] = arr13[1] + Number(i.data);
        } else if (i.zone === zones[13]) {
          arr14[1] = arr14[1] + Number(i.data);
        } else if (i.zone === zones[14]) {
          arr15[1] = arr15[1] + Number(i.data);
        }
        
        excels.push(i)
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
      arrYall[1] = arr15[1];

  
    } catch (err) {
        console.error(err);
    }



      /**
   * 체류인원
   */

      try {       
      const responseStay = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}`);
      //const responseStay = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+sttdate+'&to='+enddate);  

      console.log(responseStay);

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
      let arr15 = ["전체", 0];

      var dateCnt = 0;


      for (let i of responseStay.data) {
        i.gbname = '체류인원'
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data);
          dateCnt = dateCnt + 1;
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data);
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data);
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data);
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data);
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data);
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data);
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[8]) {
          arr9[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[9]) {
          arr10[1] = arr10[1] + Number(i.data);
        } else if (i.zone === zones[10]) {
          arr11[1] = arr11[1] + Number(i.data);
        } else if (i.zone === zones[11]) {
          arr12[1] = arr12[1] + Number(i.data);
        } else if (i.zone === zones[12]) {
          arr13[1] = arr13[1] + Number(i.data);
        } else if (i.zone === zones[13]) {
          arr14[1] = arr14[1] + Number(i.data);
        } else if (i.zone === zones[14]) {
          arr15[1] = arr15[1] + Number(i.data);
        }
        
        excels.push(i)
      }

      

      arrY1[2] = Math.round((Number(arr1[1])/24)/dateCnt);
      arrY2[2] = Math.round((Number(arr2[1])/24)/dateCnt);
      arrY3[2] = Math.round((Number(arr3[1])/24)/dateCnt);
      arrY4[2] = Math.round((Number(arr4[1])/24)/dateCnt);
      arrY5[2] = Math.round((Number(arr5[1])/24)/dateCnt);
      arrY6[2] = Math.round((Number(arr6[1])/24)/dateCnt);
      arrY7[2] = Math.round((Number(arr7[1])/24)/dateCnt);
      arrY8[2] = Math.round((Number(arr8[1])/24)/dateCnt);
      arrY9[2] = Math.round((Number(arr9[1])/24)/dateCnt);
      arrY10[2] = Math.round((Number(arr10[1])/24)/dateCnt);
      arrY11[2] = Math.round((Number(arr11[1])/24)/dateCnt);
      arrY12[2] = Math.round((Number(arr12[1])/24)/dateCnt);
      arrY13[2] = Math.round((Number(arr13[1])/24)/dateCnt);
      arrY14[2] = Math.round((Number(arr14[1])/24)/dateCnt);
      arrYall[2] = Math.round((Number(arr15[1])/24)/dateCnt);
      //console.log(Number(arr1[1])/dateCnt, arr1[1]);

  
    } catch (err) {
        console.error(err);
    }


    /**
   * 체류시간
   */

    try {       
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit?from=${sttdate}&to=${enddate}`);
      //const responseTime = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?from='+sttdate+'&to='+enddate);  

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
      let arr15 = ["전체", 0];

      var dateCnt = 0;


      for (let i of responseTime.data) {
        if (i.zone === zones[0]) {
          arr1[1] = arr1[1] + Number(i.data);          
        } else if (i.zone === zones[1]) {
          arr2[1] = arr2[1] + Number(i.data);
        } else if (i.zone === zones[2]) {
          arr3[1] = arr3[1] + Number(i.data);
        } else if (i.zone === zones[3]) {
          arr4[1] = arr4[1] + Number(i.data);
        } else if (i.zone === zones[4]) {
          arr5[1] = arr5[1] + Number(i.data);
        } else if (i.zone === zones[5]) {
          arr6[1] = arr6[1] + Number(i.data);
        } else if (i.zone === zones[6]) {
          arr7[1] = arr7[1] + Number(i.data);
        } else if (i.zone === zones[7]) {
          arr8[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[8]) {
          arr9[1] = arr8[1] + Number(i.data);
        } else if (i.zone === zones[9]) {
          arr10[1] = arr10[1] + Number(i.data);
        } else if (i.zone === zones[10]) {
          arr11[1] = arr11[1] + Number(i.data);
        } else if (i.zone === zones[11]) {
          arr12[1] = arr12[1] + Number(i.data);
        } else if (i.zone === zones[12]) {
          arr13[1] = arr13[1] + Number(i.data);
          dateCnt = dateCnt + 1;
        } else if (i.zone === zones[13]) {
          arr14[1] = arr14[1] + Number(i.data);
        } else if (i.zone === zones[14]) {
          arr15[1] = arr15[1] + Number(i.data);
        }
        i.gbname = '체류시간'
        excels.push(i)
      }

      arrY1[3] = Math.round((arr1[1]/60)/dateCnt);
      arrY2[3] = Math.round((arr2[1]/60)/dateCnt);
      arrY3[3] = Math.round((arr3[1]/60)/dateCnt);
      arrY4[3] = Math.round((arr4[1]/60)/dateCnt);
      arrY5[3] = Math.round((arr5[1]/60)/dateCnt);
      arrY6[3] = Math.round((arr6[1]/60)/dateCnt);
      arrY7[3] = Math.round((arr7[1]/60)/dateCnt);
      arrY8[3] = Math.round((arr8[1]/60)/dateCnt);
      arrY9[3] = Math.round((arr9[1]/60)/dateCnt);
      arrY10[3] = Math.round((arr10[1]/60)/dateCnt);
      arrY11[3] = Math.round((arr11[1]/60)/dateCnt);
      arrY12[3] = Math.round((arr12[1]/60)/dateCnt);
      arrY13[3] = Math.round((arr13[1]/60)/dateCnt);
      arrY14[3] = Math.round((arr14[1]/60)/dateCnt);
      arrYall[3] = Math.round((arr15[1]/60)/dateCnt);

  
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
    setAllInfo(arrYall);

    setExcelData(excels);
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


//기간선택후 검색 클릭시
   const searchHandler = () => {
    getAPIdata();
  }

   



  return (  

    <Background>
      <div className={me && me.theme === 'dark'? 'darkback':'lightback'}>
      <Header page={'0'} />
      <Nav value={'3'}/>
      <div className="Sel_date">
          분석기간 선택&nbsp;
          <input type="date" id='currentDate' value={sttdate} onChange={(e)=> setSttdate(e.target.value)}
          />&nbsp;&nbsp;~&nbsp;&nbsp;
          <input type="date" id='currentDate2' value={enddate} onChange={(e)=> setEnddate(e.target.value)}/>
          <button type="button " className="button" onClick={searchHandler}>검 색</button>
          <button type="button" className="button">
              <CSVLink 
                  className='csv'
                  data={excelData} 
                  filename={"유동인구데이터-" + sttdate + "-" + enddate}
                  onClick={event=> {
                      // console.log("You click the link");
                      // return false; // 👍🏻 You are stopping the handling of component
                  }}
                  >
                  다운로드
              </CSVLink>
          </button>
      </div>
      <StackStatistics className='stackinfo' Info={allInfo} theme={me && me.theme === 'dark'? 'dark':'light'}/>

      <div className="compare_list">
          <Slider ref={slideEl} {...settings}>
            <div>
              <div className='division'>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo1} zoneName="용궁시장" zoneIndex="1" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo2} zoneName="바다케이블카" zoneIndex="2" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo3} zoneName="삼천포대교공원" zoneIndex="3" theme={me && me.theme === 'dark'? 'dark':'light'}/>
              </div>
              <div className='division'>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo4} zoneName="항공우주과학관" zoneIndex="4" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo5} zoneName="팔포음식특화거리" zoneIndex="5" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo6} zoneName="삼천포중앙시장" zoneIndex="6" theme={me && me.theme === 'dark'? 'dark':'light'}/>
              </div>
              <div className='division'>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo7} zoneName="용두공원" zoneIndex="7" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo8} zoneName="별주부전테마파크" zoneIndex="8" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo9} zoneName="남일대해수욕장" zoneIndex="9"  theme={me && me.theme === 'dark'? 'dark':'light'}/>
              </div>
            </div>
            { <div>
              <div className='division'>                
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo10} zoneName="부잔교갯벌탐방로" zoneIndex="10" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo11} zoneName="대포항" zoneIndex="11" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo12} zoneName="초양정류장" zoneIndex="12" theme={me && me.theme === 'dark'? 'dark':'light'}/>
              </div>
              <div className='division'>                
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo13} zoneName="다솔사입구" zoneIndex="13" theme={me && me.theme === 'dark'? 'dark':'light'}/>
                <FloatPopulationInfo className='zonebox' zoneInfo={zoneInfo14} zoneName="수양공원" zoneIndex="14" theme={me && me.theme === 'dark'? 'dark':'light'}/>
              </div>
            </div> }
          </Slider>
        </div>
      

      <NavBottom value={'2'} theme={me && me.theme === 'dark'? 'dark':'light'}/>
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

export default Floatpopulation;