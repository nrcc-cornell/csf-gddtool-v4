///
///

import moment from 'moment';

function getSelectedYearData(data,plantingDate) {
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    var plantingDateFormatted = plantingDate.slice(6,10)+'-'+plantingDate.slice(0,2)+'-'+plantingDate.slice(3,5);
    var selectedYear = plantingDate.slice(6,10);
    var dataFiltered = null;
    var dates_selected_year = null;
    var gdd_ytd_selected = null;
    var miss = -999;

    // data arrays for selected year
    function isWithinThisYear(value,index,array){
        return (value[0].split('-')[0]===selectedYear && plantingDateFormatted<=value[0])
    }
    dataFiltered = data.filter(isWithinThisYear);
    dates_selected_year = dataFiltered.map(x => x[0]);
    gdd_ytd_selected = dataFiltered.map(x => x[1]!==miss ? x[1] : null);

    return {
        'dates_selected_year': dates_selected_year,
        'gdd_ytd_selected': gdd_ytd_selected,
    }
}

function getExtremesAndAverageData(data,plantingDate) {
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    var plantingDateFormatted = plantingDate.slice(6,10)+'-'+plantingDate.slice(0,2)+'-'+plantingDate.slice(3,5);
    var selectedYear = plantingDate.slice(6,10);
    var currentYear = moment().format('YYYY')
    let isLeapYearSelected = moment([selectedYear]).isLeapYear()
    var dataFiltered = null;
    var distinctDates = null;
    var dates_for_summary = [];
    var gdd_ytd_por_max = [];
    var gdd_ytd_por_min = [];
    var gdd_ytd_15yr_ave = [];
    var gdd_ytd_30yr_nor = [];

    let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    function isAfterPlantingDateInHistoricalYears(value,index,array){
        let isNotCurrentYear = value[0].split('-')[0]!==currentYear
        let isAfterPlantingDate = plantingDateFormatted.slice(5)<=value[0].slice(5)
        return (isNotCurrentYear && isAfterPlantingDate)
    }
    dataFiltered = data.filter(isAfterPlantingDateInHistoricalYears);
    distinctDates = [...new Set(dataFiltered.map(x => x[0].slice(5)))]
    distinctDates.sort()

    function isOnDate(value,index,array){
        return (value[0].slice(5)===this)
    }
    distinctDates.forEach((d) => {
        if (d==='02-29' && !isLeapYearSelected) { return }
        let dataForDate = dataFiltered.filter(isOnDate,d);
        let dataToSummarizeForDate = dataForDate.map(x => x[1])
        dates_for_summary.push(selectedYear+'-'+d)
        gdd_ytd_por_max.push(Math.max(...dataToSummarizeForDate))
        gdd_ytd_por_min.push(Math.min(...dataToSummarizeForDate))
        gdd_ytd_15yr_ave.push(average(dataToSummarizeForDate.slice(-15)))
        gdd_ytd_30yr_nor.push(average(dataToSummarizeForDate.slice(1991-parseInt(currentYear,10), 2020-parseInt(currentYear,10))))
    })

    return {
        'dates_for_summary': dates_for_summary,
        'gdd_ytd_por_max': gdd_ytd_por_max,
        'gdd_ytd_por_min': gdd_ytd_por_min,
        'gdd_ytd_15yr_ave': gdd_ytd_15yr_ave,
        'gdd_ytd_30yr_nor': gdd_ytd_30yr_nor,
    }
}

function getFreezeData(data,plantingDate,freezeThreshold) {
    //
    //

    if (!freezeThreshold) {
      return {
        'datesOfFirstFreeze_15yr':[],
        'datesOfLastFreeze_15yr':[],
      }
    }

    //var plantingDateFormatted = plantingDate.slice(6,10)+'-'+plantingDate.slice(0,2)+'-'+plantingDate.slice(3,5);
    var selectedYear = plantingDate.slice(6,10);
    var currentYear = moment().format('YYYY')
    //var dataFiltered = null;
    //let datesOfFirstFreeze_15yr = ["2022-10-29", "2022-10-07", "2022-10-12", "2022-10-10", "2022-10-06", "2022-10-09", "2022-09-17", "2022-10-12", "2022-10-18", "2022-10-11", "2022-10-01", "2022-10-16", "2022-10-05", "2022-09-19", "2022-11-04"]
    //let datesOfLastFreeze_15yr = ["2022-04-24", "2022-05-01", "2022-05-01", "2022-05-02", "2022-05-06", "2022-05-08", "2022-05-10", "2022-05-12", "2022-05-12", "2022-05-12", "2022-05-15", "2022-05-15", "2022-05-20", "2022-05-23", "2022-05-24"]
    let years = []
    let seasonStartDates
    let datesOfFirstFreeze_15yr = []
    let datesOfLastFreeze_15yr = []

    let dates = data.map(x => x[0])

    // find last 15 years before current year
    for (let i = 1; i < 16; i++) {
      years.push(parseInt(currentYear,10)-i)
    }

    // season start dates
    // Each year, we will find the last frost in Spring before this date, and the first frost in Fall after this date.
    seasonStartDates = years.map(x => x.toString()+'-06-30')
    seasonStartDates.sort()

    // find first/last freezes
    function isBelowFreezeThreshold(value,index,array){
        return value[2]<=parseInt(freezeThreshold,10)
    }
    let idxOfDate
    let springFreezes
    let fallFreezes
    seasonStartDates.forEach((d) => {
      idxOfDate = dates.indexOf(d)
      // get last freeze in Spring
      springFreezes = data.slice(idxOfDate-180,idxOfDate).filter(isBelowFreezeThreshold)
      if (springFreezes.length>0) {
          datesOfLastFreeze_15yr.push(springFreezes.slice(-1)[0][0])
      } else {
          datesOfLastFreeze_15yr = []
      }
      // get first freeze in Fall
      fallFreezes = data.slice(idxOfDate,idxOfDate+180).filter(isBelowFreezeThreshold)
      if (fallFreezes.length>0) {
          datesOfFirstFreeze_15yr.push(fallFreezes[0][0])
      } else {
          datesOfFirstFreeze_15yr = []
      }
    })

    // only include data on or after planting date

    // change years to selected year, for highcharts display
    datesOfFirstFreeze_15yr = datesOfFirstFreeze_15yr.map(x => selectedYear+x.slice(4))
    datesOfLastFreeze_15yr = datesOfLastFreeze_15yr.map(x => selectedYear+x.slice(4))

    // highcharts prefers working with sorted data
    if (datesOfFirstFreeze_15yr.length>0) { datesOfFirstFreeze_15yr.sort() };
    if (datesOfLastFreeze_15yr.length>0) { datesOfLastFreeze_15yr.sort() };

    return {
        'datesOfFirstFreeze_15yr':datesOfFirstFreeze_15yr,
        'datesOfLastFreeze_15yr':datesOfLastFreeze_15yr,
    }
}

export function processWeatherData(data,plantingDate,freezeThreshold) {

    // ------------------------------------------------------------------------
    //
    //
    //
    // ------------------------------------------------------------------------

    var results = {}

    //console.log(plantingDate)
    //console.log(data)

    results = {
        ...results,
        ...getSelectedYearData(data,plantingDate),
        ...getExtremesAndAverageData(data,plantingDate),
        ...getFreezeData(data,plantingDate,freezeThreshold),
     }

    //if (freezeThreshold) {
    //  results = {
    //    ...results,
    //    ...getFreezeData(data,plantingDate,freezeThreshold),
    //  }
    //}

    return results
    //return {
    //    'dates_selected_year':,
    //    'gdd_ytd_selected':,
    //    'gdd_ytd_15yr_ave':,
    //    'gdd_ytd_30yr_nor':,
    //    'gdd_ytd_por_max':,
    //    'gdd_ytd_por_min':,
    //    'datesOfLastFreeze_15yr':,
    //    'datesOfFirstFreeze_15yr':,
    //    'firstFcstDate':,
    //    'gdd_fcst_15yr_max':,
    //    'gdd_fcst_15yr_min':,
    //    'gdd_fcst_15yr_ave':,
    //};

}

