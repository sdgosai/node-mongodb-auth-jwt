class ApiFeature {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            // name: {
            //     $RegExp: this.queryStr.keyword,
            //     $options: 'i',
            // }
            /// if not work ↑ try ↓
            name: new RegExp(this.queryStr.keyword, 'i')
        } : {}
        // console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "pages", "limit", "show"];
        // console.log(queryCopy);
        removeFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy);
        // filter for age and marks
        // console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
        // console.log(queryStr);
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