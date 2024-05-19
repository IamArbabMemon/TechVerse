const { productsCollection } = require("../models/productModel");
const {wholeSellerProfileModel,userProfileModel,} = require("../models/userProfileModel");
const { uploadFileOnCloudinary } = require("../utils/cloudinaryUploader");

async function getAllProducts(req, res) {

  try {
    const allProducts = await productsCollection.find({});

    return res.json(allProducts);
  } catch (err) {
    return res.status(400).json({ message: err });
  }

}

async function getProductsByCategory(req, res) {
  if (!req.params.category)
    return res
      .status(404)
      .json({ message: "please insert the parameter with request" });

  try {
    const products = await productsCollection.find({
      category: req.params.category,
    });

    return res.json(products);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

async function getProductsByNameAndCategory(req, res) {
  if (!req.params.name || !req.params.category)
    return res
      .status(404)
      .json({ message: "please insert the parameter with request" });

  try {
    const item = req.params.name;
    const products = await productsCollection.find({
      $and: [{ item: item }, { category: req.params.category }],
    });
    return res.json(products);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}

async function getProductsByName(req, res) {
  if (!req.params.itemName)
    return res
      .status(400)
      .json({ message: "please insert the parameter with request" });

  try {
    const products = await productsCollection.findOne({
      item: req.params.itemName,
    });

    return res.status(200).json(products);

  }catch (err) {
    return res.status(400).json({ message: err });
  }
}

async function getProductsById(req, res) {
  if (!req.params.Product_id)
    return res
      .status(400)
      .json({ message: "please insert the parameter with request" });

  try {
    const products = await productsCollection.findOne({
      _id: req.params.Product_id,
    });

    return res.status(200).json(products);

  }catch (err) {
    return res.status(400).json({ message: err });
  }
}


// async function getImageLinksArray(imageArray) {
//   const linksArray = await Promise.all(imageArray.map(async (imageFile) => {
//       let link = await uploadFileOnCloudinary(imageFile.path);
//       console.log(link);
//       return link;
//   }));
  
//   return linksArray;
// }


async function addProduct(req, res) {
  if (!req.body) return res.status(400).json({ error: "Empty request body" });

  try {
    const { item, category, price, quantity, description, storeName } =
      req.body;


      
    if (!req.files.image)
      return res.status(400).json({ error: "Image is missing" });
  
    let imageLinks = [];

    
    imageLinks = await Promise.all(req.files.image.map(async (image) =>await uploadFileOnCloudinary(image.path)));
   
    const storeOwner = await wholeSellerProfileModel.findOne({
      businessName: storeName,
    });

    const storeOwnerProfileRef = storeOwner._id;

    const newProduct = await productsCollection.create({
      item,
      category,
      price,
      quantity,
      description,
      image:imageLinks,
      storeName,
      storeOwnerProfileRef,
    });

    return res.status(200).json(newProduct);
  } catch (err) {
    return res.status(400).json({ error: `error occured in add product controller : ${err}` });
  }
}

async function deleteProduct(req, res) {
  if (!req.params.productId)
    return res.status(400).json({ error: "productId is empty" });

  const deletedProduct = await productsCollection.deleteOne({
    _id: req.params.productId,
  });

  return res.status(200).json({ success: "Product has been deleted" });
}

async function updateProduct(req, res) {
  
  if (!req.body) return res.status(400).json({ error: "Empty Request Body" });
  try {
    await productsCollection.findOneAndReplace(
      { _id: req.body.productId },
      req.body
    );

    return res
      .status(200)
      .json({ success: "Product details has been updated" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
}

async function getProductByBusinessName(req, res) {
  console.log("🚀 ~ getProductByBusinessName ~ req:", req.params.businessName)
  if (!req.params.businessName)
    return res
      .status(400)
      .json({ error: "Empty parameters provide businessName" });

  try {
    const products = await productsCollection.find({
      storeName: req.params.businessName,
    });

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductsByName,
  getProductsByNameAndCategory,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductByBusinessName,
  getProductsById
};
