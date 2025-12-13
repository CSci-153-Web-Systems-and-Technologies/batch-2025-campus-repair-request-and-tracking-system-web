import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F5F0] to-[#E8EDE3] overflow-hidden relative">
      {/* Background Gears */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0">
        <div className="absolute w-[300px] h-[300px] top-[10%] right-[15%] bg-[#0D3311] rounded-full animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-[180px] h-[180px] bottom-[15%] left-[10%] bg-[#0D3311] rounded-full animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute w-[120px] h-[120px] top-[60%] right-[5%] bg-[#0D3311] rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 pt-20">
        {/* Hero */}
        <section className="grid pl-20 grid-cols-1 lg:grid-cols-2 gap-15 items-center py-20 animate-[fadeIn_1s_ease-out_0.2s_both]">
          <div>
            <h2 className="font-electrolize text-[#2B310A] leading-[1.05] mb-6 tracking-[2px]">
              <span className="inline-block font-electrolize align-baseline text-[128px] sm:text-[160px]">iTrack</span>
            </h2>
            <p className="text-base text-[#2B310A] leading-[1.8] mb-10 max-w-[500px]">
              Fixes don’t have to be a mystery.
              <p>
                Submit, track, and watch your requests come to life with iTrack.
              </p>
            </p>      
            <div className="flex gap-5">
              <Link href="/signup" className="bg-[#2B310A] text-white px-10 py-4 rounded-[5px] font-electrolize text-[15px] tracking-[1.5px] hover:-translate-y-1 transition-all shadow-[0_6px_25px_rgba(43,49,10,0.3)] hover:shadow-[0_8px_30px_rgba(43,49,10,0.4)]">
                SUBMIT A REQUEST
              </Link>
              <Link href="#features" className="bg-transparent text-[#2B310A] border-2 border-[#2B310A] px-10 py-4 rounded-[px] font-electrolize text-[15px] tracking-[1.5px] hover:bg-[#2B310A] hover:text-white hover:-translate-y-1 transition-all">
                LEARN MORE
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="relative w-[500px] h-[500px] animate-[float_6s_ease-in-out_infinite]">
              <img 
                src="/images/cover.png" 
                alt="iTrack Cover" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 animate-[fadeIn_1s_ease-out_0.4s_both]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: '📝', title: 'EASY SUBMISSION', desc: 'Submit repair requests online with detailed descriptions and images. No more paperwork or phone calls.' },
              { icon: '📍', title: 'REAL-TIME TRACKING', desc: 'Monitor your request status from submission to completion. Stay informed every step of the way.' },
              { icon: '🔐', title: 'SECURE ACCESS', desc: 'Restricted to verified university accounts for authenticity and accountability on every request.' },
              { icon: '🎯', title: 'PRIORITY MANAGEMENT', desc: 'Urgency levels ensure critical repairs get attention first. Smart filtering for efficient workflows.' },
              { icon: '📊', title: 'DETAILED REPORTS', desc: 'Comprehensive audit logs and analytics help improve maintenance operations over time.' },
              { icon: '💬', title: 'CLEAR COMMUNICATION', desc: 'Stay connected with repair teams through updates and notifications throughout the process.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[10px] border-2 border-[#B5C4A5] transition-all hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(43,49,10,0.15)] relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#2B310A] before:to-[#8B9D7E] before:scale-x-0 hover:before:scale-x-100 before:transition-transform">
                <div className="w-[70px] h-[70px] bg-gradient-to-br from-[#2B310A] to-[#8B9D7E] rounded-[15px] flex items-center justify-center text-[32px] mb-6 shadow-[0_8px_20px_rgba(43,49,10,0.2)]">
                  {feature.icon}
                </div>
                <h4 className="font-electrolize text-[22px] text-[#2B310A] mb-4 tracking-[1px]">{feature.title}</h4>
                <p className="text-[15px] text-[#2B310A] leading-[1.7]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 text-center border-t-2 border-[#B5C4A5] animate-[fadeIn_1s_ease-out_0.8s_both]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-shrink-0">
                <img 
                  src="/images/helmet.png" 
                  alt="iTrack Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-electrolize text-[#2B310A] text-[28px] tracking-[2px]">iTrack</h1>
                <p className="text-[11px] text-[#2B310A] tracking-[0.5px]">CAMPUS REPAIR PORTAL</p>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-[#2B310A] text-sm hover:text-[#8B9D7E] transition-colors">About</a>
              <a href="#features" className="text-[#2B310A] text-sm hover:text-[#8B9D7E] transition-colors">Features</a>
              <a href="#" className="text-[#2B310A] text-sm hover:text-[#8B9D7E] transition-colors">Support</a>
              <a href="#" className="text-[#2B310A] text-sm hover:text-[#8B9D7E] transition-colors">Contact</a>
            </div>
          </div>
          <p className="text-[13px] text-[#2B310A]">&copy; 2025 iTrack. All rights reserved. | Submit, Track, and Manage Repair Requests Online</p>
        </footer>
      </div>
    </main>
  );
}
