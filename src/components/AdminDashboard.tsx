import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  Package, 
  Tag, 
  Building2, 
  Layers, 
  MousePointerClick, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  X, 
  ExternalLink, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  AlertCircle,
  Flame,
  ArrowRight,
  Sparkles,
  Link2,
  ImagePlus,
  LogOut
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminLogin } from './AdminLogin';
import { Product, RetailerOffer, Category, Retailer, ViewMode } from '../types';
import { FmtLogo } from './FmtLogo';
import { CategoryAnimatedPicture } from './CategoryAnimatedPicture';
import { CurrencyLogo, PriceWithLogo } from './CurrencyLogo';

interface AdminDashboardProps {
  onNavigate: (view: ViewMode, param?: string) => void;
}

type AdminTab = 'overview' | 'products' | 'categories' | 'retailers' | 'deals' | 'analytics' | 'branding';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { isAdminAuthenticated, adminUser, logout } = useAdminAuth();
  const { 
    products, 
    categories, 
    retailers, 
    affiliateClicks, 
    formatPrice, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    addRetailer, 
    updateRetailer, 
    deleteRetailer, 
    resetToDefaults,
    siteLogoUrl,
    setSiteLogoUrl
  } = useProducts();

  // If not authenticated, force AdminLogin screen
  if (!isAdminAuthenticated) {
    return <AdminLogin onNavigate={onNavigate} />;
  }

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [productSearch, setProductSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // Logo settings state
  const [customLogoInput, setCustomLogoInput] = useState(siteLogoUrl || '');
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Modal State for Add / Edit Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategoryId, setFormCategoryId] = useState(categories[0]?.id || 'smartphones');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formModelNumber, setFormModelNumber] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formShortDescription, setFormShortDescription] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formIsDeal, setFormIsDeal] = useState(false);
  const [formDealBadge, setFormDealBadge] = useState('');
  const [formDealExpiry, setFormDealExpiry] = useState('');
  const [formRating, setFormRating] = useState(4.8);
  const [formReviewCount, setFormReviewCount] = useState(0);
  const [formPros, setFormPros] = useState<string[]>(['Class-leading build quality', 'Reliable performance']);
  const [formCons, setFormCons] = useState<string[]>([]);
  const [formVerdict, setFormVerdict] = useState('');
  const [formWhoItsFor, setFormWhoItsFor] = useState('');

  // Images state
  const [formImages, setFormImages] = useState<string[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Retailers / Affiliate Offers state
  const [formRetailers, setFormRetailers] = useState<RetailerOffer[]>([]);

  // Specs state
  const [formSpecs, setFormSpecs] = useState<Array<{ key: string; value: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stats
  const totalProducts = products.length;
  const publishedProducts = products.filter(p => p.status === 'published').length;
  const draftProducts = products.filter(p => p.status === 'draft').length;
  const activeDeals = products.filter(p => p.isDeal).length;
  const totalAffiliateLinks = products.reduce((acc, p) => acc + p.retailers.length, 0);
  const totalClicks = affiliateClicks.length;

  const showNotice = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Category spec template helper
  const loadCategorySpecPresets = (catId: string) => {
    if (catId === 'smartphones') {
      setFormSpecs([
        { key: 'Display', value: '6.7-inch OLED 120Hz' },
        { key: 'Processor', value: 'Flagship Processor' },
        { key: 'RAM & Storage', value: '12GB RAM, 256GB' },
        { key: 'Camera', value: '50MP Main + Ultra-Wide' },
        { key: 'Battery & Charging', value: '5000 mAh Fast Charge' }
      ]);
    } else if (catId === 'audio') {
      setFormSpecs([
        { key: 'Driver', value: '11mm Custom Drivers' },
        { key: 'Active Noise Cancellation', value: 'Smart Hybrid ANC' },
        { key: 'Battery Life', value: 'Up to 30 hours with case' },
        { key: 'Bluetooth & Codecs', value: 'Bluetooth 5.3, LDAC, AAC' }
      ]);
    } else if (catId === 'computers') {
      setFormSpecs([
        { key: 'Processor', value: 'High Performance M-Series / Core Ultra' },
        { key: 'Memory & Storage', value: '16GB RAM, 512GB SSD' },
        { key: 'Display', value: '14-inch Liquid Retina / OLED' },
        { key: 'Battery', value: 'Up to 18 hours' }
      ]);
    } else if (catId === 'tvs') {
      setFormSpecs([
        { key: 'Screen Size & Panel', value: '65-inch 4K OLED / QD-OLED' },
        { key: 'Refresh Rate', value: '120Hz / 144Hz VRR' },
        { key: 'HDR Support', value: 'Dolby Vision, HDR10+' }
      ]);
    } else {
      setFormSpecs([
        { key: 'Key Feature 1', value: 'To be configured' },
        { key: 'Key Feature 2', value: 'To be configured' },
        { key: 'Warranty & Origin', value: 'Official Retail Partner Warranty' }
      ]);
    }
  };

  const openAddProductModal = (presetCategoryId?: string) => {
    setEditingProductId(null);
    setFormError(null);
    const targetCatId = presetCategoryId || categories[0]?.id || 'smartphones';
    const targetCat = categories.find(c => c.id === targetCatId);
    
    setFormName('');
    setFormBrand('');
    setFormCategoryId(targetCatId);
    setFormSubcategory(targetCat?.subcategories[0] || 'General');
    setFormModelNumber('');
    setFormSku('');
    setFormShortDescription('');
    setFormDescription('');
    setFormTags('technology, consumer-electronics');
    setFormStatus('published');
    setFormIsDeal(false);
    setFormDealBadge('');
    setFormDealExpiry('');
    setFormRating(4.8);
    setFormReviewCount(0);
    setFormPros(['Official retailer guarantee', 'Class-leading performance']);
    setFormCons([]);
    setFormVerdict('');
    setFormWhoItsFor('');
    
    // Images: start completely empty for user to provide
    setFormImages([]);
    setPrimaryImageIndex(0);
    loadCategorySpecPresets(targetCatId);

    // Retailer offers: start completely empty for user to provide
    setFormRetailers([]);

    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setFormError(null);
    setFormName(product.name);
    setFormBrand(product.brand);
    setFormCategoryId(product.categoryId);
    setFormSubcategory(product.subcategory);
    setFormModelNumber(product.modelNumber);
    setFormSku(product.sku);
    setFormShortDescription(product.shortDescription);
    setFormDescription(product.description);
    setFormTags(product.tags.join(', '));
    setFormStatus(product.status);
    setFormIsDeal(product.isDeal);
    setFormDealBadge(product.dealBadge || '');
    setFormDealExpiry(product.dealExpiry || '');
    setFormRating(product.rating);
    setFormReviewCount(product.reviewCount);
    setFormPros(product.pros || []);
    setFormCons(product.cons || []);
    setFormVerdict(product.verdict || '');
    setFormWhoItsFor(product.whoItsFor || '');
    
    const allImgs = [product.primaryImage, ...(product.galleryImages || [])].filter(Boolean);
    setFormImages(allImgs);
    setPrimaryImageIndex(0);

    setFormRetailers(product.retailers || []);
    setFormSpecs(
      Object.entries(product.specifications || {}).map(([key, value]) => ({ key, value }))
    );

    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim() || !formBrand.trim()) {
      setFormError('Please fill out Product Name and Brand.');
      return;
    }

    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const primaryImg = formImages[primaryImageIndex] || formImages[0] || '';
    const galleryImgs = formImages.filter((_, idx) => idx !== primaryImageIndex);

    const specObj: Record<string, string> = {};
    formSpecs.forEach(s => {
      if (s.key.trim()) specObj[s.key.trim()] = s.value;
    });

    const lowestPrice = formRetailers.length > 0 
      ? Math.min(...formRetailers.map(r => r.price)) 
      : 0;

    const originalPrice = formRetailers[0]?.originalPrice || undefined;
    const discount = originalPrice && originalPrice > lowestPrice 
      ? Math.round(((originalPrice - lowestPrice) / originalPrice) * 100) 
      : undefined;

    const prodPayload = {
      slug: slug || `prod-${Date.now()}`,
      name: formName,
      brand: formBrand,
      categoryId: formCategoryId,
      subcategory: formSubcategory || 'General',
      description: formDescription,
      shortDescription: formShortDescription || formDescription.slice(0, 120),
      modelNumber: formModelNumber,
      sku: formSku,
      tags: formTags.split(',').map(t => t.trim()).filter(Boolean),
      primaryImage: primaryImg,
      galleryImages: galleryImgs,
      price: lowestPrice,
      originalPrice,
      discount,
      rating: formRating,
      reviewCount: formReviewCount,
      specifications: specObj,
      retailers: formRetailers,
      status: formStatus,
      isFeatured: true,
      isDeal: formIsDeal,
      dealBadge: formDealBadge,
      dealExpiry: formDealExpiry,
      pros: formPros.filter(Boolean),
      cons: formCons.filter(Boolean),
      verdict: formVerdict,
      whoItsFor: formWhoItsFor,
    };

    if (editingProductId) {
      updateProduct(editingProductId, prodPayload);
      showNotice(`Updated "${formName}" successfully!`);
    } else {
      addProduct(prodPayload);
      showNotice(`Added "${formName}" to catalog!`);
    }

    setIsProductModalOpen(false);
  };

  // Image Upload handler (supports Drag and Drop / Local File Upload via FileReader base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormImages(prev => [...prev, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  // Custom Site Logo File Upload
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setCustomLogoInput(dataUrl);
        setSiteLogoUrl(dataUrl);
        showNotice('Logo updated from uploaded file!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCustomLogo = () => {
    setSiteLogoUrl(customLogoInput.trim());
    showNotice(customLogoInput.trim() ? 'Custom logo URL saved!' : 'Logo reset to default FMT brand mark!');
  };

  const handleResetCustomLogo = () => {
    setCustomLogoInput('');
    setSiteLogoUrl('');
    showNotice('Reset logo to default FMT brand mark!');
  };

  // Filtered Products for CMS Table
  const filteredCmsProducts = products.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.categoryId.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Floating Notification */}
        {feedbackNotice && (
          <div className="mb-6 p-4 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>{feedbackNotice}</span>
            </div>
            <button onClick={() => setFeedbackNotice(null)} className="text-cyan-600 hover:text-cyan-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dashboard Title & Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-4">
            <FmtLogo size="lg" />
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-600 font-bold uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span>Find My Tech Admin Control Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950 tracking-tight">
                Website CMS & Catalog Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Upload custom product photos, set live prices, and configure affiliate links per category.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800">{adminUser?.name || 'Administrator'}</span>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              View Storefront
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('home');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-semibold border border-slate-200 hover:border-rose-200 transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
              title="Sign out of Admin CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              onClick={() => openAddProductModal()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'products', label: `Products (${totalProducts})`, icon: Package },
            { id: 'branding', label: 'Logo & Branding', icon: Sparkles },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
            { id: 'retailers', label: `Retailers (${retailers.length})`, icon: Building2 },
            { id: 'deals', label: `Deals (${activeDeals})`, icon: Tag },
            { id: 'analytics', label: `Affiliate Clicks (${totalClicks})`, icon: MousePointerClick },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Products
                </span>
                <span className="text-3xl font-display font-extrabold text-slate-900 tabular-nums">
                  {totalProducts}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <span className="text-emerald-600 font-bold">{publishedProducts} published</span>
                  <span>·</span>
                  <span>{draftProducts} draft</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Active Tech Deals
                </span>
                <span className="text-3xl font-display font-extrabold text-amber-600 tabular-nums">
                  {activeDeals}
                </span>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Marked with live discount badges
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Affiliate Links
                </span>
                <span className="text-3xl font-display font-extrabold text-cyan-600 tabular-nums">
                  {totalAffiliateLinks}
                </span>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Across {retailers.length} verified partner stores
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Affiliate Clicks
                </span>
                <span className="text-3xl font-display font-extrabold text-emerald-600 tabular-nums">
                  {totalClicks}
                </span>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Outbound referrals to retailers
                </div>
              </div>
            </div>

            {/* Category Slots Ready For Update */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-display font-bold text-slate-950 text-base flex items-center gap-2">
                    <ImagePlus className="w-4 h-4 text-cyan-600" />
                    <span>Product Catalog Slots Awaiting Details</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select any product slot below to upload its official picture, set the price, and paste its retailer affiliate URLs.
                  </p>
                </div>
                <button
                  onClick={() => openAddProductModal()}
                  className="px-3 py-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 rounded-lg text-xs font-bold border border-cyan-200 self-start sm:self-auto cursor-pointer"
                >
                  + Add New Slot
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {products.map(p => {
                  const hasImage = Boolean(p.primaryImage);
                  const hasPrice = p.price > 0;
                  const hasLinks = p.retailers.length > 0;
                  return (
                    <div 
                      key={p.id}
                      className="p-3.5 rounded-xl border border-slate-200/90 hover:border-cyan-400 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between gap-3 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded">
                            {p.categoryId}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            hasImage && hasPrice && hasLinks 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {hasImage && hasPrice && hasLinks ? 'Ready' : 'Pending Upload'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {hasPrice ? formatPrice(p.price) : 'No price set'} · {p.retailers.length} links
                        </p>
                      </div>

                      <button
                        onClick={() => openEditProductModal(p)}
                        className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3 h-3 text-cyan-600" />
                        Update Picture, Price & Links
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Recent Clicks Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Quick Actions (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-slate-950 text-base">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => openAddProductModal()}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-xs group-hover:text-cyan-600">Add New Tech Product</p>
                      <p className="text-[11px] text-slate-500">Upload pictures, specs & affiliate links</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => setActiveTab('branding')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-xs group-hover:text-cyan-600">Configure Site Logo</p>
                      <p className="text-[11px] text-slate-500">Upload custom logo image or change brand emblem</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => setActiveTab('deals')}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-slate-900 text-xs group-hover:text-amber-600">Manage Active Deals</p>
                      <p className="text-[11px] text-slate-500">Toggle Deal ON/OFF and promotional tags</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={resetToDefaults}
                    className="w-full p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-left flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-bold text-rose-600 text-xs">Reset Catalog to Empty Slots</p>
                      <p className="text-[11px] text-slate-500">Wipe dummy data and restore clean slots</p>
                    </div>
                    <RotateCcw className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>

              {/* Click Stream (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-slate-950 text-base">Outbound Affiliate Clicks</h3>
                  <span className="text-xs text-slate-500 font-semibold">{totalClicks} clicks recorded</span>
                </div>

                {affiliateClicks.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No clicks recorded yet. When users click "View Deal", referrals are logged here.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {affiliateClicks.slice(0, 10).map((click) => (
                      <div 
                        key={click.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{click.productName}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Referred to <span className="font-bold text-cyan-600">{click.retailerName}</span> ({formatPrice(click.price)})
                          </p>
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {new Date(click.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search products by name or brand..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${statusFilter === 'all' ? 'bg-cyan-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                >
                  All ({products.length})
                </button>
                <button
                  onClick={() => setStatusFilter('published')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${statusFilter === 'published' ? 'bg-cyan-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                >
                  Published ({publishedProducts})
                </button>
                <button
                  onClick={() => setStatusFilter('draft')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer ${statusFilter === 'draft' ? 'bg-cyan-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:text-slate-900'}`}
                >
                  Draft ({draftProducts})
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                      <th className="py-3 px-4">Product Details</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Retailer Offers</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCmsProducts.map(p => {
                      const lowestOffer = p.retailers.length > 0
                        ? [...p.retailers].sort((a, b) => a.price - b.price)[0]
                        : null;

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                {p.primaryImage ? (
                                  <img 
                                    src={p.primaryImage} 
                                    alt={p.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                                  />
                                ) : (
                                  <ImageIcon className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">{p.name}</p>
                                <p className="text-[11px] text-slate-500">{p.brand} · {p.subcategory}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-700 capitalize">
                              {p.categoryId}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {p.price > 0 ? (
                              <span className="font-bold text-slate-900 tabular-nums">
                                {formatPrice(p.price)}
                              </span>
                            ) : (
                              <span className="text-[11px] text-amber-600 font-semibold">
                                Awaiting price
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            {p.retailers.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {p.retailers.map(r => (
                                  <span key={r.id} className="text-[10px] text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-medium">
                                    {r.retailerName}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400">No links added</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {p.status}
                            </span>
                            {p.isDeal && (
                              <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                Deal
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditProductModal(p)}
                                className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                                title="Edit Product"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.name}"?`)) {
                                    deleteProduct(p.id);
                                    showNotice(`Deleted "${p.name}".`);
                                  }
                                }}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab: BRANDING & LOGO */}
        {activeTab === 'branding' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="font-display font-bold text-slate-950 text-lg">Site Logo & Brand Settings</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Customize the brand logo displayed across Find My Tech's header, hero, footer, and admin panel.
                </p>
              </div>

              {/* Current Logo Preview */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Logo Preview (On White)
                </span>
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <FmtLogo size="lg" variant="horizontal" />
                </div>
                <span className="text-xs text-slate-500">
                  {siteLogoUrl ? 'Currently using your custom uploaded logo' : 'Currently using default FIND MY TECH (FMT) brand logo'}
                </span>
              </div>

              {/* Custom Logo URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Custom Logo Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customLogoInput}
                    onChange={e => setCustomLogoInput(e.target.value)}
                    placeholder="https://example.com/logo.svg or logo.png"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleSaveCustomLogo}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Save URL
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Or Upload Logo File (SVG / PNG / WebP)
                </label>
                <div 
                  onClick={() => logoFileInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer text-center space-y-2 transition-colors"
                >
                  <Upload className="w-6 h-6 text-cyan-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-800">Click to upload a logo image from your device</p>
                  <p className="text-[11px] text-slate-400">Supports PNG, SVG, JPG, WebP transparent images</p>
                  <input 
                    ref={logoFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  onClick={handleResetCustomLogo}
                  className="px-3.5 py-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  Reset to Default FMT Logo
                </button>
                <button
                  onClick={handleSaveCustomLogo}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Apply Logo
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-950 text-lg">Consumer Tech Taxonomy</h3>
                <p className="text-xs text-slate-500">12 Primary Consumer Electronics Categories</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs overflow-hidden flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Animated Picture Preview */}
                    <div className="h-28 w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                      <CategoryAnimatedPicture 
                        categoryId={cat.id} 
                        categoryName={cat.name} 
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{cat.slug}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{cat.shortDescription}</p>
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {cat.subcategories.map(sub => (
                        <span key={sub} className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-medium">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => openAddProductModal(cat.id)}
                      className="w-full py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-bold rounded-lg border border-cyan-200 cursor-pointer"
                    >
                      + Add Product in {cat.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: RETAILERS */}
        {activeTab === 'retailers' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-slate-950 text-lg">Partner Retailers</h3>
              <p className="text-xs text-slate-500">Official retail stores used for price comparisons</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {retailers.map(r => (
                <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                    <span className="text-xs text-slate-500">{r.domain}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    Affiliate tag: <span className="font-bold text-cyan-600">{r.affiliateParam || 'Default'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: DEALS */}
        {activeTab === 'deals' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-slate-950 text-lg">Active Tech Deals</h3>
              <p className="text-xs text-slate-500">Products marked as active deals with price-drop ribbons</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.isDeal).map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {p.discount ? `${p.discount}% OFF` : 'Active Deal'}
                      </span>
                      <button
                        onClick={() => openEditProductModal(p)}
                        className="text-xs font-bold text-cyan-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.price > 0 ? formatPrice(p.price) : 'Pending price'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-slate-950 text-lg">Affiliate Click Stream</h3>
              <p className="text-xs text-slate-500">Live referral click events to partner retailer websites</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              {affiliateClicks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  No clicks recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {affiliateClicks.map(c => (
                    <div key={c.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{c.productName}</p>
                        <p className="text-[11px] text-slate-500">
                          Referred to <span className="font-bold text-cyan-600">{c.retailerName}</span> ({formatPrice(c.price)})
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(c.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ADD / EDIT PRODUCT MODAL */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 text-slate-900">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-950">
                    {editingProductId ? 'Update Product Slot' : 'Add New Product Slot'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide the product name, image, price, and affiliate URLs.
                  </p>
                </div>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSaveProduct} className="space-y-6">
                
                {/* 1. Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Product Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder="e.g. Apple iPhone 16 Pro Max, Sony WH-1000XM5"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Brand *
                      </label>
                      <input
                        type="text"
                        value={formBrand}
                        onChange={e => setFormBrand(e.target.value)}
                        placeholder="e.g. Apple, Samsung, Sony, Bose"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formCategoryId}
                        onChange={e => {
                          setFormCategoryId(e.target.value);
                          loadCategorySpecPresets(e.target.value);
                          const cat = categories.find(c => c.id === e.target.value);
                          if (cat && cat.subcategories[0]) {
                            setFormSubcategory(cat.subcategories[0]);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-500"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subcategory
                      </label>
                      <input
                        type="text"
                        value={formSubcategory}
                        onChange={e => setFormSubcategory(e.target.value)}
                        placeholder="e.g. Flagship Phones, Wireless Earbuds"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Overview / Description
                    </label>
                    <textarea
                      rows={2}
                      value={formShortDescription}
                      onChange={e => setFormShortDescription(e.target.value)}
                      placeholder="Brief highlight explaining key features and target buyers..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* 2. Product Images */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      2. Product Images
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {formImages.length} image(s) attached
                    </span>
                  </div>

                  {/* Add Image by URL */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste product image URL..."
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Upload Image File */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 border-2 border-dashed border-slate-200 hover:border-cyan-400 rounded-xl bg-slate-50/50 hover:bg-slate-50 text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-700">Click to upload product image from computer</p>
                    <p className="text-[10px] text-slate-400">PNG, JPG, WebP supported</p>
                    <input 
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Image Previews */}
                  {formImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
                      {formImages.map((img, idx) => (
                        <div 
                          key={idx}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${
                            primaryImageIndex === idx ? 'border-cyan-500 shadow-sm' : 'border-slate-200'
                          }`}
                          onClick={() => setPrimaryImageIndex(idx)}
                        >
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormImages(prev => prev.filter((_, i) => i !== idx));
                              if (primaryImageIndex >= formImages.length - 1) setPrimaryImageIndex(0);
                            }}
                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {primaryImageIndex === idx && (
                            <div className="absolute bottom-1 left-1 bg-cyan-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Retailer Offers & Affiliate Links */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        3. Retailer Pricing & Affiliate Links
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Enter retailer name, active price, and direct affiliate link.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormRetailers(prev => [
                          ...prev,
                          {
                            id: `offer-${Date.now()}`,
                            retailerId: 'amazon',
                            retailerName: 'Amazon',
                            price: 0,
                            affiliateUrl: '',
                            inStock: true
                          }
                        ]);
                      }}
                      className="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      + Add Retailer Offer
                    </button>
                  </div>

                  {formRetailers.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                      No retailer offers added yet. Click "+ Add Retailer Offer" to add retailer price and affiliate URL.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formRetailers.map((offer, idx) => (
                        <div key={offer.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          <div className="sm:col-span-3">
                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Retailer Name</label>
                            <input
                              type="text"
                              value={offer.retailerName}
                              onChange={e => {
                                const val = e.target.value;
                                setFormRetailers(prev => prev.map((o, i) => i === idx ? { ...o, retailerName: val } : o));
                              }}
                              placeholder="Amazon, Noon..."
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Price</label>
                            <input
                              type="number"
                              value={offer.price || ''}
                              onChange={e => {
                                const val = Number(e.target.value);
                                setFormRetailers(prev => prev.map((o, i) => i === idx ? { ...o, price: val } : o));
                              }}
                              placeholder="0"
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-bold"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Affiliate Link URL</label>
                            <input
                              type="url"
                              value={offer.affiliateUrl}
                              onChange={e => {
                                const val = e.target.value;
                                setFormRetailers(prev => prev.map((o, i) => i === idx ? { ...o, affiliateUrl: val } : o));
                              }}
                              placeholder="https://..."
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono text-[11px]"
                            />
                          </div>

                          <div className="sm:col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                setFormRetailers(prev => prev.filter((_, i) => i !== idx));
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Deal status */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDealToggle"
                      checked={formIsDeal}
                      onChange={e => setFormIsDeal(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-600 border-slate-300"
                    />
                    <label htmlFor="isDealToggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Mark as Active Deal (Show on Deals page and Home Deals section)
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                  >
                    Save Product Slot
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
