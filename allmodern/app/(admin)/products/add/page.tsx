"use client";

import React, { useState } from "react";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, Type,
  Plus, X
} from "lucide-react";

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
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("0");
  const [discountedPrice, setDiscountedPrice] = useState("0");
  
  const [variants, setVariants] = useState<{ id: number; value: string }[]>([]);
  const [customAttributes, setCustomAttributes] = useState<{ id: number; value: string }[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<{ id: number; value: string }[]>([]);
  const [body, setBody] = useState("");

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
    if (!title || !shortDescription || !category || !price) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Product saved successfully!");
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

        {/* Short Description & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Category <span className="text-red-500">*</span></label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-gray-700 appearance-none"
              >
                <option value="" disabled>Select a category</option>
                {ALLMODERN_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
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
