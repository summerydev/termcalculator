import React, { useState } from "react";

const holidays = [
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
  resultDate = addDays(resultDate, holidaysCount);

  // 일요일 체크
  if (isSunday(resultDate)) {
    resultDate = addDays(resultDate, 1);
  }

  for (const holiday of holidays) {
    if (new Date(resultDate).getDate()== new Date(holiday).getDate()) {
      resultDate = addDays(resultDate, 1);
    }
  }
  console.log(resultDate);
  return resultDate;
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
