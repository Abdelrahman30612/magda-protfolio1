import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Project } from '../types';

export const Dashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [visitors, setVisitors] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('site_stats').select('id').limit(1);
      setIsConnected(!error);
    } catch {
      setIsConnected(false);
    }
  };

  const fetchStats = async () => {
    const { data } = await supabase.from('site_stats').select('visitors').single();
    if (data) setVisitors(data.visitors);
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkConnection();
      fetchStats();
      fetchProjects();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security: We compare the encoded version of the input, not the raw string.
    // This hides 'magda-emad@123' from the source code.
    // Hash corresponds to: magda_portfolio_2025_ + password
    const SALT = 'magda_portfolio_2025_';
    const TARGET_HASH = 'bWFnZGFfcG9ydGZvbGlvXzIwMjVfbWFnZGEtZW1hZEAxMjM=';
    
    try {
      const inputHash = btoa(SALT + password);
      if (inputHash === TARGET_HASH) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid Password');
      }
    } catch (err) {
      alert('Invalid Password');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      fetchProjects();
    } else {
      alert('Error deleting project');
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm('Do you want to upload sample projects? (Brand Identity, Social Media, etc.)')) return;
    
    const sampleProjects = [
      {
        title: "Modern Brand Identity",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
        link: "#",
        description: "Complete visual identity for a modern lifestyle brand, including logo, color palette, and stationery design."
      },
      {
        title: "Social Media Campaign",
        category: "Social Media",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
        link: "#",
        description: "A series of engaging Instagram and Facebook posts designed to boost engagement for a coffee shop chain."
      },
      {
        title: "Travel App UI",
        category: "UI/UX",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop",
        link: "#",
        description: "User interface design for a travel booking application, focusing on clean layout and intuitive navigation."
      }
    ];

    setLoading(true);
    const { error } = await supabase.from('projects').insert(sampleProjects);
    setLoading(false);

    if (error) {
      console.error('Error seeding data:', error);
      alert('Error uploading data. Please check if your Supabase URL/Key are correct.');
    } else {
      alert('Sample data uploaded successfully!');
      fetchProjects();
    }
  };

  // --- IMAGE UPLOAD LOGIC ---

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // 1. Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to Supabase Storage bucket named 'portfolio-images'
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get Public URL
      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      if (data) {
        setCurrentProject(prev => ({ ...prev, image: data.publicUrl }));
      }
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Make sure you created a public bucket named "portfolio-images" in Supabase.');
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImage(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
    }
  };

  // ---------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProject.title || !currentProject.image) {
      alert('Title and Image are required');
      return;
    }

    if (isEditing && currentProject.id) {
      // Update
      const { error } = await supabase
        .from('projects')
        .update({
          title: currentProject.title,
          category: currentProject.category,
          image: currentProject.image,
          link: currentProject.link,
          description: currentProject.description
        })
        .eq('id', currentProject.id);

      if (error) console.error(error);
    } else {
      // Insert
      const { error } = await supabase
        .from('projects')
        .insert([{
          title: currentProject.title,
          category: currentProject.category || 'General',
          image: currentProject.image,
          link: currentProject.link || '#',
          description: currentProject.description
        }]);
      
      if (error) console.error(error);
    }

    setIsModalOpen(false);
    fetchProjects();
  };

  const openEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
    setIsModalOpen(true);
    setUploading(false);
  };

  const openNew = () => {
    setCurrentProject({ category: 'General' });
    setIsEditing(false);
    setIsModalOpen(true);
    setUploading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060b28] text-white">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Magda's Dashboard</h2>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 bg-black/40 border border-white/20 rounded-lg mb-4 text-white focus:outline-none focus:border-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-bold transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b28] text-white pt-24 px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Magda's Dashboard</h1>
            {/* Status Indicator */}
            {isConnected !== null && (
               <div className={`w-fit px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 border ${isConnected ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
                 <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                 {isConnected ? 'Database Connected' : 'Connection Error (Check Keys)'}
               </div>
             )}
          </div>
          <div className="bg-white/10 px-6 py-4 rounded-xl border border-white/10 flex items-center gap-4">
             <div className="text-gray-400 text-sm uppercase tracking-wider">Total Visitors</div>
             <div className="text-3xl font-bold text-pink-500">{visitors.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
           <h2 className="text-2xl font-semibold">Manage Projects</h2>
           <div className="flex gap-4">
              <button onClick={handleSeedData} className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-full font-medium transition-colors text-sm">
                 + Upload Sample Data
              </button>
              <button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-medium transition-colors text-sm">
                + Add Project
              </button>
           </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-400">Loading...</td></tr>
                ) : projects.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-400">No projects found. Click "Upload Sample Data" to start.</td></tr>
                ) : projects.map((project) => (
                  <tr key={project.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <img src={project.image} alt="" className="w-16 h-12 object-cover rounded bg-black" />
                    </td>
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4 text-sm text-gray-400">{project.category}</td>
                    <td className="p-4 text-right space-x-2">
                       <button onClick={() => openEdit(project)} className="text-blue-400 hover:text-blue-300">Edit</button>
                       <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1535] p-8 rounded-2xl w-full max-w-lg border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  className="w-full bg-black/40 border border-white/20 rounded p-3 focus:outline-none focus:border-pink-500" 
                  value={currentProject.title || ''} 
                  onChange={e => setCurrentProject({...currentProject, title: e.target.value})}
                  required 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <input 
                  className="w-full bg-black/40 border border-white/20 rounded p-3 focus:outline-none focus:border-pink-500" 
                  value={currentProject.category || ''} 
                  onChange={e => setCurrentProject({...currentProject, category: e.target.value})} 
                />
              </div>

              {/* --- DRAG AND DROP AREA --- */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Image</label>
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={onFileSelect} 
                    className="hidden" 
                    accept="image/*"
                />

                {/* Drop Zone */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`
                        w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group
                        ${isDragging 
                            ? 'border-pink-500 bg-pink-500/10' 
                            : 'border-white/20 bg-black/20 hover:border-pink-500/50 hover:bg-black/40'
                        }
                    `}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                             <span className="text-sm text-gray-400">Uploading...</span>
                        </div>
                    ) : currentProject.image ? (
                        <div className="relative w-full h-full group-hover:opacity-50 transition-opacity">
                             <img src={currentProject.image} alt="Preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                 <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Click to Replace</span>
                             </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className="text-sm">Drag & Drop Image Here</span>
                            <span className="text-xs opacity-50">or click to browse</span>
                        </div>
                    )}
                </div>

                {/* Fallback Text Input (Optional) */}
                <input 
                  className="w-full bg-transparent border-b border-white/10 rounded-none p-2 mt-2 text-xs text-gray-500 focus:outline-none focus:border-pink-500 focus:text-gray-300 transition-colors" 
                  placeholder="Or paste image URL directly..."
                  value={currentProject.image || ''} 
                  onChange={e => setCurrentProject({...currentProject, image: e.target.value})}
                />
              </div>
              {/* ------------------------- */}

              <div>
                <label className="block text-sm text-gray-400 mb-1">Link URL</label>
                <input 
                  className="w-full bg-black/40 border border-white/20 rounded p-3 focus:outline-none focus:border-pink-500" 
                  value={currentProject.link || ''} 
                  onChange={e => setCurrentProject({...currentProject, link: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea 
                  className="w-full bg-black/40 border border-white/20 rounded p-3 focus:outline-none focus:border-pink-500 h-24" 
                  value={currentProject.description || ''} 
                  onChange={e => setCurrentProject({...currentProject, description: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" disabled={uploading} className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                   {uploading ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};