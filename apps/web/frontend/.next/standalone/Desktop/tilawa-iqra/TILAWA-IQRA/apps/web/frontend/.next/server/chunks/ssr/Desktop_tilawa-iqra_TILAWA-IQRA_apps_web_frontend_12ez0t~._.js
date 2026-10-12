module.exports=[87588,a=>{"use strict";let b=(0,a.i(27588).default)("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]]);a.s(["Sparkles",0,b],87588)},81819,a=>{"use strict";let b=(0,a.i(27588).default)("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);a.s(["Send",0,b],81819)},18440,a=>{"use strict";let b=(0,a.i(27588).default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);a.s(["ArrowRight",0,b],18440)},24773,a=>{"use strict";var b=a.i(45900),c=a.i(41184),d=a.i(81819),e=a.i(27588);let f=(0,e.default)("bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]),g=(0,e.default)("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var h=a.i(87588);let i=(0,e.default)("circle-question-mark",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);var j=a.i(18440),k=a.i(56236);let l=[{q:"What is Tajweed and why is it important?",label:"What is Tajweed?"},{q:"Explain the letters and rule of Qalqalah.",label:"Explain Qalqalah"},{q:"How does the AI recitation scoring work?",label:"How AI Scoring works"},{q:"Can you teach me the rules of Ghunnah?",label:"Learn Ghunnah"}];a.s(["default",0,function(){let[a,e]=(0,c.useState)([{id:"welcome",role:"assistant",content:`Assalamu Alaikum! I am **Zaid**, your Quranic learning assistant. 

How can I help you perfect your recitation or understand the rules of Tajweed today? Feel free to ask me anything about Quranic letters, pronunciation, or how our AI scoring works!`,timestamp:new Date}]),[m,n]=(0,c.useState)(""),[o,p]=(0,c.useState)(!1),q=(0,c.useRef)(null);(0,c.useEffect)(()=>{q.current?.scrollIntoView({behavior:"smooth"})},[a,o]);let r=a=>{if(!a.trim())return;let b={id:Math.random().toString(36).substring(7),role:"user",content:a,timestamp:new Date};e(a=>[...a,b]),n(""),p(!0),setTimeout(()=>{let b,c=(b=a.toLowerCase().trim()).includes("qalqalah")||b.includes("bouncing")||b.includes("echoing")?`### **Qalqalah (Echoing / Bouncing Sound)**

**Qalqalah** means to make an echoing or bouncing sound at the end of reciting a letter when it has a **Sukun** (static state) or when you stop on it.

#### **1. The 5 Letters of Qalqalah**
The letters are combined in the mnemonic phrase: **قُطْبُ جَدٍّ** (Qutb Jaddin)
- **ق** (Qaf)
- **ط** (Ta)
- **ب** (Ba)
- **ج** (Jeem)
- **د** (Dal)

#### **2. Levels of Qalqalah**
- **Qalqalah Kubra (Strongest)**: Occurs when stopping at the end of an ayah on a Qalqalah letter (especially if it has a Shaddah), e.g., \`ٱلْحَقُّ\` in Surah Al-Lahab.
- **Qalqalah Wusta (Medium)**: Occurs when stopping at the end of a word on a Qalqalah letter without a Shaddah, e.g., \`لَمْ يَلِدْ\`.
- **Qalqalah Sughra (Minor)**: Occurs in the middle of a word when the Qalqalah letter has a Sukun, e.g., \`يَقْطَعُونَ\`.

*Try reciting Surah Al-Ikhlas to practice these bouncing letter endings!*`:b.includes("ghunnah")||b.includes("nasalization")||b.includes("nasal")?`### **Ghunnah (Nasalization)**

**Ghunnah** is a nasal sound produced from the nose (nasal cavity). It is a mandatory rule of reciting that must be held for **2 counts (beats)**.

#### **1. Core Letters of Ghunnah**
Ghunnah applies permanently to two letters when they carry a **Shaddah (ّ)**:
1. **Nun Muschaddadah (نّ)**: E.g., \`إِنَّ\` (Inna) or \`النَّاس\` (An-Naas).
2. **Mim Muschaddadah (مّ)**: E.g., \`ثُمَّ\` (Thumma) or \`عَمَّ\` (Amma).

#### **2. How to Practice**
When pronouncing these letters, hold the sound in your nose for about 1.5 to 2 seconds. If you close your nostrils, the sound should stop completely. 

*Practice this in Surah An-Nas, which contains many Nun Muschaddadah letters!*`:b.includes("scoring")||b.includes("how does")||b.includes("ai")||b.includes("feedback")||b.includes("heatmap")?`### **How the TILAWA AI Scoring Works**

TILAWA uses state-of-the-art speech processing to help you perfect your recitation:

1. **Audio Capture**: When you click record and recite an ayah, the app captures your voice and sends it to our FastAPI backend.
2. **Phonetic Transcription (ASR)**: We run a fine-tuned **Whisper speech model** trained specifically on Quranic recitations to transcribe your pronunciation.
3. **Acoustic Alignment**: The system aligns the phonemes of your voice with the target canonical recitation (Sheikh Yasser Al-Dosari).
4. **Semantic Heatmap**: The app highlights the Quranic Arabic text:
   - <span class="text-emerald-500 font-semibold">Green</span>: Correct pronunciation and Tajweed.
   - <span class="text-amber-500 font-semibold">Amber</span>: Minor rules deviation (e.g. holding a Ghunnah for too short).
   - <span class="text-red-500 font-semibold">Red</span>: Major pronunciation error or missing syllables.

*Use our **Tajweed Hub** to study specific rules that the AI flags as mistakes!*`:b.includes("tajweed")||b.includes("what is")||b.includes("rule")?`### **What is Tajweed?**

**Tajweed** (تَجْوِيدْ) literally means *beautification* or *doing something well*. In Quranic science, it is the set of rules governing how the letters of individual words should be pronounced, giving each letter its rights and characteristics.

#### **Core Categories of Tajweed Rules:**
1. **Makharij al-Huruf**: The correct articulation points of letters (lips, tongue, throat, nose).
2. **Sifat al-Huruf**: The characteristics of letters (whispering, echoing, softness).
3. **Rules of Noon Sakinah & Tanween**: How to pronounce Nun with Sukun (Izhar, Ikhfa, Idgham, Iqlab).
4. **Rules of Meem Sakinah**: How to pronounce Mim with Sukun.
5. **Madd Rules**: Rules of elongation (stretching vowel sounds).

*Zaid Tip: Start with **Ghunnah** and **Qalqalah** first as they are the most common rules in the shorter Surahs of Juz 'Amma!*`:b.includes("fatihah")||b.includes("surah 1")||b.includes("opening")?`### **Surah Al-Fatihah (The Opening)**

**Surah Al-Fatihah** is the first chapter of the Quran and is recited in every unit (Rak'ah) of daily prayers.

#### **Key Details:**
- **Number**: Surah 1
- **Ayah Count**: 7 verses
- **Revelation Place**: Makkah
- **Core Rules**:
  - The heavy letter **R** in \`ٱلرَّحْمَٰنِ\` (Ar-Rahman).
  - Elongation (Madd) at the end of the verses, e.g., \`ٱلْعَٰلَمِينَ\` (Al-Aalameen).
  - The correct articulation point of the letter **Dad (ض)** in \`ٱلضَّآلِّينَ\` (Ad-Dalleen).

*You can select Surah Al-Fatihah from our homepage browser to stream the recitation and practice!*`:b.includes("hello")||b.includes("hi")||b.includes("salam")||b.includes("assalamu")||b.includes("hey")?`Assalamu Alaikum! I am **Zaid**, your dedicated Quranic learning assistant. 

I can help you understand:
- **Tajweed Rules** (Qalqalah, Ghunnah, Izhar, Madd, etc.)
- **Quranic Arabic Letters** and correct pronunciation.
- **Platform Features** (How our AI recitation scoring and trackers work).

What would you like to learn today? You can select one of the suggested prompts or type your own question below!`:`Thank you for your question! I am Zaid, your basic learning assistant. 

To help you best, here are some common topics I can explain:
- Type **"Qalqalah"** to learn about echoing letters.
- Type **"Ghunnah"** to learn about holding nasalization sounds.
- Type **"Tajweed"** to learn the foundational rules of beautiful recitation.
- Type **"AI Scoring"** to understand how TILAWA analyzes your voice.

*Please let me know if you would like me to explain any of these Quranic reading concepts in detail!*`,d={id:Math.random().toString(36).substring(7),role:"assistant",content:c,timestamp:new Date};e(a=>[...a,d]),p(!1)},850)};return(0,b.jsxs)("div",{className:"mx-auto flex h-dvh max-w-5xl flex-col bg-background p-4 md:p-6",children:[(0,b.jsxs)("header",{className:"mb-6 flex items-center justify-between border-b border-border pb-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-3",children:[(0,b.jsx)("div",{className:"flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/10",children:(0,b.jsx)(f,{className:"size-6","aria-hidden":"true"})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-xl font-bold tracking-tight",children:"Zaid AI Assistant"}),(0,b.jsx)("p",{className:"text-xs text-muted-foreground",children:"Personal Tutor for Basic Quran Learning"})]})]}),(0,b.jsxs)("div",{className:"hidden items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500 md:flex",children:[(0,b.jsx)(h.Sparkles,{className:"size-3.5"}),"Always Online"]})]}),(0,b.jsx)("div",{className:"flex-1 overflow-y-auto rounded-xl border border-border bg-card/50 p-4 md:p-6 shadow-inner",children:(0,b.jsxs)("div",{className:"space-y-6",children:[a.map(a=>(0,b.jsxs)("div",{className:`flex gap-3 max-w-[85%] ${"user"===a.role?"ml-auto flex-row-reverse":"mr-auto"}`,children:[(0,b.jsx)("div",{className:`flex size-8 shrink-0 select-none items-center justify-center rounded-full text-xs font-semibold shadow-sm ${"user"===a.role?"bg-accent text-accent-foreground":"bg-primary text-primary-foreground"}`,children:"user"===a.role?(0,b.jsx)(g,{className:"size-4","aria-hidden":"true"}):(0,b.jsx)(f,{className:"size-4","aria-hidden":"true"})}),(0,b.jsxs)("div",{className:`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${"user"===a.role?"bg-primary text-primary-foreground rounded-tr-none":"bg-muted text-foreground rounded-tl-none border border-border/60"}`,children:[(0,b.jsx)("div",{className:"prose prose-sm dark:prose-invert max-w-none",children:a.content.split("\n").map((a,c)=>a.startsWith("### ")?(0,b.jsx)("h3",{className:"text-sm font-bold mt-2 mb-1",children:a.replace("### ","")},c):a.startsWith("- ")||a.startsWith("* ")?(0,b.jsx)("li",{className:"ml-4 list-disc",children:a.substring(2)},c):a.startsWith("1. ")||a.startsWith("2. ")||a.startsWith("3. ")||a.startsWith("4. ")?(0,b.jsx)("li",{className:"ml-4 list-decimal",children:a.substring(3)},c):(0,b.jsx)("p",{className:"mb-2 last:mb-0",children:a},c))}),(0,b.jsx)("span",{className:`mt-1.5 block text-[9px] ${"user"===a.role?"text-primary-foreground/75":"text-muted-foreground"}`,children:a.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]})]},a.id)),o&&(0,b.jsxs)("div",{className:"flex gap-3 mr-auto max-w-[85%]",children:[(0,b.jsx)("div",{className:"flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs shadow-sm",children:(0,b.jsx)(f,{className:"size-4"})}),(0,b.jsx)("div",{className:"rounded-2xl rounded-tl-none bg-muted px-4 py-3 border border-border/60 shadow-sm",children:(0,b.jsxs)("div",{className:"flex items-center gap-1 py-1",children:[(0,b.jsx)("span",{className:"size-2 animate-bounce rounded-full bg-muted-foreground/60"}),(0,b.jsx)("span",{className:"size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.2s]"}),(0,b.jsx)("span",{className:"size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.4s]"})]})})]}),(0,b.jsx)("div",{ref:q})]})}),1===a.length&&(0,b.jsxs)("div",{className:"mt-4",children:[(0,b.jsxs)("p",{className:"mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground",children:[(0,b.jsx)(i,{className:"size-3.5"}),"Suggested questions:"]}),(0,b.jsx)("div",{className:"flex flex-wrap gap-2",children:l.map((a,c)=>(0,b.jsxs)("button",{type:"button",onClick:()=>r(a.q),className:"flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 hover:bg-muted hover:text-foreground transition-colors cursor-pointer",children:[(0,b.jsx)(k.MessageSquare,{className:"size-3 text-primary"}),a.label,(0,b.jsx)(j.ArrowRight,{className:"size-2.5 text-muted-foreground"})]},c))})]}),(0,b.jsxs)("form",{onSubmit:a=>{a.preventDefault(),r(m)},className:"mt-4 flex gap-2",children:[(0,b.jsx)("input",{type:"text",value:m,onChange:a=>n(a.target.value),placeholder:"Ask Zaid about letters, Tajweed rules...",className:"flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none shadow-sm"}),(0,b.jsx)("button",{type:"submit",className:"flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/10 transition-opacity hover:opacity-90 cursor-pointer","aria-label":"Send message",children:(0,b.jsx)(d.Send,{className:"size-5","aria-hidden":"true"})})]})]})}],24773)}];

//# sourceMappingURL=Desktop_tilawa-iqra_TILAWA-IQRA_apps_web_frontend_12ez0t~._.js.map