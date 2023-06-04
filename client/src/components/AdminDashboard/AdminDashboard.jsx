import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './AdminDashboard.css'

function AdminDashboard() {
    const [chartSeries, setChartSeries] = useState([
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ]);
    
      const colors = ['#FF4560', '#008FFB', '#FEB019', '#00E396', '#775DD0'];
    
      const chartOptions = {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts']
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        }
      };
      const cardData = [
        {
          title: 'Total Revenue',
          value:0
        },
        {
          title: 'Pending Appointments',
          value:0
        },
        {
          title: 'Completed Appointments',
          value:0
        },
        
       
      ];
    
  return (
    <>
    <div className='admin-bg' >
    <div className='cards-admin'>
        {cardData.map((card, index) => (
          <Card key={index} sx={{ maxWidth: 345 }} style={{ borderRadius:'15px' ,width:'280px',background:'#9f9d9d5e'}}>
            <CardActionArea>
            <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center',fontSize:'35px'}}>
                  {card.title}
                  
                </Typography>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ fontFamily:'Monomaniac One, sans-serif',textAlign:'center'}}>
                  {card.value}
                  
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        </div>
    <div id="chart" className='chart'>
    <ReactApexChart options={chartOptions} series={chartSeries} type="bar"  height={450} width={950} style={{ display:'flex',justifyContent:'center' }} />
  </div>
    </div>
    </>
  )
}

export default AdminDashboard
