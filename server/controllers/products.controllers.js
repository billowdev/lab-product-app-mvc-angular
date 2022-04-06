const { Products } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const perPage = parseInt(req.query.per_page);
    const sortColumn = req.query.sort_column;
    const sortDirection = req.query.sort_direction;
    const search = req.query.search;
    const startIndex = (page - 1) * perPage;

    const total = await Products.count();

    let totalPages = total / perPage;
    let products;
    if (search && sortColumn) {
      products = await Products.findAll({
        offset: startIndex,
        limit: perPage,
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        order: [[sortColumn, sortDirection]],
      });
    } else if (search) {
      products = await Products.findAll({
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      });
    } else if (sortColumn) {
      products = await Products.findAll({
        offset: startIndex,
        limit: perPage,
        order: [[sortColumn, sortDirection]],
      });
    } else {
      products = await Products.findAll({
        offset: startIndex,
        limit: perPage,
      });
    }
    res.status(200).json({
      success: true,
      msg: "get product success",
      data: {
        page: page,
        per_page: perPage,
        total_pages: totalPages,
        total: total,
        products,
      },
    });
  } catch (err) {
    console.log({
      success: false,
      msg: "Error at get product controllers",
      error: err,
    });
    res.status(401).json({
      success: false,
      msg: "something went wrong",
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, detail } = req.body;
    const resp = await Products.findOne({ where: { name, detail } });
    if (resp == null) {
      Products.create(req.body);
      res.status(200).json({ success: true, msg: "create product success" });
    } else {
      res
        .status(201)
        .json({ success: false, msg: "product is already exist !" });
    }
  } catch (err) {
    console.log({
      success: false,
      msg: "error on product controller",
      error: err,
    });
    res.status(400).json("Some thing went wrong!");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const resp = await Products.update(data, { where: { id } });
    if (resp) {
      res.status(200).json({ success: true, msg: "update product success" });
    } else {
      res.status(400).json({ success: false, msg: "update product failed" });
    }
  } catch (err) {
    console.log({
      success: false,
      msg: "error on product controller",
      error: err,
    });
    res.status(400).json("Some thing went wrong!");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Products.destroy({ where: { id: id } }).then((resp) => {
      if (resp) {
        res.status(200).json({ success: true, msg: "delete product success" });
      } else {
        res.status(400).json({ success: false, msg: "delete product failed" });
      }
    });
  } catch (err) {
    console.log({
      success: false,
      msg: "error on product controller",
      error: err,
    });
    res.status(400).json("Some thing went wrong!");
  }
};
