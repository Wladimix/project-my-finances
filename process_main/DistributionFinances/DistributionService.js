const DataService = require("@main/Data/DataService");

const { getAll, add, edit } = require("@main/DistributionFinances/DistributionModel");
const { DISTRIBUTION_OF_FINANCES_TABLE_NAME } = require("@main/MainConstants.js");

class DistributionService {

    async getAllDistributionTypes() {
        const DistributionTypes = await getAll();
        console.info(`Получены данные из таблицы "${DISTRIBUTION_OF_FINANCES_TABLE_NAME}"`);

        return DataService.processDataOut(DistributionTypes);
    }

    async addDistributionType(data) {
        DataService.processDataIn(data);

        await add(data);
        console.info(`Запись "${data.name}" в таблице "${DISTRIBUTION_OF_FINANCES_TABLE_NAME}" создана`);
    };

    async editDistributionType(data) {
        DataService.processDataIn(data);

        await edit(data);
        console.info(`Запись #${data.id} в таблице "${DISTRIBUTION_OF_FINANCES_TABLE_NAME}" отредактирована`);
    }

};

module.exports = new DistributionService();
