import React, { useState } from "react";
const holidays = [
  "2024/01/01",
  "2024/02/09",
  "2024/02/10",
  "2024/02/12",
  "2024/03/01",
  "2024/05/05",
  "2024/05/06",
  "2024/05/15",
  "2024/06/06",
  "2024/08/15",
  "2024/09/16",
  "2024/09/17",
  "2024/09/18",
  "2024/09/19",
  "2024/09/20",
  "2024/10/01",
  "2024/10/03",
  "2024/10/09",
  "2024/12/25",
  "2024/12/30",
  "2024/12/31",
  "2025/01/01",
  "2025/01/27",
  "2025/01/28",
  "2025/01/29",
  "2025/01/30",
];

const isSunday = (date) => date.getDay() === 0;

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calTerm = (newDate) => {
  let resultDate = addDays(newDate, 84);
  for (const holiday of holidays) {
    if (new Date(holiday) >= newDate && new Date(holiday) <= resultDate) {
      resultDate = addDays(resultDate, 1);
    }
  }
  if (isSunday(resultDate)) {
    resultDate = addDays(resultDate, 1);
  }
  return resultDate;
};

function DateCalculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calculatedDate, setCalculatedDate] = useState(calTerm(new Date()));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    let resultDate = calTerm(newDate);
    setCalculatedDate(resultDate);
  };

  return (
    <div>
      <h3>Select a date:</h3>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
      />
      <div>
        <p>term: {calculatedDate.toISOString().split("T")[0]}</p>
      </div>
      <div>
        <h3>closed</h3>
        <ul>
          {holidays.map((holiday) => {
            return <li key={holiday}>{holiday}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
export default DateCalculator;
