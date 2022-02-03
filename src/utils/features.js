class ApiFeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: new RegExp(this.queryStr.keyword, 'i')
        } : {}
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "pages", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(studentsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = studentsPerPage * (currentPage - 1);
        this.query = this.query.limit(studentsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeature;