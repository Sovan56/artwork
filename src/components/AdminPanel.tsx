import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Mail, ArrowLeft, Plus, Edit2, Trash2, LogOut, 
  LayoutDashboard, FolderKanban, Image as ImageIcon, X, 
  CheckCircle2, Sparkles, AlertCircle, FileText 
} from 'lucide-react';
import { PortfolioItem } from '../types';

interface CategoryItem {
  id: string;
  name: string;
}

interface AdminPanelProps {
  portfolioItems: PortfolioItem[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  onClose: () => void;
}

// Preset images for easy testing when adding/editing products
const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80', label: 'Vector Modern' },
  { url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80', label: 'Traditional Mural' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', label: 'Beach Sunset' },
  { url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a6211?auto=format&fit=crop&w=800&q=80', label: 'Canvas Deer' },
  { url: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?auto=format&fit=crop&w=800&q=80', label: 'Cartoon Graffiti' },
  { url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80', label: 'Vastu Horses' },
];

export default function AdminPanel({
  portfolioItems,
  setPortfolioItems,
  categories,
  setCategories,
  onClose
}: AdminPanelProps) {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('admin@artworks.com');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Dashboard navigation tab
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  // Modals / forms states for PRODUCTS
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PortfolioItem | null>(null);
  const [productTitle, setProductTitle] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');

  // Modals / forms states for CATEGORIES
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@artworks.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      triggerToast('Welcome back, Administrator!');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  // --- PRODUCT CRUD HANDLERS ---
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductTitle('');
    setProductCategory(categories[0]?.id || '');
    setProductDesc('');
    setProductImageUrl(PRESET_IMAGES[0].url);
    setIsProductModalOpen(true);
  };

  const openEditProduct = (item: PortfolioItem) => {
    setEditingProduct(item);
    setProductTitle(item.title);
    setProductCategory(item.category);
    setProductDesc(item.description);
    setProductImageUrl(item.image);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productCategory || !productDesc || !productImageUrl) {
      alert('Please fill out all product fields.');
      return;
    }

    if (editingProduct) {
      // Edit mode
      setPortfolioItems(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        title: productTitle,
        category: productCategory,
        description: productDesc,
        image: productImageUrl
      } : p));
      triggerToast('Product updated successfully!');
    } else {
      // Add mode
      const newProduct: PortfolioItem = {
        id: Date.now().toString(),
        title: productTitle,
        category: productCategory,
        description: productDesc,
        image: productImageUrl
      };
      setPortfolioItems(prev => [newProduct, ...prev]);
      triggerToast('New product added to catalog!');
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product? This change will reflect instantly on the portfolio.')) {
      setPortfolioItems(prev => prev.filter(p => p.id !== id));
      triggerToast('Product deleted.');
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryId('');
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryId(cat.id);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName || !categoryId) {
      alert('Please fill out all category fields.');
      return;
    }

    const sanitizedId = categoryId.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    if (editingCategory) {
      // Edit mode
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? {
        ...c,
        id: sanitizedId,
        name: categoryName
      } : c));
      
      // Update items linked to the old category
      if (editingCategory.id !== sanitizedId) {
        setPortfolioItems(prev => prev.map(p => p.category === editingCategory.id ? {
          ...p,
          category: sanitizedId
        } : p));
      }
      triggerToast('Category updated successfully!');
    } else {
      // Add mode
      if (categories.some(c => c.id === sanitizedId)) {
        alert('A category with this ID already exists.');
        return;
      }
      const newCat: CategoryItem = {
        id: sanitizedId,
        name: categoryName
      };
      setCategories(prev => [...prev, newCat]);
      triggerToast('New category added!');
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (catId: string) => {
    if (catId === 'all') {
      alert('The "All" category is core to the system and cannot be deleted.');
      return;
    }
    if (confirm(`Are you sure you want to delete this category? All products under this category will need to be re-assigned.`)) {
      setCategories(prev => prev.filter(c => c.id !== catId));
      triggerToast('Category deleted.');
    }
  };

  // --- LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Background Lights */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md">
          {/* Back button */}
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors mb-8 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Live Site</span>
          </button>

          {/* Login Card */}
          <div className="bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl border border-neutral-800 shadow-2xl relative">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>Admin Gateway</span>
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">Artworks Management</h2>
              <p className="text-neutral-400 text-xs mt-1.5">
                Sign in with administrative privileges to manage visual assets.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="email">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-neutral-100"
                    placeholder="admin@artworks.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="password">
                  Security Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-neutral-100 font-mono"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/15"
              >
                Enter Admin Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center">
              <span className="text-[10px] text-neutral-500 font-mono">
                Artworks CMS v1.4 • Secured Frontend Shell
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-blue-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin header */}
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold font-mono tracking-tight text-white flex items-center gap-2 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>Admin Console</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-xl transition-all border border-neutral-700"
            >
              View Live Website
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="p-2 bg-red-950/40 hover:bg-red-900/40 text-red-400 rounded-xl border border-red-900/30 transition-all"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar controls */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-4 space-y-1">
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block px-3 mb-2">
                Workspace Sections
              </span>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Manage Products</span>
                <span className="ml-auto bg-black/30 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {portfolioItems.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <FolderKanban className="h-4 w-4" />
                <span>Manage Categories</span>
                <span className="ml-auto bg-black/30 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {categories.filter(c => c.id !== 'all').length}
                </span>
              </button>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800/80 p-4">
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 block mb-1">
                Notice & Help
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                This is a mock-state Admin Panel requested for visual demonstration. Any changes you make here will instantly reflect inside the **Wall Painting Portfolio** section of this runtime session.
              </p>
            </div>
          </div>

          {/* Main workspace section */}
          <div className="lg:col-span-3">
            
            {/* 1. PRODUCTS WORKSPACE */}
            {activeTab === 'products' && (
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">Mural Catalog Products</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Edit details, delete existing catalog products, or add custom design modules.
                    </p>
                  </div>
                  <button
                    onClick={openAddProduct}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-bold rounded-xl text-white shadow-lg transition-all shadow-blue-600/10 shrink-0 self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Products dynamic grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-neutral-950 border border-neutral-800 hover:border-neutral-750 p-4 rounded-xl flex gap-3.5 relative group transition-colors"
                    >
                      {/* Thumbnail photo */}
                      <div className="relative h-20 w-24 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-800">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text info */}
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1.5">
                          {categories.find(c => c.id === item.category)?.name || item.category}
                        </span>
                        <h4 className="font-extrabold text-sm text-neutral-100 truncate pr-16">{item.title}</h4>
                        <p className="text-xs text-neutral-400 line-clamp-2 mt-1 pr-6 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Floating actions right-aligned */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5">
                        <button
                          onClick={() => openEditProduct(item)}
                          className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg text-neutral-300 hover:text-white transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="p-1.5 bg-red-950/20 hover:bg-red-900/30 border border-red-950/40 rounded-lg text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {portfolioItems.length === 0 && (
                    <div className="col-span-2 text-center py-12 border border-dashed border-neutral-800 rounded-xl text-neutral-500">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40 text-blue-500" />
                      <p className="text-xs font-semibold">No products found in database</p>
                      <button onClick={openAddProduct} className="text-blue-400 text-[11px] underline mt-1">
                        Create first product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. CATEGORIES WORKSPACE */}
            {activeTab === 'categories' && (
              <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">Gallery Categories</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Manage visual tags to organize wall murals seamlessly in the gallery tabs.
                    </p>
                  </div>
                  <button
                    onClick={openAddCategory}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm font-bold rounded-xl text-white shadow-lg transition-all shadow-blue-600/10 shrink-0 self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add New Category</span>
                  </button>
                </div>

                {/* Categories table list */}
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="p-4">Category Name</th>
                        <th className="p-4">Category Slug ID</th>
                        <th className="p-4">Linked Products</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {categories.filter(c => c.id !== 'all').map((cat) => {
                        const count = portfolioItems.filter(p => p.category === cat.id).length;
                        return (
                          <tr key={cat.id} className="hover:bg-neutral-900/40 transition-colors">
                            <td className="p-4 font-bold text-neutral-100">{cat.name}</td>
                            <td className="p-4 font-mono text-neutral-400">{cat.id}</td>
                            <td className="p-4 text-neutral-300">
                              <span className="px-2 py-0.5 bg-neutral-900 rounded border border-neutral-800 font-semibold font-mono">
                                {count} {count === 1 ? 'mural' : 'murals'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => openEditCategory(cat)}
                                  className="p-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-300 hover:text-white transition-all"
                                  title="Edit Name"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="p-1.5 bg-red-950/20 hover:bg-red-900/30 border border-red-950/40 rounded-lg text-red-400 transition-all"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
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
            )}

          </div>
        </div>
      </main>

      {/* --- ADD/EDIT PRODUCT MODAL OVERLAY --- */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProductModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3 shrink-0">
                <h4 className="text-lg font-extrabold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <span>{editingProduct ? 'Edit Mural Product' : 'Add New Mural Product'}</span>
                </h4>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 overflow-y-auto pr-1 flex-1">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="prod-title">
                    Mural Title / Post Name
                  </label>
                  <input
                    id="prod-title"
                    type="text"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-neutral-100"
                    placeholder="e.g. Modern Abstract Foliage"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Category Tag Alignment
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-neutral-100"
                  >
                    {categories.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="prod-desc">
                    Product Description
                  </label>
                  <textarea
                    id="prod-desc"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-neutral-100 resize-none leading-relaxed"
                    placeholder="Provide description outlining style, artwork dimensions, wall coverage details..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Artwork Image Selection
                  </label>
                  <div className="space-y-2">
                    {/* Presets Grid */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setProductImageUrl(preset.url)}
                          className={`relative aspect-[16/10] bg-neutral-950 rounded-lg overflow-hidden border-2 transition-all ${
                            productImageUrl === preset.url ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-neutral-800 hover:border-neutral-700'
                          }`}
                        >
                          <img 
                            src={preset.url} 
                            alt={preset.label} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                          <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm px-1 py-0.5 rounded text-[8px] text-white select-none">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="text-center text-[10px] text-neutral-500 font-semibold py-1">or</div>

                    {/* Custom URL Input */}
                    <input
                      type="url"
                      value={productImageUrl}
                      onChange={(e) => setProductImageUrl(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs focus:outline-none focus:border-blue-500 text-neutral-100"
                      placeholder="Paste any custom Unsplash/Image URL..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-xl text-white transition-all shadow-md shadow-blue-600/10"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD/EDIT CATEGORY MODAL OVERLAY --- */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
                <h4 className="text-lg font-extrabold flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-blue-500" />
                  <span>{editingCategory ? 'Edit Category Tag' : 'Add New Category Tag'}</span>
                </h4>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="cat-name">
                    Category Name / Display Title
                  </label>
                  <input
                    id="cat-name"
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      if (!editingCategory) {
                        setCategoryId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                      }
                    }}
                    required
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-neutral-100"
                    placeholder="e.g. Modern Geometrics"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5" htmlFor="cat-id">
                    Unique Category ID (Slug)
                  </label>
                  <input
                    id="cat-id"
                    type="text"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    disabled={!!editingCategory}
                    className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-neutral-100 font-mono disabled:opacity-50"
                    placeholder="e.g. modern-geometrics"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-xs font-bold rounded-xl text-white transition-all shadow-md shadow-blue-600/10"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
