import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCars } from '../../context/CarContext';
import api from '../../services/api';
import { getImageUrl } from '../../utils/helpers';
import './Admin.css';

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { cars, addCar, updateCar, deleteCar } = useCars();

  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: '', bodyType: '', name: '', year: '', price: '',
    cc: '', hp: '', engineType: '', mileage: '',
    fuelType: '', transmission: '', description: ''
  });

  const [images, setImages] = useState([]);

  const uniqueOptions = useMemo(() => {
    const companies = [...new Set(cars.map(car => car.company).filter(Boolean))];
    const bodyTypes = [...new Set(cars.map(car => car.bodyType).filter(Boolean))];
    const engineTypes = [...new Set(cars.map(car => car.engineType).filter(Boolean))];
    const fuelTypes = [...new Set(cars.map(car => car.fuelType).filter(Boolean))];
    const transmissions = [...new Set(cars.map(car => car.transmission).filter(Boolean))];
    return { companies, bodyTypes, engineTypes, fuelTypes, transmissions };
  }, [cars]);

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const resetForm = () => {
    setFormData({
      company: '', bodyType: '', name: '', year: '', price: '',
      cc: '', hp: '', engineType: '', mileage: '',
      fuelType: '', transmission: '', description: ''
    });
    setImages([]);
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addImageSlot = () => {
    setImages([...images, {
      id: Date.now() + Math.random(),
      mode: 'url',
      urlValue: '',
      file: null,
      preview: '',
      path: '',
      status: 'idle'
    }]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const updateImageSlot = (id, updates) => {
    setImages(images.map(img => img.id === id ? { ...img, ...updates } : img));
  };

  const handleFileUpload = async (id, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateImageSlot(id, { file, preview, status: 'uploading' });
    const formDataUpload = new FormData();
    formDataUpload.append('images', file);
    try {
      const response = await api.post('/upload', formDataUpload, { headers: { 'Content-Type': 'multipart/form-data' } });
      updateImageSlot(id, { path: response.data.images[0], status: 'success' });
    } catch (error) {
      console.error('Upload failed:', error);
      updateImageSlot(id, { status: 'error' });
    }
  };

  const retryUpload = async (imgObj) => {
    updateImageSlot(imgObj.id, { status: 'uploading' });
    const formDataUpload = new FormData();
    formDataUpload.append('images', imgObj.file);
    try {
      const response = await api.post('/upload', formDataUpload, { headers: { 'Content-Type': 'multipart/form-data' } });
      updateImageSlot(imgObj.id, { path: response.data.images[0], status: 'success' });
    } catch (error) {
      console.error('Retry failed:', error);
      updateImageSlot(imgObj.id, { status: 'error' });
    }
  };

  const handleEdit = (car) => {
    setEditingId(car.id);
    setFormData({
      company: car.company, bodyType: car.bodyType, name: car.name, year: car.year || '', price: car.price,
      cc: car.cc, hp: car.hp, engineType: car.engineType, mileage: car.mileage,
      fuelType: car.fuelType, transmission: car.transmission, description: car.description
    });
    const normalizedImages = car.images.map((imgUrl, index) => ({
      id: Date.now() + index, mode: 'url', urlValue: imgUrl, file: null,
      preview: getImageUrl(imgUrl), path: imgUrl, status: 'success'
    }));
    setImages(normalizedImages);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.some(img => img.status === 'error' || img.status === 'uploading')) {
      alert('Please wait for all uploads to finish, or retry/remove failed images.');
      return;
    }
    if (images.length === 0) {
      alert('Please add at least one image (URL or Upload).');
      return;
    }
    setIsSubmitting(true);

    const finalImageUrls = images.map(img => img.mode === 'url' ? img.urlValue : img.path).filter(Boolean);

    const carData = {
      ...formData,
      year: parseInt(formData.year), // <-- SAVES YEAR AS NUMBER
      price: parseFloat(formData.price),
      cc: parseInt(formData.cc),
      hp: parseInt(formData.hp),
      mileage: parseInt(formData.mileage),
      images: finalImageUrls
    };

    try {
      if (editingId) {
        await updateCar(editingId, carData);
        alert('Vehicle updated successfully!');
      } else {
        await addCar(carData);
        alert('Vehicle added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save car:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your LOOP AUTOCAT vehicle inventory</p>
      </div>

      <div className="admin-layout">
        <div className="admin-form-section">
          <h2>{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">

            <div className="form-row">
              <div className="form-group">
                <label>Company</label>
                <input type="text" name="company" list="companies-list" value={formData.company} onChange={handleChange} placeholder="Type or select..." required />
                <datalist id="companies-list">{uniqueOptions.companies.map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
              <div className="form-group">
                <label>Body Type</label>
                <input type="text" name="bodyType" list="bodyTypes-list" value={formData.bodyType} onChange={handleChange} placeholder="Type or select..." required />
                <datalist id="bodyTypes-list">{uniqueOptions.bodyTypes.map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
            </div>

            <div className="form-group">
              <label>Vehicle Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Land Cruiser" required />
            </div>

            {/* YEAR FIELD ADDED HERE */}
            <div className="form-group">
              <label>Year of Manufacture</label>
              <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 2022" min="1990" max="2030" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (KES)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mileage (miles)</label>
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Engine Capacity (CC)</label>
                <input type="number" name="cc" value={formData.cc} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Horsepower (HP)</label>
                <input type="number" name="hp" value={formData.hp} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Engine Type</label>
                <input type="text" name="engineType" list="engineTypes-list" value={formData.engineType} onChange={handleChange} placeholder="Type or select..." required />
                <datalist id="engineTypes-list">{uniqueOptions.engineTypes.map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <input type="text" name="fuelType" list="fuelTypes-list" value={formData.fuelType} onChange={handleChange} placeholder="Type or select..." required />
                <datalist id="fuelTypes-list">{uniqueOptions.fuelTypes.map(opt => <option key={opt} value={opt} />)}</datalist>
              </div>
            </div>

            <div className="form-group">
              <label>Transmission</label>
              <input type="text" name="transmission" list="transmissions-list" value={formData.transmission} onChange={handleChange} placeholder="Type or select..." required />
              <datalist id="transmissions-list">{uniqueOptions.transmissions.map(opt => <option key={opt} value={opt} />)}</datalist>
            </div>

            <div className="form-group">
              <label>Vehicle Images ({images.filter(img => img.status === 'success').length} added)</label>
              {images.map((img) => (
                <div key={img.id} className="image-input-row">
                  <div className="image-mode-toggle">
                    <label><input type="radio" name={`mode-${img.id}`} checked={img.mode === 'url'} onChange={() => updateImageSlot(img.id, { mode: 'url' })} /> URL</label>
                    <label><input type="radio" name={`mode-${img.id}`} checked={img.mode === 'file'} onChange={() => updateImageSlot(img.id, { mode: 'file' })} /> Upload File</label>
                  </div>
                  <div className="image-input-content">
                    {img.mode === 'url' ? (
                      <input type="url" placeholder="https://example.com/image.jpg" value={img.urlValue} onChange={(e) => updateImageSlot(img.id, { urlValue: e.target.value, preview: e.target.value, status: 'success' })} />
                    ) : (
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(img.id, e.target.files[0])} disabled={img.status === 'uploading'} />
                    )}
                    <button type="button" className="remove-image-btn" onClick={() => removeImage(img.id)}>✕</button>
                  </div>
                  <div className="image-preview-container">
                    {img.status === 'uploading' && <span className="status-badge uploading">Uploading...</span>}
                    {img.status === 'error' && (
                      <>
                        <span className="status-badge error">Failed</span>
                        <button type="button" className="retry-btn" onClick={() => retryUpload(img)}>🔄 Retry</button>
                      </>
                    )}
                    {img.preview && <img src={img.preview} alt="Preview" className="image-preview-thumb" />}
                  </div>
                </div>
              ))}
              <button type="button" className="add-image-btn" onClick={addImageSlot}>+ Add Another Image</button>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-actions">
              {editingId && <button type="button" className="cancel-btn" onClick={resetForm}>Cancel Edit</button>}
              <button type="submit" className="admin-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (editingId ? 'Update Vehicle' : 'Add Vehicle')}
              </button>
            </div>
          </form>
        </div>

        <div className="admin-list-section">
          <h2>Current Inventory ({cars.length})</h2>
          <div className="admin-car-list">
            {cars.map(car => (
              <div key={car.id} className="admin-car-item">
                <img src={getImageUrl(car.images[0])} alt={car.name} className="admin-car-img" />
                <div className="admin-car-info">
                  <h4>{car.name}</h4>
                  <p>{car.company} • {car.bodyType} • {car.year}</p>
                  <span className="admin-car-price">KES{car.price.toLocaleString()}</span>
                </div>
                <div className="admin-car-actions">
                  <button className="edit-btn" onClick={() => handleEdit(car)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteCar(car.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;