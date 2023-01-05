import React, { useEffect, useCallback, useState }  from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import { Document, Page, pdfjs } from 'react-pdf';

import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import NavBottom from '../../components/common/NavBottom';
import ReportViewer from '../../components/report/reportpdfviewer'
import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

import { PUT_REPORTDATA_REQUEST } from '../../reducers/report';



const Background = styled.div`
  
  .page_title {
    float: left;
    font-size: 20.5px;
    font-weight: lighter;
    margin: 3px 0 0 12px;
    color: black;
    font-weight: bolder
  }
  .report_page {
    width: 100%;
    float: left;
  }
  .report_list_m {
    width: 19%;
    color: black;
    margin: 5px 0.5% 0 0.5%;
    padding: 0 0 20px 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    float: left;
    height: auto;
}

/*연도선택*/
.form-control2 {
    height: calc(1.0em + 0.75rem + 2px);
    padding: 0 10px 0 10px;
    margin: 10px 0 20px 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

}
/*--보고서다운로드 버튼--*/
.report_down {
    text-transform: uppercase;
    border: 0;
    text-align: center;
    color: #e4e1e1;;
    font-size: 14px;
    font-weight: bolder;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    padding: 6px 15px 6px 15px;
    margin: 3px 10px 20px 20px;
    border-radius: 5px;

}

/*--안내문구--*/
.report_info {
    font-size: 13px;
    line-height: 140%;
    padding: 0 8% 10px 8%;
    display: block;
    color: black;
}

.report_down:hover,
.report_down:active,
.report_down:focus {
    background: #d59866;
}
.b3_off {
    background: #9C9C9C;
    color:white;
}

/*리스트*/
.report_list {
    width: 80%;
    margin: 0 10% 0 10%;
    font-size: 14px;
    text-align: center;
    border: solid 1px #ccc;
    border-collapse: collapse;
    background-color: #fff;
    font-weight: bolder;
}

.report_list .tr:nth-child(1) {
    background-color: #dae3f3;
    line-height: 40px;
    color: #000;
}

.report_list .th {
    border: solid 1px #ccc;
    line-height: 40px;
    color: #000;
}

.report_list .td {
    
    line-height: 40px;
    color: #000;
}

.report_list .td:hover {
    background-color: #ccc;
    color: #fff;
    cursor: pointer;
}

.report_view {
    width: 79%;
    margin: 5px 0.5% 0 0.5%;
    float: right;
}

.pdf_view {
    display: block;
    width: 100%;
    height: 720px;
    border: 0px;
    overflow: auto;
    color:white;
}

.iframe {
    width:100%;
    height: 100%;
}


.lightback {
    //background-color: #f6f9fe;
}
.darkback {
    background-color: #1b2137;

    .page_title {
        font-size: 20.5px;
        font-weight: lighter;
        margin: 3px 0 0 12px;
        color: #ccc;
        font-weight: bolder
      }

    .report_list_m {
    color: white;
    background-color: #354060;
    box-shadow: 0 0 0px #ccc;
    float: left;
    height: auto;
    }

    .report_down {
        color: #000;
    }
    .b3_off {
        background: #926c4d;
        color:white;
    }
}

`;

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Report = () => {
  
  const { me } = useSelector((state) => state.auth);
  //const ipaddr = '182.31.214.16:4000'
  const ipaddr = 'localhost:4000'
  const dispatch = useDispatch();
  let selectList = [];
  const today = new Date();
  const curYear = today.getFullYear();
  const [selectYear, setSelectYear] = useState(curYear);
  const [strYear, setStrYear] = useState(curYear);
  const [selectMonth, setSelectMonth] = useState(null);
  const [datas, setDatas] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [urlPdf, setUrlPdf] = useState('http://'+ipaddr+'/reportinfo.pdf');
  const [test, setTest] = useState(false);

  //const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077];
  const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원'];

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
}

  for (var i = 2021; i <= curYear; i++) {
        selectList.push(i);
    }


  const getAPIdata = async (month) => {
    console.log('start')

    
    var year = selectYear;
     if(month < 10 ){
         month = '0' + month;
     }
     var yearmonthStr = year + "년" + month + "월";
     var yearmonth = year + "-" + month;
     setStrYear(yearmonthStr);
     setUrlPdf('http://'+ipaddr+'/sacheontour'+strYear+'.pdf');

    const lastMonthlasts = (y,m) => { //말일
        var lastMonthlastday = new Date(y, m, 1);
        let lastMonthlastdayYear = lastMonthlastday.getFullYear();
        let lastMonthlastdayMonth = lastMonthlastday.getMonth()+1;
        let lastMonthlastdayDate = lastMonthlastday.getDate();
        return (lastMonthlastdayYear + '-' + lastMonthlastdayMonth + '-' + lastMonthlastdayDate);
    }
    var sttdate = selectYear+ '-' +month+ '-' +'01';
    var startdate = selectYear+ '-' +month+ '-' +'02';
    var enddate = lastMonthlasts(selectYear,Number(month));


    try {       
        const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${sttdate}&to=${enddate}`);  
        //일일방문객
        //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${sttdate}&to=${enddate}`);


        
        
        let arrY = [["삼천포 용궁수산시장"],[ "바다케이블카"], ["삼천포대교공원"], ["항공우주과학관"], ["팔포음식특화거리"],[ "삼천포중앙시장"], ["용두공원"],["별주부전테마파크"],
        ['남일대해수욕장'],['무지개빛 해안도로(부잔교갯벌탐방)'],['무지개빛 해안도로(대포항)'],['사천바다케이블카(초양정류장)'],['다솔사 입구(주차장)'],['수양공원']];
        let dates = [];
        let day = new Date(sttdate).getDay(); //달의 맨 첫날 요일 
        const weekDatas = [            
            [1, 2, 3, 4, 5, 6, 0], // 첫날이 일요일일때
            [0, 1, 2, 3, 4, 5, 6], //월
            [6, 0, 1, 2, 3, 4, 5], //화
            [5, 6, 0, 1, 2, 3, 4], //수
            [4, 5, 6, 0, 1, 2, 3], //목
            [3, 4, 5, 6, 0, 1, 2], //금
            [2, 3, 4, 5, 6, 0, 1] ]

        const data = {
            report_date : yearmonthStr,
            zone_data : []
        }

        for (let i of responseToday.data) {//한달치 불러와서 저장하기
          if (i.zone === zones[0]) {
            arrY[0].push(i.data);
            dates.push(i.time.slice(0,10));
          } else if (i.zone === zones[1]) {
            arrY[1].push(i.data);
          } else if (i.zone === zones[2]) {
            arrY[2].push(i.data);
          } else if (i.zone === zones[3]) {
            arrY[3].push(i.data);
          } else if (i.zone === zones[4]) {
            arrY[4].push(i.data);
          } else if (i.zone === zones[5]) {
            arrY[5].push(i.data);
          } else if (i.zone === zones[6]) {
            arrY[6].push(i.data);
          } else if (i.zone === zones[7]) {
            arrY[7].push(i.data);
          } else if (i.zone === zones[8]) {
            arrY[8].push(i.data);
          } else if (i.zone === zones[9]) {
            arrY[9].push(i.data);
          } else if (i.zone === zones[10]) {
            arrY[10].push(i.data);
          } else if (i.zone === zones[11]) {
            arrY[11].push(i.data);
          } else if (i.zone === zones[12]) {
            arrY[12].push(i.data);
          } else if (i.zone === zones[13]) {
            arrY[13].push(i.data);
          }
        }

        //환경정보
        const responseEnv = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/SensorDataDayAverage?from=${sttdate}&to=${enddate}`);


        const envData1 = [];
        const envData2 = [];
        const envData3 = [];

        var cnt1 = 0;

        for (let i=0; i<dates.length; i++){ //환경데이터 초기화하기
            envData1.push([]);
            envData2.push([]);
            envData3.push([]);
            for (let j=0; j<5; j++){
                envData1[i].push(j);
                envData2[i].push(j);
                envData3[i].push(j);
            }
            envData1[i].push(dates[i]);
            envData2[i].push(dates[i]);
            envData3[i].push(dates[i]);
        }
        


        for (let i of responseEnv.data) {//한달치 불러와서 저장하기
            if (i.zone == zones[0]){
                for (let j=0; j<dates.length; j++) { //날짜 길이만큼
                    if(i.time.slice(0,10) === envData1[j][5]){
                        envData1[j][0] = envData1[j][0] + i.temperature;
                        envData1[j][1] = envData1[j][1] + i.humidity;
                        envData1[j][2] = envData1[j][2] + i.pm10;
                        envData1[j][3] = envData1[j][3] + i.pm2_5;
                        envData1[j][4] = envData1[j][4] + i.tvoc;
                        if(j == 1){
                            cnt1 = cnt1 + 1;
                        }                        
                    }
                }                                              
            } else if (i.zone == zones[1]){
                for (let j=0; j<dates.length; j++) { //날짜 길이만큼
                    if(i.time.slice(0,10) === envData2[j][5]){ //해당날짜가 같은지
                        envData2[j][0] = envData2[j][0] + i.temperature; //온도데이터 다 더해줌
                        envData2[j][1] = envData2[j][1] + i.humidity;
                        envData2[j][2] = envData2[j][2] + i.pm10;
                        envData2[j][3] = envData2[j][3] + i.pm2_5;
                        envData2[j][4] = envData2[j][4] + i.tvoc;            
                    }
                }                                              
            } else if (i.zone == zones[2]){
                for (let j=0; j<dates.length; j++) { //날짜 길이만큼
                    if(i.time.slice(0,10) === envData1[j][5]){
                        envData3[j][0] = envData3[j][0] + i.temperature;
                        envData3[j][1] = envData3[j][1] + i.humidity;
                        envData3[j][2] = envData3[j][2] + i.pm10;
                        envData3[j][3] = envData3[j][3] + i.pm2_5;
                        envData3[j][4] = envData3[j][4] + i.tvoc;                      
                    }
                }                                              
            }
          }          
          


        for (let i=0; i<dates.length; i++){ 
                //환경데이터 평균값 내기
                envData1[i][0] = Math.round(envData1[i][0]/cnt1);
                envData1[i][1] = Math.round(envData1[i][1]/cnt1);
                envData1[i][2] = Math.round(envData1[i][2]/cnt1);
                envData1[i][3] = Math.round(envData1[i][3]/cnt1);
                envData1[i][4] = Math.round(envData1[i][4]/cnt1);

                envData2[i][0] = Math.round(envData2[i][0]/cnt1);
                envData2[i][1] = Math.round(envData2[i][1]/cnt1);
                envData2[i][2] = Math.round(envData2[i][2]/cnt1);
                envData2[i][3] = Math.round(envData2[i][3]/cnt1);
                envData2[i][4] = Math.round(envData2[i][4]/cnt1);

                envData3[i][0] = Math.round(envData3[i][0]/cnt1);
                envData3[i][1] = Math.round(envData3[i][1]/cnt1);
                envData3[i][2] = Math.round(envData3[i][2]/cnt1);
                envData3[i][3] = Math.round(envData3[i][3]/cnt1);
                envData3[i][4] = Math.round(envData3[i][4]/cnt1);
         }


        for (let i=0; i < arrY.length; i++){            
            var dayVisitor = [];
            var dayVisitor_Arr = arrY[i].slice(2);
            var weekVisitor = {zone_id : '', mon_visitor : '', mon_percent: '', tue_visitor : '', tue_percent: '', wed_visitor : '', wed_percent: '', thu_visitor : '', thu_percent: '', fri_visitor : '', fri_percent: '', sat_visitor : '', sat_percent: '', sun_visitor : '', sun_percent: '', total_data:'', total_per:100};    
            var weekVisitor_Arr = [0, 0, 0, 0, 0, 0, 0];        
            var zoneId = arrY[i][1];
            var zoneName = arrY[i][0]; 
            var env_temp = [];
            var env_humid = [];
            var env_dust = [];
            var env_ultradust = [];
            var env_tvoc = [];
            if ( i === 0){
                zoneId = '1881'; 
                for (let j=0; j < dates.length; j++) {
                    dayVisitor.push({day_str : dates[j], visitor_cnt: arrY[i][j+1], temp: envData1[j][0], humi: envData1[j][1], dust: envData1[j][2], ultra_dust: envData1[j][3], tvoc:envData1[j][4]});
                    if (j != 0){
                       env_temp.push(envData1[j][0]);
                        env_humid.push(envData1[j][1]);
                        env_dust.push(envData1[j][2]);
                        env_ultradust.push(envData1[j][3]);
                        env_tvoc.push(envData1[j][4]); 
                    }                                       
                }
            } else if (i === 1){
                zoneId = '1883'; 
                for (let j=0; j < dates.length; j++) {
                    dayVisitor.push({day_str : dates[j], visitor_cnt: arrY[i][j+1], temp: envData2[j][0], humi: envData2[j][1], dust: envData2[j][2], ultra_dust: envData2[j][3], tvoc:envData2[j][4]});
                    if (j != 0){
                       env_temp.push(envData2[j][0]);
                        env_humid.push(envData2[j][1]);
                        env_dust.push(envData2[j][2]);
                        env_ultradust.push(envData2[j][3]);
                        env_tvoc.push(envData2[j][4]); 
                    }                    
                }

            } else if (i === 2){
                zoneId = '1884'; 
                for (let j=0; j < dates.length; j++) {
                    dayVisitor.push({day_str : dates[j], visitor_cnt: arrY[i][j+1], temp: envData3[j][0], humi: envData3[j][1], dust: envData3[j][2], ultra_dust: envData3[j][3], tvoc:envData3[j][4]});
                    if (j != 0){
                       env_temp.push(envData3[j][0]);
                        env_humid.push(envData3[j][1]);
                        env_dust.push(envData3[j][2]);
                        env_ultradust.push(envData3[j][3]);
                        env_tvoc.push(envData3[j][4]); 
                    }                    
                }

            } else {
                for (let j=0; j < dates.length; j++) {
                    dayVisitor.push({day_str : dates[j], visitor_cnt: arrY[i][j+1], temp: '', humi: '', dust: '', ultra_dust: '', tvoc: ''})
                }
            }

            for (let j=0; j < dates.length-1; j++) {
                if ( j%7 === weekDatas[day][0] ){
                    weekVisitor_Arr[0] = Number(weekVisitor_Arr[0]) + Number(arrY[i][j+1]);  
                }  else if ( j%7 === weekDatas[day][1] ){
                    weekVisitor_Arr[1] = Number(weekVisitor_Arr[1]) + Number(arrY[i][j+1]);
                } else if ( j%7 === weekDatas[day][2] ){
                    weekVisitor_Arr[2] = Number(weekVisitor_Arr[2]) + Number(arrY[i][j+1]);
                } else if ( j%7 === weekDatas[day][3] ){
                    weekVisitor_Arr[3] = Number(weekVisitor_Arr[3]) + Number(arrY[i][j+1]);
                } else if ( j%7 === weekDatas[day][4] ){
                    weekVisitor_Arr[4] = Number(weekVisitor_Arr[4]) + Number(arrY[i][j+1]);
                } else if ( j%7 === weekDatas[day][5] ){
                    weekVisitor_Arr[5] = Number(weekVisitor_Arr[5]) + Number(arrY[i][j+1]);
                } else if ( j%7 === weekDatas[day][6] ){
                    weekVisitor_Arr[6] = Number(weekVisitor_Arr[6]) + Number(arrY[i][j+1]);
                }                
            } 

            weekVisitor.total_data = weekVisitor_Arr[0] + weekVisitor_Arr[1] + weekVisitor_Arr[2] + weekVisitor_Arr[3] + weekVisitor_Arr[4] + weekVisitor_Arr[5] + weekVisitor_Arr[6];
            weekVisitor.mon_visitor = weekVisitor_Arr[0];
            weekVisitor.tue_visitor = weekVisitor_Arr[1];
            weekVisitor.wed_visitor = weekVisitor_Arr[2];
            weekVisitor.thu_visitor = weekVisitor_Arr[3];
            weekVisitor.fri_visitor = weekVisitor_Arr[4];
            weekVisitor.sat_visitor = weekVisitor_Arr[5];
            weekVisitor.sun_visitor = weekVisitor_Arr[6];
            weekVisitor.mon_percent = Math.round((weekVisitor_Arr[0]/weekVisitor.total_data)*100);
            weekVisitor.tue_percent = Math.round((weekVisitor_Arr[1]/weekVisitor.total_data)*100);
            weekVisitor.wed_percent = Math.round((weekVisitor_Arr[2]/weekVisitor.total_data)*100);
            weekVisitor.thu_percent = Math.round((weekVisitor_Arr[3]/weekVisitor.total_data)*100);
            weekVisitor.fri_percent = Math.round((weekVisitor_Arr[4]/weekVisitor.total_data)*100);
            weekVisitor.sat_percent = Math.round((weekVisitor_Arr[5]/weekVisitor.total_data)*100);
            weekVisitor.sun_percent = Math.round((weekVisitor_Arr[6]/weekVisitor.total_data)*100);

            var zone_data = {
                zone_id : zoneId,
                zone_name : zoneName,
                comment : "-",
                week_visitor : weekVisitor,
                day_visitor : dayVisitor,
                day_visitor_arr : dayVisitor_Arr,
                week_visitor_arr : weekVisitor_Arr,
                temp_arr : env_temp,
                humi_arr : env_humid,
                dust_arr : env_dust,
                ultradust_arr : env_ultradust,
                tvoc_arr : env_tvoc
            }
    
            data.zone_data.push(zone_data);


        } 
        
        setDatas(data);

        dispatch({
            type: PUT_REPORTDATA_REQUEST,
            data: data,
            //data: test,
          });  

  
    
      } catch (err) {
          console.error(err);
      }

  }

  const onClickReport = useCallback((e) => {
    //e.preventDefault();
    var yearmonthStr = selectYear + "년" + e + "월";
    //setUrlPdf('http://localhost:4000/goseong'+yearmonthStr+'.pdf');
    setSelectMonth(e); //날짜
    //console.log('url2:',urlPdf,'  ', yearmonthStr,'e :',e);
    getAPIdata(e);
    
    // dispatch({
    //   type: PUT_REPORTDATA_REQUEST,
    //   data: datas,
    // });   
    //console.log('data:',datas);
    });
    


  const onClickYear = useCallback((e) => {
    setSelectYear(e.target.value);
  });


  //로그인여부
  useEffect (() => {

  if (!(me && me.id)) {
      Router.replace('/login');
    }
        
   }, [me && me.id]);

   //리포트파일 연결
   useEffect (() => {
    var month = 0
    if(selectMonth < 10 ){
        month = '0' + selectMonth;
    } else {
        month = selectMonth;
    }
    var yearmonthStr = selectYear + "년" + selectMonth + "월";
    if (urlPdf !=='http://'+ipaddr+'/reportinfo.pdf'){
        setUrlPdf('http://'+ipaddr+'/sacheontour'+selectYear+month+'.pdf');
    }
    
   },[urlPdf])


   const pdfDownHandler = () => {

    if (!selectMonth) {
        alert('분석자료를 클릭 후 다운 버튼을 클릭하여 주세요.');
        return;
    }
    //let yearMonth = String(selected) + String(selectMonth);
    //let src = process.env.REACT_APP_RESTAPI_URL + "/sacheon" + yearMonth + ".pdf";
    let src = 'http://'+ipaddr+'/sacheontour'+strYear+'.pdf';
    window.open('about:blank').location.href = src;
    }

    const onLoadError = () => {
        alert('2분뒤 해당월을 다시 클릭해주세요');
    }
   

  return (  

    <Background>
      <div className={me && me.theme === 'dark'? 'darkback':'lightback'}>
      <Header page={'0'} />
      <Nav value={'3'}/>
      <div className="wrap">
            <div className="page_title">
                주요관광지 유동인구 분석자료
            </div>
            <div className="report_page">
                <div className="report_list_m">
                &nbsp;&nbsp;&nbsp;분석년도&nbsp;&nbsp;
                    <select className="form-control2" onChange={onClickYear} value={selectYear}>
                        {
                            selectList.map(item => (
                            <option value={item} key={item}>{item}</option>
                            ))
                        }
                    </select>
                    <button type="button" className="report_down b3_off" onClick={pdfDownHandler}>보고서 다운로드</button>
                    <br /><span className="report_info">※ 해당월의 분석자료를 클릭 후 보고서 다운로드 버튼을 클릭하여 주세요.</span>
                    <span className="report_info">※ 분석자료 로딩 실패시 해당월을 한번 더 클릭해주세요.</span>
                    <div className="report_list">
                        <div className='tr'>
                            <div className='th'>월별 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(1)}>1월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(2)}>2월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(3)}>3월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(4)}>4월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(5)}>5월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(6)}>6월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(7)}>7월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(8)}>8월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(9)}>9월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(10)}>10월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(11)}>11월 분석 자료</div>
                        </div>
                        <div className='tr'>
                            <div className='td' onClick={()=> onClickReport(12)}>12월 분석 자료</div>
                        </div>
                    </div>
                </div>
                {/*
                <!--분석결과 페이지--> */}
                <div className="report_view">
                    <div className="pdf_view" >
                        <Document file={urlPdf} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onLoadError}>
                            {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5} />
                            ))}
                        </Document>
                    </div>
                </div>
            </div>
        </div>
        </div>

      <div className='nb'><NavBottom value={'5'} theme={me && me.theme === 'dark'? 'dark':'light'}/></div>
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

export default Report;