"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, Type,
  Save, Undo, Image as ImageIcon, Pencil,
  Plus, X, MinusCircle
} from "lucide-react";
import { categoryMenus as defaultCategoryMenus } from "@/components/layout/navigation-data";
import { addProduct, updateProduct } from "@/lib/actions/products";
const RichTextToolbar = () => (
  <div className="flex items-center gap-1 border-b border-[#e4e4e4] p-2 bg-[#f5f5f5] shrink-0 text-gray-600 text-sm">
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors" title="Source">Source</button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Bold size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Italic size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><UnderlineIcon size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><Strikethrough size={14} /></button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignLeft size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignCenter size={14} /></button>
    <button className="p-1 hover:bg-[#e4e4e4] rounded transition-colors"><AlignRight size={14} /></button>
    <div className="w-px h-4 bg-gray-300 mx-1"></div>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none">
      <option>Format</option>
    </select>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none ml-1">
      <option>Font</option>
    </select>
    <select className="bg-transparent border border-gray-300 rounded px-1 py-0.5 outline-none ml-1">
      <option>Size</option>
    </select>
  </div>
);

const InputRow = ({ label, required, children, helper, id }: { label: string, required?: boolean, children: React.ReactNode, helper?: string, id?: string }) => (
  <div className="flex items-start gap-4 border-b border-[#e4e4e4] py-4 last:border-b-0" id={id}>
    <label className="w-1/6 text-right pt-2 font-semibold text-gray-700">
      {required && <span className="text-red-500 font-bold">* </span>}
      {label}
    </label>
    <div className="w-5/6 relative">
      {children}
      {helper && <div className="text-xs text-gray-400 mt-1.5">{helper}</div>}
    </div>
  </div>
);

function AddProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState("general");
  const [dynamicCategoryMenus, setDynamicCategoryMenus] = useState<any>(defaultCategoryMenus);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allUniqueCategories, setAllUniqueCategories] = useState<string[]>([]);

  // Form states - General
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  
  // Form states - Data
  const [model, setModel] = useState("");
  const [sku, setSku] = useState("");
  const [upc, setUpc] = useState("");
  const [ean, setEan] = useState("");
  const [jan, setJan] = useState("");
  const [isbn, setIsbn] = useState("");
  const [mpn, setMpn] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("0");
  const [taxClass, setTaxClass] = useState("Taxable Goods");
  const [quantity, setQuantity] = useState("100");
  const [minQuantity, setMinQuantity] = useState("1");
  const [subtractStock, setSubtractStock] = useState(true);
  const [outOfStockStatus, setOutOfStockStatus] = useState("Out Of Stock");
  const [dateAvailable, setDateAvailable] = useState("2024-01-01");
  const [requiresShipping, setRequiresShipping] = useState(true);
  const [length, setLength] = useState("0.00000000");
  const [width, setWidth] = useState("0.00000000");
  const [height, setHeight] = useState("0.00000000");
  const [lengthClass, setLengthClass] = useState("Centimeter");
  const [weight, setWeight] = useState("0.00000000");
  const [weightClass, setWeightClass] = useState("Kilogram");
  const [status, setStatus] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");

  // Form states - Links
  const [manufacturer, setManufacturer] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filters, setFilters] = useState("");
  const [stores, setStores] = useState(true);
  const [downloads, setDownloads] = useState("");
  const [relatedProducts, setRelatedProducts] = useState<string[]>([]);
  
  // Extra fields
  const [discountedPrice, setDiscountedPrice] = useState("0");
  const [images, setImages] = useState<{ id: number; url: string }[]>([]);
  const [variants, setVariants] = useState<{ id: number; value: string }[]>([]);
  const [customAttributes, setCustomAttributes] = useState<{ id: number; value: string }[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<{ id: number; value: string }[]>([]);
  const [body, setBody] = useState("");

  // Meta fields mock
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [productTags, setProductTags] = useState("");

  // Search states for autocomplete
  const [categorySearch, setCategorySearch] = useState("");
  const [relatedProductSearch, setRelatedProductSearch] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isRelatedDropdownOpen, setIsRelatedDropdownOpen] = useState(false);

  useEffect(() => {
    // Load dynamic categories
    const loadCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const dbCategories = res.ok ? await res.json() : null;
        if (dbCategories && dbCategories.length > 0) {
          const newCategoryMenus: any = {};
          dbCategories.forEach((cat: any) => {
            newCategoryMenus[cat.title] = {
              image: cat.image,
              badge: cat.badge,
              sections: cat.sections
            };
          });
          setDynamicCategoryMenus(newCategoryMenus);
        } else {
          setDynamicCategoryMenus(defaultCategoryMenus);
        }
      } catch (err) {
        console.error("Failed to load categories from database", err);
        setDynamicCategoryMenus(defaultCategoryMenus);
      }
    };
    loadCategories();

    // Fetch products to populate dropdowns
    fetch("/api/admin/products").then(async (res) => {
      if (!res.ok) return;
      const dbProducts = await res.json();
      setAllProducts(dbProducts);
      
      // Extract all unique categories from products
      const uniqueCats = new Set<string>();
      dbProducts.forEach((p: any) => {
        if (Array.isArray(p.categories)) {
          p.categories.forEach((c: any) => uniqueCats.add(c));
        }
      });
      setAllUniqueCategories(Array.from(uniqueCats).sort());

      if (editId) {
        const productToEdit = dbProducts.find((p: any) => String(p.id) === String(editId));
        if (productToEdit) {
          setTitle(productToEdit.name || "");
          setSlug(productToEdit.slug || "");
          setDescription(productToEdit.description || "");
          setShortDescription(productToEdit.shortDescription || "");
          setModel(productToEdit.id || "");
          
          const normalizedCats = (productToEdit.categories || []).map((c: string) => {
            if (c === "Bathroom") return "Bath";
            return c;
          });
          setSelectedCategories(normalizedCats);

          setPrice(productToEdit.price?.toString() || "0");
          setDiscountedPrice(productToEdit.discountedPrice?.toString() || "0");
          setImages(productToEdit.images as any || (productToEdit.image ? [{ id: Date.now(), url: productToEdit.image }] : []));
          setVariants(productToEdit.variants as any || []);
          setCustomAttributes(productToEdit.customAttributes as any || []);
          setAdditionalInfo(productToEdit.additionalInfo as any || []);
          setBody(productToEdit.body || "");
          setMetaTitle(productToEdit.name || "");
          // Mock some states based on the product
          setQuantity("100");
          setRelatedProducts([]); // Default empty for related products
        }
      }
    }).catch(err => console.error("Failed to fetch products", err));
  }, [editId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
    if (!metaTitle) setMetaTitle(newTitle);
  };

  const addImage = () => setImages((prev) => [...prev, { id: Date.now(), url: "" }]);
  const removeImage = (id: number) => setImages((prev) => prev.filter((img) => img.id !== id));
  const updateImage = (id: number, url: string) => setImages((prev) => prev.map((img) => (img.id === id ? { ...img, url } : img)));

  const handleSave = () => {
    if (!title || !price || !model) {
      alert("Please fill in all required fields (Product Name, Model, Price).");
      return;
    }

    const productPayload: any = {
      id: editId || `product_${Date.now()}`,
      name: title,
      image: images.length > 0 ? images[0].url : "/images/hero.png",
      slug,
      description,
      shortDescription: shortDescription || title,
      categories: selectedCategories,
      price: parseFloat(price),
      discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
      images,
      variants,
      customAttributes,
      additionalInfo,
      body,
    };

    const actionPromise = editId 
      ? updateProduct(String(editId), productPayload)
      : addProduct(productPayload);

    actionPromise
      .then((res) => {
        if (res.success) {
          router.push("/products");
        } else {
          alert(`Failed to save product: ${res.error}`);
        }
      })
      .catch((err) => {
        console.error("Error saving product", err);
        alert("An error occurred while saving the product.");
      });
  };

  const tabs = [
    "General", "Data", "Links", "Option", 
    "Discount", "Image", "SEO"
  ];

  return (
    <div className="flex flex-col min-h-[600px] text-sm text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-normal text-gray-700">{editId ? "Edit Product" : "Add Product"}</h1>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleSave}
            className="bg-[#1e91cf] hover:bg-[#1978ab] text-white p-2 rounded flex items-center justify-center transition-colors"
            title="Save"
          >
            <Save size={16} />
          </button>
          <button 
            onClick={() => router.push("/products")}
            className="bg-[#f3f7f9] hover:bg-[#e4ecef] border border-[#d2e2e7] text-gray-600 p-2 rounded flex items-center justify-center transition-colors"
            title="Cancel"
          >
            <Undo size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e4e4e4] rounded shadow-sm">
        <div className="border-b border-[#e4e4e4] p-3 bg-gray-50 flex items-center gap-2 text-gray-600 font-medium">
          <Pencil size={16} />
          {editId ? "Edit Product" : "Add Product"}
        </div>
        
        <div className="p-4">
          {/* Tabs */}
          <div className="flex flex-wrap border-b border-[#e4e4e4] mb-4">
            {tabs.map((tab) => {
              const tabId = tab.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`px-4 py-2 border-t border-x rounded-t -mb-px mr-1 ${
                    activeTab === tabId
                      ? "bg-white border-[#e4e4e4] text-gray-700 font-medium"
                      : "bg-[#f5f5f5] border-transparent text-[#1e91cf] hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab Content: General */}
          {activeTab === "general" && (
            <div className="max-w-7xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#e4e4e4] pb-2">
                <span className="text-xl">🇬🇧</span>
                <span className="font-medium">English</span>
              </div>

              <InputRow label="Product Name" required>
                <input type="text" placeholder="Product Name" value={title} onChange={handleTitleChange} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>

              <InputRow label="Description">
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 bg-white">
                  <RichTextToolbar />
                  <textarea rows={10} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 text-sm focus:outline-none resize-y min-h-[150px] font-sans bg-white"></textarea>
                </div>
              </InputRow>

              <InputRow label="Meta Tag Title" required>
                <input type="text" placeholder="Meta Tag Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>

              <InputRow label="Meta Tag Description">
                <textarea rows={4} placeholder="Meta Tag Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"></textarea>
              </InputRow>

              <InputRow label="Meta Tag Keywords">
                <textarea rows={4} placeholder="Meta Tag Keywords" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white resize-y"></textarea>
              </InputRow>

              <InputRow label="Product Tags" helper="Comma separated">
                <input type="text" placeholder="Product Tags" value={productTags} onChange={(e) => setProductTags(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
            </div>
          )}

          {/* Tab Content: Data */}
          {activeTab === "data" && (
            <div className="max-w-7xl">
              <InputRow label="Model" required helper=" ">
                <input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="Model" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="SKU" helper="Stock Keeping Unit">
                <input type="text" value={sku} onChange={e => setSku(e.target.value)} placeholder="SKU" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="UPC" helper="Universal Product Code">
                <input type="text" value={upc} onChange={e => setUpc(e.target.value)} placeholder="UPC" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="EAN" helper="European Article Number">
                <input type="text" value={ean} onChange={e => setEan(e.target.value)} placeholder="EAN" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="JAN" helper="Japanese Article Number">
                <input type="text" value={jan} onChange={e => setJan(e.target.value)} placeholder="JAN" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="ISBN" helper="International Standard Book Number">
                <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="MPN" helper="Manufacturer Part Number">
                <input type="text" value={mpn} onChange={e => setMpn(e.target.value)} placeholder="MPN" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="Location">
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              
              <div className="text-xl text-gray-700 py-4 border-b border-[#e4e4e4]">Price</div>
              
              <InputRow label="Price">
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="Tax Class">
                <select value={taxClass} onChange={e => setTaxClass(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 cursor-pointer">
                  <option value="Taxable Goods">Taxable Goods</option>
                  <option value="None">None</option>
                </select>
              </InputRow>

              <div className="text-xl text-gray-700 py-4 border-b border-[#e4e4e4]">Stock</div>
              
              <InputRow label="Quantity">
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="Minimum Quantity" helper="Force a minimum ordered amount">
                <input type="number" value={minQuantity} onChange={e => setMinQuantity(e.target.value)} placeholder="Minimum Quantity" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="Subtract Stock">
                <div className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${subtractStock ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setSubtractStock(!subtractStock)}>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${subtractStock ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </InputRow>
              <InputRow label="Out Of Stock Status" helper="Status shown when a product is out of stock">
                <select value={outOfStockStatus} onChange={e => setOutOfStockStatus(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 cursor-pointer">
                  <option value="Out Of Stock">Out Of Stock</option>
                  <option value="2-3 Days">2-3 Days</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Pre-Order">Pre-Order</option>
                </select>
              </InputRow>
              <InputRow label="Date Available">
                <div className="flex">
                  <input type="date" value={dateAvailable} onChange={e => setDateAvailable(e.target.value)} className="w-64 px-4 py-3 text-sm border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                  <span className="bg-gray-50 border border-l-0 border-gray-200 px-4 py-3 rounded-r-xl flex items-center justify-center text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                </div>
              </InputRow>

              <div className="text-xl text-gray-700 py-4 border-b border-[#e4e4e4]">Specification</div>
              
              <InputRow label="Requires Shipping">
                <div className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${requiresShipping ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setRequiresShipping(!requiresShipping)}>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${requiresShipping ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </InputRow>
              <InputRow label="Dimensions (L x W x H)">
                <div className="flex gap-4">
                  <input type="number" step="any" value={length} onChange={e => setLength(e.target.value)} placeholder="Length" className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                  <input type="number" step="any" value={width} onChange={e => setWidth(e.target.value)} placeholder="Width" className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                  <input type="number" step="any" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height" className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
                </div>
              </InputRow>
              <InputRow label="Length Class">
                <select value={lengthClass} onChange={e => setLengthClass(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 cursor-pointer">
                  <option value="Centimeter">Centimeter</option>
                  <option value="Millimeter">Millimeter</option>
                  <option value="Inch">Inch</option>
                </select>
              </InputRow>
              <InputRow label="Weight">
                <input type="number" step="any" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              <InputRow label="Weight Class">
                <select value={weightClass} onChange={e => setWeightClass(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white text-gray-700 cursor-pointer">
                  <option value="Kilogram">Kilogram</option>
                  <option value="Gram">Gram</option>
                  <option value="Pound">Pound</option>
                  <option value="Ounce">Ounce</option>
                </select>
              </InputRow>
              <InputRow label="Status">
                <div className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${status ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setStatus(!status)}>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${status ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </InputRow>
              <InputRow label="Sort Order">
                <input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} placeholder="Sort Order" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
            </div>
          )}

          {/* Tab Content: Links */}
          {activeTab === "links" && (
            <div className="max-w-7xl">
              <InputRow label="Manufacturer" helper="(Autocomplete)">
                <input type="text" value={manufacturer} onChange={e => setManufacturer(e.target.value)} placeholder="Manufacturer" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              
              <InputRow label="Categories" helper="(Autocomplete)">
                <div className="border border-gray-200 rounded-xl bg-white relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                  <input 
                    type="text" 
                    placeholder="Categories" 
                    value={categorySearch}
                    onChange={(e) => {
                      setCategorySearch(e.target.value);
                      setIsCategoryDropdownOpen(true);
                    }}
                    onFocus={() => setIsCategoryDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsCategoryDropdownOpen(false), 200)}
                    className="w-full px-4 py-3 text-sm focus:outline-none border-b border-gray-200" 
                  />
                  {isCategoryDropdownOpen && (
                     <div className="absolute z-20 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 mt-[-1px] shadow-lg">
                       {allUniqueCategories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).map(cat => (
                         <div key={cat} className="px-4 py-2.5 hover:bg-blue-600 hover:text-white cursor-pointer text-sm" onMouseDown={(e) => {
                           e.preventDefault(); // Prevent blur from firing before click
                           if (!selectedCategories.includes(cat)) setSelectedCategories([...selectedCategories, cat]);
                           setCategorySearch("");
                           setIsCategoryDropdownOpen(false);
                         }}>
                           {cat}
                         </div>
                       ))}
                       {allUniqueCategories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).length === 0 && (
                         <div className="px-4 py-2.5 text-gray-500 text-sm">No matching categories</div>
                       )}
                     </div>
                  )}
                  <div className="max-h-60 overflow-y-auto bg-white">
                    {selectedCategories.map(cat => (
                      <div key={cat} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))} className="text-white bg-red-500 rounded w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors">
                             <MinusCircle size={14} />
                          </button>
                          {cat}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </InputRow>

              <InputRow label="Filters" helper="(Autocomplete)">
                <input type="text" value={filters} onChange={e => setFilters(e.target.value)} placeholder="Filters" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              
              <InputRow label="Stores">
                <div className="border border-gray-200 rounded-xl p-4 max-h-40 overflow-y-auto bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <input type="checkbox" checked={stores} onChange={() => setStores(!stores)} className="cursor-pointer" />
                    <span>Default</span>
                  </div>
                </div>
              </InputRow>
              
              <InputRow label="Downloads" helper="(Autocomplete)">
                <input type="text" value={downloads} onChange={e => setDownloads(e.target.value)} placeholder="Downloads" className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white" />
              </InputRow>
              
              <InputRow label="Related Products" helper="(Autocomplete)">
                <div className="border border-gray-200 rounded-xl bg-white relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500">
                  <input 
                    type="text" 
                    placeholder="Related Products" 
                    value={relatedProductSearch}
                    onChange={(e) => {
                      setRelatedProductSearch(e.target.value);
                      setIsRelatedDropdownOpen(true);
                    }}
                    onFocus={() => setIsRelatedDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsRelatedDropdownOpen(false), 200)}
                    className="w-full px-4 py-3 text-sm focus:outline-none border-b border-gray-200" 
                  />
                  {isRelatedDropdownOpen && (
                     <div className="absolute z-20 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 mt-[-1px] shadow-lg">
                       {allProducts.filter(p => p.name.toLowerCase().includes(relatedProductSearch.toLowerCase())).slice(0, 10).map(p => (
                         <div key={p.id} className="px-4 py-2.5 hover:bg-blue-600 hover:text-white cursor-pointer text-sm" onMouseDown={(e) => {
                           e.preventDefault(); // Prevent blur from firing before click
                           if (!relatedProducts.includes(p.name)) setRelatedProducts([...relatedProducts, p.name]);
                           setRelatedProductSearch("");
                           setIsRelatedDropdownOpen(false);
                         }}>
                           {p.name}
                         </div>
                       ))}
                       {allProducts.filter(p => p.name.toLowerCase().includes(relatedProductSearch.toLowerCase())).length === 0 && (
                         <div className="px-4 py-2.5 text-gray-500 text-sm">No matching products</div>
                       )}
                     </div>
                  )}
                  <div className="max-h-60 overflow-y-auto bg-white">
                    {relatedProducts.map(rp => (
                      <div key={rp} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setRelatedProducts(relatedProducts.filter(r => r !== rp))} className="text-white bg-red-500 rounded w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors">
                             <MinusCircle size={14} />
                          </button>
                          {rp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </InputRow>
            </div>
          )}

          {/* Tab Content: Image */}
          {activeTab === "image" && (
            <div className="max-w-7xl">
              <InputRow label="Product Images">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-3 text-left font-semibold text-gray-700 text-sm">Image URL</th>
                      <th className="p-3 text-left font-semibold text-gray-700 text-sm w-[120px]">Preview</th>
                      <th className="p-3 text-right w-[60px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {images.map((img) => (
                      <tr key={img.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="p-3">
                          <input
                            type="text"
                            value={img.url}
                            onChange={(e) => updateImage(img.id, e.target.value)}
                            placeholder="Image URL"
                            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
                          />
                        </td>
                        <td className="p-3">
                          {img.url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={img.url} alt="preview" className="w-12 h-12 object-contain border border-[#e4e4e4] p-1 bg-white" onError={(e) => (e.currentTarget.style.display = 'none')} onLoad={(e) => (e.currentTarget.style.display = 'block')} />
                          ) : (
                            <div className="w-12 h-12 border border-[#e4e4e4] bg-gray-50 flex items-center justify-center text-gray-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button onClick={() => removeImage(img.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition-colors">
                            <X size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {images.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">No images</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}></td>
                      <td className="p-3 text-right">
                        <button onClick={addImage} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors">
                          <Plus size={14} />
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </InputRow>
            </div>
          )}

          {/* Placeholders for other tabs */}
          {["option", "discount", "seo"].includes(activeTab) && (
            <div className="p-8 text-center text-gray-500">
              This tab is currently under construction and data will be implemented here soon.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
      <AddProductForm />
    </React.Suspense>
  );
}
