const AddingTransaction = require("@main/Transaction/ExecutionOfTransactions/AddingTransaction.js");
const DataService = require("@main/Data/DataService.js");
const DeletingTransaction = require("@main/Transaction/ExecutionOfTransactions/DeletingTransaction.js");
const EditingTransaction = require("@main/Transaction/ExecutionOfTransactions/EditingTransaction.js");
const TransactionModel = require("@main/Transaction/TransactionModel.js");

const { deleteExtraNote } = require("@main/Note/NoteService.js");
const { FINANCIAL_TRANSACTIONS_TABLE_NAME } = require("@main/MainConstants.js");
const { findOrAddNote } = require("@main/Note/NoteService.js");

class TransactionService {

    async getAllTransactions() {
        const transactions = await TransactionModel.getAll();
        console.info(`Получены данные из таблицы "${FINANCIAL_TRANSACTIONS_TABLE_NAME}"`);

        return DataService.processDataOut(transactions);
    };

    async addTransaction(data) {
        DataService.processDataIn(data);

        const addingTransaction = await new AddingTransaction(data);
        addingTransaction.check();

        const note = await findOrAddNote(data.note);

        await TransactionModel.add({ ...data, noteId: note.id });
        console.info(`В таблицу "${FINANCIAL_TRANSACTIONS_TABLE_NAME}" добавлена транзакция`);

        await addingTransaction.realize();
    };

    async editTransaction(data) {
        DataService.processDataIn(data);

        const editingTransaction = await new EditingTransaction(data);
        editingTransaction.check();

        const noteBeforeEditing = await this.getNoteBeforeEditing(data.id);
        const noteForEditing = await findOrAddNote(data.note);

        await TransactionModel.editById({ ...data, noteId: noteForEditing.id });
        console.info(`Запись #${data.id} в таблице "${FINANCIAL_TRANSACTIONS_TABLE_NAME}" отредактирована`);

        if (noteBeforeEditing !== noteForEditing.note) {
            await deleteExtraNote(noteBeforeEditing);
        };

        await editingTransaction.realize();
    };

    async deleteTransaction(data) {
        DataService.processDataIn(data);

        const deletingTransaction = await new DeletingTransaction(data);
        deletingTransaction.check();

        const noteBeforeDeleting = await this.getNoteBeforeEditing(data.id);

        await TransactionModel.deleteById(data.id);
        console.info(`Запись #${data.id} удалена из таблицы "${FINANCIAL_TRANSACTIONS_TABLE_NAME}"`);

        await deleteExtraNote(noteBeforeDeleting);

        await deletingTransaction.realize();
    };

    async getNoteBeforeEditing(transactionId) {
        console.info("Получение примечания до редактирования / удаления транзакции");
        const columnName = `${FINANCIAL_TRANSACTIONS_TABLE_NAME}.id`
        return (await TransactionModel.getNotes({ [columnName]: transactionId }))[0].note;
    };

};

module.exports = new TransactionService();
