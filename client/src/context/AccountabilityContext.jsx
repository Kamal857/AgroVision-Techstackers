import { createContext, useContext, useState, useEffect } from 'react';

const AccountabilityContext = createContext();

export const useAccountability = () => useContext(AccountabilityContext);

export const AccountabilityProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('agrovision_transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('agrovision_transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: Date.now(),
            timestamp: new Date().toISOString(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const clearTransactions = () => {
        setTransactions([]);
    };

    return (
        <AccountabilityContext.Provider value={{
            transactions,
            addTransaction,
            deleteTransaction,
            clearTransactions
        }}>
            {children}
        </AccountabilityContext.Provider>
    );
};
