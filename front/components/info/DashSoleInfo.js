// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들 
//api 불러와서 바로 적용
import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//인디케이터 디자인
const Block = styled.div`
  .dark {   
    .fpa_box {
      background-color:#3c496e;
      box-shadow: 0px 0px 0px #cccccc;
      
    }
    .fpa_box_table {
      background-color: #3c496e;
      border-radius:7px;
    }
    .fpa_title {
      font-size: 15px;
      color: white;
      font-weight: normal;
    }

    .td {
      border-right: solid 1px #526395;
    }
    .fpa_box_table .td:nth-child(1) {
      border-left: solid 0;
    }
    .fpa_box_table .td:nth-child(6) {
      border-right: solid 0;
    }
    .fpa_num1 {
      font-size: 22px;
      font-weight: normal;
      color: white;
    }
    .fpa_num2 {
      font-size: 14px;
      color: white;
    }
    .fpa_num3 {
      font-size: 14px;
      margin: 0 0 0 5px;
      color: #e5004f;
    }

    .fpa_num3_1 {
        font-size: 14px;
        margin: 0 0 0 5px;
        color: #00b7ee;
    }
    .fpa_num4 {
      font-size: 14px;
      color: white;

    }
  
}


.onclickalldevice {
  background: rgba(255,255,255,0);
  border: none;
  font-weight: bold;
  font-size: 15px;
}



`;

const StatusBlock = styled.div`

  .fpa_box {
    width: 95%;
    margin: 10px 2.5% 10px 2.5%;
    background-color: #72C5EE;
    border-radius:7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .back_1 {
    background-color: #6BABF1;
  }
  .back_2 {
    background-color: #69B1F3;
  }
  .back_3 {
    background-color: #6CBBF0;
  }
  .back_4 {
    background-color: #72C5EE;
  }
  .back_5 {
    background-color: #6ECCDC;
  }
  .back_6 {
    background-color: #6CD0D1;
  }
  .back_7 {
    background-color: #6BD3CD;
  }
  .back_8 {
    background-color: #69D7C2;
  }

  .fpa_box_table {
    width: 100%;
    //height: 100%;
    text-align: center;
       
    
  }
  

  .fpa_box_table .tr {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
    margin: 10px 5px 0px 0;
    height: 100%;
    line-height: 300%; 
    .fpa_title {
      font-size: 17.5px;
      color: white;
      font-weight: 500;    
    }
  }
  .fpa_box_table .trDevice {
    display: grid;
    grid-template-columns: 1fr 1fr;
    line-height: 150%;
    margin: 0;
    .fpa_title {
      font-size: 15px;
      color: white;
      font-weight: 500;    
    }
  }
  .tr .td {
    border-right: solid 1px white;
  }
  .fpa_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .fpa_box_table .tr .td:nth-child(4) {
    border-right: solid 0;
  }

  .onclickdevice {
    cursor: pointer;
  }





`;


function DashSoleInfo( {theme} ) {
  const { me } = useSelector((state) => state.auth);
  const slideEl = useRef(null);
  const [settings, setSettings] = useState({});
  const [allDeviceStatus, setAllDeviceStatus] = useState(false);

  const [zoneInfo1, setZoneInfo1] = useState([0, 0, 0]);
  const [zoneInfo2, setZoneInfo2] = useState([0, 0, 0]);
  const [zoneInfo3, setZoneInfo3] = useState([0, 0, 0]);
  const [zoneInfo4, setZoneInfo4] = useState([0, 0, 0]);
  const [zoneInfo5, setZoneInfo5] = useState([0, 0, 0]);
  const [zoneInfo6, setZoneInfo6] = useState([0, 0, 0]);
  const [zoneInfo7, setZoneInfo7] = useState([0, 0, 0]);
  const [zoneInfo8, setZoneInfo8] = useState([0, 0, 0]);
  const [zoneInfo9, setZoneInfo9] = useState([0, 0, 0]);
  const [zoneInfo10, setZoneInfo10] = useState([0, 0, 0]);
  const [zoneInfo11, setZoneInfo11] = useState([0, 0, 0]);
  const [zoneInfo12, setZoneInfo12] = useState([0, 0, 0]);
  const [zoneInfo13, setZoneInfo13] = useState([0, 0, 0]);
  const [zoneInfo14, setZoneInfo14] = useState([0, 0, 0]);

  //const zones = [1881, 1883, 1884, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2013];
  const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원', 2015, 2016];


//예시
    const device1881 = [
        // 용궁시장
        {mac : "D865950401AF", zone_id : 1881, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401B9", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너"},
        {mac : "D865950401BD", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너"},
        {mac : "D865950401BE", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너 + 센서"},
        {mac : "D865950401BF", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너 + 센서"},
        {mac : "D865950401C0", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너 + 센서"},
        {mac : "D865950401A8", zone_id : 1881, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401AE", zone_id : 1881, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401B4", zone_id : 1881, status : "1" , ins_loc: "실외", type : "스캐너 + 센서"},
        {mac : "D865950401BB", zone_id : 1881, status : "1" , ins_loc: "실내", type : "스캐너"},
    ]
    const device1883 = [
        // 바다케이블카
        {mac : "D865950401EA", zone_id : 1883, status : "1"  , ins_loc: "실내", type : "스캐너"},
        {mac : "D865950401BC", zone_id : 1883, status : "1"  , ins_loc: "실내", type : "스캐너"},
        {mac : "D865950401AC", zone_id : 1883, status : "1"  , ins_loc: "실외", type : "스캐너"},
    ]
    const device1884 = [
        // 삼천포대교공원
        {mac : "D865950401AB", zone_id : 1884, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401AD", zone_id : 1884, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401B7", zone_id : 1884, status : "1" , ins_loc: "실내", type : "스캐너"},
        {mac : "D865950401A9", zone_id : 1884, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401B8", zone_id : 1884, status : "1" , ins_loc: "실외", type : "스캐너 + 센서"},
    ]
    const device2001 = [
        // 항공우주과학관
        {mac : "D86595040260", zone_id : 2001, status : "1" , ins_loc: "실내", type : "스캐너"},
    ]
    const device2002 = [
        // 팔포음식특화거리
        {mac : "D86595040261", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040262", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C6", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C7", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C8", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D8659504026B", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D8659504026F", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040271", zone_id : 2002, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2003 = [
        // 삼천포중앙시장
        {mac : "D86595040266", zone_id : 2003, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040263", zone_id : 2003, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040264", zone_id : 2003, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C5", zone_id : 2003, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2004 = [
        // 용두공원
        {mac : "D86595040265", zone_id : 2004, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D8659504026D", zone_id : 2004, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2005 = [
        // 별주부전테마파크
        {mac : "D86595040267", zone_id : 2005, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C2", zone_id : 2005, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C3", zone_id : 2005, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C4", zone_id : 2005, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2006 = [
        // 남일대해수욕장
        {mac : "D86595040268", zone_id : 2006, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040193", zone_id : 2006, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2007 = [
        // 부잔교갯벌탐방로
        {mac : "D86595040269", zone_id : 2007, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2008 = [
        // 대포항
        {mac : "D8659504026A", zone_id : 2008, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D86595040197", zone_id : 2008, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2010 = [
        // 초양정류장
        {mac : "D8659504026C", zone_id : 2010, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2011 = [
        // 다솔사입구
        {mac : "D8659504026E", zone_id : 2011, status : "1" , ins_loc: "실외", type : "스캐너"},
        {mac : "D865950401C1", zone_id : 2011, status : "1" , ins_loc: "실외", type : "스캐너"},
    ]
    const device2013 = [
        // 수양공원
        {mac : "D86595040270", zone_id : 2013, status : "1" , ins_loc: "실외", type : "스캐너"},
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



  const getAPIdata = async () => {
    var zoneData1 = [0, 0, 0];
    var zoneData2 = [0, 0, 0];
    var zoneData3 = [0, 0, 0];
    var zoneData4 = [0, 0, 0];
    var zoneData5 = [0, 0, 0];
    var zoneData6 = [0, 0, 0];
    var zoneData7 = [0, 0, 0];
    var zoneData8 = [0, 0, 0];
    var zoneData9 = [0, 0, 0];
    var zoneData10 = [0, 0, 0];
    var zoneData11 = [0, 0, 0];
    var zoneData12 = [0, 0, 0];
    var zoneData13 = [0, 0, 0];
    var zoneData14 = [0, 0, 0];

    // 오늘 누적방문객
    try {
         
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`); //오늘누적
      const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`); //재방문
      const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime`); //평균체류시간
  
      //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
      //console.log(response3.data);
      
      for (let i of response.data) {
        if (i.zone === zones[0]) {
          zoneData1[0] = i.data;
        } else if (i.zone === zones[1]) {
         zoneData2[0] = i.data;
        } else if (i.zone === zones[2]) {
         zoneData3[0] = i.data;
        } else if (i.zone === zones[3]) {
         zoneData4[0] = i.data;
        } else if (i.zone === zones[4]) {
         zoneData5[0] = i.data;
        } else if (i.zone === zones[5]) {
         zoneData6[0] = i.data;
        } else if (i.zone === zones[6]) {
         zoneData7[0] = i.data;
        } else if (i.zone === zones[7]) {
         zoneData8[0] = i.data;
        } else if (i.zone === zones[8]) {
          zoneData9[0] = i.data;
        } else if (i.zone === zones[9]) {
          zoneData10[0] = i.data;
        } else if (i.zone === zones[10]) {
          zoneData11[0] = i.data;
        } else if (i.zone === zones[11]) {
          zoneData12[0] = i.data;
        } else if (i.zone === zones[12]) {
          zoneData13[0] = i.data;
        } else if (i.zone === zones[13]) {
          zoneData14[0] = i.data;
        }
      }

      for (let i of response2.data) {
        if (i.zone === zones[0]) {
          zoneData1[1] = i.data;
        } else if (i.zone === zones[1]) {
         zoneData2[1] = i.data;
        } else if (i.zone === zones[2]) {
         zoneData3[1] = i.data;
        } else if (i.zone === zones[3]) {
         zoneData4[1] = i.data;
        } else if (i.zone === zones[4]) {
         zoneData5[1] = i.data;
        } else if (i.zone === zones[5]) {
         zoneData6[1] = i.data;
        } else if (i.zone === zones[6]) {
         zoneData7[1] = i.data;
        } else if (i.zone === zones[7]) {
         zoneData8[1] = i.data;
        } else if (i.zone === zones[8]) {
          zoneData9[1] = i.data;
        } else if (i.zone === zones[9]) {
          zoneData10[1] = i.data;
        } else if (i.zone === zones[10]) {
          zoneData11[1] = i.data;
        } else if (i.zone === zones[11]) {
          zoneData12[1] = i.data;
        } else if (i.zone === zones[12]) {
          zoneData13[1] = i.data;
        } else if (i.zone === zones[13]) {
          zoneData14[1] = i.data;
        }
      }

      for (let i of response3.data) {
        if (i.zone === zones[0]) {
          zoneData1[2] = Math.round(i.data/60);
        } else if (i.zone === zones[1]) {
         zoneData2[2] = Math.round(i.data/60);
        } else if (i.zone === zones[2]) {
         zoneData3[2] = Math.round(i.data/60);
        } else if (i.zone === zones[3]) {
         zoneData4[2] = Math.round(i.data/60);
        } else if (i.zone === zones[4]) {
         zoneData5[2] = Math.round(i.data/60);
        } else if (i.zone === zones[5]) {
         zoneData6[2] = Math.round(i.data/60);
        } else if (i.zone === zones[6]) {
         zoneData7[2] = Math.round(i.data/60);
        } else if (i.zone === zones[7]) {
         zoneData8[2] = Math.round(i.data/60);
        } else if (i.zone === zones[8]) {
          zoneData9[2] = Math.round(i.data/60);
        } else if (i.zone === zones[9]) {
          zoneData10[2] = Math.round(i.data/60);
        } else if (i.zone === zones[10]) {
          zoneData11[2] = Math.round(i.data/60);
        } else if (i.zone === zones[11]) {
          zoneData12[2] = Math.round(i.data/60);
        } else if (i.zone === zones[12]) {
          zoneData13[2] = Math.round(i.data/60);
        } else if (i.zone === zones[13]) {
          zoneData14[2] = Math.round(i.data/60);
        }
        //console.log(i.data);
      }
              //console.log('현재방문객추이',todayVisitorTotal);
      
  
    } catch (err) {
        console.error(err);
    }

    setZoneInfo1(zoneData1);
    setZoneInfo2(zoneData2);
    setZoneInfo3(zoneData3);
    setZoneInfo4(zoneData4);
    setZoneInfo5(zoneData5);
    setZoneInfo6(zoneData6);
    setZoneInfo7(zoneData7);
    setZoneInfo8(zoneData8);
    setZoneInfo9(zoneData9);
    setZoneInfo10(zoneData10);
    setZoneInfo11(zoneData11);
    setZoneInfo12(zoneData12);
    setZoneInfo13(zoneData13);
    setZoneInfo14(zoneData14);
    


  }

  const getDeviceStatus = async () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const date = year + '-' + month + '-' + day;

    try {
      //console.log(`${process.env.NEXT_PUBLIC_API_URL}/DeviceStatus`)
      console.log('deviceStart1');

    const deviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceStatus`);
    //const deviceResponse = await axios.get(`http://54.180.158.22:8000/v1/DaeguDalseong/DeviceStatus`);
    //console.log(deviceResponse.data)

    console.log('deviceStart2');
    

        const resultData = deviceResponse.data;

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
        const ScannerStatus = (scannerInfo) => ` 
          [장비정보]
          MAC : ${scannerInfo['mac']} 
          설치장소 : ${scannerInfo['ins_loc']} 
          장비타입 : ${scannerInfo['type']}
          `

        // 값 초기화

        for (let i=0; i<newDevice.length; i++) {
          newDevice[i][newDevice[i].length -1].good = 0;
          newDevice[i][newDevice[i].length -1].error = 0;
        }


        for(var i=0; i < resultData.length; i++){

            let mac = resultData[i].MAC;
            let status = resultData[i].ALIVE;
            //console.log(resultData[i].ALIVE);

            for (var j=0; j < newDevice.length; j++){
              for(var a=0; a < newDevice[j].length; a++){
                let macJ = newDevice[j][a].mac;
                let device = newDevice[j];
                //console.log('status: ', mac);
                //console.log(macJ);
                if(String(mac) === String(macJ)){
                  newDevice[j][a].status = status;
                     //console.log('status: ', newDevice);
                    // console.log(macJ);
                    if(status === 1) {
                      device[device.length-1].good = device[device.length-1].good + 1;
                      //console.log('good: ',device1881Arr[device1881Arr.length-1].good_info);
                    } else {
                      device[device.length-1].error = device[device.length-1].error + 1;
                    }
                }
            }
            }
        }


       //경주

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

      } catch (err) {
        console.error(err);
    }
    
}


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
    getDeviceStatus();
    setInterval(getAPIdata, 1800000);
    setInterval(getDeviceStatus, 1800000)
  }, []);

  const onClickAllZoneDevice = () => {
    setAllDeviceStatus(!allDeviceStatus);
  }  
  

  const Box = ({name, zoneInfos, zoneScannerInfos, back}) => {
    const [deviceStatus, setDeviceStatus] = useState(false);
    


    const makeNumber = (param) => {
      return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }  
     // console.log ( makeNumber(Number(todayVisit)))

    const onClickZoneDevice = () => {
      setDeviceStatus(!deviceStatus);
    }

    
    //console.log('길이: ',zoneScannerInfos[0]['status']);

    

    return (
      <div className={"fpa_box " + back}>
        <div className="fpa_box_table">
              <div className='tr'>
                <div className='td onclickdevice'><span className="fpa_title" onClick={onClickZoneDevice}>{name}</span></div>
                <div className='td'><span className="fpa_title">{zoneInfos  ? makeNumber(Number(zoneInfos[0])) + '명' : '-'}</span></div>
                <div className='td'><span className="fpa_title">{zoneInfos  ? makeNumber(Number(zoneInfos[1])) + '명' : '-'}</span></div>
                <div className='td'><span className="fpa_title">{zoneInfos  ? makeNumber(Number(zoneInfos[2])) + '분' : '-'}</span></div>
              </div>   
              {deviceStatus || allDeviceStatus? 
              <div className='trDevice'>
                {/* <div className='td'> </div> */}
                <div className='td'><span className="fpa_title" >정상 : {zoneScannerInfos[zoneScannerInfos.length-1].good}대</span></div>
                {/* <div className='td'><span className="fpa_title" >이상 : {zoneScannerInfos[zoneScannerInfos.length-1].weird}대</span></div>
                <div className='td'><span className="fpa_title" >경고 : {zoneScannerInfos[zoneScannerInfos.length-1].warning}대</span></div> */}
                <div className='td'><span className="fpa_title" >고장 : {zoneScannerInfos[zoneScannerInfos.length-1].error}대</span></div>
              </div> : '' 
              }
            </div>
      </div>

    );
  }
   



  return (  

    <Block>
      <div className='column'>            
            <button className='tr onclickalldevice' onClick={onClickAllZoneDevice} >개소명</button>
            <div className='tr'>금일방문</div>
            <div className='tr'>재방문</div>
            <div className='tr'>체류시간</div>                    
          </div> 
      <div className={me && me.theme === 'dark'? 'darkback':'lightback'}>
        <StatusBlock className={me && me.theme === 'dark'? 'dark':'light'} >
        <div className="compare_list">
            <Slider ref={slideEl} {...settings}>
              <div>
                <div className='division' >
                  <Box name={'용궁수산시장'} zoneInfos={zoneInfo1} zoneScannerInfos={device1881Arr} back={'back_1'} />
                </div>
                <div className='division'>
                  <Box name={'바다케이블카'} zoneInfos={zoneInfo2} zoneScannerInfos={device1883Arr} back={'back_2'} />
                </div>
                <div className='division'>
                  <Box name={'삼천포대교공원'} zoneInfos={zoneInfo3} zoneScannerInfos={device1884Arr} back={'back_3'} />
                </div>
                <div className='division'>
                  <Box name={'항공우주과학관'} zoneInfos={zoneInfo4} zoneScannerInfos={device2001Arr} back={'back_4'} />
                </div>
                <div className='division'>
                  <Box name={'팔포음식특화거리'} zoneInfos={zoneInfo5} zoneScannerInfos={device2002Arr} back={'back_6'} />
                </div>
                <div className='division'>
                  <Box name={'삼천포중앙시장'} zoneInfos={zoneInfo6} zoneScannerInfos={device2003Arr} back={'back_7'} />
                </div>
                <div className='division'>
                  <Box name={'용두공원'} zoneInfos={zoneInfo7} zoneScannerInfos={device2004Arr} back={'back_8'} />
                </div>                               
              </div>
              <div>
                <div className='division'>
                  <Box name={'별주부전테마파크'} zoneInfos={zoneInfo8} zoneScannerInfos={device2005Arr} back={'back_1'} />
                </div>
                <div className='division'>
                  <Box name={'남일대해수욕장'} zoneInfos={zoneInfo9} zoneScannerInfos={device2006Arr} back={'back_2'} />
                </div>
                <div className='division'>
                  <Box name={'부잔교갯벌탐방로'} zoneInfos={zoneInfo10} zoneScannerInfos={device2007Arr} back={'back_3'} />
                </div>
                <div className='division'>
                  <Box name={'대포항'} zoneInfos={zoneInfo11} zoneScannerInfos={device2008Arr} back={'back_4'} />
                </div> 
                <div className='division'>
                  <Box name={'초양정류장'} zoneInfos={zoneInfo12} zoneScannerInfos={device2010Arr} back={'back_6'} />
                </div> 
                <div className='division'>
                  <Box name={'다솔사입구'} zoneInfos={zoneInfo13} zoneScannerInfos={device2011Arr} back={'back_7'} />
                </div> 
                <div className='division'>
                  <Box name={'수양공원'} zoneInfos={zoneInfo14} zoneScannerInfos={device2013Arr} back={'back_8'} />
                </div> 
              </div> 
            </Slider>
          </div></StatusBlock>
      </div>
    </Block>

  )
    


}



export default DashSoleInfo;