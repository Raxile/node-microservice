import customResponse from "../../helpers/common/common-response";
import { STATUS_CODES } from "../../helpers/constants/status-codes";
import { createLog, getRecentLogs, TLogPayload, TLogQuery } from "./logs-queries";

export const createLogService = async (data: TLogPayload) => {
    const log = await createLog(data);
    return customResponse(
        STATUS_CODES.CREATED,
        STATUS_CODES.CREATED,
        'logs created successfully',
        log
    );
}

export const getLogService = async (payload: TLogQuery) => {
    const logs = await getRecentLogs(payload);
    return customResponse(
        STATUS_CODES.OK,
        STATUS_CODES.OK,
        'logs created successfully',
        logs
    );
}