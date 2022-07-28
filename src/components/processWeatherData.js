///
///

import moment from 'moment';

function shiftDataBackOneDay(data) {
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    function subtractOneDayFromDateString(d) {
      let result = moment(d,'YYYY-MM-DD').subtract(1,'days').format('YYYY-MM-DD')
      return result
    }

    let dataShifted = data.map(item => [subtractOneDayFromDateString(item[0]),item[1],item[2]])
    // only return data starting with expected first date
    return dataShifted.slice(1)
    //return dataShifted
}

function calcGddAcc(data,plantingDate,gddBase) {
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    let sum

    function calcGdd(mx,mn,b,limits=null) {
        if (limits) {
            let mx_lim = limits[0]
            let mn_lim = limits[1]
            mx = mx>mx_lim ? mx_lim : mx
            mn = mn<mn_lim ? mn_lim : mn
        }
        return Math.max(...[((mx+mn)/2.) - b, 0])
    }

    let startDateMMDD = plantingDate.slice(0,2)+'-'+plantingDate.slice(3,5);
    //let zeroDateMMDD = moment(plantingDate,'MM/DD/YYYY').subtract(1,'day').format('MM-DD')
    let base = (gddBase==='86/50') ? 50 : gddBase
    let limits = (gddBase==='86/50') ? [86,50] : null
    let dataAccSincePlantingDate = data.map((sum = 0, item =>
      [item[0], item[0].slice(5)===startDateMMDD ? sum = calcGdd(item[1],item[2],base,limits) : sum += calcGdd(item[1],item[2],base,limits)]
      //[item[0], item[0].slice(5)===startDateMMDD ? sum = 0 : sum += calcGdd(item[1],item[2],base,limits)]
      //[item[0], item[0].slice(5)===zeroDateMMDD ? sum = 0 : sum += calcGdd(item[1],item[2],base,limits)]
    ))
    return dataAccSincePlantingDate
}

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
    gdd_ytd_selected = dataFiltered.map(x => (x[1]!==miss ? x[1] : null));
    //console.log(dates_selected_year)
    //console.log(gdd_ytd_selected)

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

function getFreezeData(data,plantingDate,freezeThreshold,limitYears) {
    //
    //

    if (limitYears===undefined) {
      limitYears = null
    }

    if (!freezeThreshold) {
      let res = {}
      if (limitYears) {
              res['datesOfFirstFreeze_'+limitYears.toString()+'yr'] = []
              res['datesOfLastFreeze_'+limitYears.toString()+'yr'] = []
      } else {
              res['datesOfFirstFreeze'] = []
              res['datesOfLastFreeze'] = []
      }
      return res
    }

    //var plantingDateFormatted = plantingDate.slice(6,10)+'-'+plantingDate.slice(0,2)+'-'+plantingDate.slice(3,5);
    var selectedYear = plantingDate.slice(6,10);
    var currentYear = moment().format('YYYY')
    let years = []
    let seasonStartDates
    let datesOfFirstFreeze = []
    let datesOfLastFreeze = []

    let dates = data.map(x => x[0])

    // number of years to include in freeze data
    let numYears
    if (limitYears) {
      numYears = limitYears
    } else {
      numYears = parseInt(currentYear,10) - parseInt(dates[0].slice(0,4),10)
    }

    // find last years in period of interest
    for (let i = 1; i < numYears+1; i++) {
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
          datesOfLastFreeze.push(springFreezes.slice(-1)[0][0])
      } else {
          datesOfLastFreeze = []
      }
      // get first freeze in Fall
      fallFreezes = data.slice(idxOfDate,idxOfDate+180).filter(isBelowFreezeThreshold)
      if (fallFreezes.length>0) {
          datesOfFirstFreeze.push(fallFreezes[0][0])
      } else {
          datesOfFirstFreeze = []
      }
    })

    // only include data on or after planting date

    // change years to selected year, for highcharts display
    datesOfFirstFreeze = datesOfFirstFreeze.map(x => selectedYear+x.slice(4))
    datesOfLastFreeze = datesOfLastFreeze.map(x => selectedYear+x.slice(4))

    // highcharts prefers working with sorted data
    if (datesOfFirstFreeze.length>0) { datesOfFirstFreeze.sort() };
    if (datesOfLastFreeze.length>0) { datesOfLastFreeze.sort() };

    let res = {}
    if (limitYears) {
            res['datesOfFirstFreeze_'+limitYears.toString()+'yr'] = datesOfFirstFreeze
            res['datesOfLastFreeze_'+limitYears.toString()+'yr'] = datesOfLastFreeze
    } else {
            res['datesOfFirstFreeze'] = datesOfFirstFreeze
            res['datesOfLastFreeze'] = datesOfLastFreeze
    }
    return res
}

function getFirstFcstDate(lastObsDate) {
    // ------------------------------------------------------------------------
    // Since lastObsDate is provided as "morning observation date", this date
    // serves as the firstFcstDate when dates are shifted to reflect the dates
    // of heating occurrence (array dates for display are shifted in this manner).
    // Therefore, we can simply assign lastObsDate as the firstFcstDate without
    // any further date manipulation.
    // ------------------------------------------------------------------------
    return {
      'firstFcstDate':lastObsDate
    }
}

export function processWeatherData(dataDailyExtremes,lastObsDate,plantingDate,gddBase,freezeThreshold) {

    // ------------------------------------------------------------------------
    //
    //
    //
    // ------------------------------------------------------------------------

    var results = {}

    // Shift dates back one day, since data reflect morning observations, and we want GDD obs
    // dates to reflect when the heating occurred.
    let dataDailyExtremesShifted = shiftDataBackOneDay(dataDailyExtremes)

    // calculate accumulated GDD data
    let data = calcGddAcc(dataDailyExtremesShifted,plantingDate,gddBase)

    results = {
        ...results,
        ...getSelectedYearData(data,plantingDate),
        ...getExtremesAndAverageData(data,plantingDate),
        ...getFreezeData(dataDailyExtremes,plantingDate,freezeThreshold,15),
        ...getFreezeData(dataDailyExtremes,plantingDate,freezeThreshold),
        ...getFirstFcstDate(lastObsDate),
     }

    return results

}

