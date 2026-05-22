/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from "react";
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
    whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(method)}
    className="flex items-center gap-3 p-2.5 mb-2 rounded-xl bg-black/40 border border-white/5 cursor-pointer transition-all duration-300 group active:bg-white/5"
  >
    <div className={`w-14 h-9 bg-white rounded-lg flex items-center justify-center overflow-hidden ${method.id === 'bri' ? 'p-0' : 'p-1.5'} shrink-0`}>
      <img 
        src={method.logo} 
        alt={method.name} 
        className={`w-full h-full object-contain transition-transform duration-300 ${method.id === 'bri' ? 'scale-125' : ''} ${isLarge ? 'scale-150' : ''}`} 
        referrerPolicy="no-referrer" 
      />
    </div>
    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{method.name}</span>
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
  <div className="mb-3 rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden shadow-xl">
    <button 
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 active:bg-white/10 transition-colors group"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-gold">{icon}</div>}
        <span className="text-sm font-bold tracking-tight text-white">
          {title}
        </span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
      </motion.div>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
    <div className="relative max-w-lg mx-auto px-5 py-4">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 py-1 transition-colors group active:scale-95"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">Kembali</span>
      </button>

      {/* Payment Instruction Card */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 shadow-2xl relative overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {method.id === 'qris' ? (
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">QR CODE</h3>
            <p className="text-[9px] text-gray-500 mb-6">{method.instructions}</p>
            
            <div className="bg-white p-3 rounded-xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <img 
                src={method.qrCodeImage} 
                alt="QR Code" 
                className="w-48 h-48 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <button 
              className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all active:scale-95"
              onClick={() => window.open(method.qrCodeImage, '_blank')}
            >
              <Download className="w-3.5 h-3.5" />
              Simpan QR Code
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-14 h-9 bg-white rounded-lg flex items-center justify-center ${method.id === 'bri' ? 'p-0' : 'p-1.5'}`}>
                <img 
                  src={method.logo} 
                  alt={method.name} 
                  className={`w-full h-full object-contain ${method.id === 'bri' ? 'scale-125' : ''}`} 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wide">{method.name}</h3>
                <p className="text-[10px] text-gray-500">{method.instructions}</p>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-6 border border-white/5 text-center relative">
              <p className="text-[9px] font-bold text-blue-400/70 uppercase tracking-[0.2em] mb-3">Nomor Rekening</p>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl font-bold text-[#00FF88] tracking-tight">{method.accountNumber}</span>
                <button 
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{method.accountName}</p>
            </div>
          </>
        )}

        <p className="mt-4 text-[9px] text-gray-500 text-center leading-relaxed px-4">
          Pastikan nominal transfer sesuai dengan total tagihan pembayaran pesanan Anda.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-[#1a1a1a] p-5 shadow-xl relative overflow-hidden">
        <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Informasi Pesanan</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-500 font-medium">Tanggal Pembayaran</span>
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
            <span className="text-[10px] text-gray-500 font-medium">Metode Pembayaran</span>
            <span className="text-[10px] text-gray-200 font-bold">{method.name}</span>
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
          className="w-full py-4 rounded-xl bg-[#00E676] text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,230,118,0.3)] transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          Konfirmasi Via WhatsApp
        </motion.button>
      </a>
    </div>
  );
};

const Header = () => (
  <header className="flex flex-col items-center mb-6 pt-8">
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-12 h-12 bg-gradient-to-tr from-gold to-gold-light rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-3"
    >
      <Printer className="w-7 h-7 text-black" strokeWidth={1.5} />
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl font-bold tracking-tight text-white mb-0.5 text-center uppercase"
    >
      ZID <span className="text-gold">DIGITAL PRINTING</span>
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-[9px] font-bold tracking-[0.15em] text-gold/60 uppercase text-center"
    >
      Portal Pembayaran Resmi Merchant
    </motion.p>
  </header>
);

export default function App() {
  const [openSections, setOpenSections] = useState<string[]>(["qris", "bank", "ewallet"]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodData | null>(null);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-gold/30 selection:text-gold select-none touch-manipulation">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-gold/5 blur-[100px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-gold/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-md mx-auto px-5">
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
              {/* Section Title */}
              <div className="flex items-center gap-2 mb-4 px-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <h2 className="text-xs font-medium text-gray-400">Metode Pembayaran</h2>
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
                    onClick={setSelectedMethod}
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
                    onClick={setSelectedMethod}
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
                      onClick={setSelectedMethod}
                    />
                    <PaymentItem 
                      method={PAYMENT_METHODS.find(m => m.id === "shopee")!}
                      onClick={setSelectedMethod}
                    />
                    <PaymentItem 
                      method={PAYMENT_METHODS.find(m => m.id === "gopay")!}
                      onClick={setSelectedMethod}
                    />
                  </div>
                </Accordion>
              </div>

              {/* Footer Info */}
              <footer className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-500 mb-2 leading-relaxed">
                  © 2026 ZID Digital Printing • Hak Cipta Dilindungi<br/>
                  Layanan pembayaran mandiri pesanan cetak & merchandise
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 text-[9px] text-gray-400">
                    <MapPin className="w-3 h-3 text-gold" />
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
                onBack={() => setSelectedMethod(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
