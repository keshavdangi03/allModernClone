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
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "Seasonal Catalog", href: "/seasonal-catalog" },
  { label: "Shop by Style", href: "/shop-by-style" },
  { label: "Free Design Services", href: "/design-services" },
];

export const departmentNavItems: DepartmentNavItem[] = [
  { label: "New", href: "/new" },
  { label: "Furniture", href: "/furniture" },
  { label: "Outdoor", href: "/outdoor" },
  { label: "Lighting", href: "/lighting" },
  { label: "Decor + Pillows", href: "/decor-pillows" },
  { label: "Wall Decor + Mirrors", href: "/wall-decor" },
  { label: "Rugs", href: "/rugs" },
  { label: "Bedding", href: "/bedding" },
  { label: "Bath", href: "/bath" },
  { label: "Kitchen + Tabletop", href: "/kitchen-tabletop" },
  { label: "Storage", href: "/storage" },
  { label: "Baby + Kids", href: "/baby-kids" },
  { label: "Sale", href: "/sale" },
];

export const categoryMenus: Record<string, { image: string; badge: string; description?: string; sections: MenuGroup[] }> = {
  New: {
    image: "/images/cat_outdoor.png",
    badge: "New Arrivals",
    description: "Explore our latest arrivals in modern furniture, vibrant home decor, dynamic lighting, and stylish rugs to keep your space fresh and contemporary.",
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
    description: `Infuse personality into your home with modern furniture. Your furniture should reflect your style. From the living room to the patio, find the modern furniture that creates your dream home inside and out. Whether your style tends to be more industrial or bohemian, bring your vision to life with modern and contemporary furniture:

Modern Living Room Furniture: Sofas, TV stands, coffee tables and recliners are all crucial pieces of modern living room furniture. Whether you're looking to upgrade an old sofa or are redesigning the entire space, browse hundreds of products across multiple styles to find the pieces that feel true to you. Not sure which styles or materials fit best in your home? There are a few quick reference points that can help you decide. For instance, including a lot of wood-based furniture will give your living room a farmhouse look. The tv stand and coffee table are a couple of quick ways to infuse that rustic look into your modern living room. Metal-based stands and bookcases can help achieve an industrial look or minimalist vibe. Whichever pieces you choose, your modern living room furniture should reflect your personal style.

Contemporary Office Furniture: Your home office should be the most productive room in your house. Contemporary office furniture brings a creative aesthetic to this space that inspires your best work. From the desk to a bookcase, find modern office furniture for any style. An underrated decor item and functional piece of contemporary office furniture is a desktop organizer. Organizers are a great way to add hints of style to the desk area, while keeping the space clean. Brighten up your desk with a gold letter box, or keep the space sleek with a black file sorter. If you're looking to upgrade more than just a few pieces of decor in the home office, the desk and office chairs are typically the first items that come to mind. From a modest writing desk to a more robust computer desk, choose the one that makes the most sense for your space. If you have a more confined office area and only work there a few times throughout the week, a smaller writing desk may be the choice for you. If you work from home often, a computer desk may be a more effective piece of furniture for you.

Modern Bedroom Furniture: There is nothing quite like retreating to your bedroom after a long day. Make this space the most relaxing room in your home with modern bedroom furniture. Whether you're changing up your style or just want to replace a few pieces, find modern bedroom furniture that speaks to you. A modern metal-based bed frame will bring a minimalist, industrial vibe to your bedroom. Upholstered headboards add a hint of elegance to this space, while maintaining a contemporary look. Whichever style you gravitate towards, upgrade your home with modern bedroom furniture.

Modern furniture adds elegance to your home. Whether you're moving into a new house or simply looking to upgrade a few pieces, shop hundreds of products to find the furniture that fits your style.`,
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
    description: "Modern outdoor furniture gives you the ability to truly enjoy the spring, summer, and fall. You can celebrate the warm months out on your patio with friends, family, and guests if you have the right patio furniture. Modern outdoor patio furniture combines your love for the great outdoors, entertaining, and modern design in one simple and sophisticated package. Modern outdoor furniture, like tables, chairs, chaise lounges, and sofas are a great way to relax in style and comfort. If you have a pool, then you can place outdoor lounge chairs around the perimeter so that you can cool off whenever you get too warm while sunbathing. The best modern outdoor furniture combines high-quality materials and simple, sophisticated design to create a modern patio where you'll be proud to entertain your guests.",
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
    description: `Every home needs lighting options for different times of the day. The best lighting gives you the ability to change the intensity based on the mood you want to cultivate in your home. If you're passionate about modern d&eacute;cor, then chances are that you'll also want to find modern &amp; contemporary lighting for your entire home. There is a variety of contemporary lights, including room lighting, lighting fixtures, and location lighting. Modern &amp; contemporary lighting has features that are characteristic of modern design, including clean, geometric lines and perfectly shaped circles and ovals. The best modern &amp; contemporary lighting enhances the rest of your d&eacute;cor and helps you establish a cohesive look across your home.

Modern &amp; contemporary lighting best for a bedroom ranges from ceiling lights to lamps for your bedside tables. Your bedroom most likely needs different lighting sources depending on the time of day. In the morning, most people get ready for the day in their bedrooms. Having a proper ceiling light like a flush mount or a ceiling fan, will provide the perfect amount of light so you're not stuck getting dressed in the dark. At the end of the day, however, chances are you'll want to read or relax before bed. You can incorporate modern bedside lamps to provide dim lighting that won't strain your eyes before bed, allowing for a good night's sleep. If you want to create a dramatic and decorative statement in your bedroom, then modern wall sconces might be the perfect addition.

Aside from bedroom lighting, you'll also want to make sure that you have appropriate lighting for your dining room and kitchen. Modern &amp; contemporary lighting best suited for the kitchen ranges from track lighting to recessed lighting. The best modern kitchen light fixtures emit enough light so that you can see the food you're preparing, and cook it to perfection. Modern pendant light fixtures are popular in homes where the kitchen gracefully spills into the dining area. Try adding some pendants above your kitchen island to add some flair into your open-concept kitchen, and hang a sputnik chandelier above your dining room table for a bold and modern look. This will make for the perfect space for you to relax and pop open a bottle of wine with your guests.`,
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
    description: "Nothing dresses up your home quite like decor and pillows. If your space is filled with dark and dull furniture, consider adding some colorful throw pillows to brighten up the look! This is a quick fix that can make a big difference, and really impress your guests. Another simple decoration tip is to add eye-catching geometric prints to add some more life into your room. Bringing new decor and pillows into a room, can transform your space and make it feel like a brand new room. So if you're looking to make some changes to liven up your home or apartment without breaking the bank, shop our wide variety of decor and pillows to create a space you'll love.",
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
    description: "Enhance your walls with modern mirrors, shelves, wall art, and accent decor to make your room feel unique and custom-tailored to your lifestyle.",
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
    description: "A modern rug is an essential accent piece for any living room, bedroom or dining room. Contemporary rugs can help define the theme and color palette of a room, protect floors, and absorb the noise of day to day life. A modern rug can protect your floors from everyday wear and tear, and support your feet with comfortable padding, not chilly hardwood or tile flooring. Designer area rugs can also add a sophisticated splash of color and pattern to your bedroom or living room. When shopping for a rug, make sure to consider the size of the rug (5 x 8 is the most common rug size), the weave and material of the rug, and most importantly, its design. If you're looking to complement a modern aesthetic, look for a modern rug with bold patterns, like chevron or stripes, or abstract designs that make a statement.",
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
    description: "Class, luxury and comfort. Whether looking to complete your space with the perfect modern and contemporary bedding set with a decorative modern throw pillow or looking to add modern flair with modern bedding essentials, Allmodern offers a great variety in stylish and sophisticated bedding + bath pieces to suit your every need. From mattresses and sheets, duvets and coverlets to modern bedroom accents and decorative throw pillows, let us help you perfect your modern bedding + bath selection. Modern bedding + bath all in one place at an amazing price!",
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
    description: "The bath section typically refers to a product category focused on bath and body care items, such as lotions, soaps, bath bombs, and fragrances, or bathroom fixtures and decor, including tubs, vanities, and hardware.",
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
    description: "Outfit your kitchen and dining space with modern dinnerware, flatware, drinkware, and kitchen fixtures built for the modern home.",
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
    description: "Get organized with modern storage solutions for every room. Shop bookcases, dressers, bins, and wall shelves designed to keep your home tidy and beautiful.",
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
    description: "Design a fun, creative room with modern baby & kids furniture pieces. From contemporary cribs to bunk beds, choose from hundreds of different colors and styles that help create the ultimate modern baby & kids bedroom. Bookcases, rocking chairs and even dressers can all help organize the space while showing your own personal style.",
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
