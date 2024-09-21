import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../api';

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAgents = JSON.parse(localStorage.getItem('agents'));
    if (storedAgents) {
      setAgents(storedAgents);
      setIsLoading(false);
    } else {
      fetchData('agents')
        .then((agentsData) => {
          setAgents(agentsData);
          localStorage.setItem('agents', JSON.stringify(agentsData));
        })
        .catch((err) => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(agents));
  }, [agents]);

  return (
    <AgentContext.Provider value={{ setAgents, agents, error, isLoading }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => useContext(AgentContext);
