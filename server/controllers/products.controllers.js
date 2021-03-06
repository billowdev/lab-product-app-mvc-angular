const { Products } = require("../models");

exports.getAllProducts = async (req, res) =>  {
  try {
     const resp = await Products.findAll({raw:true})
      if(resp){
        res.status(200).json(resp)
        console.log(resp)
      }else{
        res.status(400).json()
      }
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


exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Products.findAll({where:{id:id}})
    if(resp.length!=0){
      res.status(200).json(resp)
    }else {
      res.status(400).json({success:false, msg:" can't get product success"})
    }
  }catch(err){

  }
}
exports.createProduct = async (req, res) => {
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
