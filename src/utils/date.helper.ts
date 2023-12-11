export const parseDateToStartOfDay =(date: string) => {
    
    const startOfDay = date ? new Date(date) : new Date();
    
   
    startOfDay.setHours(0, 0, 0, 0);
  
    return startOfDay;
  }
  
 export const parseDateToEndOfDay= (date: string) => {
  
    const endOfDay = date ? new Date(date) : new Date();
    

    endOfDay.setHours(23, 59, 59, 999);
  
    return endOfDay;
  }