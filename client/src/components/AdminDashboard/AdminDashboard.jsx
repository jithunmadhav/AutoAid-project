import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './AdminDashboard.css';
import axios from '../../axios';
import { Button } from '@mui/material';
import RevenueReport from './RevenueReport'

function AdminDashboard() {
  const [monthlyRevenue, setmonthlyRevenue] = useState([])
  const [totalRevenue, settotalRevenue] = useState('')
  const [completedApp, setcompletedApp] = useState('')
  const [pendingApp, setpendingApp] = useState('')
  const [openRevenueReport, setopenRevenueReport] = useState(false)
  useEffect(() => {
    axios.get('/admin/monthlyrevenue').then((response) => {
      if (!response.data.err) {
        setmonthlyRevenue(response.data.monthlyData)
      }
    }).catch((error)=>{
      console.log(error);
    })
    axios.get('/admin/dashboardRevenue').then((response)=>{
      console.log(response.data);
       if(!response.data.err){
        settotalRevenue(response.data.totalRevenue)
        setcompletedApp(response.data.completedAppointments)
        setpendingApp(response.data.pendingAppointments)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }, []);
console.log(monthlyRevenue);
  const [chartSeries, setChartSeries] = useState([]);
  useEffect(() => {
    if (monthlyRevenue.length > 0) {
      setChartSeries([
        {
          name: 'Monthly Revenue',
          data: monthlyRevenue,
        },
      ]);
    }
  }, [monthlyRevenue]);
  

  const colors = ['#FF4560', '#008FFB', '#FEB019', '#00E396', '#775DD0'];

  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  };

  const cardData = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
    },
    {
      title: 'Pending Appointments',
      value: pendingApp,
    },
    {
      title: 'Completed Appointments',
      value: completedApp,
    },
  ];

  return (
    openRevenueReport ? <RevenueReport/> :
    <>
      <div className="admin-bg">
        <div className="cards-admin">
          {cardData.map((card, index) => (
            <Card key={index} sx={{ maxWidth: 345 }} style={{ borderRadius: '15px', width: '280px', background: '#9f9d9d5e' }}>
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center', fontSize: '35px' }}>
                  {card.title}
                </Typography>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: 'Monomaniac One, sans-serif', textAlign: 'center' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
        <h4 className='graph-heading'>Revenue statistics :</h4>
        <Button onClick={()=>setopenRevenueReport(true)} className='revenue-report-button' variant='outlined' color='success'>Revenue report</Button>
        <div id="chart" className="chart">
          <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={450} width={950} style={{ display: 'flex', justifyContent: 'center' }} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
