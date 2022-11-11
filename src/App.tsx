import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { getMonth } from './util';
import { CalendarHeader, Month, Sidebar } from './components';
import { CalendarContext } from './context';
import { CalendarContextType } from './models';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex }: CalendarContextType = useContext(CalendarContext) as CalendarContextType;
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <React.Fragment>
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
