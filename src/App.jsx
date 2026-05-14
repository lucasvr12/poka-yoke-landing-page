import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingDown, FileWarning, ArrowRight, ShieldCheck, Calculator, CheckCircle2 } from 'lucide-react';

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

  const calcularRetorno = (e) => {
    e.preventDefault();
    const ingresoNum = parseFloat(ingreso.replace(/,/g, ''));
    const gastoNum = parseFloat(gasto.replace(/,/g, ''));
    
    if (ingresoNum && gastoNum >= 0) {
      // Cálculo simulado simplificado de ISR (hasta 35%)
      const deduccionAdicionalPermitida = ingresoNum * 0.10; // Tope del 10% para PPR art 151
      const beneficioFiscalMaximo = deduccionAdicionalPermitida * 0.35;
      setRetorno(beneficioFiscalMaximo);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
  };

  return (
    <div className="min-h-screen bg-dark text-light overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-card border-b-0 border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-gold to-yellow-600 flex items-center justify-center font-bold text-dark">P</div>
          <span className="text-xl font-bold tracking-tight">Poka-Yoke<span className="text-gold">.</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#beneficios" className="hover:text-gold transition-colors">Beneficios</a>
          <a href="#estrategia" className="hover:text-gold transition-colors">Estrategia</a>
          <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-full text-sm font-semibold transition-all">
          Diagnóstico Gratis
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Deja de regalar tu capital: <br className="hidden md:block" />
            <span className="text-gradient">Recupera hasta el 35%</span> de tus impuestos.
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Implementa una estructura de inversión <strong className="text-gray-200">Poka-Yoke</strong>. Si ya vas a pagar ese dinero al SAT, haz que trabaje para tu patrimonio, no para el gasto público.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold hover:bg-yellow-500 text-dark px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2">
              Rescatar mi Capital Ahora <ArrowRight size={20} />
            </button>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">El error técnico que te cuesta <span className="text-red-400">miles de pesos al año.</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">La mayoría de los profesionistas y empresarios cometen errores sistemáticos en su planeación patrimonial.</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="glass-card p-8 rounded-2xl hover:border-red-500/30 transition-colors group">
              <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <TrendingDown className="text-red-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fuga de Liquidez</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Pagar impuestos que legalmente podrías deducir es equivalente a una fuga de capital constante que merma tu capacidad de crecimiento.</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="glass-card p-8 rounded-2xl hover:border-gold/30 transition-colors group">
              <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <ShieldAlert className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Costo de Oportunidad</h3>
              <p className="text-gray-400 text-sm leading-relaxed">El dinero entregado al fisco deja de generar interés compuesto. Cada año perdido representa millones en tu futuro patrimonial.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="glass-card p-8 rounded-2xl hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <FileWarning className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Falta de Estructura Fiscal</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Invertir sin estrategia fiscal significa que tus rendimientos también pagarán impuestos, creando una doble tributación innecesaria.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solución Section */}
      <section id="estrategia" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Inversión Inteligente: <br />
              <span className="text-gradient">Blindaje Fiscal Art. 151 y 185.</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              La metodología Poka-Yoke aplicada a finanzas asegura que sea imposible equivocarte. Estructuramos tu capital para garantizar retornos inmediatos vía devolución del SAT.
            </p>
            
            <ul className="space-y-4">
              {[
                "Deducibilidad hasta el 10% de tus ingresos anuales.",
                "Devolución en efectivo del SAT en tu declaración anual.",
                "Rendimientos libres de impuestos al retiro.",
                "Protección contra inflación y volatilidad."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-gold mt-1 flex-shrink-0" size={20} />
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
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-3xl -z-10"></div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ShieldCheck className="text-gold" /> Mecánica de Retorno Inmediato
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span>Aportación Deducible</span>
                    <span className="text-white">$100,000</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2 text-gray-400">
                    <span>Devolución del SAT (35%)</span>
                    <span className="text-gold font-bold">+$35,000</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gold w-[35%] rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-6">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * Gráfico ilustrativo basado en la tasa máxima de ISR. El retorno exacto depende de tu régimen y nivel de ingresos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autodiagnóstico Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#080d1c] to-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-card rounded-3xl p-8 md:p-12 border-t-2 border-t-gold/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <Calculator className="mx-auto text-gold mb-4" size={40} />
              <h2 className="text-3xl font-bold mb-3">Calcula tu Retorno Oculto</h2>
              <p className="text-gray-400">Descubre cuánto dinero podrías recuperar del SAT este año.</p>
            </div>

            <form onSubmit={calcularRetorno} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ingreso Anual Estimado (MXN)</label>
                  <input 
                    type="number" 
                    value={ingreso}
                    onChange={(e) => setIngreso(e.target.value)}
                    placeholder="Ej. 1500000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
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
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-white text-dark font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-lg"
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
                <p className="text-sm text-green-400 font-semibold mb-2">Retorno Máximo Estimado Vía Deducción:</p>
                <p className="text-4xl font-extrabold text-white">{formatCurrency(retorno)}</p>
                <p className="text-xs text-gray-400 mt-3">Basado en aportación máxima del 10% a PPR (Art. 151) con tasa de ISR del 35%.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-6 md:px-12 bg-[#03060c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-gold flex items-center justify-center font-bold text-dark text-xs">P</div>
              <span className="text-lg font-bold">Poka-Yoke.</span>
            </div>
            <p className="text-xs text-gray-500">Ingeniería Financiera & Blindaje Fiscal.</p>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Poka-Yoke Inversiones. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

export default App;
