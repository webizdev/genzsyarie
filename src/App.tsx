/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  MapPin as AddressIcon, 
  CheckCircle, 
  Send,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import ferryImage from '../assets/Ferry Gunawan.jpeg';
import syamsirImage from '../assets/Syamsir Bauru.jpeg';
import htmrateImage from '../assets/htmrate.png';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-24 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-black tracking-tighter text-white">
          GS<span className="text-brand-accent">.</span>
        </div>
        <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
        <div className="hidden sm:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">GENZ SYAR'IE</p>
          <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest leading-none mt-1">Syababul Ummah</p>
        </div>
      </div>
      <div className="flex gap-10 items-center">
        <a href="#speakers" className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-brand-accent transition-colors hidden md:block">The Mentors</a>
        <a href="#register" className="neo-button !py-3 !px-8 !text-[11px] !font-bold">Register Now</a>
      </div>
    </div>
  </nav>
);

const SpeakerCard = ({ name, title, role, image }: { name: string, title: string, role: string, image: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="relative aspect-[3/4] overflow-hidden bg-brand-surface border-2 border-white/5 transition-all duration-700">
      <img src={image} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-8">
        <div className="mb-4 inline-block bg-brand-accent text-black text-[9px] font-black px-3 py-1 uppercase tracking-widest">{role}</div>
        <h3 className="font-serif text-4xl font-bold text-white group-hover:text-brand-accent transition-colors leading-tight italic">{name}</h3>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mt-2">{title}</p>
      </div>
    </div>
  </motion.div>
);

const InfoBox = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="group p-10 bg-brand-surface border-2 border-white/5 hover:border-brand-accent/30 transition-all">
    <div className="w-12 h-12 bg-brand-accent flex items-center justify-center text-black mb-8 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">{label}</p>
    <p className="text-2xl font-bold text-white uppercase tracking-tighter italic">{value}</p>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({ name: '', whatsapp: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          whatsapp_number: formData.whatsapp,
          corporate_address: formData.address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.message || 'Terjadi kesalahan saat menyimpan data');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Pastikan server backend berjalan.');
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6 md:px-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/10 blur-[180px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent">2026 VVIP SUMMIT</span>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>

            <div className="grid lg:grid-cols-12 gap-20">
              <div className="lg:col-span-8">
                <h1 className="text-[75px] md:text-[120px] font-black tracking-tighter leading-[0.8] mb-12 uppercase italic text-white">
                  SYIRKAH <br />
                  <span className="text-outline">BISNIS MASTERY</span>
                </h1>
                
                <div className="max-w-2xl">
                  <p className="text-xl md:text-3xl text-white/80 leading-relaxed mb-16 font-medium italic font-serif border-l-4 border-brand-accent pl-8">
                    "Solusi Islam Mengembangkan Harta. Agar selamat dunia akhirat, tidak ada pilihan lain dalam berbisnis, kecuali terikat dengan Syariat Allah."
                  </p>
                  
                  <div className="flex flex-wrap gap-8 items-center">
                    <a href="#register" className="neo-button text-sm">
                      Daftar Sekarang & Amankan Bisnis Anda
                    </a>
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-bg bg-brand-surface flex items-center justify-center overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Attendee" />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-4 border-brand-bg bg-brand-accent flex items-center justify-center text-black text-[10px] font-black">
                        +120
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 hidden lg:block">
                <div className="p-10 border-2 border-white/5 bg-brand-surface/50 h-full flex flex-col justify-between">
                  <div>
                    <TrendingUp className="text-brand-accent mb-6" size={40} />
                    <p className="text-4xl font-black italic tracking-tighter mb-4 text-white uppercase">Vision.</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 leading-relaxed">
                      Mengembangkan harta dengan keberkahan melalui akad syar'i yang kokoh.
                    </p>
                  </div>
                  <div className="pt-10 border-t border-white/5">
                    <ShieldCheck className="text-brand-accent mb-6" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 leading-relaxed">
                      Sertifikasi kompetensi muamalah standar Genz Syar'ie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agitation Section */}
      <section className="px-6 md:px-10 py-20 md:py-32 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter italic leading-none text-white mb-6">Berapa Lama <br /> <span className="text-outline text-red-500/80">Waktu Kita.</span></h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20">
            <div className="space-y-12">
              {[
                { q: "Bagaimana kalao tidak terikat dgn HUKUM SYARIAT?", icon: Zap },
                { q: "Sudahkah bisnis Anda siap menghadapi pertanyaan pertanggungjawaban harta di akhirat?", icon: ShieldCheck },
                { q: "Apakah Anda pengusaha yang pintar penambahan, pintar perkalian tapi lupa pembagian?", icon: TrendingUp }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 shrink-0 bg-brand-bg border-2 border-red-500/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-black transition-all">
                    <item.icon size={24} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-white/80 leading-snug group-hover:text-white transition-colors uppercase italic tracking-tighter">
                    {item.q}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="p-12 border-2 border-white/5 glass-card relative overflow-hidden flex items-center">
              <div className="absolute top-0 right-0 p-8">
                <Clock className="text-red-500/20" size={120} />
              </div>
              <p className="text-3xl font-serif italic text-white leading-relaxed relative z-10">
                Di akhirat kelak, kita akan dimintai pertanggungjawaban tentang harta kita: "DARI MANA DIPEROLEHNYA DAN KE MANA DIBELANJAKANNYA".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 md:px-10 py-24 md:py-48 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-32 items-center">
            <div className="bg-brand-surface p-4 border border-white/10 rounded-2xl aspect-[4/5] relative">
              <img src={htmrateImage} alt="Syirkah Discussion" className="w-full h-full object-cover rounded-xl transition-all duration-700 opacity-90 hover:opacity-100 hover:scale-105" />
            </div>
            
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-12 text-white leading-none">Mengapa Kita <br /> <span className="text-brand-accent underline decoration-4 underline-offset-8">Berbisnis?</span></h2>
              <div className="space-y-10">
                <p className="text-2xl text-white font-bold italic uppercase tracking-tighter leading-tight">"Karena itu perintah dari Allah SWT. Bisnis Islami adalah orientasi masa depan."</p>
                <div className="h-[1px] w-24 bg-brand-accent"></div>
                <p className="text-white/60 leading-relaxed text-xl font-medium">
Hadirilah kelas eksklusif <strong className="text-brand-accent italic font-serif">"SYIRKAH BISNIS MASTERY"</strong> untuk membedah tuntas bagaimana menjalankan usaha patungan yang berkah, aman, dan menguntungkan.
                </p>
                
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-white/5">
                  <div className="flex gap-4">
                    <Calendar className="text-brand-accent shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">SUMMIT DATE</p>
                      <p className="text-white font-bold tracking-tighter italic uppercase text-lg">Sunday, 03 May</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="text-brand-accent shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">TIME</p>
<p className="text-white font-bold tracking-tighter italic uppercase text-lg">08.00 - 14.00 WITA</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="text-brand-accent shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1">LOCATION</p>
                      <p className="text-white font-bold tracking-tighter italic uppercase text-lg">Aston Hotel Samarinda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum / Materials */}
      <section className="px-6 md:px-10 py-24 md:py-48 bg-brand-surface/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-32 text-center">
            <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter italic leading-none text-white">WHAT YOU <br /> <span className="text-outline text-brand-accent/40">WILL LEARN.</span></h2>
            <div className="h-1 w-32 bg-brand-accent mx-auto mt-12"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Kunci Bisnis Islami", desc: "Paham hukum tentang akad muamalah yang dilakukan secara mendalam." },
              { title: "5 Jenis Syirkah", desc: "Membedah Syirkah Inan, Abdan, Mudharabah, Wujuh, dan Mufawadhah." },
              { title: "Aturan Bagi Hasil Adil", desc: "Memahami kaidah fiqih kerugian sesuai modal & keuntungan sesuai kesepakatan." },
              { title: "2 Modal Penting", desc: "Amanah dan Kafaah sebagai pondasi utama memulai kemitraan." },
              { title: "9 Kesalahan Bersyirkah", desc: "Membongkar kesalahan umum, termasuk pengelola yang tidak boleh digaji." },
              { title: "Manajemen Risiko Syar'i", desc: "Menyepakati ketentuan jika terjadi permasalahan atau pembubaran syirkah." }
            ].map((item, idx) => (
              <div key={idx} className="group p-6 md:p-12 border border-white/5 hover:border-brand-accent/40 glass-card transition-all flex flex-col rounded-2xl">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 md:mb-8 group-hover:bg-brand-accent group-hover:text-black transition-all duration-500">
                  <CheckCircle size={24} className="md:w-8 md:h-8" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tighter italic">{item.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="px-6 md:px-10 py-24 md:py-40">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-24">
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter italic leading-none text-white mb-6">MASTER <br /> <span className="text-outline">FACULTY.</span></h2>
          <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">Expert Mentors from Panglima Group & Humble Presenter Akademisi Samarinda</p>
        </div>
          
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10">
          <SpeakerCard 
            name="Ferry Gunawan"
            title="OWNER — PANGLIMA GROUP"
role="Muslimprenuer Coach"
            image={ferryImage}
          />
          <SpeakerCard 
            name="Syamsir Bauru"
title="akademisi"
role="Presenter"
            image={syamsirImage}
          />
        </div>
      </section>

      {/* Final CTA / Registration */}
      <section id="register" className="px-6 md:px-10 py-24 md:py-48 bg-brand-surface/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-32">
          <div>
            <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter italic mb-8 md:mb-12 text-white leading-none text-red-500/80">LAST <br /> <span className="text-brand-accent">SEATS.</span></h2>
            <div className="space-y-6 md:space-y-8 mb-10 md:mb-16">
              <p className="text-xl md:text-2xl text-white italic font-bold uppercase tracking-tighter leading-tight">
                "Syirkah itu bisa dibentuk, bisa untung, bisa rugi dan bisa juga bubar. Jangan pertaruhkan harta dan akhirat Anda karena ketidaktahuan."
              </p>
              <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">
                Mari belajar ilmunya sebelum mulai amal usahanya!
              </p>
            </div>
            
            <div className="flex items-center gap-6 p-6 md:p-8 border-2 border-brand-accent/20 bg-brand-accent/5">
              <Phone className="text-brand-accent" size={32} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-brand-accent">Pendaftaran & Info</p>
                <p className="text-xl md:text-2xl font-black text-white tracking-tighter">0852-4702-8543</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 bg-brand-surface p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 ml-1">Full Name / Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your full name"
                    className="industrial-input !bg-brand-bg/50"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 ml-1">WhatsApp Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+62"
                    className="industrial-input !bg-brand-bg/50"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 ml-1">Corporate Address / Domisili</label>
                  <textarea 
                    required
                    rows={2} 
                    placeholder="Enter your business address"
                    className="industrial-input !bg-brand-bg/50 resize-none"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>
                  </div>
                )}

                <div className="pt-6">
                  <button 
                    disabled={isSubmitting}
                    className="neo-button w-full flex items-center justify-center gap-4 disabled:opacity-50 text-base"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Amankan Kursi Saya Sekarang! <Send size={20} /></>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-accent p-10 md:p-20 rounded-3xl text-black text-center shadow-[0_0_50px_rgba(197,160,89,0.2)]"
              >
                <CheckCircle size={60} className="md:w-20 md:h-20 mx-auto mb-6 md:mb-8" />
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic mb-4 md:mb-6">RESERVED.</h3>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed mb-8 md:mb-12">
                  Terima kasih <strong>{formData.name}</strong>. Tim pendaftaran akan segera menghubungi Anda melalui WhatsApp untuk proses verifikasi.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-black text-white px-8 md:px-10 py-3 md:py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-xl"
                >
                  Registrasi Lagi
                </button>
              </motion.div>
            )}
            
            {/* Visual Flair */}
            <div className="absolute -top-10 -right-10 w-24 h-24 border-t-4 border-r-4 border-brand-accent -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 border-b-4 border-l-4 border-brand-accent -z-10"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-12 md:py-20 border-t border-white/5 bg-brand-surface">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-black tracking-tighter text-white">GS<span className="text-brand-accent">.</span></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">"Syirkah Bisnis Mastery"</p>
          </div>
          
          <div className="flex gap-12 font-black uppercase tracking-widest text-[10px] text-white/40">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Compliance</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Support</a>
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">© 2026 GENZ SYAR'IE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
