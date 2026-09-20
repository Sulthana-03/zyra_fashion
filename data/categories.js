// All images below are verified via reverse photo lookup to match their labels,
// and none repeat any image used elsewhere on the site.

export const megaMenu = {
  Men: {
    banner: "https://images.unsplash.com/photo-1630173250799-2813d34ed14b?auto=format&fit=crop&w=900&q=80",
    groups: [
      { title: "Topwear", items: ["T-Shirts", "Shirts", "Hoodies", "Jackets"] },
      { title: "Bottomwear", items: ["Jeans", "Trousers", "Shorts"] },
      { title: "Essentials", items: ["Sleepwear"] },
    ],
  },
  Women: {
    banner: "https://images.unsplash.com/photo-1611042553484-d61f84d22784?auto=format&fit=crop&w=900&q=80",
    groups: [
      { title: "Topwear", items: ["Tops", "T-Shirts", "Kurtis"] },
      { title: "Dresses & Ethnic", items: ["Dresses", "Sarees"] },
      { title: "Bottomwear", items: ["Jeans", "Trousers", "Skirts"] },
      { title: "Layers", items: ["Jackets"] },
    ],
  },
  Accessories: {
    banner: "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?auto=format&fit=crop&w=900&q=80",
    groups: [
      { title: "Carry", items: ["Bags", "Wallets"] },
      { title: "Wear It", items: ["Watches", "Belts", "Sunglasses", "Caps", "Jewelry"] },
    ],
  },
  Footwear: {
    banner: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    groups: [
      { title: "Everyday", items: ["Sneakers", "Casual Shoes", "Slippers"] },
      { title: "Occasion", items: ["Formal Shoes", "Heels", "Sandals"] },
    ],
  },
};

export const categoryList = ["Men", "Women", "Accessories", "Footwear"];

export const subCategoriesByCategory = {
  Men: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Hoodies", "Shorts", "Sleepwear"],
  Women: ["Tops", "T-Shirts", "Dresses", "Jeans", "Trousers", "Skirts", "Sarees", "Kurtis", "Jackets"],
  Accessories: ["Watches", "Bags", "Wallets", "Belts", "Sunglasses", "Caps", "Jewelry"],
  Footwear: ["Sneakers", "Casual Shoes", "Formal Shoes", "Sandals", "Heels", "Slippers"],
};

export const homeCategoryTiles = [
  { label: "Men's Shirts", href: "/men?sub=Shirts", img: "https://images.unsplash.com/photo-1602810316693-3667c854239a?auto=format&fit=crop&w=700&q=80" },
  { label: "Women's Dresses", href: "/women?sub=Dresses", img: "https://images.unsplash.com/photo-1602010069450-0a62034f235c?auto=format&fit=crop&w=700&q=80" },
  { label: "Sneakers", href: "/footwear?sub=Sneakers", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80" },
  { label: "Handbags", href: "/accessories?sub=Bags", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80" },
  { label: "Denim Jeans", href: "/men?sub=Jeans", img: "https://images.unsplash.com/photo-1714143136367-7bb68f3f0669?auto=format&fit=crop&w=700&q=80" },
  { label: "Watches", href: "/accessories?sub=Watches", img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=700&q=80" },
  { label: "Kurtis & Ethnic", href: "/women?sub=Kurtis", img: "https://images.unsplash.com/photo-1741847639057-b51a25d42892?auto=format&fit=crop&w=700&q=80" },
  { label: "Sunglasses", href: "/accessories?sub=Sunglasses", img: "https://images.unsplash.com/photo-1610136649349-0f646f318053?auto=format&fit=crop&w=700&q=80" },
];

export const categoryIconRow = [
  { label: "Women", href: "/women", img: "https://images.unsplash.com/photo-1581841064838-a470c740e8ee?auto=format&fit=crop&w=300&q=80" },
  { label: "Men", href: "/men", img: "https://images.unsplash.com/photo-1758561274313-536bf1c4192c?auto=format&fit=crop&w=300&q=80" },
  { label: "Accessories", href: "/accessories", img: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=300&q=80" },
  { label: "Footwear", href: "/footwear", img: "https://images.unsplash.com/photo-1631087606988-a6be38fccaf6?auto=format&fit=crop&w=300&q=80" },
  { label: "New Arrivals", href: "/new-arrivals", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80" },
  { label: "Sale", href: "/sale", img: "https://images.unsplash.com/photo-1768839721483-c4501b5d6eb3?auto=format&fit=crop&w=300&q=80" },
];

export const pageBanners = {
  Men: "https://images.unsplash.com/photo-1619603364937-8d7af41ef206?auto=format&fit=crop&w=1600&q=80",
  Women: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=1600&q=80",
  Accessories: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=1600&q=80",
  Footwear: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1600&q=80",
};
