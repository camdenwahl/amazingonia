// src/GlobalContext.jsx
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [designOrder, setDesignOrder] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [taskTimings, setTaskTimings] = useState({});
  const [surveyResponses, setSurveyResponses] = useState({});
  const [targetProduct, setTargetProduct] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        userInfo,
        setUserInfo,
        designOrder,
        setDesignOrder,
        startTime,
        setStartTime,
        taskTimings,
        setTaskTimings,
        surveyResponses,
        setSurveyResponses,
        targetProduct,
        setTargetProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
