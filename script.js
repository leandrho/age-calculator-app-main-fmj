const isBisiesto = (year) => {

    if(year%400 === 0){
        return true;
    }
    else if(year%4 === 0 && year%100!==0){
        return true;
    }
   
    return false;
}
const calcDifference = (date1, date2)=>{

    let yearsD = date1.getFullYear() - date2.getFullYear();
    let monthsD = date1.getMonth() - date2.getMonth();
    let daysD = date1.getDate() - date2.getDate();

    if(monthsD<0){
        yearsD--;
        monthsD += 12;
    }
    if(daysD < 0){
        monthsD--;
        const monthA = (date2.getMonth() - 1 + 12) % 12;
        const daysMonthA = new Date(date2.getFullYear(), monthA + 1, 0).getDate();
        daysD += daysMonthA;
        if(monthsD<0){
            yearsD--;
            monthsD += 12;
        }
    }

    return {
            years: yearsD, 
            months: monthsD, 
            days: daysD
        }
}

const form = document.querySelector('.form');
form.addEventListener('submit',(e)=>{
  
    e.preventDefault();
   
    const day = form.querySelector('#day');
    const month = form.querySelector('#month');
    const year = form.querySelector('#year');
    
    const dayreq = day.nextElementSibling;
    const dayinv = dayreq.nextElementSibling;

    const monthreq = month.nextElementSibling;
    const monthinv = monthreq.nextElementSibling;

    const yearreq = year.nextElementSibling;
    const yearinv = yearreq.nextElementSibling;

    let req = false;
    if(day.value==''){
        req=true;
        dayreq.classList.add('error');
    }
    else
        dayreq.classList.remove('error');

    if(month.value==''){
        req=true;
        monthreq.classList.add('error');

    }    
    else
        monthreq.classList.remove('error');

    if(year.value==''){
        req=true;
        yearreq.classList.add('error');
    }
    else
        yearreq.classList.remove('error');

    const dayNum = +day.value;
    const monthNum = +month.value;
    const yearNum = +year.value;

    let invalido = false;
    switch (monthNum) {
        case 2:
            if(dayNum>29)
                invalido=true;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            if(dayNum>30)
                invalido=true;
        break;
        default:
            if(dayNum>31)
                invalido=true;
            break;
    }
    if(dayNum==29 && !isBisiesto(yearNum))
        invalido=true;
    if(dayNum<1)
        invalido=true;

    if(invalido && day.value!==''){
        dayinv.classList.add('error');
    }
    else{
        dayinv.classList.remove('error');
    }

    if(month.value!=='' && (month.value>12 || month.value<1)){
        invalido=true;
        monthinv.classList.add('error');
    }
    else{
        monthinv.classList.remove('error');
    }

    if(year.value!=='' && (year.value>new Date().getFullYear() || year.value<1)){
        invalido=true;
        yearinv.classList.add('error');
    }
    else{
        yearinv.classList.remove('error');
    }

    const resYear = document.querySelector('.result-year');
    const resMonth = document.querySelector('.result-month');
    const resDay = document.querySelector('.result-day');

    if(invalido || req){
        resYear.innerHTML = '--';
        resMonth.innerHTML = '--';
        resDay.innerHTML = '--';
    }
    else{
        
        let curDate = new Date();
        let birthDate = new Date(`${yearNum}/${monthNum}/${dayNum}`);
        
        const {years, months, days} = calcDifference(curDate, birthDate);

        resYear.innerHTML = years;
        resMonth.innerHTML = months;
        resDay.innerHTML = days;
    }

});