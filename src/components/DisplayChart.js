import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'
import Exporting from 'highcharts/modules/exporting'
import ExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import CircularProgress from '@material-ui/core//CircularProgress';
import Backdrop from '@material-ui/core//Backdrop';

HighchartsMore(Highcharts)
Exporting(Highcharts)
ExportData(Highcharts)
window.Highcharts = Highcharts;

const DisplayCharts = (props) => {
        const currentYear = moment().format('YYYY')
        const plantingYear = props.chartWeatherData.dates_for_summary[0].split('-')[0]
        const fcstIsShowing = props.chartWeatherData.dates_selected_year.includes(props.chartWeatherData.firstFcstDate)
        let idxOfFirstFcstDate
        if (plantingYear===currentYear) {
            idxOfFirstFcstDate = props.chartWeatherData.dates_selected_year.indexOf(props.chartWeatherData.firstFcstDate)
        } else {
            idxOfFirstFcstDate = props.chartWeatherData.dates_selected_year.length
        }

        // function to count item in array
        const countItemInArray = (item,arr) => {
            let i
            let count = 0;
            for(i = 0; i < arr.length; ++i){
                if(arr[i] === item)
                    count++;
            }
            return count
        }

        // data for first freeze
        let dataForFirstFreeze = [];
        let i, countOfThisDate;
        for (i=0; i<props.chartWeatherData.datesOfFirstFreeze_15yr.length; i++) {
            countOfThisDate = countItemInArray(props.chartWeatherData.datesOfFirstFreeze_15yr[i],props.chartWeatherData.datesOfFirstFreeze_15yr)
            dataForFirstFreeze.push( {x: moment.utc(props.chartWeatherData.datesOfFirstFreeze_15yr[i],'YYYY-MM-DD').valueOf(), y: countOfThisDate, color: 'rgb(0,0,255)'} )
        }

        // data for last freeze
        let dataForLastFreeze = [];
        for (i=0; i<props.chartWeatherData.datesOfLastFreeze_15yr.length; i++) {
            countOfThisDate = countItemInArray(props.chartWeatherData.datesOfLastFreeze_15yr[i],props.chartWeatherData.datesOfLastFreeze_15yr)
            dataForLastFreeze.push( {x: moment.utc(props.chartWeatherData.datesOfLastFreeze_15yr[i],'YYYY-MM-DD').valueOf(), y: countOfThisDate, color: 'rgb(0,0,255)'} )
        }

        function tooltipFormatter() {
            var i, item;
            var header = '<span style="font-size:14px;font-weight:bold;text-align:center">' + Highcharts.dateFormat('%b %d, %Y', this.x) + '</span>';
            var tips = "";
            for (i=0; i<this.points.length; i++) {
                item = this.points[i];
                //if ( (item.series.name !== "POR Max") && (item.series.name !== "POR Min") && (item.series.name !== "POR") ) {
                if ( item.series.name !== "Period of Record" ) {
                    tips += '<br/>' + item.y.toFixed(0) + ' : <span style="color:'+item.color+';font-weight:bold">' +  item.series.name + '</span>';
                }
                if (item.series.name === "Period of Record") {
                    tips += '<br/>' + item.point.low.toFixed(0) + '-' + item.point.high.toFixed(0) + ' : <span>Period of Record</span>';
                }
            }
            return header + tips;
        }

        let year = props.locInfo['planting_date'].slice(6)
        let crosshair_zindex = (props.chartWeatherData.gdd_ytd_por_min[-62]<100) ? 4 : 1;

        // find date and create label for plotLine associated with user's provided target GDD value
        const getTargetDate = () => {
            let idxOfTarget
            let idxOfMaxObsValue
            let result
            let label
            if (props.chartWeatherData.gdd_ytd_selected.length>0) {
              if (Math.max(...props.chartWeatherData.gdd_ytd_selected)>=props.locInfo['gdd_target']) {
                idxOfTarget=props.chartWeatherData.gdd_ytd_selected.findIndex(function(number) {
                  return number > props.locInfo['gdd_target'];
                });
                result = moment.utc(props.chartWeatherData.dates_selected_year[idxOfTarget], 'YYYY-MM-DD').valueOf()
                label = 'Target Observed'
              } else {
                idxOfMaxObsValue = props.chartWeatherData.gdd_ytd_selected.indexOf( Math.max(...props.chartWeatherData.gdd_ytd_selected) )
                idxOfTarget=props.chartWeatherData.gdd_ytd_15yr_ave.findIndex(function(number) {
                  return (number+props.chartWeatherData.gdd_ytd_selected[idxOfMaxObsValue]-props.chartWeatherData.gdd_ytd_15yr_ave[idxOfMaxObsValue]) > props.locInfo['gdd_target'];
                });
                result = moment.utc(props.chartWeatherData.dates_for_summary[idxOfTarget], 'YYYY-MM-DD').valueOf()
                label = 'Target Fcst'
              }
            } else {
              idxOfTarget=props.chartWeatherData.gdd_ytd_15yr_ave.findIndex(function(number) {
                return number > props.locInfo['gdd_target'];
              });
              result = moment.utc(props.chartWeatherData.dates_for_summary[idxOfTarget], 'YYYY-MM-DD').valueOf()
              label = 'Target Fcst'
            }
            return {'value':result, 'label':label}
        }

        // construct plotLine for user's provided target GDD value
        let plotLines = []
        let targetInfo
        if (props.targetIsEnabled) {
            targetInfo = getTargetDate()
            plotLines.push({ label: {text:targetInfo.label, y:30}, color: '#4caf50', width: 4, zIndex: 6, value: targetInfo.value })
        }

        const genChartConfig = () => {
              return {
                 plotOptions: {
                     line: {
                         animation: true,
                     },
                     series: {
                         type: 'line',
                         animation: false,
                         lineWidth: 4,
                         marker: {
                             symbol: 'circle',
                         },
                         states: {
                             hover: {
                                 enabled: true,
                                 halo: {
                                     size: 0
                                 }
                             }
                         }
                     }
                 },
                 exporting: {
                   menuItemDefinitions: {
                     // Custom definition
                     downloadCSV: {
                       text: 'Download as CSV table'
                     },
                     downloadXLS: {
                       text: 'Download as XLS table'
                     }
                   },
                   buttons: {
                     contextButton: {
                       menuItems: [
                         "printChart",
                         "separator",
                         "downloadPNG",
                         "downloadJPEG",
                         "downloadPDF",
                         "downloadSVG",
                         "separator",
                         "downloadCSV",
                         "downloadXLS",
               //              "viewData",
                         "openInCloud"
                       ]
                     }
                   }
                 },
                 chart: { marginTop: 60, backgroundColor: null },
                 credits: {
                   href: "http://www.rcc-acis.org",
                   text: "Powered by ACIS"
                 },
                 title: {
                     text: year+' Cumulative Growing Degree Days (Base '+props.locInfo['gdd_base']+')'
                 },
                 subtitle: {
                     text: props.locInfo['address'],
                     style:{"font-size":"14px",color:"#000000"},
                 },
                 tooltip: { useHtml:true, shared:true, borderColor:"#000000", borderWidth:2, borderRadius:8, shadow:false, backgroundColor:"#ffffff",
                   xDateFormat:"%b %d, %Y", positioner:function(){return {x:80, y:60}}, shape: 'rect',
                   crosshairs: { width:1, color:"#ff0000", snap:true, zIndex: crosshair_zindex }, formatter:tooltipFormatter },
                 legend: { align: 'left', symbolRadius: 0, floating: true, verticalAlign: 'top', layout: 'vertical', x: 65, y: 50 },
                 xAxis: {
                     type: 'datetime',
                     startOnTick: false,
                     endOnTick: false,
                     min: moment.utc(props.locInfo['planting_date'],'MM/DD/YYYY').valueOf(),
                     max: props.view==='season-outlook' ? moment.utc(plantingYear+'-12-31','YYYY-MM-DD').valueOf() : moment.utc(props.chartWeatherData.dates_selected_year[props.chartWeatherData.dates_selected_year.length-1],'YYYY-MM-DD').valueOf(),
                     labels: { align: 'center', x: 0, y: 20 },
                     plotLines: plotLines,
                     dateTimeLabelFormats:{ day:'%d %b', week:'%d %b', month:'%b<br/>%Y', year:'%Y' },
                 },
                 yAxis: [
                     { title:{ text:'Cumulative GDD', style:{"font-size":"14px", color:"#000000"}}, min: 0,
                         gridZIndex:1, labels:{style:{color:"#000000"}}},
                     { title:{ text:'First/Last Freeze (# yrs)', align:'low', style:{"font-size":"14px", color:"#0000FF"}}, min: 0, max: 8,
                         visible: props.freezeIsEnabled,
                     labels:{style:{color:"#0000FF"}}, opposite: true },
                 ],
                 series: [{
                     name: "Season to Date",
                     data: props.chartWeatherData.gdd_ytd_selected.slice(0,idxOfFirstFcstDate).map((item,index) => {
                       let date_item = moment.utc(props.chartWeatherData.dates_selected_year[index],"YYYY-MM-DD").valueOf()
                       return [date_item,item]
                     }),
                     type: "line", zIndex: 24, lineWidth: 2, color: "#00dd00", shadow: false,
                     marker: { enabled: true, fillColor: "#00dd00", lineWidth: 2, lineColor: "#00dd00", radius:2, symbol:"circle" }
                   },{
                     name: "6 Day Forecast",
                     data: props.chartWeatherData.gdd_ytd_selected.slice(idxOfFirstFcstDate).map((item,index) => {
                       let date_item = moment.utc(props.chartWeatherData.dates_selected_year[idxOfFirstFcstDate+index],"YYYY-MM-DD").valueOf()
                       return [date_item,item]
                     }),
                     showInLegend: fcstIsShowing,
                     type: "line", zIndex: 24, lineWidth: 2, color: "#dd0000", shadow: false,
                     marker: { enabled: true, fillColor: "#dd0000", lineWidth: 2, lineColor: "#dd0000", radius:2, symbol:"circle" }
                   },{
                     name: "15 Year Average",
                     data: props.chartWeatherData.gdd_ytd_15yr_ave.map((item,index) => {
                       let date_item = moment.utc(props.chartWeatherData.dates_for_summary[index],"YYYY-MM-DD").valueOf()
                       return [date_item,item]
                     }),
                     type: "line", zIndex: 23, lineWidth: 2, color: "#0000ff",
                     marker: { enabled: false, states: { hover: { enabled: false }} }
                   },{
                     name: '30 Year "Normal"',
                     data: props.chartWeatherData.gdd_ytd_30yr_nor.map((item,index) => {
                       let date_item = moment.utc(props.chartWeatherData.dates_for_summary[index],"YYYY-MM-DD").valueOf()
                       return [date_item,item]
                     }),
                     type: "line", zIndex: 22, lineWidth: 2, color: "#B041FF",
                     marker: { enabled: false, states: { hover: { enabled: false }} }
                   },{
                     name: "Period of Record",
                     data: props.chartWeatherData.gdd_ytd_por_min.map((item,index) => {
                       let date_item = moment.utc(props.chartWeatherData.dates_for_summary[index],"YYYY-MM-DD").valueOf()
                       return [date_item,props.chartWeatherData.gdd_ytd_por_min[index], props.chartWeatherData.gdd_ytd_por_max[index]]
                     }),
                     type: "arearange", showInLegend: true, zIndex: 10, lineWidth: 2, color: "#444444", fillColor: "#eeeeee", fillOpacity: 0.1,
                     marker : {enabled: false, states: { hover: { enabled: false }}, symbol: 'square', lineWidth: 2, lineColor: '#444444', radius: 12 }
                   },{
                     name: 'First/Last Freezes (last 15 yrs)', type: 'column', pointWidth: 1, borderWidth: 0,
                     zIndex: props.view==='season-outlook' ? 1 : 25,
                     visible: props.freezeIsEnabled,
                     yAxis: 1,
                     showInLegend: props.freezeIsEnabled,
                     enableMouseTracking: false,
                     data: dataForLastFreeze.concat(dataForFirstFreeze),
                   }
                 ],
              }
            }

    return(

      <>
        <HighchartsReact
          containerProps={{ style: { height: "100%" } }}
          highcharts={Highcharts}
          options={genChartConfig()}
          //callback={afterRender}
        />

        {props.dataIsLoading &&
          <Backdrop
            style={{zIndex:1000}}
            invisible={true}
            //open={!props.values}
            open={props.dataIsLoading}
          >
            <CircularProgress size={200} color="primary"/>
          </Backdrop>
        }
      </>

    );


}

DisplayCharts.propTypes = {
  locInfo: PropTypes.object.isRequired,
  freezeIsEnabled: PropTypes.bool.isRequired,
  targetIsEnabled: PropTypes.bool.isRequired,
  chartWeatherData: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  dataIsLoading: PropTypes.bool.isRequired,
};

export default DisplayCharts;
