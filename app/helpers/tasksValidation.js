export const paginationValidator = (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({
            message: "Page and limit must be a number"
        });
    }

    return {
        page: Number(page),
        limit: Number(limit)
    };
};