"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, Type,
  Plus, X
} from "lucide-react";
import { categoryMenus } from "@/components/layout/navigation-data";

const ALLMODERN_CATEGORIES = [
  { id: "furniture", label: "Furniture" },
  { id: "outdoor", label: "Outdoor" },
  { id: "lighting", label: "Lighting" },
  { id: "rugs", label: "Rugs" },
  { id: "decor-pillows", label: "Decor & Pillows" },
  { id: "wall-decor", label: "Wall Decor" },
  { id: "bedding", label: "Bedding" },
  { id: "bath", label: "Bath" },
  { id: "kitchen-tabletop", label: "Kitchen & Tabletop" },
  { id: "storage", label: "Storage" },
  { id: "baby-kids", label: "Baby & Kids" },
];

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState("0");
  const [discountedPrice, setDiscountedPrice] = useState("0");
  
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [variants, setVariants] = useState<{ id: number; value: string }[]>([]);
  const [customAttributes, setCustomAttributes] = useState<{ id: number; value: string }[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<{ id: number; value: string }[]>([]);
  const [body, setBody] = useState("");

  const addImage = () => {
    setImages((prev) => [...prev, { id: Date.now(), url: "" }]);
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImage = (id: number, url: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, url } : img)));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const addItem = (setter: React.Dispatch<React.SetStateAction<{ id: number; value: string }[]>>) => {
    setter((prev) => [...prev, { id: Date.now(), value: "" }]);
  };

  const removeItem = (
    id: number,
    setter: React.Dispatch<React.SetStateAction<{ id: number; value: string }[]>>
  ) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (
    id: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<{ id: number; value: string }[]>>
  ) => {
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const handleSave = () => {
    if (!title || !shortDescription || selectedCategories.length === 0 || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: title,
      image: images.length > 0 ? images[0].url : "/images/hero.png",
      slug,
      description,
      shortDescription,
      categories: selectedCategories,
      price,
      discountedPrice,
      images,
      variants,
      customAttributes,
      additionalInfo,
      body,
    };

    const saved = localStorage.getItem("allmodern_admin_products");
    let products = [];
    if (saved) {
      products = JSON.parse(saved);
    } else {
      // Mock data initial state
      products = [
        { id: 1, name: "Miller 56\" Upholstered Loveseat", image: "/images/cat_living_room.png" },
        { id: 2, name: "Bennett Upholstered Swivel Barrel Chair", image: "/images/cat_dining.png" },
        { id: 3, name: "Miller 84\" Upholstered Sofa", image: "/images/hero.png" },
        { id: 4, name: "Miller Upholstered Armchair", image: "/images/cat_living_room.png" },
        { id: 5, name: "Bennett Vegan Leather Swivel Barrel Chair", image: "/images/cat_bedroom.png" },
        { id: 6, name: "Miller 2 - Piece Upholstered Chaise Sectional", image: "/images/cat_outdoor.png" },
        { id: 7, name: "Salma Colorful Enamel End Table", image: "/images/cat_dining.png" },
        { id: 8, name: "Rustic Pine Wood Platform Bed", image: "/images/cat_bedroom.png" }
      ];
    }

    products.unshift(newProduct);
    localStorage.setItem("allmodern_admin_products", JSON.stringify(products));

    alert("Product saved successfully!");
    router.push("/products");
  };

  const RichTextToolbar = () => (
    <div className="flex items-center gap-1 border-b border-gray-200 p-2 bg-gray-50/50 rounded-t-xl overflow-x-auto shrink-0">
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Bold size={16} /></button>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Italic size={16} /></button>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><UnderlineIcon size={16} /></button>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Strikethrough size={16} /></button>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignLeft size={16} /></button>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignCenter size={16} /></button>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><AlignRight size={16} /></button>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <select className="bg-transparent text-sm text-gray-600 font-medium hover:bg-gray-200 p-1 rounded outline-none appearance-none cursor-pointer transition-colors">
        <option>Normal</option>
        <option>Heading 1</option>
        <option>Heading 2</option>
      </select>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <select className="bg-transparent text-sm text-gray-600 font-medium hover:bg-gray-200 p-1 rounded outline-none appearance-none cursor-pointer transition-colors">
        <option>Normal</option>
      </select>
      <div className="w-px h-5 bg-gray-300 mx-1"></div>
      <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Type size={16} /></button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1f2937]">Add Product</h2>
      </div>

      {/* Form Content */}
      <div className="p-8 space-y-8">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Enter your product title.."
            value={title}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 text-sm border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Slug</label>
          <input
            type="text"
            placeholder="this-is-sample-slug"
            value={slug}
            readOnly
            className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl bg-gray-50/50 text-gray-500 outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <RichTextToolbar />
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 text-sm focus:outline-none resize-y min-h-[150px] text-gray-700"
            ></textarea>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Short Description <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="Write short description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-700"
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Categories & Subcategories <span className="text-red-500">*</span></label>
          <div className="border border-gray-200 p-4 rounded-xl max-h-96 overflow-y-auto bg-white space-y-6">
            {Object.entries(categoryMenus).map(([mainCategory, data]) => (
              <div key={mainCategory} className="space-y-3">
                <div className="font-bold text-gray-800 border-b pb-2 sticky top-0 bg-white z-10 flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={selectedCategories.includes(mainCategory)}
                    onChange={() => {
                      setSelectedCategories(prev => 
                        prev.includes(mainCategory) 
                          ? prev.filter(id => id !== mainCategory)
                          : [...prev, mainCategory]
                      );
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{mainCategory} (Main Category)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pl-2">
                  {Array.from(new Set(data.sections.flatMap(s => s.links))).map((subCat) => {
                    const val = `${mainCategory} > ${subCat}`;
                    return (
                      <label key={val} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input 
                          type="checkbox"
                          checked={selectedCategories.includes(val)}
                          onChange={() => {
                            setSelectedCategories(prev => 
                              prev.includes(val) 
                                ? prev.filter(id => id !== val)
                                : [...prev, val]
                            );
                          }}
                          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                        />
                        <span className="text-sm text-gray-700 leading-tight">{subCat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Discounted Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Price <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Discounted Price</label>
            <input
              type="number"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-700"
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-500">Product Images</label>
          {images.length === 0 ? (
            <div className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl bg-gray-50/50 text-gray-400 text-center">
              No images added.
            </div>
          ) : (
            <div className="space-y-3">
              {images.map((img) => (
                <div key={img.id} className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={img.url}
                      onChange={(e) => updateImage(img.id, e.target.value)}
                      placeholder="Enter image URL (e.g., /images/product.png or https://...)"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-700"
                    />
                    {img.url && (
                      <div className="relative w-20 h-20 border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={img.url} 
                          alt="Preview" 
                          className="max-w-full max-h-full object-contain" 
                          onError={(e) => (e.currentTarget.style.display = 'none')} 
                          onLoad={(e) => (e.currentTarget.style.display = 'block')}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={addImage}
            className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
          >
            <Plus size={16} />
            Add Image
          </button>
        </div>

        {/* Dynamic Lists */}
        {[
          { title: "Product Variants *", state: variants, setter: setVariants, emptyMsg: "No items" },
          { title: "Custom Attributes", state: customAttributes, setter: setCustomAttributes, emptyMsg: "No attributes added yet." },
          { title: "Additional Information", state: additionalInfo, setter: setAdditionalInfo, emptyMsg: "No items" },
        ].map((list, idx) => (
          <div key={idx} className="space-y-4">
            <label className="block text-sm font-medium text-gray-500">{list.title}</label>
            {list.state.length === 0 ? (
              <div className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl bg-gray-50/50 text-gray-400 text-center">
                {list.emptyMsg}
              </div>
            ) : (
              <div className="space-y-3">
                {list.state.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateItem(item.id, e.target.value, list.setter)}
                      placeholder="Enter value..."
                      className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-700"
                    />
                    <button
                      onClick={() => removeItem(item.id, list.setter)}
                      className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => addItem(list.setter)}
              className="bg-[#1f2937] hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors w-fit"
            >
              <Plus size={16} />
              Add item
            </button>
          </div>
        ))}

        {/* Body */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Body</label>
          <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <RichTextToolbar />
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-3 text-sm focus:outline-none resize-y min-h-[200px] text-gray-700"
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
