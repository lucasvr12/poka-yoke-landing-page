import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, ArrowRight, Calculator, CheckCircle2, AlertCircle, Building2, Scale, Clock, FileWarning, HelpCircle } from 'lucide-react';
import logoVero from '../assets/Logo vero .png';

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
  const [aportacion, setAportacion] = useState('');
  const [anos, setAnos] = useState('10');
  const [proyeccion, setProyeccion] = useState(null);
  const [banco, setBanco] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calcularInteresCompuesto = (e) => {
    e.preventDefault();
    const P = parseFloat(aportacion.replace(/,/g, ''));
    const t = parseInt(anos);
    
    if (P > 0 && t > 0) {
      // 14.9% histórico (S&P 500 / Nasdaq)
      const r_allianz = 0.149;
      // Banco tradicional ~ 4%
      const r_banco = 0.04;
      const n = 12; // Mensual

      const totalAllianz = P * ((Math.pow(1 + r_allianz/n, n * t) - 1) / (r_allianz/n));
      const totalBanco = P * ((Math.pow(1 + r_banco/n, n * t) - 1) / (r_banco/n));

      setProyeccion(totalAllianz);
      setBanco(totalBanco);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const url = "https://script.google.com/macros/s/AKfycbwcdkX3mrHMFZKWQ_wzzxCDoDpV232p5P4g0LjaU_KUjIjkD9rrJOJxl1_glZHPyGOTkg/exec";
    
    const formParams = new URLSearchParams();
    formParams.append("name", formData.name);
    formParams.append("email", formData.email);
    formParams.append("phone", formData.phone);

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formParams,
      });
      setRegistered(true);
    } catch (error) {
      console.error("Error al registrar", error);
      alert("Ocurrió un error. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <img src={logoVero} alt="Allianz OptiMaxx Plus" className="h-16 md:h-20 object-contain" />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#estrategia" className="hover:text-allianz transition-colors">Estrategia Fiscal</a>
          <a href="#simulador" className="hover:text-allianz transition-colors">Simulador</a>
          <a href="#institucional" className="hover:text-allianz transition-colors">Estructura Institucional</a>
        </div>
        <a href="#registro" className="bg-allianz hover:bg-blue-800 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-md">
          Reservar Auditoría
        </a>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 relative bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5 pointer-events-none -z-10">
          <div className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-allianz blur-[150px]"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-allianz text-sm font-bold mb-6 tracking-wide">
            <Building2 size={16} /> HERRAMIENTA DE AUDITORÍA PATRIMONIAL
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
            No estás ahorrando, estás <br className="hidden md:block" />
            <span className="text-allianz">recuperando el capital que el SAT te retiene.</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Blindaje patrimonial exento de impuestos y protección contra la hiperinflación médica (14.8% en 2026) diseñada exclusivamente para la generación de la Ley 97.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a href="#registro" className="bg-allianz hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              Asegurar plaza en la Auditoría Fiscal Traduccional <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Fricción Positiva & Comparativa */}
      <section id="estrategia" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-slate-50 border-l-4 border-allianz p-6 md:p-8 rounded-r-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="text-allianz flex-shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cláusula de Calificación</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Este análisis y estrategia patrimonial está reservado exclusivamente para perfiles con capacidad de aportación y compromiso mensual de entre <strong>$2,000 y $10,000 MXN</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">El Oráculo Contable: Impacto según tu Régimen</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Beneficios diseñados para capitalizar la ley fiscal mexicana a tu favor.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <Scale className="text-allianz" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Asalariados (Art. 151 LISR)</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-allianz mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-600"><strong>Deducción Inmediata:</strong> Reduce tu base gravable año con año.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-allianz mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-600"><strong>Optimización de Saldo a Favor:</strong> Las aportaciones se reflejan en tu declaración anual, generando devoluciones reales de efectivo por parte del SAT.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="text-slate-700" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">RESICO / Independientes (Art. 93 LISR)</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-slate-700 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-600"><strong>Exención Total de Impuestos:</strong> Al llegar a los 60 años, todo el capital acumulado y sus rendimientos son 100% libres de retenciones.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-slate-700 mt-1 flex-shrink-0" size={20} />
                  <span className="text-slate-600"><strong>Protección de Rendimientos:</strong> Maximiza el interés compuesto sin la carga tributaria sobre tus ganancias durante el periodo de acumulación.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manejo de Objeciones (Doble Guillotina) */}
      <section id="institucional" className="py-20 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Estructura Institucional: Transparencia Total</h2>
            <p className="text-slate-600">Conoce los mecanismos de protección de tu contrato.</p>
          </div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-allianz" /> La "Vacuna Conductual" (Primeros 18 meses)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                El compromiso obligatorio de los primeros 18 meses no es una penalización. Es un <strong>mecanismo de protección automatizado</strong> diseñado para blindar tu capital contra decisiones precipitadas derivadas de la volatilidad emocional del mercado. Garantiza que tu estrategia cruce el umbral necesario para activar el efecto del interés compuesto.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="text-allianz" /> El "Periodo de Descanso" (Flexibilidad real)
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Entendemos que los ingresos varían. Por ello, a partir del mes 18, tu contrato activa una válvula de escape: tienes el derecho contractual de <strong>pausar tus aportaciones hasta por 12 meses</strong>. Tu capital acumulado seguirá generando rendimientos sin obligación de pagos inmediatos durante fluctuaciones financieras personales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simulador Interactivo */}
      <section id="simulador" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="mx-auto text-allianz mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Simulador de Interés Compuesto</h2>
            <p className="text-slate-600 text-lg">Proyección basada en el 14.9% histórico (S&P 500 / Nasdaq).</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <form onSubmit={calcularInteresCompuesto} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Aportación Mensual (MXN)</label>
                  <input 
                    type="number" 
                    value={aportacion}
                    onChange={(e) => setAportacion(e.target.value)}
                    placeholder="Ej. 3000"
                    min="2000"
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-2">Mínimo sugerido: $2,000 MXN</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Plazo de Proyección (Años)</label>
                  <select 
                    value={anos}
                    onChange={(e) => setAnos(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors"
                  >
                    <option value="10">10 Años</option>
                    <option value="15">15 Años</option>
                    <option value="20">20 Años</option>
                    <option value="25">25 Años</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-allianz text-white font-bold py-4 rounded-md hover:bg-blue-800 transition-colors text-lg shadow-md"
              >
                Proyectar Capital
              </button>
            </form>

            {proyeccion !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 grid md:grid-cols-2 gap-6"
              >
                <div className="p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-400"></div>
                  <p className="text-sm text-slate-500 font-semibold mb-2">En Cuenta Bancaria Tradicional (~4%)</p>
                  <p className="text-3xl font-bold text-slate-700">{formatCurrency(banco)}</p>
                  <p className="text-xs text-slate-400 mt-2">Pérdida de poder adquisitivo por inflación</p>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-allianz"></div>
                  <p className="text-sm text-allianz font-bold mb-2">Estrategia Indexada Allianz (~14.9%)</p>
                  <p className="text-4xl font-extrabold text-slate-900">{formatCurrency(proyeccion)}</p>
                  <p className="text-xs text-slate-500 mt-2">Crecimiento exento de impuestos</p>
                </div>
              </motion.div>
            )}
            
            <div className="mt-12 pt-8 border-t border-slate-200">
              <blockquote className="bg-white border-l-4 border-allianz p-6 rounded-r-lg shadow-sm">
                <p className="text-lg text-slate-700 font-medium italic mb-4">
                  "El verdadero riesgo no es la volatilidad a corto plazo, sino no alcanzar el rendimiento necesario para vencer a la inflación a largo plazo."
                </p>
                <footer className="text-sm text-slate-500 font-bold">— Howard Marks</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Registro Section */}
      <section id="registro" className="py-24 px-6 md:px-12 bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl text-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {!registered ? (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Reserva tu Auditoría Fiscal</h2>
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-left mb-6">
                    <p className="text-sm text-amber-800 leading-relaxed font-medium">
                      <strong>Cupo Limitado:</strong> Debido a la naturaleza técnica del webinar y para garantizar un espacio de preguntas y respuestas (Q&A) donde se analicen escenarios fiscales reales de los asistentes, el acceso a la sala está estrictamente limitado por sesión.
                    </p>
                  </div>
                  
                  <p className="text-slate-600 font-medium">
                    <FileWarning className="inline-block mr-1 text-allianz mb-1" size={18} />
                    Cada mes que transcurre del año fiscal sin estructurar una estrategia representa capital retenido que ya no podrás recuperar ante el SAT en el próximo ciclo.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico Corporativo/Personal</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp de Contacto</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-allianz text-white font-bold py-4 rounded-md hover:bg-blue-800 transition-all text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Procesando...
                        </>
                      ) : (
                        "Confirmar mi Registro"
                      )}
                    </button>
                    
                    <div className="mt-4 text-center">
                      <p className="text-[11px] text-slate-500 leading-tight">
                        <strong>Nota de Cumplimiento:</strong> La estructuración de planes bajo el Art. 151 exige RFC activo y comprobación de ingresos. Abstenerse de reservar su lugar si no cuenta con documentación tributaria en regla.
                      </p>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">Registro en Proceso de Aprobación</h2>
                <p className="text-slate-600 mb-8">Hemos recibido tu solicitud para la auditoría técnica. Enviaremos los detalles de acceso a <strong>{formData.email}</strong> tras validar disponibilidad.</p>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 inline-block">
                  <p className="text-sm font-bold text-allianz">Verifica tu bandeja de entrada o SPAM</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 pt-16 pb-8 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <img src={logoVero} alt="Allianz" className="h-12 grayscale opacity-70" />
            </div>
            <p className="text-xs text-slate-500 mt-4">Auditoría Patrimonial & Estrategia Fiscal Institucional.</p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-allianz transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-allianz transition-colors">Términos Legales</a>
            <a href="#" className="hover:text-allianz transition-colors">Compliance</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Estrategia Fiscal Allianz. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
