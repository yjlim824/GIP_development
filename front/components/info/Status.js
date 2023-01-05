/* 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들 
 * zoneall, api 데이터 변경
*/
//api 불러와서 바로 적용
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

//인디케이터 디자인
const StatusBlock = styled.div`

  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 0 5px 0 0;
  
  
  .fpa_box {
    width: 98%;
    margin: 5px 1% 5px 1%;
    height: 130px;
    background-color: white;
    border-radius:7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .fpa_box_table {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 170%;
    margin: 10px 5px 0 0;
    
  }
  .fpa_title {
    font-size: 15px;
    color: #f39700;
    font-weight: bold;
  }
  .fpa_box_table .tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  .td {
    border-right: solid 1px #D5D5D5;
  }
  .fpa_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .fpa_box_table .td:nth-child(6) {
    border-right: solid 0;
  }
  .fpa_num1 {
    font-size: 22px;
    font-weight: bold;
    color: black;
  }
  .fpa_num2 {
    font-size: 14px;
    color: black;
    
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
    color: black;

  }
  
  .eia_box {
    display:flex;
    justify-content: center;
    align-items:center;
    width: 98%;
    margin: 5px 1% 5px 1%;
    height: 130px;;
    background-color:white;
    border-radius:7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .eia_box_table {
    width: 98%;
    height: 65%;
    text-align: center;    
    border: 0;
    line-height: 165%;
    margin: 10px 5px 0 5px;
  }

  .eia_box_table .tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
   
  }
  .eia_box_table .td {
    border-right: solid 1px #D5D5D5;
    //border-left: solid 1px #0e1417;
  }
  .eia_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .eia_box_table .tr:nth-child(2) td:nth-child(1) {
    border-left: solid 0;
  }
  .eia_box_table .td:nth-child(5) {
    border-right: solid 0;
  }
  .eia_title {
    font-size: 17px;
    color: #f39700;
    font-weight: bold;
  }
  .eia_num1 {
    font-size: 20px;
    color: black;
    font-weight: normal;
    
  }

  .eia_num2 {
    font-size: 18px;
    //color: white;
  }

  .dark.fpa_box {
    background-color:#3c496e;
    box-shadow: 0px 0px 0px #cccccc;
  }

  .dark.eia_box {
    background-color:#3c496e;
    box-shadow: 0px 0px 0px #cccccc;
  }



  .dark {   
    .fpa_box_table {
      line-height: 170%;
      
    }
    .fpa_title {
      font-size: 15px;
      color: #f39700;
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
    

    .eia_box_table {  
      border: 0;
      line-height: 165%;
    }
    .eia_box_table .td {
      border-right: solid 1px #526395;
      //border-left: solid 1px #0e1417;
    }
    .eia_box_table .td:nth-child(1) {
      border-left: solid 0;
    }
    .eia_box_table .tr:nth-child(2) td:nth-child(1) {
      border-left: solid 0;
    }
    .eia_box_table .td:nth-child(5) {
      border-right: solid 0;
    }
    .eia_title {
      font-size: 17px;
      color: #f39700;
      font-weight: normal;
    }
    .eia_num1 {
      font-size: 20px;
      color: white;
      
    }

    .eia_num2 {
      font-size: 18px;
      //color: white;
    }

  }

`;


function Status( {theme} ) {
  const { me, today, yesterday, yesterday2, lastMonthFirst, lastMonthlast, monthFirst, yearFirst, yesterday3 } = useSelector((state) => state.auth); 
  const [todayVisitorTotal, setTodayVisitorTotal] = useState('0'); // 오늘자 방문객
  const [mainMonthlyVisitTotal, setMainMonthlyVisitTotal] = useState('0'); // 이달의 방문객
  const [mainStackVisitTotal, setMainStackVisitTotal] = useState('0'); // 누적방문객
  const [mainNowVisitTotal, setMainNowVisitTotal] = useState('0'); // 현재체류인원
  const [mainAdvVisitTime, setMainAdvVisitTime] = useState('0'); // 체류시간
  const [mainReVisitTotal, setMainReVisitTotal] = useState('0'); // 재방문자수

  const [yesterdayTodayVisitorTotal, setYesterdayTodayVisitorTotal] = useState('0'); // 어제 방문객
  const [yesterdayMainMonthlyVisitTotal, setYesterdayMainMonthlyVisitTotal] = useState('0'); // 이전달 방문객
  const [yesterdayMainStackVisitTotal, setYesterdayMainStackVisitTotal] = useState('0'); // 어제 누적방문객
  const [yesterdayMainNowVisitTotal, setYesterdayMainNowVisitTotal] = useState('0'); // 어제 현재시간체류인원
  const [yesterdayMainAdvVisitTime, setYesterdayMainAdvVisitTime] = useState('0'); // 어제 체류시간
  const [yesterdayMainReVisitTotal, setYesterdayMainReVisitTotal] = useState('0'); // 어제 재방문자수

  const [diffTodayVisitorTotal, setDiffTodayVisitorTotal] = useState('0'); // 차이 오늘자 방문객
  const [diffMainMonthlyVisitTotal, setDiffMainMonthlyVisitTotal] = useState('0'); // 차이 이달의 방문객
  const [diffMainStackVisitTotal, setDiffMainStackVisitTotal] = useState('0'); // 차이 누적방문객
  const [diffMainNowVisitTotal, setDiffMainNowVisitTotal] = useState('0'); // 차이 현재체류인원
  const [diffMainAdvVisitTime, setDiffMainAdvVisitTime] = useState('0'); // 차이 체류시간
  const [diffMainReVisitTotal, setDiffMainReVisitTotal] = useState('0'); // 차이 재방문자수

  const [upDownTodayVisitorTotal, setUpDownTodayVisitorTotal] = useState('▲'); // 오늘자 방문객
  const [upDownMainMonthlyVisitTotal, setUpDownMainMonthlyVisitTotal] = useState('▲'); // 이달의 방문객
  const [upDownMainStackVisitTotal, setUpDownMainStackVisitTotal] = useState('▲'); // 누적방문객
  const [upDownMainNowVisitTotal, setUpDownMainNowVisitTotal] = useState('▲'); // 현재체류인원
  const [upDownMainAdvVisitTime, setUpDownMainAdvVisitTime] = useState('▲'); // 체류시간
  const [upDownMainReVisitTotal, setUpDownMainReVisitTotal] = useState('▲'); // 재방문자수

  const [envAvgTemp, setEnvAvgTemp] = useState('0'); // 온도
  const [envAvgHumi, setEnvAvgHumi] = useState('0'); // 습도
  const [envAvgDust, setEnvAvgDust] = useState('0'); // 미세먼지
  const [envAvgUltraDust, setEnvAvgUltraDust] = useState('0'); // 초미세먼지
  const [envAvgTvoc, setEnvAvgTvoc] = useState('0'); // TVOC

  const zoneAll = '사천 관광지 전체 1차 & 2차';


  const getAPIdata = async () => {
    // 데이터 차이 도형
    const diffs = (diff) =>{
      if (diff < 0) {
          return('▼')
      } else if (diff > 0) {
          return('▲')
      } else {
          return('-')
      }
    }

    /* 
      *오늘 방문객
    */
    try {       
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`);    
      const responseYesterday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${yesterday}&to=${yesterday}`);  
      //const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
      //const responseYesterday = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+yesterday+'&to='+yesterday);

      var todayData = 0;
      var yesterdayData =0;

      for (let i of responseToday.data) {
        if (i.zone === zoneAll) {
          todayData = i.data         
        }
      }
      for (let i of responseYesterday.data) {
        if (i.zone === zoneAll) {
          yesterdayData = i.data
        } 
      }

      const diff = todayData - yesterdayData ;
      setUpDownTodayVisitorTotal(diffs(diff));
      setDiffTodayVisitorTotal(diff);
      setTodayVisitorTotal(todayData);
      setYesterdayTodayVisitorTotal(yesterdayData);

  
    } catch (err) {
        console.error(err);
    }
    

    /* 
      *이달의 방문객
    */

    try {       
      const responseMonth = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${monthFirst}&to=${today}`);
      const responseLastMonth = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${lastMonthFirst}&to=${lastMonthlast}`);    
     // const responseMonth = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+monthFirst+'&to='+today);
      //const responseLastMonth = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+lastMonthFirst+'&to='+lastMonthlast);

      var monthData = 0;
      var lastMonthData =0;


      for (let i of responseMonth.data) {
        if (i.zone === zoneAll) {
          monthData = monthData + Number(i.data);
        }
      }
      for (let i of responseLastMonth.data) {
        if (i.zone === zoneAll) {
          lastMonthData = monthData + Number(i.data);
        } 
      }

      const diff = monthData - lastMonthData ;
      setUpDownMainMonthlyVisitTotal(diffs(diff));
      setDiffMainMonthlyVisitTotal(diff);
      setMainMonthlyVisitTotal(monthData);
      setYesterdayMainMonthlyVisitTotal(lastMonthData);

  
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
     // const responseYesterdayStack = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${yearFirst}&to=${yesterday}`);

      var todayStack = 0;
      var yesterStack = 0;
      var todays = 0;
      
      for (let i of responseYesterdayStack.data) {
        if (i.zone === zoneAll) {
          yesterStack = yesterStack + Number(i.data);
        } 
      }

      for (let i of responseToday.data) {
        if (i.zone === zoneAll) {
          todays = i.data;
          todayStack = yesterStack + todays;
        } 
      }


      setMainStackVisitTotal(todayStack);
      setYesterdayMainStackVisitTotal(yesterStack);
      setDiffMainStackVisitTotal(todays);
      setUpDownMainStackVisitTotal(diffs(todays));
      
  
    } catch (err) {
        console.error(err);
    }


    /* 
      * 현재체류인원
    */
    try {         
       const responseStay = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`);    
      const responseYesterStay = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${yesterday}&to=${yesterday}`);  
      //const responseStay = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);
      //const responseYesterStay = await axios.get('http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from='+yesterday+'&to='+yesterday);

      var todayStay = 0;
      var yesterStay = 0;
      
      for (let i of responseStay.data) {
        if (i.zone === zoneAll) {
          todayStay = i.data;
        } 
      }
      for (let i of responseYesterStay.data) {
        if (i.zone === zoneAll) {
          yesterStay = i.data;
        } 
      }
      yesterStay = Math.round(Number(yesterStay)/24);

      var stayDiff = Number(todayStay) - Number(yesterStay);

      setMainNowVisitTotal(todayStay);
      setYesterdayMainNowVisitTotal(yesterStay);
      setDiffMainNowVisitTotal(stayDiff);
      setUpDownMainNowVisitTotal(diffs(stayDiff));
      
  
    } catch (err) {
        console.error(err);
    }

    
    /* 
      * 평균체류시간
    */
    try {
      
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime`);
      const responseYesterTime = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime?from=${yesterday}&to=${yesterday}`);    
      //const responseTime = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);
      //const responseYesterTime = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?from=${yesterday2}&to=${yesterday2}`);

      var time = 0;
      var yesterTime = 0;
      
      for (let i of responseTime.data) {
        if (i.zone === zoneAll) {
          time = Math.round(i.data/60);
        } 
      }

      for (let i of responseYesterTime.data) {
        if (i.zone === zoneAll) {
          yesterTime = Math.round(i.data/60);
        } 
      }
      var timeDiff = Number(time) - Number(yesterTime);

      setMainAdvVisitTime(time);
      setYesterdayMainAdvVisitTime(yesterTime);
      setDiffMainAdvVisitTime(timeDiff);
      setUpDownMainAdvVisitTime(diffs(timeDiff));     
          
    } catch (err) {
        console.error(err);
    }

    /* 
      * 재방문자수
    */
    try {
      
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`);
      const responseYesterRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit?from=${yesterday2}&to=${yesterday2}`);    
      //const responseRevisit = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit`);
      //const responseYesterRevisit = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit?from=${yesterday2}&to=${yesterday2}`);
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountMonthly?from=${yesterday3}&to=${yesterday3}`)

      var revist = 0;
      var yesterRevisit = 0;
      
      for (let i of responseRevisit.data) {
        if (i.zone === zoneAll) {
          revist = i.data;
        } 
      }

      for (let i of responseYesterRevisit.data) {
        if (i.zone === zoneAll) {
          yesterRevisit = i.data;
        } 
      }
      var revistDiff = Number(revist) - Number(yesterRevisit);

      setMainReVisitTotal(revist);
      setYesterdayMainReVisitTotal(yesterRevisit);
      setDiffMainReVisitTotal(revistDiff);
      setUpDownMainReVisitTotal(diffs(revistDiff));     

      console.log('APIdone')
          
    } catch (err) {
        console.error(err);
    }
  }

    const getAPIenv = async () => {
      try {       
        const responseEnv = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/SensorDataHourly`);    
        //const responseEnv = await axios.get(`http://54.180.158.22:8000/v1/Gasi/SensorDataHourly`);

        for (let i of responseEnv.data) {
          if (i.zone === '삼천포대교공원') {
            setEnvAvgTemp(i.temperature);  
            setEnvAvgHumi(i.humidity);
            setEnvAvgDust(i.pm10);
            setEnvAvgUltraDust(i.pm2_5);
            setEnvAvgTvoc(i.tvoc);                  
          }
        }

        console.log('envdone')
      } catch (err) {
          console.error(err);
      }

    }


  useEffect(() => {
    getAPIdata();
    setInterval(getAPIdata, 1800000);
  }, []);

  useEffect(() => {
    getAPIenv();
    setInterval(getAPIenv, 1800000);
  }, []);

  const makeNumber = (param) => {
    if(!param){
      return 0;
    }

    return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



  return (
    <StatusBlock>       
          <div className={theme === 'dark' ? ' fpa_box dark' : 'fpa_box'}>
              <div className="fpa_box_table" >
                  <div className='tr'>
                      <div className='td'><span className="fpa_title">오늘 방문객</span><br/><span className="fpa_num1">{makeNumber(todayVisitorTotal)} 명</span><br/><span className="fpa_num2">{makeNumber(diffTodayVisitorTotal)}</span><span className={ upDownTodayVisitorTotal === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownTodayVisitorTotal}</span><br/><span className="fpa_num4">전일 {makeNumber(yesterdayTodayVisitorTotal)} 명</span></div>
                      <div className='td'><span className="fpa_title">이달의 방문객</span><br/><span className="fpa_num1">{makeNumber(mainMonthlyVisitTotal)} 명</span><br/><span className="fpa_num2">{makeNumber(diffMainMonthlyVisitTotal)}</span><span className={ upDownMainMonthlyVisitTotal === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownMainMonthlyVisitTotal}</span><br/><span className="fpa_num4">전월 {makeNumber(yesterdayMainMonthlyVisitTotal)} 명</span></div>
                      <div className='td'><span className="fpa_title">금년 누적 방문객</span><br/><span className="fpa_num1">{makeNumber(mainStackVisitTotal)} 명</span><br/><span className="fpa_num2">{makeNumber(diffMainStackVisitTotal)}</span><span className={ upDownMainStackVisitTotal === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownMainStackVisitTotal}</span><br/><span className="fpa_num4">전일 {makeNumber(yesterdayMainStackVisitTotal)} 명</span></div>
                      <div className='td'><span className="fpa_title">현재 체류 인원</span><br/><span className="fpa_num1">{makeNumber(mainNowVisitTotal)} 명</span><br/><span className="fpa_num2">{makeNumber(diffMainNowVisitTotal)}</span><span className={ upDownMainNowVisitTotal === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownMainNowVisitTotal}</span><br/><span className="fpa_num4">전일 {makeNumber(yesterdayMainNowVisitTotal)} 명</span></div>
                      <div className='td'><span className="fpa_title">평균 체류 시간</span><br/><span className="fpa_num1">{makeNumber(mainAdvVisitTime)} 분</span><br/><span className="fpa_num2">{makeNumber(diffMainAdvVisitTime)} 분</span><span className={ upDownMainAdvVisitTime === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownMainAdvVisitTime}</span><br/><span className="fpa_num4">전일 {makeNumber(yesterdayMainAdvVisitTime)} 분</span></div>
                      <div className='td'><span className="fpa_title">전일 재 방문자수</span><br/><span className="fpa_num1">{makeNumber(mainReVisitTotal)} 명</span><br/><span className="fpa_num2">{makeNumber(diffMainReVisitTotal)} 명</span><span className={ upDownMainReVisitTotal === '▼' ? 'fpa_num3_1' : 'fpa_num3'}>{upDownMainReVisitTotal}</span><br/><span className="fpa_num4">전전일 {makeNumber(yesterdayMainReVisitTotal)} 명</span></div>
                  </div>
              </div> 
          </div>

          <div className={theme === 'dark' ? 'dark eia_box' : 'eia_box'}>
              <div className="eia_box_table">
                  <div className='tr' >
                      <div className='td'><span className="eia_title">온도</span><br/><br/><span className="eia_num1">{envAvgTemp} ℃</span></div>
                      <div className='td'><span className="eia_title">습도</span><br/><br/><span className="eia_num1">{envAvgHumi} %</span></div>
                      <div className='td'><span className="eia_title">미세먼지</span><br/><br/><span className="eia_num1">{envAvgDust} ㎍/㎥</span></div>
                      <div className='td'><span className="eia_title">초미세먼지</span><br/><br/><span className="eia_num1">{envAvgUltraDust} ㎍/㎥</span></div>
                      <div className='td'><span className="eia_title">TVOC</span><br/><br/><span className="eia_num1">{makeNumber(envAvgTvoc)} ppb</span></div>
                  </div>
              </div>
          </div> 
    </StatusBlock>
  )
}


export default Status;