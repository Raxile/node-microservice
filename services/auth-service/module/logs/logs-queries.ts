import { postgresPrisma } from "../../configs/prisma-db.config";


// Payload type for inserting a log
export type TLogPayload = {
    eventType: string;
    sessionId?: string;
    description?: string;
    metadata?: Record<string, any>;
};
export type TLogQuery = {
    event?: string;
    ipAddress?: string;
    userAgent?: string;
    userId?: string;
    sessionId?: string;
    startDate?: string; // ISO string or yyyy-mm-dd
    endDate?: string;   // ISO string or yyyy-mm-dd
    page?: string;      // for pagination
    limit?: string;     // for pagination
};


// Create a new log
export const createLog = async (data: TLogPayload) =>
    await postgresPrisma.log.create({ data });

// Get log by ID
export const getLogById = async (id: string) =>
    await postgresPrisma.log.findUnique({
        where: { id },
    });

// Get recent logs (with optional filter)
export const getRecentLogs = async (filters: TLogQuery) => {
    const {
        event,
        ipAddress,
        userAgent,
        userId,
        sessionId,
        startDate,
        endDate,
        page = "1",
        limit = "20",
    } = filters;

    const where: any = {};

    if (event) where.event = event;
    if (ipAddress) where.ipAddress = ipAddress;
    if (userAgent) where.userAgent = userAgent;
    if (userId) where.userId = userId;
    if (sessionId) where.sessionId = sessionId;

    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
    }

    return await postgresPrisma.log.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
    });
};


// Delete a log
export const deleteLog = async (id: string) =>
    await postgresPrisma.log.delete({ where: { id } });

// Clear old logs (e.g., older than 90 days)
export const clearOldLogs = async (days: number = 90) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return await postgresPrisma.log.deleteMany({
        where: { createdAt: { lt: cutoff } },
    });
};
