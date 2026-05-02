export interface MenuGroup {
  title: string;
  links: string[];
}

export interface DesktopMegaColumn {
  title: string;
  links: string[];
}

export interface DesktopMegaPromo {
  title: string;
  image: string;
}

export interface DesktopMegaMenu {
  columns: DesktopMegaColumn[];
  promos: DesktopMegaPromo[];
}

export interface DepartmentNavItem {
  label: string;
  href: string;
}

export const topLinks = [
  { label: "Wayfair", href: "#" },
  { label: "AllModern", href: "#" },
  { label: "Birch Ln", href: "#" },
  { label: "Joss & Main", href: "#" },
  { label: "Perigold", href: "#" },
];

export const headerLinks = [
  { label: "Collections", href: "#" },
  { label: "Best Sellers", href: "#" },
  { label: "Inspiration", href: "#" },
  { label: "Seasonal Catalog", href: "#" },
  { label: "Shop by Style", href: "#" },
  { label: "Free Design Services", href: "#" },
];

export const departmentNavItems: DepartmentNavItem[] = [
  { label: "New", href: "#" },
  { label: "Furniture", href: "#" },
  { label: "Outdoor", href: "#" },
  { label: "Lighting", href: "#" },
  { label: "Decor + Pillows", href: "#" },
  { label: "Wall Decor + Mirrors", href: "#" },
  { label: "Rugs", href: "/rugs" },
  { label: "Bedding", href: "/bedding" },
  { label: "Bath", href: "/bath" },
  { label: "Kitchen + Tabletop", href: "/kitchen-tabletop" },
  { label: "Storage", href: "/storage" },
  { label: "Baby + Kids", href: "/baby-kids" },
  { label: "Sale", href: "/sale" },
];

export const categoryMenus: Record<string, { image: string; badge: string; sections: MenuGroup[] }> = {
  New: {
    image: "/images/cat_outdoor.png",
    badge: "New Arrivals",
    sections: [
      {
        title: "New Arrivals",
        links: [
          "New In Living Room",
          "New In Bedroom",
          "New In Kitchen & Dining",
          "New In Outdoor",
          "New In Entryway",
          "New In Home Office",
        ],
      },
      {
        title: "Fresh Picks",
        links: [
          "New In Rugs",
          "New In Lighting",
          "New In Decor",
          "New In Bedding",
          "New In Bath",
          "New In Baby + Kids",
        ],
      },
    ],
  },
  Furniture: {
    image: "/images/cat_living_room.png",
    badge: "Furniture",
    sections: [
      {
        title: "Living Room",
        links: [
          "Sofa + Sectional Collections",
          "Sofas",
          "Sectionals",
          "Living Room Accent Collections",
          "Accent + Lounge Chairs",
          "Sleepers + Daybeds",
          "Coffee Tables",
        ],
      },
      {
        title: "Bedroom",
        links: [
          "Bedroom Collections",
          "Beds",
          "Dressers + Armoires",
          "Nightstands",
          "Bedroom Benches",
          "Mattresses",
        ],
      },
      {
        title: "Kitchen + Dining Room",
        links: [
          "Kitchen + Dining Collections",
          "Dining Tables",
          "Dining Chairs + Benches",
          "Kitchen + Dining Sets",
          "Bar Stools + Counter Stools",
          "Bar Carts",
          "Sideboards + Buffets",
        ],
      },
      {
        title: "Home Office",
        links: [
          "Home Office Collections",
          "Home Office Desks",
          "Office Chairs",
          "Bookcases + Bookshelves",
          "Filing Cabinets",
          "Room Dividers",
          "Coat Racks + Hooks",
        ],
      },
    ],
  },
  Outdoor: {
    image: "/images/cat_outdoor.png",
    badge: "Outdoor",
    sections: [
      {
        title: "Outdoor Furniture",
        links: [
          "Sectionals",
          "Dining Sets",
          "Lounge Chairs",
          "Outdoor Rugs",
          "Daybeds",
        ],
      },
      {
        title: "Outdoor Decor",
        links: [
          "Planters",
          "String Lights",
          "Outdoor Pillows",
          "Fire Pits",
          "Umbrellas",
        ],
      },
      {
        title: "Outdoor Dining",
        links: [
          "Outdoor Tabletop",
          "Dining Accessories",
          "Outdoor Lighting",
          "Patio Heating",
        ],
      },
    ],
  },
  Lighting: {
    image: "/images/cat_dining.png",
    badge: "Lighting",
    sections: [
      {
        title: "Interior Lighting",
        links: [
          "Pendant Lights",
          "Table Lamps",
          "Floor Lamps",
          "Wall Lights",
          "Chandeliers",
        ],
      },
      {
        title: "Outdoor Lighting",
        links: [
          "String Lights",
          "Lanterns",
          "Wall Sconces",
          "Flood Lights",
          "Post Lights",
        ],
      },
    ],
  },
  "Decor + Pillows": {
    image: "/images/hero.png",
    badge: "Decor + Pillows",
    sections: [
      {
        title: "Home Decor",
        links: [
          "Vases",
          "Decorative Baskets + Boxes",
          "Decorative Trays",
          "Decorative Objects",
          "Planters",
          "Picture Frames",
        ],
      },
      {
        title: "Pillows + Throws",
        links: [
          "Throw Pillows",
          "Pillow Covers",
          "Blankets + Throws",
          "Poufs",
          "Outdoor Pillows",
        ],
      },
      {
        title: "Botanicals",
        links: [
          "Planters",
          "Faux Flowers",
          "Faux Plants + Trees",
          "Live Plants + Trees",
        ],
      },
      {
        title: "Candlelight + Fragrances",
        links: [
          "Candle Holders",
          "Candles",
          "Diffusers",
          "Room Sprays",
        ],
      },
    ],
  },
  "Wall Decor + Mirrors": {
    image: "/images/cat_bedroom.png",
    badge: "Wall Decor + Mirrors",
    sections: [
      {
        title: "Wall Art",
        links: [
          "All Wall Art",
          "Framed Wall Art",
          "Canvas Wall Art",
          "Photography",
          "Paintings",
          "Abstract Art",
          "Oversized Wall Art",
        ],
      },
      {
        title: "Wall Decor",
        links: [
          "Wall Shelves",
          "Wall Accents",
          "Wall Clocks",
          "Wall Hangings",
          "Picture Frames",
        ],
      },
      {
        title: "Mirrors",
        links: [
          "All Mirrors",
          "Floor + Full Length Mirrors",
          "Wall Mirrors",
          "Vanity Mirrors",
        ],
      },
    ],
  },
  Rugs: {
    image: "/images/cat_living_room.png",
    badge: "Rugs",
    sections: [
      {
        title: "By Room",
        links: [
          "Living Room Rugs",
          "Bedroom Rugs",
          "Dining Room Rugs",
          "Outdoor Rugs",
          "Kids Rugs",
        ],
      },
      {
        title: "By Style",
        links: [
          "Modern Rugs",
          "Shag Rugs",
          "Layered Rugs",
          "Runner Rugs",
          "Large Rugs",
        ],
      },
    ],
  },
  Bedding: {
    image: "/images/cat_bedroom.png",
    badge: "Bedding",
    sections: [
      {
        title: "Bed Basics",
        links: [
          "Duvet Covers",
          "Sheets",
          "Pillows",
          "Mattress Pads",
          "Comforters",
        ],
      },
      {
        title: "Bedroom Accessories",
        links: [
          "Bed Frames",
          "Headboards",
          "Blankets",
          "Throws",
          "Decor",
        ],
      },
    ],
  },
  Bath: {
    image: "/images/cat_outdoor.png",
    badge: "Bath",
    sections: [
      {
        title: "Bath Linens + Accessories",
        links: [
          "Bath Towels",
          "Bath Mats",
          "Shower Curtains",
          "Robes",
          "Trash Cans",
        ],
      },
      {
        title: "Bathroom Fixtures + Hardware",
        links: [
          "Bathroom Vanities",
          "Medicine Cabinets",
          "Toilets",
          "Shower Heads",
          "Faucets",
        ],
      },
      {
        title: "Bathroom Storage",
        links: [
          "Vanity Collections",
          "Shelving",
          "Laundry Hampers",
          "Organizers",
        ],
      },
    ],
  },
  "Kitchen + Tabletop": {
    image: "/images/cat_dining.png",
    badge: "Kitchen + Tabletop",
    sections: [
      {
        title: "Dining",
        links: [
          "Dinnerware",
          "Flatware",
          "Glassware",
          "Serveware",
          "Table Linens",
        ],
      },
      {
        title: "Kitchen Tools",
        links: [
          "Cookware",
          "Small Appliances",
          "Storage",
          "Barware",
          "Coffee Accessories",
        ],
      },
    ],
  },
  Storage: {
    image: "/images/cat_bedroom.png",
    badge: "Storage",
    sections: [
      {
        title: "Organization",
        links: [
          "Shelving",
          "Storage Bins",
          "Closet Systems",
          "Entryway Storage",
          "Desk Storage",
        ],
      },
      {
        title: "Large Storage",
        links: [
          "Dressers",
          "Bookcases",
          "Wardrobes",
          "Storage Benches",
          "Cabinets",
        ],
      },
    ],
  },
  "Baby + Kids": {
    image: "/images/cat_living_room.png",
    badge: "Baby + Kids",
    sections: [
      {
        title: "Baby Furniture",
        links: [
          "Gliders",
          "Cribs",
          "Changing Tables",
          "Toddler Bed Rails",
          "Nursery Sets",
        ],
      },
      {
        title: "Kids Decor + Playroom",
        links: [
          "Kids Rugs",
          "Kids Wall Art",
          "Play Kitchen Sets",
          "Decorative Baskets",
          "Toy Storage",
        ],
      },
    ],
  },
};

export const desktopMegaMenus: Record<string, DesktopMegaMenu> = {
  New: {
    columns: [
      {
        title: "NEW ARRIVALS",
        links: [
          "New In Living Room",
          "New In Bedroom",
          "New in Kitchen & Dining",
          "New in Outdoor",
          "New in Entryway",
          "New in Home Office",
          "New in Rugs",
          "New in Lighting",
          "New in Bedding",
          "New in Tabletop",
          "New in Decor",
          "New in Bath",
          "New in Baby + Kids",
        ],
      },
      {
        title: "GET INSPIRED",
        links: ["Making Outdoor Modern", "Design Drop", "Spring Lookbook"],
      },
      {
        title: "COLLECTIONS",
        links: [
          "Bedroom Collections",
          "Sofa + Sectional Collections",
          "Living Room Accent Collections",
          "Kitchen + Dining Collections",
          "Outdoor Collections",
          "Lighting Collections",
          "Vanity Collections",
          "Modular Organization Collections",
          "Home Office Collections",
          "Rug Collections",
        ],
      },
    ],
    promos: [
      { title: "New Arrivals? Right Here.", image: "/images/cat_outdoor.png" },
      { title: "Design Drop: Spring's Top 10 Styles", image: "/images/cat_dining.png" },
    ],
  },
  Furniture: {
    columns: [
      {
        title: "LIVING ROOM",
        links: [
          "Sofa + Sectional Collections",
          "Sofas",
          "Sectionals",
          "Living Room Accent Collections",
          "Accent + Lounge Chairs",
          "Sleepers + Daybeds",
          "Coffee Tables",
          "End + Side Tables",
          "Console Tables",
          "TV Stands",
          "Ottomans, Poufs + Stools",
          "Benches",
          "Bookcases + Bookshelves",
          "Quick-Ship Made-To-Order Upholstery",
        ],
      },
      {
        title: "ENTRYWAY + HALLWAY FURNITURE",
        links: [
          "BEDROOM",
          "Bedroom Collections",
          "Beds",
          "Dressers + Armoires",
          "Nightstands",
          "Bedroom Benches",
          "Sleepers + Daybeds",
          "Headboards",
          "Mattresses",
          "Bedroom Sets",
          "HOME OFFICE",
          "Home Office Collections",
          "Desks",
          "Office Chairs",
          "Bookcases + Bookshelves",
          "Filing Cabinets",
        ],
      },
      {
        title: "KITCHEN + DINING ROOM",
        links: [
          "Kitchen + Dining Collections",
          "Dining Tables",
          "Dining Chairs + Benches",
          "Kitchen + Dining Sets",
          "Bar Stools + Counter Stools",
          "Bar Carts",
          "Sideboards + Buffets",
          "China Cabinets",
          "ORGANIZATIONAL FURNITURE",
          "Modular Organization Collections",
          "Accent Cabinets",
          "Filing Cabinets",
          "Room Dividers",
          "Coat Racks + Hooks",
          "BABY + KIDS",
        ],
      },
      {
        title: "BEST-SELLING FURNITURE",
        links: [
          "QUICK-SHIP FURNITURE",
          "GET INSPIRED",
          "Shop by Style",
          "Made-to-Order Upholstery",
          "Shop Storage + Small Space Solutions",
          "Shop Sustainable Furniture",
        ],
      },
    ],
    promos: [
      { title: "Shop Custom Seating", image: "/images/cat_living_room.png" },
      { title: "Explore Bedroom Collections", image: "/images/cat_bedroom.png" },
    ],
  },
  Outdoor: {
    columns: [
      {
        title: "OUTDOOR LOUNGE FURNITURE",
        links: [
          "Outdoor Collections",
          "Outdoor Sofas + Sectionals",
          "Outdoor Furniture Sets",
          "Outdoor Chaise Lounges",
          "Outdoor Lounge Chairs",
          "Adirondack Chairs",
          "Outdoor Benches",
          "Outdoor Accent + Coffee Tables",
          "Porch Swings + Hammocks",
          "Outdoor Ottomans",
          "Lawn + Beach Chairs",
          "OUTDOOR ENTERTAINING",
          "Outdoor Tabletop",
          "Outdoor Cooking",
        ],
      },
      {
        title: "OUTDOOR DINING + BAR FURNITURE",
        links: [
          "All Outdoor Tables",
          "Outdoor Dining Tables",
          "Outdoor Bistro + Dining Sets",
          "Outdoor Dining Chairs",
          "Outdoor Bar Stools",
          "Patio Bar Sets",
          "OUTDOOR LIGHTING",
          "Outdoor Wall Lights",
          "Outdoor Hanging Lights",
          "String Lights",
        ],
      },
      {
        title: "PATIO DECOR + ACCESSORIES",
        links: [
          "Fire Pits",
          "Planters",
          "Outdoor Pillows",
          "Outdoor Rugs",
          "Doormats",
          "Mailboxes",
          "Furniture Covers",
          "Patio Umbrellas",
          "Outdoor Furniture Cushions",
          "Outdoor Lamps + Lanterns",
          "NEW IN OUTDOOR",
          "OUTDOOR COLLECTIONS",
          "QUICK-SHIP OUTDOOR",
        ],
      },
      {
        title: "SHOP BY MATERIAL",
        links: [
          "Natural Hardwoods",
          "Mixed Metal",
          "All-Weather",
          "Sunbrella Fabric",
          "Molded Plastic",
          "GET INSPIRED",
          "Making Outdoor Modern",
          "Small Space Patio Furniture",
          "Create an Outdoor Oasis",
        ],
      },
    ],
    promos: [
      { title: "Expert-Approved Outdoor Collections", image: "/images/cat_outdoor.png" },
      { title: "One-Stop Outdoor Shop: Sunny-Season Essentials", image: "/images/hero.png" },
    ],
  },
  Lighting: {
    columns: [
      {
        title: "CEILING LIGHTS",
        links: [
          "Chandeliers",
          "Pendants",
          "Flush Mounts",
          "Ceiling Fans",
          "WALL LIGHTS",
          "Wall Sconces",
          "Vanity Lighting",
          "TABLE + FLOOR LAMPS",
          "Table Lamps",
          "Floor Lamps",
          "LIGHT BULBS",
        ],
      },
      {
        title: "OUTDOOR LIGHTING",
        links: [
          "Outdoor Wall Lights",
          "Outdoor Hanging Lights",
          "String Lights",
          "NEW IN LIGHTING",
          "LIGHTING COLLECTIONS",
        ],
      },
      {
        title: "SHOP BY ROOM",
        links: [
          "Living Room",
          "Bedroom",
          "Kitchen + Dining",
          "Bathroom",
          "Home Office",
          "SHOP BY STYLE",
          "Scandinavian",
          "Mid-Century Modern",
          "Maximalist",
          "Modern Farmhouse",
          "Global",
          "Minimalist",
        ],
      },
    ],
    promos: [
      { title: "Top-Rated Lighting", image: "/images/cat_bedroom.png" },
      { title: "Curated Lighting Collections", image: "/images/cat_dining.png" },
    ],
  },
  "Decor + Pillows": {
    columns: [
      {
        title: "HOME DECOR",
        links: [
          "Vases",
          "Decorative Baskets + Boxes",
          "Decorative Trays, Plates + Bowls",
          "Decorative Objects",
          "Planters",
          "Picture Frames",
          "Tabletop Games",
          "ORGANIZATIONAL DECOR",
          "Decorative Baskets + Boxes",
          "Decorative Trays, Plates + Bowls",
          "Wall Shelves",
          "Jewelry Organizers",
          "Coat Racks + Hooks",
          "Bookcases + Bookshelves",
          "PET ACCESSORIES",
        ],
      },
      {
        title: "PILLOWS + THROWS",
        links: [
          "Throw Pillows",
          "Pillow Covers",
          "Blankets + Throws",
          "Poufs",
          "Outdoor Pillows",
          "BOTANICALS",
          "Planters",
          "Faux Flowers",
          "Faux Plants + Trees",
          "Live Plants + Trees",
          "CANDLELIGHT + FRAGRANCES",
          "Candle Holders",
          "Candles",
          "NEW IN DECOR + ART",
        ],
      },
      {
        title: "SHOP BY STYLE",
        links: ["Scandinavian", "Mid-Century Modern", "Modern Farmhouse", "Maximalist", "Minimalist", "Global"],
      },
    ],
    promos: [{ title: "Fresh Decor for Easy Living", image: "/images/cat_dining.png" }],
  },
  "Wall Decor + Mirrors": {
    columns: [
      {
        title: "WALL ART",
        links: [
          "All Wall Art",
          "Framed Wall Art",
          "Canvas Wall Art",
          "Photography",
          "Paintings",
          "Abstract Art",
          "Oversized Wall Art",
          "Wall Art Sets",
          "WALLPAPER",
        ],
      },
      {
        title: "WALL DECOR",
        links: [
          "Wall Shelves",
          "Wall Accents",
          "Wall Clocks",
          "Wall Hangings",
          "Picture Frames",
          "CURTAINS + DRAPES",
          "MIRRORS",
          "All Mirrors",
          "Floor + Full Length Mirrors",
          "Wall Mirrors",
          "Vanity Mirrors",
          "FLOOR + WALL TILE",
        ],
      },
      {
        title: "NEW IN WALL ART",
        links: [],
      },
    ],
    promos: [
      { title: "Frame Your Space: Modern Wall Decor", image: "/images/cat_bedroom.png" },
      { title: "Modern to Reflect On - Shop Mirrors", image: "/images/cat_living_room.png" },
    ],
  },
  Rugs: {
    columns: [
      {
        title: "ALL RUGS",
        links: [
          "Area Rugs",
          "Indoor Rugs",
          "Outdoor Rugs",
          "Runner Rugs",
          "RUG PADS + MATS",
          "Doormats",
          "Rug Pads",
          "Bath Mats",
          "RUG COLLECTIONS",
        ],
      },
      {
        title: "NEW IN RUGS",
        links: [
          "RUGS BY SIZE",
          "4' x 6'",
          "5' x 8'",
          "6' x 9'",
          "8' x 10'",
          "9' x 12'",
          "10' x 14'",
          "RUGS BY ROOM",
          "Living Room",
          "Bedroom",
          "Home Office",
          "Entryway",
          "Hallway Runners",
        ],
      },
      {
        title: "SHOP BY MATERIAL",
        links: ["Wool Rugs", "Natural + Jute Rugs", "Performance + Washable Rugs", "Viscose Rugs"],
      },
    ],
    promos: [
      { title: "Now Unrolling: New Modern Rugs", image: "/images/cat_dining.png" },
      { title: "Top-Rated Rugs", image: "/images/cat_bedroom.png" },
    ],
  },
  Bedding: {
    columns: [
      {
        title: "ALL BEDDING",
        links: [
          "Bedding Sets",
          "Duvet Covers + Sets",
          "Quilts + Coverlets",
          "Sheets + Pillowcases",
          "Blankets + Throws",
          "THROW PILLOWS",
        ],
      },
      {
        title: "BEDDING ESSENTIALS",
        links: ["Duvet Inserts", "Bed Pillows", "Mattress Toppers + Pads", "Mattresses", "NEW IN BEDDING"],
      },
      {
        title: "SHOP BY FABRIC",
        links: [
          "Linen",
          "Organic Cotton",
          "Cotton Percale",
          "Cotton Sateen",
          "Cotton Waffle",
          "SHOP BY COLOR",
          "Classic White",
          "Charcoal Gray",
          "Earthy Greens",
          "Cool Blues",
          "Warm Hues",
        ],
      },
    ],
    promos: [
      { title: "Sweet Dreams Start With Better Bedding", image: "/images/cat_bedroom.png" },
      { title: "New Bedding Arrivals", image: "/images/cat_living_room.png" },
    ],
  },
  Bath: {
    columns: [
      {
        title: "BATH LINENS + ACCESSORIES",
        links: [
          "Countertop Bathroom Accessories",
          "Bath Towels",
          "Hand Towels",
          "Bath Mats",
          "Shower Curtains",
          "Trash Cans",
          "BATHROOM STORAGE + ORGANIZATION",
        ],
      },
      {
        title: "BATHROOM RENOVATION",
        links: [
          "Vanity Collections",
          "Bathroom Vanities",
          "Medicine Cabinets",
          "Vanity Mirrors",
          "Floor + Wall Tile",
          "Cabinet Knobs + Pulls",
          "BATH COLLECTIONS",
        ],
      },
      {
        title: "BATHROOM FIXTURES + HARDWARE",
        links: [
          "Bathroom Sinks + Faucets",
          "Tubs + Tub Faucets",
          "Shower + Tub Doors",
          "Shower Heads",
          "Toilets",
          "Toilet Paper Holders",
          "Vanity Lighting",
          "NEW IN BATH",
        ],
      },
    ],
    promos: [
      { title: "Modern Vanities to Refresh the Bathroom", image: "/images/cat_dining.png" },
      { title: "One-Stop Reno Shop", image: "/images/cat_living_room.png" },
    ],
  },
  "Kitchen + Tabletop": {
    columns: [
      {
        title: "DINNERWARE + FLATWARE",
        links: [
          "Dinnerware Sets + Place Settings",
          "Flatware Sets",
          "Dining Bowls",
          "Plates",
          "SERVEWARE",
          "Serving Bowls",
          "Serving Trays + Platters",
          "Serving Utensils",
          "Pitchers + Carafes",
          "Cheese + Bread Boards",
          "Creamers + Shakers",
          "KITCHEN COUNTERTOP ACCESSORIES",
          "SMALL KITCHEN APPLIANCES",
          "Stovetop & Electric Tea Kettles",
          "Coffee Makers",
        ],
      },
      {
        title: "DRINKWARE + BAR",
        links: [
          "All Glassware + Barware",
          "Drinking Glasses",
          "Cocktail Glasses",
          "Mugs + Teacups",
          "Wine + Champagne Glasses",
          "Bar + Wine Tools",
          "Ice Buckets + Tubs",
          "Coasters",
          "TABLE + KITCHEN LINENS",
          "Table Cloths + Runners",
          "Napkins, Placemats + Chargers",
          "Napkin Rings + Place Card Holders",
          "Kitchen Towels",
          "OUTDOOR ENTERTAINING",
          "KITCHEN + DINING COLLECTIONS",
        ],
      },
      {
        title: "KITCHEN FIXTURES + HARDWARE",
        links: [
          "Kitchen Sinks",
          "Kitchen Faucets",
          "Cabinet Knobs + Pulls",
          "Floor + Wall Tile",
          "KITCHEN + DINING ROOM FURNITURE",
          "Kitchen + Dining Collections",
          "Dining Tables",
          "Dining Chairs + Benches",
          "Kitchen + Dining Sets",
          "Bar Stools + Counter Stools",
          "Bar + Bar Carts",
          "Sideboards + Buffets",
          "China Cabinets",
        ],
      },
      {
        title: "NEW IN TABLETOP",
        links: ["NEW IN KITCHEN & DINING", "QUICK-SHIP KITCHEN + DINING"],
      },
    ],
    promos: [
      { title: "Brand to Know: Caraway", image: "/images/cat_dining.png" },
      { title: "Expert-Approved Dining Collections", image: "/images/cat_outdoor.png" },
    ],
  },
  Storage: {
    columns: [
      {
        title: "STORAGE BY PRODUCT",
        links: [
          "Storage Cabinets",
          "Bookcases + Bookshelves",
          "Wall Shelves",
          "Coat Racks + Hooks",
          "Decorative Baskets + Boxes",
          "Room Dividers",
        ],
      },
      {
        title: "STORAGE BY ROOM",
        links: [
          "Living Room",
          "Entryway",
          "Bedroom + Closet",
          "Home Office",
          "Kitchen",
          "Bathroom + Laundry",
          "QUICK-SHIP STORAGE SOLUTIONS",
        ],
      },
      {
        title: "HOME OFFICE COLLECTIONS",
        links: [
          "MODULAR ORGANIZATION COLLECTIONS",
          "GET INSPIRED",
          "Small Space Storage Solutions",
          "Smart + Streamlined Organization",
          "Modern Hav: To: Refresh Your Office",
        ],
      },
    ],
    promos: [
      { title: "★★★★★ Shop Top-Rated Modern Storage", image: "/images/cat_living_room.png" },
      { title: "Organize Every Space - Shop Storage Essentials", image: "/images/cat_bedroom.png" },
    ],
  },
  "Baby + Kids": {
    columns: [
      {
        title: "BABY FURNITURE",
        links: [
          "Gliders",
          "Cribs",
          "Changing Tables + Toppers",
          "Toddler Bed Rails",
          "Nursery Furniture Sets",
          "NURSERY BEDDING + MATTRESSES",
          "Crib Sheets",
          "Cradle + Bassinet Bedding",
          "Baby Blankets",
          "Crib Mattresses",
        ],
      },
      {
        title: "KIDS FURNITURE",
        links: [
          "Kids Beds",
          "Kids Dressers",
          "Kids Tables and Sets",
          "Kids Nightstands",
          "KIDS DECOR + PLAYROOM",
          "Kids Rugs",
          "Kids Wall Art",
          "Decorative Baskets",
          "Play Kitchen Sets",
          "BABY + KIDS RUGS",
        ],
      },
      {
        title: "NEW IN BABY + KIDS",
        links: ["QUICK-SHIP BABY + KIDS FURNITURE"],
      },
    ],
    promos: [
      { title: "Babies, Kids, Teens - Shop Youth Bedroom", image: "/images/cat_bedroom.png" },
      { title: "Emily Henderson's Youth Bedroom Makeover", image: "/images/cat_living_room.png" },
    ],
  },
};
