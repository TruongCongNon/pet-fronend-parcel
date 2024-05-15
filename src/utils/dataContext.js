// DataContext.js
import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState(); // Khởi tạo state và setter function cho data

  return (
    <DataContext.Provider value={{ data, setData }}>
      {" "}
      {/* Provider cung cấp data và setData */}
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider }; // cái này ko cần quan tâm , đây là nơi trung truyển dữ liệu của các page
