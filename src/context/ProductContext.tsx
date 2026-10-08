import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Retailer, AffiliateClick, RetailerOffer } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { CATEGORIES } from '../data/categories';
import { DEFAULT_RETAILERS } from '../data/retailers';

interface RedirectInfo {
  product: Product;
  retailer: RetailerOffer;
}

export type AppCurrency = 'AED' | 'SAR';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  retailers: Retailer[];
  affiliateClicks: AffiliateClick[];
  wishlist: string[];
  compareList: string[];
  currency: AppCurrency;
  setCurrency: (c: AppCurrency) => void;
  formatPrice: (amount: number, options?: { showCode?: boolean }) => string;
  convertPrice: (amount: number, targetCurrency?: AppCurrency) => number;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearCompare: () => void;
  recordAffiliateClick: (product: Product, retailer: RetailerOffer) => void;
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addRetailer: (retailer: Omit<Retailer, 'id'>) => Retailer;
  updateRetailer: (id: string, updates: Partial<Retailer>) => void;
  deleteRetailer: (id: string) => void;
  resetToDefaults: () => void;
  activeRedirect: RedirectInfo | null;
  setActiveRedirect: (info: RedirectInfo | null) => void;
  siteLogoUrl: string;
  setSiteLogoUrl: (url: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'fmt_products_v7_compare_aed_sar',
  CATEGORIES: 'fmt_categories_v7_compare_aed_sar',
  RETAILERS: 'fmt_retailers_v7_compare_aed_sar',
  CLICKS: 'fmt_clicks_v7_compare_aed_sar',
  WISHLIST: 'fmt_wishlist_v7_compare_aed_sar',
  COMPARE: 'fmt_compare_v7_compare_aed_sar',
  CURRENCY: 'fmt_currency_v7_compare_aed_sar',
  LOGO: 'fmt_site_logo_v7_clean_white',
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteLogoUrl, setSiteLogoUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LOGO) || '';
    } catch {
      return '';
    }
  });

  const setSiteLogoUrl = (url: string) => {
    setSiteLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEYS.LOGO, url);
      } else {
        localStorage.removeItem(STORAGE_KEYS.LOGO);
      }
    } catch {
      // storage unavailable
    }
  };

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Verify products have retailers and prices; if empty, initialize with rich INITIAL_PRODUCTS
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some(p => p.retailers && p.retailers.length > 0)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return CATEGORIES;
  });

  const [retailers, setRetailers] = useState<Retailer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RETAILERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_RETAILERS;
  });

  const [affiliateClicks, setAffiliateClicks] = useState<AffiliateClick[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLICKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPARE);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [currency, setCurrencyState] = useState<AppCurrency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (saved === 'SAR' || saved === 'AED') return saved;
    } catch {
      // fallback
    }
    return 'AED';
  });

  const [activeRedirect, setActiveRedirect] = useState<RedirectInfo | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RETAILERS, JSON.stringify(retailers));
  }, [retailers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLICKS, JSON.stringify(affiliateClicks));
  }, [affiliateClicks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  const setCurrency = (c: AppCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, c);
    } catch {
      // storage unavailable
    }
  };

  /**
   * 1 AED = 1.021 SAR (Official GCC Pegged Conversion Rate)
   */
  const convertPrice = (amount: number, targetCurrency: AppCurrency = currency): number => {
    if (!amount || amount <= 0) return 0;
    if (targetCurrency === 'SAR') {
      return Math.round(amount * 1.021);
    }
    return amount;
  };

  const formatPrice = (amount: number, options?: { showCode?: boolean }): string => {
    if (!amount || amount <= 0) {
      return 'Price: Checking Stores';
    }
    const showCode = options?.showCode ?? true;
    const finalAmount = convertPrice(amount, currency);
    const formatted = finalAmount.toLocaleString();

    if (currency === 'SAR') {
      return showCode ? `SAR ${formatted}` : formatted;
    }
    return showCode ? `AED ${formatted}` : formatted;
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `fmt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();
    
    // Compute lowest active retailer price
    const lowestPrice = prodData.retailers.length > 0
      ? Math.min(...prodData.retailers.map(r => r.price))
      : prodData.price;

    const newProd: Product = {
      ...prodData,
      id,
      price: lowestPrice,
      createdAt: now,
      updatedAt: now,
    };

    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const updated = { ...p, ...updates, updatedAt: new Date().toISOString() };
        if (updated.retailers && updated.retailers.length > 0) {
          updated.price = Math.min(...updated.retailers.map(r => r.price));
        }
        return updated;
      }
      return p;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setWishlist(prev => prev.filter(item => item !== id));
    setCompareList(prev => prev.filter(item => item !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        // Replace oldest or cap at 4
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
  };

  const isCompared = (productId: string) => compareList.includes(productId);

  const clearCompare = () => setCompareList([]);

  const recordAffiliateClick = (product: Product, retailer: RetailerOffer) => {
    const newClick: AffiliateClick = {
      id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: product.id,
      productName: product.name,
      retailerName: retailer.retailerName,
      retailerId: retailer.retailerId,
      targetUrl: retailer.affiliateUrl,
      price: retailer.price,
      timestamp: new Date().toISOString()
    };
    setAffiliateClicks(prev => [newClick, ...prev.slice(0, 999)]); // keep recent 1000
    // Trigger interstitial redirect modal
    setActiveRedirect({ product, retailer });
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const id = catData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat: Category = { ...catData, id };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const addRetailer = (retData: Omit<Retailer, 'id'>) => {
    const id = retData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newRet: Retailer = { ...retData, id };
    setRetailers(prev => [...prev, newRet]);
    return newRet;
  };

  const updateRetailer = (id: string, updates: Partial<Retailer>) => {
    setRetailers(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRetailer = (id: string) => {
    setRetailers(prev => prev.filter(r => r.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(CATEGORIES);
    setRetailers(DEFAULT_RETAILERS);
    setAffiliateClicks([]);
    setWishlist([]);
    setCompareList([]);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.RETAILERS);
    localStorage.removeItem(STORAGE_KEYS.CLICKS);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.COMPARE);
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      retailers,
      affiliateClicks,
      wishlist,
      compareList,
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleWishlist,
      isWishlisted,
      toggleCompare,
      removeFromCompare,
      isCompared,
      clearCompare,
      recordAffiliateClick,
      addCategory,
      updateCategory,
      deleteCategory,
      addRetailer,
      updateRetailer,
      deleteRetailer,
      resetToDefaults,
      activeRedirect,
      setActiveRedirect,
      siteLogoUrl,
      setSiteLogoUrl,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
