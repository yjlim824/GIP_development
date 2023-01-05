import React, { useEffect, useState , useRef }  from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Image from 'next/image';

import Header from '../components/common/Header';
import Nav from '../components/common/Nav';
import Status from '../components/info/Status';
import { LOAD_MY_INFO_REQUEST } from '../reducers/auth';
import wrapper from '../store/configureStore';
import Chart from '../components/charts/analysisChart';
import todayicon from '../public/images/top_analysis_icon2.png';
import stackicon from '../public/images/top_analysis_icon3.png';
import currenticon from '../public/images/top_analysis_icon4.png';
import reicon from '../public/images/top_analysis_icon5.png';

const Background = styled.div`
  background-color: #f6f9fe; 

  .total_graph_view {
    width: 49.4%;
    margin: 5px 5px 5px 5px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #cccccc;
  }
  .pos_left {
    float: left;
    margin: 5px 0 0 7px;
  }
  .pos_right {
    float: right;
    margin: 5px 5px 0 0;
  }

  .pos_right2 {
      float: left;
      margin: 5px 5px 0 1%;
  }
  .total_graph_box_title {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #fff;
    font-weight: 900;
    font-size: 15pt;
    border-radius: 5px 5px 0 0;
    border-bottom: solid 1px #E4E4E4;
    text-align: left;
    color: #6e6e6e;
    align-items:center;
  }
  .img {
    margin-top: 100px;
  }

  .fpa_graph_box_title .title {
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    margin-top: 7px;
  }

  .total_graph {
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    padding: 10px 5px 0 0;
    height: 280px;
    display:flex;
    justify-content: center;
    align-items:center;
  }

  .chart {
    width:98%;
    height: 100%;
    margin-left:1%;
    display:flex;
    justify-content: center;
    align-items:center;
  }

  .darkback {
    background-color: #1b2137;
    height:940px;
    color : white;

    .total_graph_box_title {
      background-color: #3c496e;
      border-radius: 5px 5px 0 0;
      border-bottom: solid 0px #E4E4E4;
      color: white;
    }

    .total_graph {
      background-color: #354060;
    }

    .total_graph_view {
      box-shadow: 0px 0px 0px;
    }
  }

`;

const Home = () => {
  
  const dispatch = useDispatch();
  const { me, yearFirst, today } = useSelector((state) => state.auth);
  const [todayVisitorGraph, setTodayVisitorGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [stackVisitorGraph, setStackVisitorGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [advVisitTimeGraph, setAdvVisitTimeGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [reVisitGraph, setReVisitGraph] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  //const zones = [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077];
  const zones = ['삼천포 용궁수산시장', '바다케이블카', '삼천포대교공원', '첨단 항공우주과학관', '팔포음식특화거리', 
  '삼천포중앙시장', '용두공원', '별주부전테마파크(입구)', '남일대해수욕장', '무지개빛 해안도로(부잔교갯벌탐방)', '무지개빛 해안도로(대포항)', 
  '사천바다케이블카(초양정류장)', '다솔사 입구(주차장)', '수양공원'];
  
  const labels = ["용궁수산시장", "바다케이블카", "삼천포대교공원", "항공우주과학관", "팔포음식특화거리", "삼천포중앙시장", 
  "용두공원", "별주부전테마파크(입구)", "남일대해수욕장", "부잔교갯벌탐방로", "대포항", "초양정류장", "다솔사입구", "수양공원"]

  const getAPIdata = async () => { // 데이터 받아오기
    /**
     * 오늘자 방문객 그래프
     */
    try {       
      const responseToday = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountHourly`);    

     // const responseToday = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly?unit=1d-1h`);

      let arrY1 = ["용궁수산시장"];
      let arrY2 = ["바다케이블카"];
      let arrY3 = ["삼천포대교공원"];
      let arrY4 = ["항공우주과학관"];
      let arrY5 = ["팔포음식특화거리"];
      let arrY6 = ["삼천포중앙시장"];
      let arrY7 = ["용두공원"];
      let arrY8 = ["별주부전테마파크(입구)"];
      let arrY9 = ["남일대해수욕장"];
      let arrY10 = ["부잔교갯벌탐방로"];
      let arrY11 = ["대포항"];
      let arrY12 = ["초양정류장"];
      let arrY13 = ["다솔사입구"];
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

      let chartDatas = [arrY1[1], arrY2[1], arrY3[1], arrY4[1], arrY5[1], arrY6[1], arrY7[1], arrY8[1], arrY9[1], arrY10[1], arrY11[1], arrY12[1], arrY13[1], arrY14[1]];
      //setTodayVisitorGraph([]);
      setTodayVisitorGraph(chartDatas);
      //console.log(chartDatas);

  
    } catch (err) {
        console.error(err);
    }

    /**
     * 이달의 누적 방문객 그래프
     */
    try {       
      const responseYesterdayStack = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountDay?from=${yearFirst}&to=${today}`);    
      //const responseYesterdayStack = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountDay?from=${yearFirst}&to=${today}`); 

      let arrY1 = ["용궁수산시장", 0];
      let arrY2 = ["바다케이블카", 0];
      let arrY3 = ["삼천포대교공원", 0];
      let arrY4 = ["항공우주과학관", 0];
      let arrY5 = ["팔포음식특화거리", 0];
      let arrY6 = ["삼천포중앙시장", 0];
      let arrY7 = ["용두공원", 0];
      let arrY8 = ["별주부전테마파크(입구)", 0];
      let arrY9 = ["남일대해수욕장", 0];
      let arrY10 = ["부잔교갯벌탐방로", 0];
      let arrY11 = ["대포항", 0];
      let arrY12 = ["초양정류장", 0];
      let arrY13 = ["다솔사입구", 0];
      let arrY14 = ["수양공원", 0];


      for (let i of responseYesterdayStack.data) {
        if (i.zone === zones[0]) {
          arrY1[1] = arrY1[1] + Number(i.data)
        } else if (i.zone === zones[1]) {
          arrY2[1] = arrY2[1] + Number(i.data)
        } else if (i.zone === zones[2]) {
          arrY3[1] = arrY3[1] + Number(i.data)
        } else if (i.zone === zones[3]) {
          arrY4[1] = arrY4[1] + Number(i.data)
        } else if (i.zone === zones[4]) {
          arrY5[1] = arrY5[1] + Number(i.data)
        } else if (i.zone === zones[5]) {
          arrY6[1] = arrY6[1] + Number(i.data)
        } else if (i.zone === zones[6]) {
          arrY7[1] = arrY7[1] + Number(i.data)
        } else if (i.zone === zones[7]) {
          arrY8[1] = arrY8[1] + Number(i.data)
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

      let chartDatas = [arrY1[1], arrY2[1], arrY3[1], arrY4[1], arrY5[1], arrY6[1], arrY7[1], arrY8[1], arrY9[1], arrY10[1], arrY11[1], arrY12[1], arrY13[1], arrY14[1]];
      //setTodayVisitorGraph([]);
      setStackVisitorGraph(chartDatas);
      //console.log(chartDatas);

  
    } catch (err) {
        console.error(err);
    }

    /**
     * 체류시간 그래프
     */
    try {       
      const responseTime = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceResidenceTime`);   
      //const responseTime = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountHourly`);

      let arrY1 = ["용궁수산시장"];
      let arrY2 = ["바다케이블카"];
      let arrY3 = ["삼천포대교공원"];
      let arrY4 = ["항공우주과학관"];
      let arrY5 = ["팔포음식특화거리"];
      let arrY6 = ["삼천포중앙시장"];
      let arrY7 = ["용두공원"];
      let arrY8 = ["별주부전테마파크(입구)"];
      let arrY9 = ["남일대해수욕장"];
      let arrY10 = ["부잔교갯벌탐방로"];
      let arrY11 = ["대포항"];
      let arrY12 = ["초양정류장"];
      let arrY13 = ["다솔사입구"];
      let arrY14 = ["수양공원"];

      for (let i of responseTime.data) {
        if (i.zone_id === zones[0]) {
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

      let chartDatas = [arrY1[1], arrY2[1], arrY3[1], arrY4[1], arrY5[1], arrY6[1], arrY7[1], arrY8[1], arrY9[1], arrY10[1], arrY11[1], arrY12[1], arrY13[1], arrY14[1]];
      //setTodayVisitorGraph([]);
      setAdvVisitTimeGraph(chartDatas);
      //console.log(chartDatas);

  
    } catch (err) {
        console.error(err);
    }

    /**
     * 재방문 그래프
     */
    try {       
      const responseRevisit = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/DeviceCountRevisit`);  
      //const responseRevisit = await axios.get(`http://54.180.158.22:8000/v1/Gasi/DeviceCountRevisit`);
     // console.log(responseRevisit);

      let arrY1 = ["용궁수산시장"];
      let arrY2 = ["바다케이블카"];
      let arrY3 = ["삼천포대교공원"];
      let arrY4 = ["항공우주과학관"];
      let arrY5 = ["팔포음식특화거리"];
      let arrY6 = ["삼천포중앙시장"];
      let arrY7 = ["용두공원"];
      let arrY8 = ["별주부전테마파크(입구)"];
      let arrY9 = ["남일대해수욕장"];
      let arrY10 = ["부잔교갯벌탐방로"];
      let arrY11 = ["대포항"];
      let arrY12 = ["초양정류장"];
      let arrY13 = ["다솔사입구"];
      let arrY14 = ["수양공원"];

      for (let i of responseRevisit.data) {
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

      let chartDatas = [arrY1[1], arrY2[1], arrY3[1], arrY4[1], arrY5[1], arrY6[1], arrY7[1], arrY8[1], arrY9[1], arrY10[1], arrY11[1], arrY12[1], arrY13[1], arrY14[1]];
      //setTodayVisitorGraph([]);
      setReVisitGraph(chartDatas);
      console.log('chartDatas');

  
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

  useEffect (() => {

  if (!(me && me.id)) {
      Router.replace('/login');
    }
   }, [me && me.id]);

  



  return (  

    <Background>
      <div className={me && me.theme === 'dark'? 'darkback':'lightback'}>
        <Header/>
        <Nav value={'2'}/>
        <Status theme={me && me.theme === 'dark'? 'dark':'light'} />
        {/* <Chart /> */}
        {/* <!--오늘자 방문객--> */}
        <div className="total_graph_view pos_left">
          <div className="total_graph_box_title">&nbsp;<Image className="img" src={todayicon} alt="..." /><span className="title">&nbsp;오늘자 방문객</span></div>
          <div className="total_graph" >
            <div id="visit1" className='chart'>
              <Chart labels={labels} label={'방문객수(명)'} datas={todayVisitorGraph} theme={me && me.theme === 'dark'? 'dark':'light'} />
            </div>
          </div>
        </div>
        {/* <!--누적 방문객--> */}
        <div className="total_graph_view pos_right">
          <div className="total_graph_box_title">&nbsp;<Image className="img" src={stackicon} margin-top={10} alt="..." /><span className="title">&nbsp;이달의 방문객</span></div>
          <div className="total_graph" >
            <div id="visit2" className='chart' >
            <Chart labels={labels} label={'방문객수(명)'} datas={stackVisitorGraph} theme={me && me.theme === 'dark'? 'dark':'light'} />
            </div>
          </div>
        </div>
        {/* <!--체류시간&체류인원--> */}
        <div className="total_graph_view pos_left">
          <div className="total_graph_box_title">&nbsp;<Image className="img" src={currenticon} margin-top={10} alt="..." /><span className="title">&nbsp;체류시간</span></div>
          <div className="total_graph" >
            <div id="visit3" className='chart' >
            <Chart labels={labels} label={'체류시간(분)'} datas={advVisitTimeGraph} theme={me && me.theme === 'dark'? 'dark':'light'} />
            </div>
          </div>
        </div>
        {/* <!--재방문객&재방문률--> */}
        <div className="total_graph_view pos_right">
          <div className="total_graph_box_title">&nbsp;<Image className="img" src={reicon} margin-top={10} alt="..." /><span className="title">&nbsp;재방문객</span></div>
          <div className="total_graph" >
            <div id="visit4" className='chart' >
            <Chart labels={labels} label={'방문객수(명)'} datas={reVisitGraph} theme={me && me.theme === 'dark'? 'dark':'light'} />
            </div>
          </div>
        </div>
  
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