import React from "react";
import TransactionService from "@renderer/services/TransactionService.js";

import { useDispatch, useSelector } from "react-redux";

export default function SourceOfTransactionInput() {
    const dispatch = useDispatch();
    const transactionService = new TransactionService(dispatch);
    const transactionData = useSelector(state => state.transactionData.data);
    const distributionTypes = useSelector(state => state.data.distributionFinancesTypes);

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor="source-of-transaction">Источник транзакции</label>
            <div className="uk-form-controls">
                <select
                    className="uk-select"
                    id="source-of-transaction"
                    onChange={e => transactionService.changeTransactionDataStorage(
                        { ...transactionData, sourceOfTransactionId: e.target.value}
                    )}
                    value={transactionData.sourceOfTransactionId}
                >

                    {
                        distributionTypes.map(distributionType => (
                            <option
                                key={distributionType.id}
                                value={distributionType.id}
                            >
                                {distributionType.name}
                            </option>
                        ))
                    }

                </select>
            </div>
        </div>
    );
};
