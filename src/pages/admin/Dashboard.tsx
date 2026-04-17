import React, { useState, useEffect } from 'react';
import { db, collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, auth, signOut, OperationType, handleFirestoreError } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, LogOut, Package, Sparkles, X, Save, Calendar, Check, AlertCircle } from 'lucide-react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { BOUQUET_CATEGORIES, DECORATION_CATEGORIES } from '../../constants';

interface Item {
  id: string;
  [key: string]: any;
}

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'events'>('products');
  const [items, setItems] = useState<Item[]>([]);
  const [allProducts, setAllProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCatValue, setNewCatValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, activeTab), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, activeTab);
    });
    return () => unsubscribe();
  }, [activeTab]);

  // Load all products for the event selector
  useEffect(() => {
    if (activeTab === 'events') {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProducts(data);
      });
      return () => unsubscribe();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalCategory = formData.category;
      if (isNewCategory && newCatValue.trim()) {
        finalCategory = newCatValue.trim();
      }

      const dataToSave = { ...formData, category: finalCategory };
      if (activeTab === 'events') {
        delete dataToSave.productIds; // No longer needed
      }

      if (editingItem) {
        await updateDoc(doc(db, activeTab, editingItem.id), {
          ...dataToSave,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, activeTab), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({});
      setIsNewCategory(false);
      setNewCatValue('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, activeTab);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus item ini?')) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, activeTab);
    }
  };

  const openModal = (item: Item | null = null) => {
    setEditingItem(item);
    setFormData(item || {});
    setIsNewCategory(false);
    setNewCatValue('');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col items-center py-10 px-6 gap-10">
        <div className="text-xl font-serif font-bold tracking-[2px] text-brand-maroon uppercase text-center">
          Admin <br /> Portal
        </div>

        <nav className="w-full flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-brand-maroon text-white shadow-lg' : 'text-gray-500 hover:bg-brand-pink/20'}`}
          >
            <Package size={18} /> Catalog
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services' ? 'bg-brand-maroon text-white shadow-lg' : 'text-gray-500 hover:bg-brand-pink/20'}`}
          >
            <Sparkles size={18} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'events' ? 'bg-brand-maroon text-white shadow-lg' : 'text-gray-500 hover:bg-brand-pink/20'}`}
          >
            <Calendar size={18} /> Events
          </button>
        </nav>

        <div className="mt-auto w-full pt-6 border-t border-brand-pink/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-serif text-brand-dark capitalize">Manage {activeTab}</h1>
            <p className="text-gray-500">Update your website content in real-time.</p>
          </div>
          <Button variant="maroon" onClick={() => openModal()} className="flex items-center gap-2">
            <Plus size={18} /> Add New
          </Button>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-maroon"></div>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-brand-pink/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-pink/10 bg-gray-50/50">
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Item</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Kategori</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Harga</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Label/Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink/5">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={item.id}
                        className="group hover:bg-brand-pink/5 transition-colors"
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-brand-pink/10">
                              <img src={item.image || item.bannerImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <p className="font-bold text-brand-dark leading-tight">{item.name || item.title}</p>
                              {activeTab === 'events' && (
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                  {item.isActive ? 'Active' : 'Inactive'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-xs text-gray-500 font-medium">{item.category || (activeTab === 'events' ? 'Seasonal' : '-')}</span>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-sm font-bold text-brand-maroon">
                            {item.priceStart ? `Rp ${item.priceStart.toLocaleString('id-ID')}` : '-'}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          {item.label ? (
                            <span className="bg-brand-rose/10 text-brand-rose text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg">
                              {item.label}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-[10px]">—</span>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openModal(item)} 
                              className="p-2 text-brand-rose hover:bg-brand-pink/20 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)} 
                              className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {items.length === 0 && (
              <div className="py-20 text-center text-gray-400">
                Belum ada data tersedia.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-brand-pink/10 flex justify-between items-center">
                <h2 className="text-2xl font-serif text-brand-dark">{editingItem ? 'Edit' : 'Add'} {activeTab === 'products' ? 'Product' : activeTab === 'services' ? 'Service' : 'Seasonal Event'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-brand-dark"><X size={24} /></button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Title / Name</label>
                    <input 
                      required 
                      value={formData.name || formData.title || ''} 
                      onChange={(e) => setFormData({ ...formData, [activeTab === 'events' ? 'title' : activeTab === 'products' ? 'name' : 'title']: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                    />
                  </div>
                  {activeTab === 'events' && (
                    <div className="ml-4 flex flex-col items-center">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Active</label>
                      <button 
                        type="button"
                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  )}
                </div>

                {activeTab === 'events' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Theme Color (HEX)</label>
                      <div className="flex gap-2">
                        <input 
                          value={formData.themeColor || ''} 
                          placeholder="#FFD700"
                          onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                        />
                        <div className="w-12 h-12 rounded-xl border" style={{ backgroundColor: formData.themeColor }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                      <textarea 
                        value={formData.description || ''} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none resize-none"
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'products' ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
                        {!isNewCategory ? (
                          <select 
                            required 
                            value={formData.category || ''} 
                            onChange={(e) => {
                              if (e.target.value === 'NEW') setIsNewCategory(true);
                              else setFormData({ ...formData, category: e.target.value });
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                          >
                            <option value="">Select Category</option>
                            {BOUQUET_CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="NEW" className="text-brand-maroon font-bold">+ Tambah Kategori Baru</option>
                          </select>
                        ) : (
                          <div className="flex gap-2">
                            <input 
                              required
                              placeholder="Kategori Baru..."
                              value={newCatValue}
                              onChange={(e) => setNewCatValue(e.target.value)}
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none"
                            />
                            <button 
                              type="button" 
                              onClick={() => { setIsNewCategory(false); setNewCatValue(''); }}
                              className="px-3 bg-gray-100 rounded-xl text-gray-400"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Price Start</label>
                        <input 
                          type="number" 
                          required 
                          value={formData.priceStart || ''} 
                          onChange={(e) => setFormData({ ...formData, priceStart: Number(e.target.value) })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Label (Optional)</label>
                      <input 
                        value={formData.label || ''} 
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        placeholder="Best Seller, Popular, etc."
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                      />
                    </div>
                  </>
                ) : activeTab === 'services' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</label>
                      {!isNewCategory ? (
                        <select 
                          required 
                          value={formData.category || ''} 
                          onChange={(e) => {
                            if (e.target.value === 'NEW') setIsNewCategory(true);
                            else setFormData({ ...formData, category: e.target.value });
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                        >
                          <option value="">Select Category</option>
                          {DECORATION_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                          <option value="NEW" className="text-brand-maroon font-bold">+ Tambah Kategori Baru</option>
                        </select>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            required
                            placeholder="Kategori Baru..."
                            value={newCatValue}
                            onChange={(e) => setNewCatValue(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => { setIsNewCategory(false); setNewCatValue(''); }}
                            className="px-3 bg-gray-100 rounded-xl text-gray-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Description</label>
                      <textarea 
                        required 
                        value={formData.description || ''} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none resize-none"
                      />
                    </div>
                  </>
                ) : null}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{activeTab === 'events' ? 'Banner Image URL' : 'Image URL'}</label>
                  <input 
                    required 
                    value={formData.image || formData.bannerImage || ''} 
                    onChange={(e) => setFormData({ ...formData, [activeTab === 'events' ? 'bannerImage' : 'image']: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-brand-maroon outline-none"
                  />
                  {(formData.image || formData.bannerImage) && (
                    <div className="mt-2 w-full h-32 rounded-xl overflow-hidden bg-gray-50 border border-brand-pink/10">
                      <img src={formData.image || formData.bannerImage} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2">
                  <Save size={18} /> {editingItem ? 'Update' : 'Create'} {activeTab === 'events' ? 'Event' : activeTab === 'products' ? 'Product' : 'Service'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
