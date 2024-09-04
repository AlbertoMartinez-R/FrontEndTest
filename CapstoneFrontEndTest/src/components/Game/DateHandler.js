export default function getCurrentDayOfYearEST() {
    
    const todayUTC = new Date();
    
    const ESTOffset = -5 * 60; 
    const todayEST = new Date(todayUTC.getTime() + (ESTOffset * 60 * 1000));

    const startOfYearEST = new Date(Date.UTC(todayEST.getUTCFullYear(), 0, 1));

    const diffInTime = todayEST - startOfYearEST;

    const dayOfYear = Math.floor(diffInTime / (1000 * 60 * 60 * 24)) + 1;
    
    return dayOfYear;
}


