import React, { useEffect, useState , useRef }  from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from '../reducers/auth';
import wrapper from '../store/configureStore';
import Script from 'next/script';
import styled from 'styled-components';



const Mapp = styled.div`
  background-color: #1b2137;
  margin-top:100px
  width: 100%;
  height: 820px;
  .map{
    width: 100%;
    height: 820px;
  }

  .tooltip {
    position: relative;
    display: block;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  
    position: absolute;
    z-index: 100;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
  }

  .tooltip .tooltip-right {
    top: -5px;
    left: 105%;
  }
  
  .tooltip .tooltip-right::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent black transparent transparent;
  }
  .overlaybtn {
    z-index: 100;
    position:absolute;
    top: 10px;
		//right: 10px;
    left: 465px;
    display:grid;

  }
  .buttons {
    display:grid;

  }

  .button {    
    border-radius: 10px;    
    border: 0;
    padding: 5px 25px;
    margin : 4px;
    //margin : 7px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size:11pt;
    color: white;
    
    background: rgba(117,166,252,0.5);
    //background: linear-gradient(to right, rgba(0,0,0,0.5),  rgba(255,255,255,0.3));
    //box-shadow: 0px 4px 0px rgba(168,179,202,1);
  }

  .button:active {
    top: 20px; 
    box-shadow: 0 0 gray; 
    background: rgba(168,179,202,0.8);
  }

  .zone {
    border-radius: 10px;    
    border: 0;
    //background: linear-gradient(to right, #75A6FC, #75A6FC, rgba(255,255,255,0.3));
    background: rgba(117,166,252,1);
    box-shadow: 0px 4px 0px rgba(168,179,202,1);
    margin : 3px;
    display: inline-block;
    color:white;
    font-weight: bolder;
    font-size: 13pt;
    padding: 3px;
    width: 85px;
    text-align: center;
  }

  .zone:active {
    top: 20px; 
    box-shadow:inset 4px 4px rgba(140,140,140,0.8); 
    background: rgba(168,179,202,1);
  }

  .scanner {
    background: linear-gradient(to right, #75A6FC, #F2D9D8);
    color:white;
    font-weight: bolder;
    font-size: 15pt;
    padding: 6px;
    width: 90px;
  }
`;


const Map = () => {

  const [onOffZone, setOnOffZone] = useState(false);
  const [onOffScanner, setOnOffScanner] = useState(false);

  const [location, setLocation] = useState();

  //방문객 수 
  const [visitor1, setVisitor1] = useState(0);
  const [visitor2, setVisitor2] = useState(0);
  const [visitor3, setVisitor3] = useState(0);
  const [visitor4, setVisitor4] = useState(0);
  const [visitor5, setVisitor5] = useState(0);
  const [visitor6, setVisitor6] = useState(0);
  const [visitor7, setVisitor7] = useState(0);
  const [visitor8, setVisitor8] = useState(0);
  const [visitor9, setVisitor9] = useState(0);
  const [visitor10, setVisitor10] = useState(0);
  const [visitor11, setVisitor11] = useState(0);
  const [visitor12, setVisitor12] = useState(0);
  const [visitor13, setVisitor13] = useState(0);
  const [visitor14, setVisitor14] = useState(0);



  console.log('mapUseState');


  //const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077];
  const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원'];
  

  const { me } = useSelector((state) => state.auth);

  useEffect (() => {

  if (!(me && me.id)) {
      Router.replace('/login');
    } 
   }, [me && me.id]);


//오늘 방문객 데이터 가져오기
  const getAPIdata = async () => {
    console.log("map getAPIdata") // api데이터 받기 시작

    /**
     * 오늘자 방문객 그래프
     */
    try {       
      //const responseToday = await axios.post(`${process.env.NEXT_PUBLIC_API_GJ_URL}/DeviceCountHourly?unit=1d-1h`);    

      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`);

      let arrY1 = ["용궁수산시장"];
      let arrY2 = ["바다케이블카"];
      let arrY3 = ["삼천포대교공원"];
      let arrY4 = ["항공우주과학관"];
      let arrY5 = ["팔포음식특화거리"];
      let arrY6 = ["삼천포중앙시장"];
      let arrY7 = ["용두공원"];
      let arrY8 = ["별주부전테마파크"];
      let arrY9 = ["용궁수산시장"];
      let arrY10 = ["부잔교갯벌탐방로"];
      let arrY11 = ["대포항"];
      let arrY12 = ["초양정류장"];
      let arrY13 = ["다솔사 입구"];
      let arrY14 = ["수양공원"];

      for (let i of responseToday.data) {
        if (i.zone === zones[0]) {
          arrY1.push(i.data);
        } else if (i.zone === zones[1]) {
          arrY2.push(i.data);
        } else if (i.zone === zones[2]) {
          arrY3.push(i.data);
        } else if (i.zone === zones[3]) {
          arrY4.push(i.data);
        } else if (i.zone === zones[4]) {
          arrY5.push(i.data);
        } else if (i.zone === zones[5]) {
          arrY6.push(i.data);
        } else if (i.zone === zones[6]) {
          arrY7.push(i.data);
        } else if (i.zone === zones[7]) {
          arrY8.push(i.data);
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


      setVisitor1(arrY1[1]);
      setVisitor2(arrY2[1]);
      setVisitor3(arrY3[1]);
      setVisitor4(arrY4[1]);
      setVisitor5(arrY5[1]);
      setVisitor6(arrY6[1]);
      setVisitor7(arrY7[1]);
      setVisitor8(arrY8[1]);
      setVisitor9(arrY9[1]);
      setVisitor10(arrY10[1]);
      setVisitor11(arrY11[1]);
      setVisitor12(arrY12[1]);
      setVisitor13(arrY13[1]);
      setVisitor14(arrY14[1]);

      console.log('map 방문객 데이터 넣기 끝')


  
    } catch (err) {
        console.error(err);
    }

}


//장비 데이터 설정

const device1881 = [
  // 용궁시장
  {mac : "D865950401AF", intmac : "192418906727896", zone_id : 1881, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401B9", intmac : "203414023005656", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너", info : ''},
  {mac : "D865950401BD", intmac : "207812069516760", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너", info : ''},
  {mac : "D865950401BE", intmac : "208911581144536", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너 + 센서", info : ''},
  {mac : "D865950401BF", intmac : "210011092772312", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너 + 센서", info : ''},
  {mac : "D865950401C0", intmac : "211110604400088", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너 + 센서", info : ''},
  {mac : "D865950401A8", intmac : "184722325333464", zone_id : 1881, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401AE", intmac : "191319395100120", zone_id : 1881, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401B4", intmac : "197916464866776", zone_id : 1881, status : "ON" , ins_loc: "실외", type : "스캐너 + 센서", info : ''},
  {mac : "D865950401BB", intmac : "205613046261208", zone_id : 1881, status : "ON" , ins_loc: "실내", type : "스캐너", info : ''},
]
const device1883 = [
  // 바다케이블카
  {mac : "D865950401EA", intmac : "204513534633432", zone_id : 1883, status : "ON"  , ins_loc: "실내", type : "스캐너", info : ''},
  {mac : "D865950401BC", intmac : "206712557888984", zone_id : 1883, status : "ON"  , ins_loc: "실내", type : "스캐너", info : ''},
  {mac : "D865950401AC", intmac : "189120371844568", zone_id : 1883, status : "ON"  , ins_loc: "실외", type : "스캐너", info : ''},
]
const device1884 = [
  // 삼천포대교공원
  {mac : "D865950401AB", intmac : "188020860216792", zone_id : 1884, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401AD", intmac : "190219883472344", zone_id : 1884, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401B7", intmac : "201214999750104", zone_id : 1884, status : "ON" , ins_loc: "실내", type : "스캐너", info : ''},
  {mac : "D865950401A9", intmac : "185821836961240", zone_id : 1884, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401B8", intmac : "202314511377880", zone_id : 1884, status : "ON" , ins_loc: "실외", type : "스캐너 + 센서", info : ''},
]
const device2001 = [
  // 항공우주과학관
  {mac : "D86595040260", intmac : "105561783100888", zone_id : 2001, status : "ON" , ins_loc: "실내", type : "스캐너", info : ''},
]
const device2002 = [
  // 팔포음식특화거리
  {mac : "D86595040261", intmac : "106661294728664", zone_id : 2002, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040262", intmac : "107760806356440", zone_id : 2002, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D8659504026B", intmac : "117656411006424", zone_id : 2009, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D8659504026F", intmac : "122054457517528", zone_id : 2012, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040271", intmac : "124253480773080", zone_id : 2014, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C6", intmac : "", zone_id : 2014, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C7", intmac : "", zone_id : 2014, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C8", intmac : "", zone_id : 2014, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2003 = [
  // 삼천포중앙시장
  {mac : "D86595040266", intmac : "112158852867544", zone_id : 2003, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040263", intmac : "108860317984216", zone_id : 2003, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040264", intmac : "109959829611992", zone_id : 2003, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C5", intmac : "", zone_id : 2003, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2004 = [
  // 용두공원
  {mac : "D86595040265", intmac : "111059341239768", zone_id : 2004, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D8659504026D", intmac : "119855434261976", zone_id : 2004, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2005 = [
  // 별주부전테마파크
  {mac : "D86595040267", intmac : "113258364495320", zone_id : 2005, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C2", intmac : "", zone_id : 2005, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C3", intmac : "", zone_id : 2005, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C4", intmac : "", zone_id : 2005, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  
]
const device2006 = [
  // 남일대해수욕장
  {mac : "D86595040268", intmac : "114357876123096", zone_id : 2006, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040193", intmac : "161632581150168", zone_id : 2006, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2007 = [
  // 부잔교갯벌탐방로
  {mac : "D86595040269", intmac : "115457387750872", zone_id : 2007, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2008 = [
  // 대포항
  {mac : "D8659504026A", intmac : "116556899378648", zone_id : 2008, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D86595040197", intmac : "166030627661272", zone_id : 2012, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2010 = [
  // 초양정류장
  {mac : "D8659504026C", intmac : "118755922634200", zone_id : 2010, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]
const device2011 = [
  // 다솔사입구
  {mac : "D8659504026E", intmac : "120954945889752", zone_id : 2011, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
  {mac : "D865950401C1", intmac : "", zone_id : 2011, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]

const device2013 = [
  // 수양공원
  {mac : "D86595040270", intmac : "123153969145304", zone_id : 2013, status : "ON" , ins_loc: "실외", type : "스캐너", info : ''},
]


    const [device1881Arr, setDevice1881Arr] = useState(device1881);
    const [device1883Arr, setDevice1883Arr] = useState(device1883);
    const [device1884Arr, setDevice1884Arr] = useState(device1884);
    const [device2001Arr, setDevice2001Arr] = useState(device2001);
    const [device2002Arr, setDevice2002Arr] = useState(device2002);
    const [device2003Arr, setDevice2003Arr] = useState(device2003);
    const [device2004Arr, setDevice2004Arr] = useState(device2004);
    const [device2005Arr, setDevice2005Arr] = useState(device2005);
    const [device2006Arr, setDevice2006Arr] = useState(device2006);
    const [device2007Arr, setDevice2007Arr] = useState(device2007);
    const [device2008Arr, setDevice2008Arr] = useState(device2008);
    const [device2010Arr, setDevice2010Arr] = useState(device2010);
    const [device2011Arr, setDevice2011Arr] = useState(device2011);
    const [device2013Arr, setDevice2013Arr] = useState(device2013);


//장비데이터 가져오기
const getDeviceStatus = async () => {

  console.log("장비상태 가져오기");

  //장비정보가져오기API
  //const deviceResponse = await axios.get(`http://54.180.158.22:8000/v1/DaeguDalseong/DeviceStatus`);
  const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceStatus`);

  const resultData = deviceResponse.data;
  //console.log(resultData);

  let newDevice = [];

  newDevice.push(device1881Arr);
  newDevice.push(device1883Arr);
  newDevice.push(device1884Arr);
  newDevice.push(device2001Arr);
  newDevice.push(device2002Arr);
  newDevice.push(device2003Arr);
  newDevice.push(device2004Arr);
  newDevice.push(device2005Arr);
  newDevice.push(device2006Arr);
  newDevice.push(device2007Arr);
  newDevice.push(device2008Arr);
  newDevice.push(device2010Arr);
  newDevice.push(device2011Arr);
  newDevice.push(device2013Arr);

  //스캐너 정보저장
  const ScannerStatus = (scannerInfo) => {


    return (` 
    [장비정보] <br/>
    MAC : ${scannerInfo['mac']} <br/>
    INTMAC : ${scannerInfo['intmac']} <br/>
    설치장소 : ${scannerInfo['ins_loc']} <br/>
    장비타입 : ${scannerInfo['type']}<br/>
    상태 : ${scannerInfo['status']}
    `);
  }

  // 값 초기화

  for (let i=0; i<newDevice.length; i++) {
    for (let j=0; j<newDevice[i].length; j++){
      newDevice[i][j].info = '';
    }
    

  }


  for(let i of resultData){
      for (var j=0; j < newDevice.length; j++){
        for(var a=0; a < newDevice[j].length; a++){
          console.log(i.MAC);
          if (newDevice[j][a].mac == i.MAC){
            if (i.ALIVE === 1){
              newDevice[j][a].status = 'ON';  
            } else if (i.ALIVE === 0) {
              newDevice[j][a].status = 'OFF';
            }
                      
          }       
          newDevice[j][a].info = (ScannerStatus(newDevice[j][a]));
          
        }
      }
  }

  setDevice1881Arr(newDevice[0]);
  setDevice1883Arr(newDevice[1]);
  setDevice1884Arr(newDevice[2]);
  setDevice2001Arr(newDevice[3]);
  setDevice2002Arr(newDevice[4]);
  setDevice2003Arr(newDevice[5]);
  setDevice2004Arr(newDevice[6]);
  setDevice2005Arr(newDevice[7]);
  setDevice2006Arr(newDevice[8]);
  setDevice2007Arr(newDevice[9]);
  setDevice2008Arr(newDevice[10]);
  setDevice2010Arr(newDevice[11]);
  setDevice2011Arr(newDevice[12]);
  setDevice2013Arr(newDevice[13]);

  // 장비 상태 업데이트 후 맵 다시 그리기
 // mapConfig();


}



//지도에 맵 올리기
const mapConfig = (zonePos, onScanner) => {
  getAPIdata();

  var zoom = 12;
  var zone = new naver.maps.LatLng(34.99, 128 );
  if (zonePos) {
    var zone = zonePos;
    zoom = 17;
  }  

    //맵 설정
  var map1 = new naver.maps.Map('map', {
    center: zone,
    zoom: zoom,
  })
      

  //존별 마커 설정
  var markerSetting = {
    "용궁시장": [34.92761, 128.07073, visitor1, 'marker_blue.png'],
    "바다케이블카": [34.93408, 128.05417, visitor2, 'marker_br.png'],
    "삼천포대교공원": [34.93180, 128.05206, visitor3, 'marker_gr.png'],
    "항공우주과학관":[35.0705208,128.0641238, visitor4, 'marker_or.png'],
    "팔포음식특화거리":[34.9247376,128.0757359, visitor5, 'marker_pu.png'],
    "삼천포중앙시장":[34.9293438,128.076547, visitor6, 'marker_blue.png'],
    "용두공원":[34.9573086,128.0915738, visitor7, 'marker_yl.png'],
    "별주부전테마파크":[34.9671874,127.9816554, visitor8, 'marker_red.png'],
    "남일대해수욕장": [34.92665,128.0965176, visitor9, 'marker_gr.png'],
    "부잔교갯벌탐방로":[35.00932,128.047096, visitor10, 'marker_or.png'],
    "대포항":[34.9903145,128.041014, visitor11, 'marker_pu.png'],
    "초양정류장":[34.9260643,128.0443779, visitor12, 'marker_br.png'],
    "다솔사입구":[35.0832346,127.9199298, visitor13, 'marker_yl.png'],
    "수양공원":[35.0858539,128.0939026, visitor14, 'marker_red.png']
  };

  //디바이스마커설정
  var markerSetting2 = {
    "용궁시장1": [34.926151, 128.07311, device1881Arr[0].info, 'scanner_bl.png'],
    "용궁시장2": [34.927259, 128.0723, device1881Arr[1].info, 'scanner_bl.png'],
    "용궁시장3": [34.927461, 128.072091, device1881Arr[2].info, 'scanner_bl.png'],
    "용궁시장4":[34.926938, 128.072568, device1881Arr[3].info, 'scanner_bl.png'],
    "용궁시장5":[34.927479, 128.07149, device1881Arr[4].info, 'scanner_bl.png'],
    "용궁시장6":[34.927404, 128.070423, device1881Arr[5].info, 'scanner_bl.png'],
    "용궁시장7":[34.927518, 128.069978, device1881Arr[6].info, 'scanner_bl.png'],
    "용궁시장8":[34.926551,  128.07311, device1881Arr[7].info, 'scanner_bl.png'],
    "용궁시장9":[34.943419, 128.058014, device1881Arr[8].info, 'scanner_bl.png'],
    "용궁시장10":[34.927435, 128.069978, device1881Arr[9].info, "scanner_bl.png"],
    "바다케이블카1":[34.933901, 128.05261, device1883Arr[0].info, "scanner_br.png"],
    "바다케이블카2":[34.934204, 128.05272, device1883Arr[1].info, "scanner_br.png"],
    "바다케이블카3":[34.944188, 128.057053, device1883Arr[2].info, "scanner_br.png"],
    "삼천포대교공원1":[34.933219, 128.051158, device1884Arr[0].info, "scanner_gr.png"],
    "삼천포대교공원2":[34.932384, 128.052338, device1884Arr[1].info, "scanner_gr.png"],
    "삼천포대교공원3":[34.932753, 128.051694, device1884Arr[2].info, "scanner_gr.png"],
    "삼천포대교공원4":[34.931893, 128.052339, device1884Arr[3].info, "scanner_gr.png"],
    "삼천포대교공원5":[34.933430, 128.050375, device1884Arr[4].info, "scanner_gr.png"],
    "항공우주과학관":[35.070438, 128.06318, device2001Arr[0].info, "scanner_or.png"],
    "팔포음식특화거리1":[34.923958, 128.075604 , device2002Arr[0].info, "scanner_pu.png"],
    "팔포음식특화거리2": [34.925815, 128.076283, device2002Arr[1].info, "scanner_pu.png"],
    "팔포음식특화거리3":[34.9250613013179, 128.075355177017, device2002Arr[2].info, "scanner_pu.png"],
    "팔포음식특화거리4":[34.9248507482796, 128.075976218144, device2002Arr[3].info, "scanner_pu.png"],
    "팔포음식특화거리5": [34.9239832561737, 128.074952615659 , device2002Arr[4].info, "scanner_pu.png"],
    "팔포음식특화거리6":[34.9275351353483, 128.077428514943, device2002Arr[5].info, "scanner_pu.png"],
    "팔포음식특화거리7":[34.927206723419, 128.076855135036, device2002Arr[6].info, "scanner_pu.png"],
    "팔포음식특화거리8": [34.9260721881023, 128.07570762547, device2002Arr[7].info, "scanner_pu.png"],
    "삼천포중앙시장1":[34.929557, 128.076535, device2003Arr[0].info,"scanner_bl.png"],
    "삼천포중앙시장2": [34.928964, 128.075854, device2003Arr[1].info,"scanner_bl.png"],
    "삼천포중앙시장3": [34.929218, 128.075219 , device2003Arr[2].info,"scanner_bl.png"],
    "삼천포중앙시장4": [34.929584532026, 128.075396417032, device2003Arr[3].info,"scanner_bl.png"],
    "용두공원1":[34.957123, 128.090989, device2004Arr[0].info,"scanner_yl.png"],
    "용두공원2": [34.957999, 128.092296, device2004Arr[1].info,"scanner_yl.png"],
    "별주부전테마파크1": [34.965679, 127.981804, device2005Arr[0].info,"scanner_rd.png"],
    "별주부전테마파크2": [34.9683722614587, 127.98316495613102 , device2005Arr[1].info,"scanner_rd.png"],
    "별주부전테마파크3": [34.9683219636445, 127.982140572588, device2005Arr[2].info,"scanner_rd.png"],
    "별주부전테마파크4": [34.968014690957, 127.980847600685, device2005Arr[3].info,"scanner_rd.png"],
    "남일대해수욕장1":[34.926950, 128.097225, device2006Arr[0].info, "scanner_gr.png"],
    "남일대해수욕장2":[34.926895, 128.096081, device2006Arr[1].info, "scanner_gr.png"],
    "부잔교갯벌탐방로":[35.009388, 128.047247, device2007Arr[0].info, "scanner_or.png"],
    "대포항1":[34.989902, 128.041082 , device2008Arr[0].info, "scanner_pu.png"],
    "대포항2": [34.99034769644437, 128.03973556073547, device2008Arr[0].info, "scanner_pu.png"],
    "초양정류장":[34.926412, 128.043858, device2010Arr[0].info,"scanner_br.png"],
    "다솔사입구1":[35.083411, 127.920872, device2011Arr[0].info,"scanner_yl.png"],
    "다솔사입구2":[35.08328544508734, 127.9198638821867, device2011Arr[1].info,"scanner_yl.png"],
    "수양공원": [35.084287, 128.094696, device2013Arr[0].info,"scanner_rd.png"],

  };

  //console.log('device:',device1881Arr[0]['info']);

  var markers = [];
  var infowindows =[];
  
  var HOME_PATH = window.HOME_PATH || '.';
  //console.log('HOME_PATH',HOME_PATH);


  if(!onScanner){ //존 마커
    console.log('마커표시');
    for (var key in markerSetting) {

      var position = new naver.maps.LatLng(
        markerSetting[key][0],markerSetting[key][1]
      );
      var marker = new naver.maps.Marker({
        map: map1,
        position: position,
        title: key,
        icon: {
          content: '<img src='+HOME_PATH+'/images/'+markerSetting[key][3]+'>',
          //content: '<img src='+HOME_PATH+'/images/scanner_icon_1.png>',
          //size: new naver.map.Size(50,50),
        },
        
      });
  
      //마커 누르면 나오는 정보
      var infowindow = new naver.maps.InfoWindow({
        content: '<div style="text-align:center; padding:10px; border-radius:5px; background:rgba(255,255,255,0.7); border:solid gray 0.5px;"><b>'+ key +' - '+markerSetting[key][2]+'명</b></div>',
        //maxWidth: 140,
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "rgba(255,255,255,0)",
        anchorSize: new naver.maps.Size(0, 0),
        anchorSkew: false,
        anchorColor: "#fff",
        pixelOffset: new naver.maps.Point(0, 0)
      });
  
      markers.push(marker);
      infowindows.push(infowindow);
    }
  } else if(onScanner) { // 스캐너 마커
    for (var key in markerSetting2) {

      var position = new naver.maps.LatLng(
        markerSetting2[key][0],markerSetting2[key][1]
      );
      var marker = new naver.maps.Marker({
        map: map1,
        position: position,
        title: key,
        icon: {
          content: '<img src='+HOME_PATH+'/images/'+markerSetting2[key][3]+'>',
          //size: new naver.map.Size(50,50),
        },
        
      });
  
      //마커 누르면 나오는 정보
      var infowindow = new naver.maps.InfoWindow({
        content: '<div style="text-align:left;padding:10px;border-radius:5px; background:rgba(255,255,255,0.7); border:solid gray 0.5px;"><b>'+ key +markerSetting2[key][2]+'</b></div>',
        //maxWidth: 140,
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: "rgba(255,255,255,0)",
        anchorSize: new naver.maps.Size(0, 0),
        anchorSkew: false,
        anchorColor: "#fff",
        pixelOffset: new naver.maps.Point(0, 0)
      });
  
      markers.push(marker);
      infowindows.push(infowindow);
    }
  }
  
  

  for (let i=0; i < markers.length; i++ ){

    naver.maps.Event.addListener(markers[i], "click", function(e) {
      if (infowindows[i].getMap()) {
          infowindows[i].close();
      } else {
          infowindows[i].open(map1, markers[i]);
      }
    })
  }
    //infowindow.open(map1, marker1);
  }
  //스캐너버튼 클릭시
  const onClickScanner = () => {
    var scanner = !onOffScanner;
    setOnOffScanner(scanner);
    mapConfig(location, scanner);
  }

  //존버튼 클릭시
  const onClickZones = () => {
    setOnOffZone(!onOffZone);
  }

  
const onClickZonePos1 = (e) => {
  setLocation(new naver.maps.LatLng(34.92761, 128.07073));
  mapConfig(new naver.maps.LatLng(34.92761, 128.07073), onOffScanner);
}
const onClickZonePos2 = (e) => {
  setLocation(new naver.maps.LatLng(34.93408, 128.05417));
  mapConfig(new naver.maps.LatLng(34.93408, 128.05417), onOffScanner);
}
const onClickZonePos3 = (e) => {
  setLocation(new naver.maps.LatLng(34.93180, 128.05206));
  mapConfig(new naver.maps.LatLng(34.93180, 128.05206), onOffScanner);
}
const onClickZonePos4 = (e) => {
  setLocation(new naver.maps.LatLng(35.0705208,128.0641238));
  mapConfig(new naver.maps.LatLng(35.0705208,128.0641238), onOffScanner);
}
const onClickZonePos5 = (e) => {
  setLocation(new naver.maps.LatLng(34.9247376,128.0757359));
  mapConfig(new naver.maps.LatLng(34.9247376,128.0757359), onOffScanner);
}
const onClickZonePos6 = (e) => {
  setLocation(new naver.maps.LatLng(34.9293438,128.0765472));
  mapConfig(new naver.maps.LatLng(34.9293438,128.0765472), onOffScanner);
}
const onClickZonePos7 = (e) => {
  setLocation(new naver.maps.LatLng(34.9573086,128.0915738));
  mapConfig(new naver.maps.LatLng(34.9573086,128.0915738), onOffScanner);
}
const onClickZonePos8 = (e) => {
  setLocation(new naver.maps.LatLng(34.9671874,127.9816554));
  mapConfig(new naver.maps.LatLng(34.9671874,127.9816554), onOffScanner);
}
const onClickZonePos9 = (e) => {
  setLocation(new naver.maps.LatLng(34.92665,128.0965176));
  mapConfig(new naver.maps.LatLng(34.92665,128.0965176), onOffScanner);
}
const onClickZonePos10 = (e) => {
  setLocation(new naver.maps.LatLng(35.00932,128.047096));
  mapConfig(new naver.maps.LatLng(35.00932,128.047096), onOffScanner);
}
const onClickZonePos11 = (e) => {
  setLocation(new naver.maps.LatLng(34.9903145,128.041014));
  mapConfig(new naver.maps.LatLng(34.9903145,128.041014), onOffScanner);
}
const onClickZonePos12 = (e) => {
  setLocation(new naver.maps.LatLng(34.9260643,128.0443779));
  mapConfig(new naver.maps.LatLng(34.9260643,128.0443779), onOffScanner);
}
const onClickZonePos13 = (e) => {
  setLocation(new naver.maps.LatLng(35.0832346,127.9199298));
  mapConfig(new naver.maps.LatLng(35.0832346,127.9199298), onOffScanner);
}
const onClickZonePos14 = (e) => {
  setLocation(new naver.maps.LatLng(35.0858539,128.0939026));
  mapConfig(new naver.maps.LatLng(35.0858539,128.0939026), onOffScanner);
}


  



useEffect(() => {
  getAPIdata();
  // 30분마다 새로 고침 하여 데이터를 신규로 받아옴.
  // 30분 = 1800초 * 100 하여 밀리세컨단위로 변환 1800000
  setInterval(getAPIdata, 180000);
  getDeviceStatus();
  setInterval(getDeviceStatus, 180000);

}, []);

useEffect(() => { // API 새로 고침할때마다 지도 다시 그려줌
  mapConfig();
}, [visitor1])

 

  return (
    <>    
      <Script
        type={"text/javascript"}
        src={'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=t0gdynkrzk&submodules=visualization'}
        onReady={mapConfig}
      ></Script>  
      <Mapp>
        <div id="map" className='map'></div>
        <div className='overlaybtn'>
          <div>
            <button className='zone' onClick={onClickScanner} > scanner</button>
            <button className='zone' onClick={onClickZones} > zone</button>          
          </div>
          { onOffZone ? <div className='buttons'>
            <button className='button' onClick={onClickZonePos1} > 용궁시장</button>
            <button className='button' onClick={onClickZonePos2} > 대방정류장</button>
            <button className='button' onClick={onClickZonePos3} > 삼천포대교공원</button>
            <button className='button' onClick={onClickZonePos4} > 항공우주과학관</button>
            <button className='button' onClick={onClickZonePos5} > 팔포음식특화거리</button>
            <button className='button' onClick={onClickZonePos6} > 삼천포중앙시장</button>
            <button className='button' onClick={onClickZonePos7} > 용두공원</button>
            <button className='button' onClick={onClickZonePos8} > 별주부전테마파크</button>
            <button className='button' onClick={onClickZonePos9} > 남일대해수욕장</button>
            <button className='button' onClick={onClickZonePos10} > 부잔교갯벌탐방로</button>
            <button className='button' onClick={onClickZonePos11} > 대포항</button>
            <button className='button' onClick={onClickZonePos12} > 초양정류장</button>
            <button className='button' onClick={onClickZonePos13} > 다솔사입구</button>
            <button className='button' onClick={onClickZonePos14} > 수양공원</button>
          </div> : ''}
        </div>
      </Mapp>
        
    </>
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

export default Map;