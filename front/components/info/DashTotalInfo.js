// 통합분석, 비교분석의 네비게이션 바 밑에 바로 나오는 상태들 
//api 불러와서 바로 적용
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/auth';
import wrapper from '../../store/configureStore';

//인디케이터 디자인
const StatusBlock = styled.div`
  margin-top : 10px;
  margin-bottom : 15px;

  display: grid;
  
  .fpa_box {
    width: 98%;
    margin: 5px 1% 5px 1%;
    background: linear-gradient(to right, #68d9bd, #75beff);
    border-radius:7px;
    box-shadow: 0px 0px 5px #cccccc;
  }

  .fpa_box_table {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 190%;
    margin: 10px 5px 10px 0;
    
  }
  .fpa_title {
    font-size: 20px;
    color: white;
    font-weight: bold;
    
  }
  .fpa_box_table .tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .td {
    border-right: solid 1px white;
  }
  .fpa_box_table .td:nth-child(1) {
    border-left: solid 0;
  }
  .fpa_box_table .td:nth-child(3) {
    border-right: solid 0;
  }
  .fpa_num1 {
    font-size: 19px;
    font-weight: normal;
    color: white;
  }


  .fpa_box_dark {
    background-color:#3c496e;
    box-shadow: 0px 0px 0px #cccccc;
    border-radius:7px;
  }


  .dark {   
    .fpa_box_table {
      line-height: 170%;
    }
    .fpa_title {
      font-size: 20px;
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
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
    
  }

`;


function DashTotalInfo( {theme} ) {
  const { me, monthFirst, today } = useSelector((state) => state.auth);
  const [todayVisitorTotal, setTodayVisitorTotal] = useState('0'); // 오늘자 방문객
    const [mainStackVisitTotal, setMainStackVisitTotal] = useState('0'); // 누적방문객
    const [mainMonthlyVisitTotal, setMainMonthlyVisitTotal] = useState('0'); // 이달의 방문객
    const [mainReVisitTotal, setMainReVisitTotal] = useState('0'); // 재방문자수
    const [envAvgTemp, setEnvAvgTemp] = useState('0'); // 온도
    const [envAvgHumi, setEnvAvgHumi] = useState('0'); // 습도
    const [envAvgDust, setEnvAvgDust] = useState('0'); // 미세먼지
    const [envAvgUltraDust, setEnvAvgUltraDust] = useState('0'); // 초미세먼지
    const [envAvgTvoc, setEnvAvgTvoc] = useState('0'); // TVOC
    const zoneAll = '사천 관광지 전체 1차 & 2차';

    const getAPIdata = async () => {
        //console.log("getAPIdata")

        // 현재 전체방문객
        try {
         
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`);
      
          //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);
          //console.log(response3.data);
          
          for (let i of response.data) {
            if (i.zone === zoneAll) {
              setTodayVisitorTotal(i.data);
            } 
            }
          //console.log('현재방문객추이',todayVisitorTotal);
          
      
        } catch (err) {
            console.error(err);
        }

        // 오늘 누적방문객
        try {
         
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly?unit=1d-1h`);
      
          //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
          //console.log(response3.data);
          
          for (let i of response.data) {
            if (i.zone === zoneAll) {
              setMainStackVisitTotal(i.data);
            } 
            }
          //console.log('현재방문객추이',todayVisitorTotal);
          
      
        } catch (err) {
            console.error(err);
        }

        // 이달의 방문객
        try {
         
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${monthFirst}&to=${today}`);
      
          //const response = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);
          //console.log(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${monthFirst}&to=${today}`);
          
          for (let i of response.data) {
            if (i.zone === zoneAll) {
              setMainMonthlyVisitTotal(i.data);
            } 
            }
          //console.log('현재방문객추이',todayVisitorTotal);
          
      
        } catch (err) {
            console.error(err);
        }
    }

    

    useEffect(() => {
       
        getAPIdata();
        // 30분마다 새로 고침 하여 데이터를 신규로 받아옴.
        // 30분 = 1800초 * 100 하여 밀리세컨단위로 변환 1800000
        setInterval(getAPIdata, 1800000);
    }, []);


    const makeNumber = (param) => {

        return param.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  return (
    <StatusBlock className="container">
      <div className={theme === 'dark' ? "fpa_box_dark dark" : "fpa_box " } >
            <div className="fpa_box_table">
              <div className='tr'>
                <div className='td'><span className="fpa_title">현재 방문객</span><br/><span className="fpa_num1">{makeNumber(todayVisitorTotal)} 명</span></div>                
                <div className='td'><span className="fpa_title">오늘 방문객</span><br/><span className="fpa_num1">{makeNumber(mainStackVisitTotal)} 명</span></div>
                <div className='td'><span className="fpa_title">이달의 방문객</span><br/><span className="fpa_num1">{makeNumber(mainMonthlyVisitTotal)} 명</span></div>
              </div>   
            </div>
      </div>
    </StatusBlock>
    
  )
}



export default DashTotalInfo;