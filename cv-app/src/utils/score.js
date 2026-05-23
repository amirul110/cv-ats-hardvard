// Heuristic CV scoring (1-100) with bilingual reasoning.
// Each category contributes a sub-score; we sum & cap at 100.

const ACTION_VERBS = [
  "led",
  "built",
  "designed",
  "developed",
  "managed",
  "created",
  "delivered",
  "launched",
  "increased",
  "reduced",
  "improved",
  "implemented",
  "drove",
  "spearheaded",
  "engineered",
  "architected",
  "optimized",
  "automated",
  "negotiated",
  "coordinated",
  "facilitated",
  "mentored",
  "trained",
  "produced",
  "shipped",
  "deployed",
  "founded",
  "initiated",
  "researched",
  "analyzed",
  "presented",
  "published",
  "organized",
  "supervised",
  "scaled",
  "grew",
  "boosted",
  "saved",
  "generated",
  "achieved",
  "executed",
  "established",
  "expanded",
  "streamlined",
  // ID
  "memimpin",
  "membangun",
  "merancang",
  "mengelola",
  "menciptakan",
  "meluncurkan",
  "meningkatkan",
  "mengurangi",
  "memperbaiki",
  "menerapkan",
  "mengoptimalkan",
  "mengotomatisasi",
  "menegosiasikan",
  "mengoordinasikan",
  "memfasilitasi",
  "membimbing",
  "melatih",
  "memproduksi",
  "merilis",
  "mendirikan",
  "memulai",
  "meneliti",
  "menganalisis",
  "mempresentasikan",
  "menerbitkan",
  "mengorganisasi",
  "mengawasi",
  "menumbuhkan",
  "menghemat",
  "menghasilkan",
  "mencapai",
];

const PRONOUNS = [/\bi\b/i, /\bmy\b/i, /\bme\b/i, /\bsaya\b/i, /\baku\b/i];

const startsWithActionVerb = (s) => {
  if (!s) return false;
  const first = s.trim().split(/\s+/)[0]?.toLowerCase();
  if (!first) return false;
  return ACTION_VERBS.includes(first.replace(/[.,;:]/g, ""));
};

const hasNumbers = (s) => /\d/.test(s || "");

const containsPronoun = (s) => PRONOUNS.some((re) => re.test(s || ""));

const isPlaceholder = (s) =>
  !s ||
  /\[note:|firstname|lastname|youremail|phone number|month year|graduation date|degree, concentration|position title|organization|city, state/i.test(
    s
  );

const isValidEmail = (s) =>
  /^[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/.test((s || "").trim());

const isValidUrl = (s) => {
  if (!s) return false;
  try {
    new URL(s.startsWith("http") ? s : `https://${s}`);
    return true;
  } catch {
    return false;
  }
};

/**
 * Returns { total, breakdown:[{key,label_en,label_id,score,max,reasons:[{en,id,sign}]}] }
 */
export function scoreCV(cv) {
  const breakdown = [];

  // ---------- 1. Personal completeness (15) ----------
  {
    const reasons = [];
    let score = 0;
    const checks = [
      ["fullName", "Full name", "Nama lengkap", 3],
      ["email", "Email", "Email", 3],
      ["phone", "Phone", "Nomor telepon", 2],
      ["address", "Address / city", "Alamat / kota", 2],
      ["linkedin", "LinkedIn URL", "URL LinkedIn", 2],
      ["description", "Personal description", "Deskripsi pribadi", 3],
    ];
    checks.forEach(([key, en, id, w]) => {
      const v = cv[key === "address" ? "city" : key] || cv[key];
      if (v && !isPlaceholder(v)) {
        score += w;
        reasons.push({ en: `${en} present`, id: `${id} terisi`, sign: "+" });
      } else {
        reasons.push({
          en: `${en} missing or placeholder`,
          id: `${id} kosong atau masih contoh`,
          sign: "-",
        });
      }
    });
    breakdown.push({
      key: "personal",
      label_en: "Personal information",
      label_id: "Informasi pribadi",
      score,
      max: 15,
      reasons,
    });
  }

  // ---------- 2. Contact validity (10) ----------
  {
    const reasons = [];
    let score = 0;
    if (isValidEmail(cv.email)) {
      score += 5;
      reasons.push({
        en: "Email is well-formed",
        id: "Format email valid",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Email looks invalid",
        id: "Format email tidak valid",
        sign: "-",
      });
    }
    if (cv.phone && /\d{6,}/.test(cv.phone)) {
      score += 3;
      reasons.push({
        en: "Phone has sufficient digits",
        id: "Nomor telepon memiliki cukup angka",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Phone number too short or missing digits",
        id: "Nomor telepon terlalu pendek / kurang angka",
        sign: "-",
      });
    }
    if (isValidUrl(cv.linkedin) || isValidUrl(cv.portfolio)) {
      score += 2;
      reasons.push({
        en: "Online profile URL provided",
        id: "Profil online (LinkedIn/portofolio) tersedia",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "No valid online profile URL",
        id: "Belum ada URL profil online yang valid",
        sign: "-",
      });
    }
    breakdown.push({
      key: "contact",
      label_en: "Contact validity",
      label_id: "Validitas kontak",
      score,
      max: 10,
      reasons,
    });
  }

  // ---------- 3. Education (15) ----------
  {
    const reasons = [];
    let score = 0;
    const edus = (cv.education || []).filter(
      (e) => e.institution && !isPlaceholder(e.institution)
    );
    if (edus.length >= 1) {
      score += 6;
      reasons.push({
        en: `${edus.length} education entr${edus.length === 1 ? "y" : "ies"}`,
        id: `Ada ${edus.length} entri pendidikan`,
        sign: "+",
      });
    } else {
      reasons.push({
        en: "No real education entry yet",
        id: "Belum ada entri pendidikan nyata",
        sign: "-",
      });
    }
    const withDate = edus.filter((e) => e.date && !isPlaceholder(e.date));
    if (withDate.length === edus.length && edus.length) {
      score += 3;
      reasons.push({
        en: "All education entries have dates",
        id: "Semua pendidikan memiliki tanggal",
        sign: "+",
      });
    } else if (edus.length) {
      reasons.push({
        en: "Some education entries missing dates",
        id: "Sebagian pendidikan belum berisi tanggal",
        sign: "-",
      });
    }
    const withDegree = edus.filter((e) => e.degree && !isPlaceholder(e.degree));
    if (withDegree.length) {
      score += 3;
      reasons.push({
        en: "Degree / concentration filled",
        id: "Gelar / konsentrasi terisi",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Degree / concentration missing",
        id: "Gelar / konsentrasi belum diisi",
        sign: "-",
      });
    }
    if (edus.some((e) => e.coursework && !isPlaceholder(e.coursework))) {
      score += 3;
      reasons.push({
        en: "Relevant coursework / honors provided",
        id: "Mata kuliah relevan / penghargaan tersedia",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Add relevant coursework or honors for impact",
        id: "Tambahkan mata kuliah relevan / penghargaan",
        sign: "-",
      });
    }
    breakdown.push({
      key: "education",
      label_en: "Education",
      label_id: "Pendidikan",
      score,
      max: 15,
      reasons,
    });
  }

  // ---------- 4. Experience quality (30) ----------
  {
    const reasons = [];
    let score = 0;
    const exps = (cv.experience || []).filter(
      (e) => e.organization && !isPlaceholder(e.organization)
    );
    if (exps.length >= 2) {
      score += 6;
      reasons.push({
        en: `${exps.length} work experiences listed`,
        id: `Tercatat ${exps.length} pengalaman kerja`,
        sign: "+",
      });
    } else if (exps.length === 1) {
      score += 3;
      reasons.push({
        en: "Only 1 experience – consider adding more",
        id: "Baru 1 pengalaman – pertimbangkan tambah",
        sign: "-",
      });
    } else {
      reasons.push({
        en: "No real experience entry yet",
        id: "Belum ada pengalaman nyata",
        sign: "-",
      });
    }

    const allBullets = exps.flatMap((e) => e.bullets || []).filter(
      (b) => b && !isPlaceholder(b)
    );
    if (allBullets.length >= 6) {
      score += 4;
      reasons.push({
        en: `${allBullets.length} substantive bullets across roles`,
        id: `Total ${allBullets.length} poin pengalaman yang substantif`,
        sign: "+",
      });
    } else if (allBullets.length >= 3) {
      score += 2;
      reasons.push({
        en: "Add a few more bullets to show impact",
        id: "Tambahkan beberapa poin lagi untuk menunjukkan dampak",
        sign: "-",
      });
    } else {
      reasons.push({
        en: "Too few real bullets – aim for 3-5 per role",
        id: "Poin pengalaman masih sedikit – idealnya 3-5 per peran",
        sign: "-",
      });
    }

    const verbBullets = allBullets.filter((b) => startsWithActionVerb(b));
    const verbRatio = allBullets.length
      ? verbBullets.length / allBullets.length
      : 0;
    if (verbRatio >= 0.7) {
      score += 8;
      reasons.push({
        en: `${Math.round(verbRatio * 100)}% of bullets start with action verbs`,
        id: `${Math.round(verbRatio * 100)}% poin diawali kata kerja aktif`,
        sign: "+",
      });
    } else if (verbRatio >= 0.4) {
      score += 4;
      reasons.push({
        en: "Improve bullets: start each with an action verb (Led, Built, Designed…)",
        id: "Perbaiki poin: mulai dengan kata kerja aktif (Memimpin, Membangun, Merancang…)",
        sign: "-",
      });
    } else {
      reasons.push({
        en: "Most bullets do not start with an action verb",
        id: "Sebagian besar poin tidak diawali kata kerja aktif",
        sign: "-",
      });
    }

    const numericBullets = allBullets.filter((b) => hasNumbers(b));
    const numRatio = allBullets.length
      ? numericBullets.length / allBullets.length
      : 0;
    if (numRatio >= 0.5) {
      score += 8;
      reasons.push({
        en: `${Math.round(numRatio * 100)}% of bullets quantify results`,
        id: `${Math.round(numRatio * 100)}% poin memuat angka / kuantitas`,
        sign: "+",
      });
    } else if (numRatio >= 0.2) {
      score += 4;
      reasons.push({
        en: "Quantify more results (numbers, %, $)",
        id: "Tambahkan kuantitas (angka, %, Rp) pada lebih banyak poin",
        sign: "-",
      });
    } else {
      reasons.push({
        en: "No quantified results – add metrics where possible",
        id: "Belum ada hasil terukur – tambahkan metrik bila bisa",
        sign: "-",
      });
    }

    const pronounBullets = allBullets.filter((b) => containsPronoun(b));
    if (allBullets.length && pronounBullets.length === 0) {
      score += 4;
      reasons.push({
        en: "No personal pronouns – Harvard-style compliant",
        id: "Tidak menggunakan kata ganti pribadi – sesuai gaya Harvard",
        sign: "+",
      });
    } else if (allBullets.length) {
      reasons.push({
        en: `${pronounBullets.length} bullet(s) use personal pronouns`,
        id: `${pronounBullets.length} poin masih memakai kata ganti pribadi`,
        sign: "-",
      });
    }
    breakdown.push({
      key: "experience",
      label_en: "Experience quality",
      label_id: "Kualitas pengalaman",
      score,
      max: 30,
      reasons,
    });
  }

  // ---------- 5. Leadership (10) ----------
  {
    const reasons = [];
    let score = 0;
    const lead = (cv.leadership || []).filter(
      (l) => l.organization && !isPlaceholder(l.organization)
    );
    if (lead.length >= 1) {
      score += 5;
      reasons.push({
        en: `${lead.length} leadership / activity entr${
          lead.length === 1 ? "y" : "ies"
        }`,
        id: `Ada ${lead.length} entri kepemimpinan / aktivitas`,
        sign: "+",
      });
    } else {
      reasons.push({
        en: "No leadership / activities yet",
        id: "Belum ada kepemimpinan / aktivitas",
        sign: "-",
      });
    }
    const leadBullets = lead.flatMap((l) => l.bullets || []).filter(
      (b) => b && !isPlaceholder(b)
    );
    if (leadBullets.length >= 2) {
      score += 5;
      reasons.push({
        en: "Activities described with bullets",
        id: "Aktivitas dijelaskan dengan poin",
        sign: "+",
      });
    } else if (lead.length) {
      reasons.push({
        en: "Add bullet descriptions to your activities",
        id: "Tambahkan deskripsi poin pada aktivitas kamu",
        sign: "-",
      });
    }
    breakdown.push({
      key: "leadership",
      label_en: "Leadership & activities",
      label_id: "Kepemimpinan & aktivitas",
      score,
      max: 10,
      reasons,
    });
  }

  // ---------- 6. Skills & interests (10) ----------
  {
    const reasons = [];
    let score = 0;
    const s = cv.skills || {};
    const realFields = ["technical", "language", "laboratory", "interests"].filter(
      (k) => s[k] && !isPlaceholder(s[k])
    );
    score += realFields.length * 2.5;
    if (realFields.length === 4) {
      reasons.push({
        en: "All skill categories filled",
        id: "Semua kategori keterampilan terisi",
        sign: "+",
      });
    } else if (realFields.length >= 2) {
      reasons.push({
        en: `${realFields.length}/4 skill categories filled`,
        id: `${realFields.length}/4 kategori keterampilan terisi`,
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Add more concrete skills (technical, language, etc.)",
        id: "Tambahkan keterampilan konkret (teknis, bahasa, dll.)",
        sign: "-",
      });
    }
    breakdown.push({
      key: "skills",
      label_en: "Skills & interests",
      label_id: "Keterampilan & minat",
      score: Math.round(score),
      max: 10,
      reasons,
    });
  }

  // ---------- 7. Format & length (10) ----------
  {
    const reasons = [];
    let score = 0;
    const desc = cv.description || "";
    if (desc.length >= 100 && desc.length <= 200) {
      score += 4;
      reasons.push({
        en: "Personal description is well-sized (100-200 chars)",
        id: "Deskripsi pribadi panjangnya pas (100-200 karakter)",
        sign: "+",
      });
    } else if (desc.length > 0) {
      reasons.push({
        en: `Description is ${desc.length} chars – aim for 100-150`,
        id: `Deskripsi ${desc.length} karakter – idealnya 100-150`,
        sign: "-",
      });
    } else {
      reasons.push({
        en: "Add a short personal description",
        id: "Tambahkan deskripsi singkat tentang kamu",
        sign: "-",
      });
    }
    const allBullets = (cv.experience || [])
      .flatMap((e) => e.bullets || [])
      .filter((b) => b && !isPlaceholder(b));
    const tooLong = allBullets.filter((b) => b.length > 200).length;
    if (allBullets.length && tooLong / allBullets.length < 0.2) {
      score += 3;
      reasons.push({
        en: "Bullets are concise",
        id: "Poin-poin sudah ringkas",
        sign: "+",
      });
    } else if (allBullets.length) {
      reasons.push({
        en: "Some bullets are too long – aim for 1-2 lines each",
        id: "Beberapa poin terlalu panjang – idealnya 1-2 baris",
        sign: "-",
      });
    }
    if (
      cv.education?.length &&
      cv.experience?.length &&
      (cv.leadership?.length || cv.skills?.technical)
    ) {
      score += 3;
      reasons.push({
        en: "All major sections populated",
        id: "Semua bagian utama sudah diisi",
        sign: "+",
      });
    } else {
      reasons.push({
        en: "Some sections empty",
        id: "Sebagian bagian masih kosong",
        sign: "-",
      });
    }
    breakdown.push({
      key: "format",
      label_en: "Format & length",
      label_id: "Format & panjang",
      score,
      max: 10,
      reasons,
    });
  }

  const total = Math.min(
    100,
    breakdown.reduce((s, b) => s + b.score, 0)
  );
  return { total, breakdown };
}

export function scoreLabel(total, lang = "en") {
  if (total >= 85) return lang === "id" ? "Sangat baik" : "Excellent";
  if (total >= 70) return lang === "id" ? "Baik" : "Good";
  if (total >= 50) return lang === "id" ? "Perlu diperbaiki" : "Needs work";
  return lang === "id" ? "Kurang" : "Weak";
}
