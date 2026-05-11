import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Camera, Search } from 'lucide-react';
import './Gallery.css';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  createdAt: string;
}

const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    imageUrl: '',
    category: 'Event',
    description: ''
  });

  const categories = ['All', 'School', 'Event', 'Classroom', 'Sports', 'Art'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (response.ok) {
        setShowModal(false);
        setEditingId(null);
        setNewItem({ title: '', imageUrl: '', category: 'Event', description: '' });
        fetchItems();
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setNewItem({
      title: item.title,
      imageUrl: item.imageUrl,
      category: item.category,
      description: item.description
    });
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="header-text">
          <h1>School Gallery</h1>
          <p>Manage photos for the public website</p>
        </div>
        <button className="add-btn" onClick={() => { setEditingId(null); setNewItem({ title: '', imageUrl: '', category: 'Event', description: '' }); setShowModal(true); }}>
          <Plus size={20} />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="gallery-controls">
        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search photos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Loading gallery...</div>
      ) : (
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-card">
              <div className="card-image">
                <img src={item.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'} alt={item.title} />
                <div className="card-actions">
                  <button className="edit-icon" onClick={() => handleEdit(item)} style={{ marginRight: '8px' }}>
                    <Plus size={18} style={{ transform: 'rotate(45deg)' }} />
                  </button>
                  <button className="delete-icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="card-badge">{item.category}</div>
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <p>{item.description || 'No description provided'}</p>
                <span className="card-date">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="empty-state">
              <Camera size={48} />
              <p>No photos found. Add your first school photo!</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Photo' : 'Add New Photo'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Photo Title</label>
                <input 
                  type="text" 
                  required 
                  value={newItem.title}
                  onChange={e => setNewItem({...newItem, title: e.target.value})}
                  placeholder="e.g. Annual Sports Day 2024"
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  required 
                  value={newItem.imageUrl}
                  onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                  placeholder="Paste image link here"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows={3}
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Brief details about the photo"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">{editingId ? 'Update Photo' : 'Save Photo'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
