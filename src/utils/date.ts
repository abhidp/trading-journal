// src/utils/date.ts
export const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};

export const formatInputDate = (dateString: string) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
};


export const isValidDateFormat = (dateString: string) => {
    // Check if date is in DD-MM-YYYY format
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
    return regex.test(dateString);
};


// src/utils/date.ts

export const formatStorageDate = (dateString: string) => {
    // Convert from DD-MM-YYYY to YYYY-MM-DD
    if (!dateString) return '';
    try {
      const [day, month, year] = dateString.split('-');
      if (!day || !month || !year) throw new Error('Invalid date format');
      
      // Pad with leading zeros if necessary
      const paddedDay = day.padStart(2, '0');
      const paddedMonth = month.padStart(2, '0');
      
      return `${year}-${paddedMonth}-${paddedDay}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      throw new Error('Invalid date format. Expected DD-MM-YYYY');
    }
  };
  
  export const formatDisplayDate = (dateString: string) => {
    // Convert from YYYY-MM-DD to DD-MM-YYYY
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      if (!day || !month || !year) throw new Error('Invalid date format');
      
      // Pad with leading zeros if necessary
      const paddedDay = day.padStart(2, '0');
      const paddedMonth = month.padStart(2, '0');
      
      return `${paddedDay}-${paddedMonth}-${year}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      throw new Error('Invalid date format. Expected YYYY-MM-DD');
    }
  };
  
  export const isValidDate = (dateString: string) => {
    // Validate DD-MM-YYYY format
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateString)) return false;
  
    const [day, month, year] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    return date.getDate() === day && 
           date.getMonth() === month - 1 && 
           date.getFullYear() === year;
  };