import React, { useState } from "react";
const holidays = [
  "2024/01/01",
  "2024/02/09",
  "2024/02/10",
  "2024/02/12",
  "2024/03/01",
  "2024/05/15",
  "2024/06/06",
  "2024/08/15",
  "2024/09/16",
  "2024/09/17",
  "2024/09/18",
  "2024/10/03",
  "2024/12/25",
  "2024/12/30",
  "2024/12/31",
];
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const isSunday = (date) => date.getDay() === 0;
function DateCalculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calculatedDate, setCalculatedDate] = useState(addDays(new Date(), 84));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    let resultDate = addDays(newDate, 84);
    for (const holiday of holidays) {
      if (new Date(holiday) >= newDate && new Date(holiday) <= resultDate) {
        resultDate = addDays(resultDate, 1);
      }
    }
    if (isSunday(resultDate)) {
      resultDate = addDays(resultDate, 1);
    }
    setCalculatedDate(resultDate);
  };

  return (
    <div className="container mx-auto p-4">
      <label className="block mb-2">Select a date:</label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <div>
        <p>Calculated Date: {calculatedDate.toISOString().split("T")[0]}</p>
      </div>
    </div>
  );
}
export default DateCalculator;
