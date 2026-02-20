/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  Calendar, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  User, 
  Stethoscope,
  ChevronDown,
  Plus
} from 'lucide-react';

// --- Types ---

type Screen = 'home' | 'schedule_step1' | 'availability' | 'confirmation' | 'confirmed' | 'my_appointments';

interface Appointment {
  id: string;
  week: string;
  type: string;
  center: string;
  date: string;
  time: string;
  doctor: string;
}

// --- Components ---

const Header = ({ title, onBack, showLogo = true }: { title?: string, onBack?: () => void, showLogo?: boolean }) => (
  <header className="flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-10">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
      )}
      {title && <h1 className="text-xl font-bold text-slate-800">{title}</h1>}
    </div>
    {showLogo && (
      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=100&h=100" 
          alt="Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    )}
  </header>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [formData, setFormData] = useState<Partial<Appointment>>({
    week: '',
    type: 'Control regular',
    center: '',
    date: '',
  });
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Mock data for centers
  const centers = ["Hospital Rebagliati", "Hospital Almenara", "Centro de Salud Milagros", "R Castilla", "Grau"];
  const doctors = ["Garay, P.", "Mendoza, L.", "Sánchez, R."];

  const handleNext = (next: Screen) => {
    setCurrentScreen(next);
  };

  const confirmAppointment = () => {
    const newApp: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      week: formData.week || '12',
      type: formData.type || 'Control regular',
      center: selectedSlot?.center || formData.center || 'Hospital Rebagliati',
      date: selectedSlot?.date || '25 de Enero',
      time: selectedSlot?.time || '16:00 PM',
      doctor: selectedSlot?.doctor || 'Garay, P.',
    };
    setAppointments([...appointments, newApp]);
    setCurrentScreen('confirmed');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col p-6 items-center justify-center text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="bg-primary px-6 py-2 rounded-lg inline-block">
                <h1 className="text-3xl font-bold text-white">Vida Materna</h1>
              </div>
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                   <img 
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-primary">Citas Prenatales</h2>

            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-primary-light/30 rounded-full animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Pregnant woman" 
                className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-slate-600 leading-relaxed max-w-xs">
              Gestiona tus controles prenatales de manera rápida y segura. 
              Agenda nuevas citas o revisa las que ya tienes programadas.
            </p>

            <div className="w-full space-y-4 pt-4">
              <button 
                onClick={() => handleNext('schedule_step1')}
                className="btn-primary w-full text-lg"
              >
                AGENDAR NUEVA CITA
              </button>
              <button 
                onClick={() => handleNext('my_appointments')}
                className="btn-outline w-full text-lg"
              >
                VER MIS CITAS PROGRAMADAS
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'schedule_step1' && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col bg-white"
          >
            <Header title="Agendar Cita" onBack={() => setCurrentScreen('home')} />
            
            <div className="p-6 space-y-8 overflow-y-auto">
              <section className="space-y-3">
                <label className="text-lg font-bold text-slate-700 block">Semana de embarazo</label>
                <div className="relative">
                  <select 
                    className="input-field appearance-none pr-10 bg-primary/10"
                    value={formData.week}
                    onChange={(e) => setFormData({...formData, week: e.target.value})}
                  >
                    <option value="">Selecciona la semana</option>
                    {Array.from({length: 40}, (_, i) => i + 1).map(w => (
                      <option key={w} value={w}>Semana {w}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                </div>
                <p className="text-xs text-slate-400">Ayuda a priorizar el tipo de control según etapa de gestación</p>
              </section>

              <section className="space-y-4">
                <label className="text-lg font-bold text-slate-700 block">Tipo de cita</label>
                <div className="space-y-3">
                  {[
                    { id: 'Control regular', desc: 'Seguimiento estándar del embarazo' },
                    { id: 'Alto riesgo', desc: 'Control especializado con mayor duración' },
                    { id: 'Ecografía', desc: 'Examen de ultrasonido obstétrico' }
                  ].map((type) => (
                    <div 
                      key={type.id}
                      onClick={() => setFormData({...formData, type: type.id})}
                      className={`radio-card ${formData.type === type.id ? 'selected' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${formData.type === type.id ? 'border-primary' : 'border-slate-300'}`}>
                        {formData.type === type.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{type.id}</p>
                        <p className="text-xs text-slate-500">{type.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400">El tipo de cita define la duración y requisitos</p>
              </section>

              <section className="space-y-3">
                <label className="text-lg font-bold text-slate-700 block">Establecimiento de salud</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Buscar establecimiento (nombre o distrito)"
                    className="input-field pl-12 bg-primary/10"
                    value={formData.center}
                    onChange={(e) => setFormData({...formData, center: e.target.value})}
                  />
                </div>
              </section>

              <section className="space-y-3">
                <label className="text-lg font-bold text-slate-700 block">Fecha tentativa</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <input 
                    type="date" 
                    className="input-field pl-12 bg-primary/10"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <p className="text-xs text-slate-400">La disponibilidad dependerá del establecimiento y el tipo de cita</p>
              </section>

              <button 
                onClick={() => handleNext('availability')}
                className="btn-primary w-full mt-4"
              >
                BUSCAR DISPONIBILIDAD
              </button>
            </div>
          </motion.div>
        )}

        {currentScreen === 'availability' && (
          <motion.div 
            key="availability"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col bg-white"
          >
            <Header title="Disponibilidad" onBack={() => setCurrentScreen('schedule_step1')} />
            
            <div className="bg-primary/50 p-4 text-center">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Resultados de Disponibilidad</h2>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-slate-50/50">
              <div className="relative rounded-2xl overflow-hidden h-40 mb-4 shadow-md border-2 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&h=400" 
                  alt="Maternity Care" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-start p-4">
                  <p className="text-white text-sm font-bold drop-shadow-md">Encuentra el mejor horario para ti y tu bebé</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Row 1: Fecha y Hora */}
                <div className="flex gap-2 items-stretch">
                  <div className="w-1/3 bg-[#f5e6e6] p-4 rounded-xl flex flex-col justify-center items-center text-center border border-slate-200 shadow-sm">
                    <Calendar className="w-5 h-5 text-primary mb-1" />
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">FECHA<br/>Y HORA:</p>
                  </div>
                  <div className="flex-1 bg-[#fce4ec] p-4 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm relative">
                    <p className="font-bold text-slate-700">25 enero<br/>16:00 PM</p>
                    <div className="h-full w-px bg-slate-300 mx-4" />
                    <ChevronDown className="text-slate-400 w-6 h-6" />
                  </div>
                </div>

                {/* Row 2: Médico */}
                <div className="flex gap-2 items-stretch">
                  <div className="w-1/3 bg-[#f5e6e6] p-4 rounded-xl flex flex-col justify-center items-center text-center border border-slate-200 shadow-sm">
                    <User className="w-5 h-5 text-primary mb-1" />
                    <p className="text-[10px] font-bold text-slate-700">MÉDICO</p>
                  </div>
                  <div className="flex-1 bg-[#fce4ec] p-4 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
                    <p className="font-bold text-slate-700">Garay, P.</p>
                    <div className="h-full w-px bg-slate-300 mx-4" />
                    <ChevronDown className="text-slate-400 w-6 h-6" />
                  </div>
                </div>

                {/* Row 3: Centro de Salud */}
                <div className="flex gap-2 items-start">
                  <div className="w-1/3 bg-[#f5e6e6] p-4 rounded-xl flex flex-col justify-center items-center text-center border border-slate-200 shadow-sm min-h-[80px]">
                    <MapPin className="w-5 h-5 text-primary mb-1" />
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">CENTRO<br/>DE SALUD</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="bg-[#fce4ec] p-4 rounded-xl flex items-center justify-between border border-slate-200 shadow-sm">
                      <div className="h-px w-12 bg-slate-600" />
                      <div className="h-full w-px bg-slate-300 mx-4" />
                      <ChevronDown className="text-slate-400 w-6 h-6" />
                    </div>
                    <div className="bg-[#fce4ec] rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                      {["Milagros", "R Castilla", "Grau"].map((c, idx) => (
                        <div 
                          key={c} 
                          className={`p-3 text-center text-slate-700 font-bold hover:bg-primary/10 cursor-pointer ${idx !== 2 ? 'border-b border-slate-300' : ''}`}
                          onClick={() => setFormData({...formData, center: c})}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <button 
                  onClick={() => {
                    setSelectedSlot({
                      date: "25 de Enero",
                      time: "16:00 PM",
                      doctor: "Garay, P.",
                      center: formData.center || "Hospital Rebagliati"
                    });
                    handleNext('confirmation');
                  }}
                  className="btn-primary w-full text-lg uppercase tracking-wide"
                >
                  CONFIRMAR ELECCIÓN
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentScreen === 'confirmation' && (
          <motion.div 
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex-1 flex flex-col bg-white"
          >
            <Header title="Vida Materna" onBack={() => setCurrentScreen('availability')} />
            
            <div className="bg-primary/40 p-4 text-center">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Confirmación de Cita</h2>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1584515159913-67c27a6c22e7?auto=format&fit=crop&q=80&w=600&h=400" 
                  alt="Doctor and patient" 
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-full shadow-md">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Plus className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-700">Por favor, revisa los detalles de tu cita</h3>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Fecha y Hora', value: `${selectedSlot?.date} - ${selectedSlot?.time}` },
                  { label: 'Centro de salud', value: selectedSlot?.center },
                  { label: 'Tipo de cita', value: formData.type },
                  { label: 'Obstetra a cargo', value: selectedSlot?.doctor }
                ].map((item) => (
                  <div key={item.label} className="bg-primary-light/40 p-3 rounded-xl border border-primary/10">
                    <p className="text-slate-700 font-medium">
                      <span className="font-bold">{item.label}:</span> {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <button 
                  onClick={confirmAppointment}
                  className="btn-primary w-full"
                >
                  CONFIRMAR CITA
                </button>
                <button 
                  onClick={() => setCurrentScreen('schedule_step1')}
                  className="btn-outline w-full"
                >
                  REGRESAR Y CAMBIAR DATOS
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentScreen === 'confirmed' && (
          <motion.div 
            key="confirmed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col bg-white"
          >
            <div className="bg-primary/40 p-4 text-center">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Cita Confirmada</h2>
            </div>

            <div className="p-8 flex-1 flex flex-col items-center text-center space-y-8 overflow-y-auto">
              <div className="w-20 h-20 bg-primary/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>

              <h3 className="text-2xl font-bold text-slate-700">Tu cita ha sido programada con éxito</h3>

              <div className="w-full space-y-3">
                {[
                  { label: 'Fecha y Hora', value: `${selectedSlot?.date} - ${selectedSlot?.time}` },
                  { label: 'Obstetra', value: selectedSlot?.doctor },
                  { label: 'Ubicación', value: selectedSlot?.center }
                ].map((item) => (
                  <div key={item.label} className="bg-primary-light/40 p-3 rounded-xl border border-primary/10 text-left">
                    <p className="text-slate-700 font-medium">
                      <span className="font-bold">{item.label}:</span> {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full space-y-4">
                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary-light rounded-2xl text-primary font-bold hover:bg-primary-light/20 transition-all">
                  <ChevronLeft className="w-5 h-5" /> ABRIR MAPA <ChevronLeft className="w-5 h-5 rotate-180" />
                </button>
                <button className="btn-primary w-full bg-primary/60">
                  AÑADIR AL CALENDARIO
                </button>
                <button 
                  onClick={() => setCurrentScreen('home')}
                  className="btn-primary w-full"
                >
                  VOLVER AL INICIO
                </button>
              </div>

              <div className="pt-4 space-y-1">
                <p className="text-slate-500 italic">"Recuerda llegar 15 min antes"</p>
                <p className="text-slate-500 italic">"Traer DNI y carnet"</p>
              </div>

              <div className="pt-8 flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary-light rounded-full p-2">
                   <img 
                    src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Vida Materna Logo" 
                    className="w-full h-full object-contain opacity-50"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-primary font-bold tracking-widest text-xs uppercase">Vida Materna</p>
              </div>
            </div>
          </motion.div>
        )}

        {currentScreen === 'my_appointments' && (
          <motion.div 
            key="my_appointments"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex-1 flex flex-col bg-white"
          >
            <Header title="Mis Citas" onBack={() => setCurrentScreen('home')} />
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              {appointments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <Calendar className="w-16 h-16 text-slate-200" />
                  <p className="text-slate-400 font-medium">No tienes citas programadas aún.</p>
                  <button 
                    onClick={() => setCurrentScreen('schedule_step1')}
                    className="btn-outline text-sm py-2"
                  >
                    Agendar ahora
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((app) => (
                    <div key={app.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
                      
                      <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-primary font-bold">
                            <Calendar className="w-4 h-4" />
                            <span>{app.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{app.time}</span>
                          </div>
                        </div>
                        <div className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full">
                          Semana {app.week}
                        </div>
                      </div>

                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-slate-400" />
                          </div>
                          <p className="text-slate-700 font-medium">{app.center}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-400" />
                          </div>
                          <p className="text-slate-700 font-medium">{app.doctor}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-slate-400" />
                          </div>
                          <p className="text-slate-700 font-medium">{app.type}</p>
                        </div>
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button className="flex-1 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors">
                          REPROGRAMAR
                        </button>
                        <button className="flex-1 py-2 bg-red-50 text-red-400 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors">
                          CANCELAR
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-6">
              <button 
                onClick={() => setCurrentScreen('schedule_step1')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> AGENDAR OTRA CITA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="p-4 text-center bg-white border-t border-slate-50">
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Vida Materna &copy; 2026</p>
      </footer>
    </div>
  );
}
