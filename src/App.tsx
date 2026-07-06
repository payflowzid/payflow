/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  QrCode, 
  CreditCard, 
  Wallet, 
  ShieldCheck, 
  ArrowLeft,
  Copy,
  Check,
  MessageCircle,
  Download,
  Printer,
  MapPin,
  HelpCircle
} from "lucide-react";

interface PaymentMethodData {
  id: string;
  name: string;
  logo: string;
  accountNumber?: string;
  accountName?: string;
  instructions?: string;
  qrCodeImage?: string;
  color?: string;
}

const PAYMENT_METHODS: PaymentMethodData[] = [
  {
    id: "qris",
    name: "QRIS",
    logo: "https://lh3.googleusercontent.com/d/11A6mu61JPYuzcE1YgPcko8rrbxkA3KKr",
    instructions: "Scan QR Code di bawah ini untuk membayar",
    qrCodeImage: "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=00020101021126570011ID.DANA.WWW011893600915335415044002093541504400303UMI51440014ID.CO.QRIS.WWW0215ID10222268784480303UMI5204511153033605802ID5921ZID%20Digital%20Printing%206012Kab.%20Nganjuk6105644536304A08E",
    accountNumber: "UMKM-ZID-DIGITAL",
    accountName: "ZID DIGITAL PRINTING",
  },
  {
    id: "bri",
    name: "Bank BRI",
    logo: "https://lh3.googleusercontent.com/d/1UP1Rz_k1UdG4pS9FqLs6aue0XaiX713f",
    instructions: "Instruksi Pembayaran",
    accountNumber: "375601022554532",
    accountName: "A.N. MOCHAMAD YEYEN S.",
  },
  {
    id: "dana",
    name: "Dana",
    logo: "https://lh3.googleusercontent.com/d/1ZgbLkQfzqKzndlIyd_S_C4eY8D77KCh7",
    instructions: "Transfer ke nomor Dana berikut",
    accountNumber: "085724444964",
    accountName: "A.N. RIZKY AJI K.",
  },
  {
    id: "shopee",
    name: "ShopeePay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1280px-Shopee.svg.png",
    instructions: "Transfer ke nomor ShopeePay berikut",
    accountNumber: "085724444964",
    accountName: "A.N. MOCHAMAD YEYEN S.",
  },
  {
    id: "gopay",
    name: "GoPay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg",
    instructions: "Transfer ke nomor GoPay berikut",
    accountNumber: "085724444964",
    accountName: "A.N. MOCHAMAD YEYEN S.",
  }
];

interface PaymentItemProps {
  method: PaymentMethodData;
  isLarge?: boolean;
  onClick: (method: PaymentMethodData) => void;
}

const PaymentItem = ({ method, isLarge = false, onClick }: PaymentItemProps) => (
  <motion.div 
    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(253, 230, 138, 0.4)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(method)}
    className="flex items-center gap-4 p-3 mb-3 rounded-none bg-gradient-to-r from-[#d4af37] via-[#fbf5b7] to-[#aa7c11] border border-[#fbf5b7]/40 cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 group relative overflow-hidden"
  >
    {/* Subtle gloss shine overlay effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
    
    <div className={`w-16 h-10 bg-white rounded-none flex items-center justify-center overflow-hidden ${method.id === 'bri' ? 'p-1' : method.id === 'qris' ? 'p-1' : 'p-2'} shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.2)]`}>
      <img 
        src={method.logo} 
        alt={method.name} 
        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${method.id === 'bri' ? 'scale-110' : method.id === 'qris' ? 'scale-135' : ''}`} 
        referrerPolicy="no-referrer" 
      />
    </div>
    
    <div className="flex-1 flex items-center justify-between">
      <span className="text-xs font-black text-neutral-950 uppercase tracking-wider font-sans group-hover:text-black transition-colors">{method.name}</span>
      <motion.div 
        className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-neutral-900 rotate-45 ml-[1px]" />
      </motion.div>
    </div>
  </motion.div>
);

interface AccordionProps {
  title: string;
  icon?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const Accordion = ({ title, icon, isOpen, onToggle, children }: AccordionProps) => (
  <div className="mb-4 rounded-none border border-white/10 bg-black/45 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-[6px]">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 active:bg-white/10 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-[#fbf5b7]">{icon}</div>}
        <span className="text-xs font-bold tracking-widest text-gray-200 uppercase">
          {title}
        </span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#fbf5b7] transition-colors" />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <div className="px-4 pb-4">
            <div className="h-[1px] w-full bg-white/5 mb-4" />
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const PaymentDetail = ({ method, onBack }: { method: PaymentMethodData, onBack: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (method.accountNumber) {
      navigator.clipboard.writeText(method.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto px-1 py-1">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-amber-200/80 hover:text-white mb-5 py-1.5 px-3.5 rounded-none bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all group active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Kembali</span>
      </button>

      {/* Payment Instruction Card */}
      <div className="mb-5 rounded-none border border-[#d4af37]/35 bg-black/45 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
        {/* Gold corner ornaments */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {method.id === 'qris' ? (
          <div className="flex flex-col items-center">
            <h3 className="text-xs font-bold text-amber-200 uppercase tracking-[0.2em] mb-1">QR CODE</h3>
            <p className="text-[10px] text-gray-400 mb-6 text-center">{method.instructions}</p>
            
            <div className="bg-white p-4 rounded-none mb-6 shadow-[0_0_30px_rgba(255,255,255,0.15)] border-2 border-amber-300/30">
              <img 
                src={method.qrCodeImage} 
                alt="QR Code" 
                className="w-48 h-48 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              className="w-full py-3.5 rounded-none bg-gradient-to-r from-[#d4af37] to-[#aa7c11] border border-amber-300/20 text-neutral-950 font-black text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
              onClick={() => window.open(method.qrCodeImage, '_blank')}
            >
              <Download className="w-4 h-4" />
              SIMPAN QR CODE
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
              <div className={`w-16 h-10 bg-white rounded-none flex items-center justify-center ${method.id === 'bri' ? 'p-1' : 'p-2'} shadow-md`}>
                <img 
                  src={method.logo} 
                  alt={method.name} 
                  className={`w-full h-full object-contain ${method.id === 'bri' ? 'scale-110' : ''}`} 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">{method.name}</h3>
                <p className="text-[10px] text-gray-400">{method.instructions}</p>
              </div>
            </div>

            <div className="bg-black/40 rounded-none p-6 border border-white/5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />
              <p className="text-[9px] font-black text-amber-200/70 uppercase tracking-[0.2em] mb-3">Nomor Rekening</p>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl font-black text-[#00FF88] tracking-tight">{method.accountNumber}</span>
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-none bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-95 border border-white/5"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs font-extrabold text-white uppercase tracking-widest">{method.accountName}</p>
            </div>
          </>
        )}

        <p className="mt-5 text-[10px] text-gray-400 text-center leading-relaxed px-4">
          Pastikan nominal transfer sesuai dengan total tagihan pembayaran pesanan Anda.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="mb-5 rounded-none border border-[#d4af37]/20 bg-black/45 p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
        <h4 className="text-[9px] font-black text-amber-200/70 uppercase tracking-[0.2em] mb-4">Informasi Pesanan</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-medium">Tanggal Pembayaran</span>
            <span className="text-[10px] text-gray-200 font-bold">
              {new Intl.DateTimeFormat('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'Asia/Jakarta'
              }).format(new Date())}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-medium">Metode Pembayaran</span>
            <span className="text-[10px] text-[#00FF88] font-bold">{method.name}</span>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/6285724444964?text=Halo%20ZID%20DIGITAL%20PRINTING%2C%20saya%20ingin%20mengonfirmasi%20pembayaran%20via%20${encodeURIComponent(method.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-none bg-[#00E676] text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,230,118,0.3)] transition-all cursor-pointer hover:brightness-110"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          KONFIRMASI VIA WHATSAPP
        </motion.button>
      </a>
    </div>
  );
};

const Header = () => (
  <header className="flex flex-col items-center mb-8 pt-8">
    <div className="flex flex-col items-center gap-4 justify-center mb-1">
      {/* Official ZID Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 flex items-center justify-center shrink-0"
      >
        <img 
          src="https://www.image2url.com/r2/default/images/1783337065543-cd8a5e15-12ad-4c68-be79-bf18ede90446.png" 
          alt="ZID Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-black tracking-tight text-white font-sans uppercase text-center"
        style={{ 
          textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 4px 8px rgba(0,0,0,0.8)"
        }}
      >
        ZID <span className="text-white relative">PAYFLOW</span>
      </motion.h1>
    </div>
    
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-[9px] text-gray-100 leading-relaxed max-w-sm text-center px-2 mt-3 font-semibold border-t border-b border-white/10 py-2.5"
      style={{ 
        textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 2px 4px rgba(0,0,0,0.9)"
      }}
    >
      <span className="font-extrabold text-red-500 uppercase tracking-widest block mb-0.5">Peringatan:</span>
      Mohon lebih berhati-hati saat melakukan pembayaran dan selalu cek kembali nomor rekening tujuan sebelum ditransfer. Pembayaran resmi hanya dilakukan ke rekening dengan nama sesuai yang tertera di platform pembayaran. Segala bentuk kesalahan transfer di luar platform resmi bukan menjadi tanggung jawab kami.
    </motion.p>
  </header>
);

export default function App() {
  const [openSections, setOpenSections] = useState<string[]>(["qris", "bank", "ewallet"]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodData | null>(null);

  useEffect(() => {
    // Preload all images (especially QRIS barcode) so they display instantly on click
    PAYMENT_METHODS.forEach(method => {
      const img = new Image();
      img.src = method.logo;
      if (method.qrCodeImage) {
        const qrImg = new Image();
        qrImg.src = method.qrCodeImage;
      }
    });
  }, []);

  useEffect(() => {
    // Navigation routing based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const method = PAYMENT_METHODS.find(m => m.id === hash);
        if (method) {
          setSelectedMethod(method);
        } else {
          setSelectedMethod(null);
        }
      } else {
        setSelectedMethod(null);
      }
    };

    handleHashChange(); // Sync initial state

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectMethod = (method: PaymentMethodData) => {
    window.location.hash = method.id;
  };

  const handleBack = () => {
    window.location.hash = "";
  };

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0000] font-sans selection:bg-amber-500/30 selection:text-amber-200 select-none touch-manipulation relative overflow-x-hidden">
      
      {/* Background Image requested by user */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 pointer-events-none"
        style={{ backgroundImage: `url('https://www.image2url.com/r2/default/images/1783336307730-2406c36b-27c2-4f0b-bb93-d568b8ac2099.avif')` }}
      />

      <div className="relative max-w-md mx-auto px-5 z-10">
        <Header />

        <AnimatePresence mode="wait">
          {!selectedMethod ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pb-12"
            >
              {/* Main Frosted Glassmorphism Card */}
              <div className="relative rounded-none border border-[#d4af37]/35 bg-black/45 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden">
                {/* Subtle internal gold gradient border highlight */}
                <div className="absolute inset-0 border border-white/5 rounded-none pointer-events-none" />
                
                {/* Gold corner ornaments to match screenshot exactly */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/70 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/70 pointer-events-none" />

                {/* Section Title */}
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/10 px-1">
                  <ShieldCheck className="w-4 h-4 text-[#fbf5b7]" />
                  <h2 className="text-xs font-bold tracking-wider text-amber-200 uppercase">Metode Pembayaran</h2>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <Accordion 
                    title="QRIS" 
                    icon={<QrCode className="w-4 h-4" />}
                    isOpen={openSections.includes("qris")}
                    onToggle={() => toggleSection("qris")}
                  >
                    <PaymentItem 
                      method={PAYMENT_METHODS.find(m => m.id === "qris")!}
                      isLarge={true}
                      onClick={handleSelectMethod}
                    />
                  </Accordion>

                  <Accordion 
                    title="Bank Transfer" 
                    icon={<CreditCard className="w-4 h-4" />}
                    isOpen={openSections.includes("bank")}
                    onToggle={() => toggleSection("bank")}
                  >
                    <PaymentItem 
                      method={PAYMENT_METHODS.find(m => m.id === "bri")!}
                      onClick={handleSelectMethod}
                    />
                  </Accordion>

                  <Accordion 
                    title="E-Wallet" 
                    icon={<Wallet className="w-4 h-4" />}
                    isOpen={openSections.includes("ewallet")}
                    onToggle={() => toggleSection("ewallet")}
                  >
                    <div className="space-y-1">
                      <PaymentItem 
                        method={PAYMENT_METHODS.find(m => m.id === "dana")!}
                        onClick={handleSelectMethod}
                      />
                      <PaymentItem 
                        method={PAYMENT_METHODS.find(m => m.id === "shopee")!}
                        onClick={handleSelectMethod}
                      />
                      <PaymentItem 
                        method={PAYMENT_METHODS.find(m => m.id === "gopay")!}
                        onClick={handleSelectMethod}
                      />
                    </div>
                  </Accordion>
                </div>
              </div>

              {/* Footer Info */}
              <footer className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-500 mb-2 leading-relaxed">
                  © 2026 ZID Digital Printing • Hak Cipta Dilindungi<br/>
                  Layanan pembayaran mandiri pesanan cetak & merchandise
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 text-[9px] text-gray-400">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    <span>Kab. Nganjuk, Jawa Timur, Indonesia</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">UMKM Terverifikasi</span>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pb-12"
            >
              <PaymentDetail 
                method={selectedMethod} 
                onBack={handleBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
