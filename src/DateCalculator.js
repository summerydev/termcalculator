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
  "2025/03/01",
  "2025/03/03",
];

const isSunday = (date) => date.getDay() === 0;

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calHolidays = (newDate, resultDate) => {
  let holidaysCount = 0;
  for (const holiday of holidays) {
    if (new Date(holiday) >= newDate && new Date(holiday) <= resultDate) {
      holidaysCount++;
    }
  }
  return holidaysCount;
};

const calTerm = (newDate) => {
  let resultDate = addDays(newDate, 84);
  let holidaysCount = calHolidays(newDate, resultDate);
  let newResultDate = addDays(resultDate, holidaysCount);

  for (const holiday of holidays) {
    if (new Date(newResultDate).getDate() == new Date(holiday).getDate()) {
      newResultDate = addDays(newResultDate, 1);
    }
  }
  let currentDate = new Date(resultDate);
  while (currentDate <= newResultDate) {
    if (resultDate.getDay() === 0) {
      console.log(resultDate);
      break;
    }
    break;
  }
  return newResultDate;
};

function DateCalculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calculatedDate, setCalculatedDate] = useState(calTerm(new Date()));

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      // 유효한 날짜인지 확인
      setSelectedDate(newDate);
      setCalculatedDate(calTerm(newDate));
    }
  };

  return (
    <div>
      <h3>Select a date:</h3>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      <div>
        <p>Term: {calculatedDate.toISOString().split("T")[0]}</p>
      </div>
      <div>
        <h3>Closed</h3>
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
