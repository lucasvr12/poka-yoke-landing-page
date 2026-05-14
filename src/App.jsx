import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingDown, FileWarning, ArrowRight, ShieldCheck, Calculator, CheckCircle2, Calendar, Clock, Video } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  const [ingreso, setIngreso] = useState('');
  const [gasto, setGasto] = useState('');
  const [retorno, setRetorno] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [registered, setRegistered] = useState(false);

  const calcularRetorno = (e) => {
    e.preventDefault();
    const ingresoNum = parseFloat(ingreso.replace(/,/g, ''));
    const gastoNum = parseFloat(gasto.replace(/,/g, ''));
    
    if (ingresoNum && gastoNum >= 0) {
      const deduccionAdicionalPermitida = ingresoNum * 0.10;
      const beneficioFiscalMaximo = deduccionAdicionalPermitida * 0.35;
      setRetorno(beneficioFiscalMaximo);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegistered(true);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
  };

  return (
    <div className="min-h-screen bg-[#050A15] text-[#F8F9FA] overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0B132B]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center font-bold text-[#050A15]">E</div>
          <span className="text-xl font-bold tracking-tight text-white">Estrategia<span className="text-[#D4AF37]">Fiscal.</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#beneficios" className="hover:text-[#D4AF37] transition-colors">Beneficios</a>
          <a href="#webinar" className="hover:text-[#D4AF37] transition-colors">Webinar</a>
          <a href="#calculadora" className="hover:text-[#D4AF37] transition-colors">Calculadora</a>
        </div>
        <a href="#registro" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-full text-sm font-semibold transition-all">
          Inscribirme
        </a>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-bold mb-6">
            <Video size={16} /> WEBINAR EXCLUSIVO VÍA ZOOM
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Deja de regalar tu capital: <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-yellow-200">Recupera hasta el 35%</span> de tus impuestos.
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Aprende la estructura de inversión legal que permite que tu dinero trabaje para tu patrimonio, no para el gasto público. Registro abierto para nuestra sesión de 3 días.
          </motion.p>
          
          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
              <Calendar className="text-[#D4AF37] mb-2" size={24} />
              <span className="text-sm font-semibold text-white">Jueves, Viernes y Sábado</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
              <Clock className="text-[#D4AF37] mb-2" size={24} />
              <span className="text-sm font-semibold text-white">12:00 PM (CDMX)</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center">
              <Video className="text-[#D4AF37] mb-2" size={24} />
              <span className="text-sm font-semibold text-white">Acceso vía Zoom</span>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#registro" className="bg-[#D4AF37] hover:bg-yellow-500 text-[#050A15] px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2">
              Asegurar mi Lugar Ahora <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Problema Section */}
      <section id="beneficios" className="py-20 px-6 md:px-12 bg-[#080d1c]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">El error técnico que te cuesta <span className="text-red-400">miles de pesos al año.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">La mayoría de los profesionistas y empresarios cometen errores sistemáticos en su planeación patrimonial por falta de información estratégica.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="bg-[#0B132B]/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-red-500/30 transition-colors group">
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <TrendingDown className="text-red-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Fuga de Liquidez</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Pagar impuestos que legalmente podrías deducir es equivalente a una fuga de capital constante que merma tu capacidad de ahorro.</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-[#0B132B]/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-colors group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                <ShieldAlert className="text-[#D4AF37]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Costo de Oportunidad</h3>
              <p className="text-gray-400 text-sm leading-relaxed">El dinero entregado al fisco sin estrategia deja de generar interés compuesto. Cada año perdido representa millones en tu futuro.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-[#0B132B]/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <FileWarning className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Doble Tributación</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Invertir sin estructura fiscal significa que tus rendimientos también pagarán impuestos, reduciendo drásticamente tu utilidad real.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Webinar Details Section */}
      <section id="webinar" className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Lo que aprenderás en el <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-yellow-200">Webinar de Estrategia Élite.</span>
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Te revelaremos la metodología que utilizan los grandes patrimonios para asegurar retornos inmediatos vía devolución del SAT y crecimiento exento de impuestos.
            </p>
            
            <ul className="space-y-4">
              {[
                "Uso estratégico de los Art. 151 y 185 de la LISR.",
                "Cómo obtener devoluciones de hasta el 35% en efectivo.",
                "Portafolios de inversión con beneficios fiscales integrados.",
                "Planificación de retiro con rendimientos 100% libres de impuestos."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#D4AF37] mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#0B132B]/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-3xl -z-10"></div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <ShieldCheck className="text-[#D4AF37]" /> Beneficio Fiscal Ilustrativo
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-gray-300">
                    <span>Aportación Estratégica</span>
                    <span className="text-white">$100,000</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2 text-gray-300">
                    <span>Devolución Estimada (35%)</span>
                    <span className="text-[#D4AF37] font-bold">+$35,000</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] w-[35%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * El retorno exacto depende de tu nivel de ingresos anuales y tu régimen fiscal actual.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registro Section */}
      <section id="registro" className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#080d1c] to-[#050A15]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-[#0B132B]/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-t-2 border-t-[#D4AF37]/30 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {!registered ? (
              <>
                <div className="text-center mb-10">
                  <Video className="mx-auto text-[#D4AF37] mb-4" size={48} />
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Registro al Webinar Gratis</h2>
                  <p className="text-gray-300">Reserva tu acceso para este Jueves, Viernes y Sábado a las 12:00 PM.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Tu nombre"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="tu@email.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp (Opcional para recordatorio)</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Número de celular"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-[#D4AF37] text-[#050A15] font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all text-lg shadow-lg"
                  >
                    Confirmar mi Registro
                  </button>
                  <p className="text-center text-xs text-gray-500">Recibirás el enlace de Zoom en tu correo electrónico.</p>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500" size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">¡Registro Exitoso!</h2>
                <p className="text-gray-300 mb-8">Te hemos enviado los detalles y el enlace de Zoom a <strong>{formData.email}</strong>.</p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 inline-block">
                  <p className="text-sm font-semibold text-[#D4AF37]">Agéndalo: 12:00 PM (CDMX)</p>
                  <p className="text-xs text-gray-400">Jueves, Viernes y Sábado</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Calculadora Section */}
      <section id="calculadora" className="py-20 px-6 md:px-12 bg-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Calculator className="mx-auto text-[#D4AF37] mb-4" size={40} />
            <h2 className="text-3xl font-bold mb-3 text-white">Calculadora de Retorno</h2>
            <p className="text-gray-400">Descubre cuánto dinero podrías recuperar si implementas una estrategia este año.</p>
          </div>

          <div className="bg-[#0B132B]/40 border border-white/10 rounded-3xl p-8">
            <form onSubmit={calcularRetorno} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ingreso Anual Estimado (MXN)</label>
                  <input 
                    type="number" 
                    value={ingreso}
                    onChange={(e) => setIngreso(e.target.value)}
                    placeholder="Ej. 1500000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gasto Deducible Actual (MXN)</label>
                  <input 
                    type="number" 
                    value={gasto}
                    onChange={(e) => setGasto(e.target.value)}
                    placeholder="Ej. 50000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-white text-[#050A15] font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-lg"
              >
                Calcular Retorno Potencial
              </button>
            </form>

            {retorno !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
              >
                <p className="text-sm text-green-400 font-semibold mb-2">Retorno Máximo Estimado:</p>
                <p className="text-4xl font-extrabold text-white">{formatCurrency(retorno)}</p>
                <p className="text-xs text-gray-400 mt-3">Basado en optimización fiscal de retiro y gastos personales deducibles.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-6 md:px-12 bg-[#03060c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#D4AF37] flex items-center justify-center font-bold text-[#050A15] text-xs">E</div>
              <span className="text-lg font-bold text-white">Estrategia Fiscal.</span>
            </div>
            <p className="text-xs text-gray-500">Ingeniería Financiera & Planeación Patrimonial.</p>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Estrategia Fiscal. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
