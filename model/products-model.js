const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
      type: String,
      index: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Tự động tạo slug duy nhất từ title trước khi lưu
productSchema.pre("save", async function () {
  // Nếu title không đổi và đã có slug thì bỏ qua
  if (!this.isModified("title") && this.slug) return;
  if (!this.title) return;

  const baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  // Đảm bảo slug là duy nhất trong collection
  const Model = this.constructor;
  while (
    await Model.exists({
      slug,
      _id: { $ne: this._id },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;