const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('databaseManagement', {
    getExpensesTypes: () => ipcRenderer.invoke('get-expenses-types'),
    addExpenseType: () => ipcRenderer.invoke('add-expense-type')
});
