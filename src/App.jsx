import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Scale, 
  Clock, 
  FileWarning, 
  HelpCircle, 
  Award, 
  Check 
} from 'lucide-react';
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
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', horario: 'Jueves 12:00 PM (Sesión en vivo vía Zoom)' });
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
    formParams.append("horario", formData.horario);

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
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <img src={logoVero} alt="Logo Vero" className="h-14 md:h-16 object-contain" />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <a href="#problematica" className="hover:text-allianz transition-colors">Problemática</a>
          <a href="#beneficios" className="hover:text-allianz transition-colors">Sesión</a>
          <a href="#segmentos" className="hover:text-allianz transition-colors">Estrategia</a>
          <a href="#simulador" className="hover:text-allianz transition-colors">Simulador</a>
          <a href="#testimonios" className="hover:text-allianz transition-colors">Testimonios</a>
          <a href="#faqs" className="hover:text-allianz transition-colors">Preguntas</a>
        </div>
        <a href="#registro" className="bg-allianz hover:bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-bold transition-all shadow-md">
          Agendar Diagnóstico Gratuito
        </a>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 relative bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5 pointer-events-none -z-10">
          <div className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-allianz blur-[150px]"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-allianz text-xs md:text-sm font-extrabold mb-6 tracking-wide uppercase">
            <Building2 size={16} /> MASTERCLASS EN VIVO / ASESORÍA PATRIMONIAL EXCLUSIVA
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
            Hace que tu dinero trabaje doblemente duro: <br />
            <span className="text-allianz">Aprovecha el interés compuesto en Fondos Indexados y recupera hasta el 35% de tus impuestos ante el SAT.</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-md md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Diseña una estrategia financiera sólida y un Plan Personal de Retiro (PPR) a tu medida, blindado contra la inflación y adaptado a las leyes fiscales de México.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#registro" className="bg-allianz hover:bg-blue-800 text-white px-8 py-4 rounded-md font-bold text-md md:text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              AGENDAR MI SESIÓN ESTRATÉGICA GRATUITA <ArrowRight size={20} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Positive Friction Banner (Cláusula de Calificación) */}
      <section className="py-8 bg-white px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border-l-4 border-allianz p-5 rounded-r-lg shadow-sm"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="text-allianz flex-shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">Cláusula de Calificación Exclusiva</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Este análisis y estrategia patrimonial está reservado exclusivamente para perfiles con capacidad de aportación y compromiso mensual de entre <strong>$2,000 y $10,000 MXN</strong>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Problemática */}
      <section id="problematica" className="py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              El costo real de no tener una estrategia financiera en México:
            </h2>
            <div className="h-1 w-20 bg-allianz mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-6">
                <Scale className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-allianz transition-colors">Fuga Fiscal Constante</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Estás regalando dinero al SAT año con año que legalmente podrías deducir a través del Artículo 151 de la LISR y meter directamente a tu fondo de inversión.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="text-amber-500 rotate-180" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-allianz transition-colors">Ahorro Pasivo Inútil</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dejar tu dinero en una cuenta de débito tradicional o bajo el colchón destruye tu poder adquisitivo un aproximado de 5% anual debido a la inflación.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-500"></div>
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                <FileWarning className="text-slate-500" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-allianz transition-colors">Futuro Incierto</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Depender únicamente de las afores tradicionales no garantiza la libertad financiera que mereces. Necesitas un fondo privado indexado y automatizado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simulador Interactivo */}
      <section id="simulador" className="py-20 px-6 md:px-12 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="mx-auto text-allianz mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">Simulador de Interés Compuesto</h2>
            <p className="text-slate-600 text-md md:text-lg">Proyección basada en el 14.9% histórico (S&P 500 / Nasdaq).</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
            <form onSubmit={calcularInteresCompuesto} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                  <p className="text-xs text-slate-500 mt-1.5">Mínimo sugerido: $2,000 MXN</p>
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
                className="w-full bg-allianz text-white font-bold py-3.5 rounded-md hover:bg-blue-800 transition-colors text-md md:text-lg shadow-md uppercase tracking-wider"
              >
                Proyectar Capital
              </button>
            </form>

            {proyeccion !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 grid md:grid-cols-2 gap-6"
              >
                <div className="p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400"></div>
                  <p className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">En Cuenta Bancaria Tradicional (~4%)</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-700">{formatCurrency(banco)}</p>
                  <p className="text-xs text-slate-400 mt-2">Pérdida de poder adquisitivo por inflación</p>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-allianz"></div>
                  <p className="text-xs text-allianz font-extrabold mb-2 uppercase tracking-wider">Estrategia Indexada Allianz (~14.9%)</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-slate-900">{formatCurrency(proyeccion)}</p>
                  <p className="text-xs text-slate-500 mt-2">Crecimiento exponencial exento de impuestos</p>
                </div>
              </motion.div>
            )}
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <blockquote className="bg-white border-l-4 border-allianz p-5 rounded-r-lg shadow-sm">
                <p className="text-md text-slate-700 font-medium italic mb-3">
                  "El verdadero riesgo no es la volatilidad a corto plazo, sino no alcanzar el rendimiento necesario para vencer a la inflación a largo plazo."
                </p>
                <footer className="text-xs text-slate-500 font-bold uppercase tracking-wide">— Howard Marks</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Manejo de Objeciones (Doble Guillotina) */}
      <section className="py-16 px-6 md:px-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">Flexibilidad Contractual Garantizada</h2>
            <p className="text-slate-600 text-sm">Protecciones institucionales del plan OptiMaxx Plus para tu total tranquilidad.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="text-allianz flex-shrink-0" size={20} /> La "Vacuna Conductual" (18 Meses)
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                El compromiso obligatorio de los primeros 18 meses no es una penalización. Es un <strong>mecanismo de protección automatizado</strong> diseñado para blindar tu capital contra decisiones precipitadas derivadas de la volatilidad emocional del mercado, asegurando el inicio óptimo del interés compuesto.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Clock className="text-allianz flex-shrink-0" size={20} /> El "Periodo de Descanso" (12 Meses)
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Los ingresos varían. A partir del mes 18, tienes el derecho contractual de <strong>pausar tus aportaciones hasta por 12 meses</strong> sin penalizaciones de suspensión, manteniendo tu capital trabajando y protegido.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section id="beneficios" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Qué descubriremos juntos en tu sesión de estrategia personalizada:
            </h2>
            <div className="h-1 w-20 bg-allianz mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-allianz font-bold flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Optimización Fiscal Avanzada</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cómo funciona la devolución de impuestos a través de un PPR y cómo hacer que el SAT te devuelva saldo a favor en tu próxima declaración anual.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-allianz font-bold flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Fondos Indexados y ETFs</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  La comparativa cruda de los diferentes tipos de inversión del mercado y por qué el S&P 500 y los fondos globales son la opción óptima para el largo plazo.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-allianz font-bold flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">El Efecto Bola de Nieve</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cómo utilizar el interés compuesto de forma práctica y sencilla para multiplicar tu capital, incluso empezando con montos moderados.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-allianz font-bold flex-shrink-0 mt-1">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Estrategia Antifragilidad</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Cómo diseñar una estructura financiera que proteja a tu familia, blinde tu patrimonio y crezca en piloto automático.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Segmentación */}
      <section id="segmentos" className="py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Una estrategia a la medida de tu momento de vida:
            </h2>
            <div className="h-1 w-20 bg-allianz mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-xs font-bold text-allianz bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Etapa Inicial
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">Jóvenes Inversionistas</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  El tiempo es tu mayor activo. Descubre cómo empezar a construir un patrimonio millonario antes de los 30 explotando las fases tempranas del interés compuesto.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <a href="#registro" className="text-allianz text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Estrategia para menores de 30 <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-allianz text-white text-[10px] uppercase font-bold py-1 px-4 tracking-widest rotate-0 rounded-bl-lg">
                Destacado
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Independencia
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">Mujeres & Libertad Financiera</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Diseñamos planes con enfoque patrimonial, permitiéndote tomar el control total de tus finanzas, proteger tu futuro y cerrar la brecha de inversión.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <a href="#registro" className="text-allianz text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Plan patrimonial adaptado <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Carga Fiscal
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">Profesionales & Empresarios</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Mitiga la carga fiscal de tus ingresos. Aprende las vías legales y estratégicas para deducir montos masivos mientras creas un fondo de retiro corporativo privado.
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <a href="#registro" className="text-allianz text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  Optimización fiscal empresarial <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Autoridad y Respaldo */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="mx-auto text-allianz mb-4" size={48} />
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
            Respaldado por Expertos en Educación Financiera
          </h2>
          <p className="text-slate-600 text-md md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            No somos algoritmos automatizados ni fórmulas mágicas de internet. Somos un equipo comprometido con la educación financiera y la arquitectura patrimonial. Nos especializamos en estructurar seguros, planes de retiro privados e inversiones reguladas, ayudando a cientos de personas en México a transicionar de ahorradores pasivos a inversionistas estratégicos.
          </p>
          <div className="inline-block bg-slate-50 border border-slate-200 px-6 py-4 rounded-xl shadow-sm">
            <p className="text-xs md:text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
              <ShieldCheck className="text-allianz flex-shrink-0" size={18} />
              Estrategias basadas estrictamente en la Ley del Impuesto Sobre la Renta y operadas a través de instituciones reguladas en México.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section id="testimonios" className="py-20 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lo que opinan quienes ya tomaron el control de sus finanzas:
            </h2>
            <div className="h-1 w-20 bg-allianz mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm relative"
            >
              <span className="absolute top-4 right-6 text-6xl text-slate-200 font-serif leading-none select-none">“</span>
              <p className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6 relative z-10">
                "No sabía que podía deducir mis inversiones. En mi primera declaración anual aplicando esta estrategia, el SAT me devolvió más de $25,000 pesos que reinvertí de inmediato en mi PPR."
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-allianz/10 rounded-full flex items-center justify-center text-allianz font-bold text-sm">
                  CM
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ing. Carlos Mendoza</h4>
                  <p className="text-xs text-slate-500">Freelance Tecnológico</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm relative"
            >
              <span className="absolute top-4 right-6 text-6xl text-slate-200 font-serif leading-none select-none">“</span>
              <p className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6 relative z-10">
                "Como mujer independiente, buscaba estabilidad sin depender de nadie. El equipo me guió paso a paso para entender los ETFs y automatizar mi fondo de retiro sin descuidar mis gastos actuales."
              </p>
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-allianz/10 rounded-full flex items-center justify-center text-allianz font-bold text-sm">
                  ER
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dra. Elena Ríos</h4>
                  <p className="text-xs text-slate-500">Especialista Médica</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Llamado a la Acción Final */}
      <section className="py-20 px-6 md:px-12 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-allianz/25 to-slate-900 opacity-60"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Deja de postergar tu futuro financiero. <br />
            El mejor día para invertir fue hace diez años; el segundo mejor día es <span className="text-blue-400">HOY</span>.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-md md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Agenda hoy tu sesión de diagnóstico patrimonial sin costo y recibe tu hoja de ruta personalizada.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <a href="#registro" className="bg-allianz hover:bg-blue-800 text-white font-extrabold py-4 px-8 rounded-md transition-colors text-md md:text-lg shadow-lg hover:shadow-xl inline-flex items-center gap-2 uppercase tracking-wide">
              AGENDAR MI SESIÓN ESTRATÉGICA GRATUITA
            </a>
          </motion.div>
        </div>
      </section>

      {/* Registro Section */}
      <section id="registro" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-12 shadow-md text-slate-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {!registered ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                    Agenda tu Sesión Estratégica
                  </h3>
                  <div className="h-0.5 w-16 bg-allianz mx-auto mb-4"></div>
                  <p className="text-slate-600 text-sm font-medium">
                    Analicemos juntos tu perfil y diseñemos la mejor estrategia de crecimiento fiscal y retiro regulado.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Elige el horario para tu sesión estratégica:
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.horario}
                        onChange={(e) => setFormData({...formData, horario: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors font-medium"
                        required
                      >
                        <option value="Jueves 12:00 PM (Sesión en vivo vía Zoom)">Jueves 12:00 PM (Sesión en vivo vía Zoom)</option>
                        <option value="Viernes 12:00 PM (Sesión en vivo vía Zoom)">Viernes 12:00 PM (Sesión en vivo vía Zoom)</option>
                        <option value="Sábado 12:00 PM (Sesión en vivo vía Zoom)">Sábado 12:00 PM (Sesión en vivo vía Zoom)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors font-medium"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Ej. +52 55 1234 5678"
                      className="w-full bg-white border border-slate-300 rounded-md px-4 py-3 text-slate-900 focus:outline-none focus:border-allianz focus:ring-1 focus:ring-allianz transition-colors font-medium"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-allianz text-white font-extrabold py-4 rounded-md hover:bg-blue-800 transition-all text-md md:text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center uppercase tracking-wider"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registrando...
                        </>
                      ) : (
                        "SÍ, QUIERO MAXIMIZAR MI PATRIMONIO"
                      )}
                    </button>
                    
                    <div className="mt-6 text-center border-t border-slate-200 pt-4">
                      <p className="text-[11px] text-slate-500 leading-normal mb-2 font-medium">
                        <strong>Texto de Garantía:</strong> Cupos limitados por sesión. Tu información está 100% protegida bajo nuestra política de privacidad.
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        <strong>Nota de Cumplimiento:</strong> La estructuración de planes bajo el Art. 151 exige RFC activo y comprobación de ingresos. Abstenerse de reservar si no cuenta con documentación fiscal regular.
                      </p>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">¡Registro Completado con Éxito!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Hemos enviado la confirmación y los detalles de acceso para tu sesión programada (<strong>{formData.horario}</strong>) a tu correo <strong>{formData.email}</strong>.
                </p>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
                  <p className="text-xs font-bold text-allianz uppercase tracking-wider">Revisa tu bandeja de entrada o carpeta de SPAM</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Preguntas Frecuentes Section */}
      <section id="faqs" className="py-20 px-6 md:px-12 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Preguntas Frecuentes</h2>
            <div className="h-1 w-20 bg-allianz mx-auto mt-4 rounded"></div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-3 flex items-start gap-2">
                <HelpCircle className="text-allianz flex-shrink-0 mt-0.5" size={20} />
                ¿La sesión realmente no tienen costo?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Es correcto. Nuestro objetivo es promover la educación financiera. Al final de la sesión tendrás un diagnóstico claro. Si deseas que nosotros implementemos y gestionemos tu estrategia a largo plazo, te propondremos un plan de asesoría, pero la sesión inicial es 100% gratuita y sin compromiso.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-3 flex items-start gap-2">
                <HelpCircle className="text-allianz flex-shrink-0 mt-0.5" size={20} />
                ¿Cuánto dinero necesito para empezar a invertir bajo este esquema?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                Existen estrategias escalables. Contamos con planes de inversión y ahorro automatizado ideales para presupuestos profesionales de todo tipo, permitiéndote construir capital paulatinamente.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-md font-bold text-slate-900 mb-3 flex items-start gap-2">
                <HelpCircle className="text-allianz flex-shrink-0 mt-0.5" size={20} />
                ¿Cómo es que se recuperan impuestos con un PPR?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-7">
                De acuerdo con el Artículo 151 de la LISR en México, las aportaciones hechas a planes personales de retiro autorizados son deducibles en tu declaración anual, lo que reduce tu base gravable y genera devoluciones de efectivo por parte del SAT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-100 pb-10">
          <div>
            <img src={logoVero} alt="Vero Logo" className="h-14 md:h-16 object-contain grayscale opacity-80" />
            <p className="text-xs text-slate-500 mt-3">Auditoría Patrimonial & Estrategia Fiscal Institucional.</p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500 font-semibold">
            <a href="#" className="hover:text-allianz transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-allianz transition-colors">Términos y Condiciones</a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-8">
          <p className="text-[10px] text-slate-400 leading-relaxed text-center md:text-left">
            <strong>Nota Legal:</strong> El contenido de este sitio web es meramente educativo e informativo. Las inversiones en mercados financieros e instrumentos indexados conllevan riesgos. Los rendimientos pasados no garantizan rendimientos futuros. Cada estrategia debe ser validada de forma individual según el perfil de riesgo del cliente.
          </p>
          <div className="text-center text-[11px] text-slate-400 mt-6 pt-4 border-t border-slate-100">
            © {new Date().getFullYear()} Estrategia Fiscal Allianz. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
