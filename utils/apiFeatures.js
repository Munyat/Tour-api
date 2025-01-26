class APIFeatures {
  constructor(query, querySting) {
    this.query = query;
    this.queryString = querySting;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2. Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1); // Default to page 1
    const limit = Math.max(1, parseInt(this.queryString.limit, 10) || 10); // Default to limit 10
    const skip = (page - 1) * limit;

    this.query = this.query.sort({ _id: 1 }).skip(skip).limit(limit); // Ensure consistent sort order
    return this;
  }
}

module.exports = APIFeatures;
