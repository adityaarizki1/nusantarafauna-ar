/**
 * NusantaraFauna AR - Core Application Logic
 * Integrasi A-Frame, AR.js, Audio Kontrol, dan Pop-up Edukasi Konservasi
 */

// Database Edukasi Satwa Endemik
const SATWA_DATA = {
  komodo: {
    name: "Komodo",
    latin: "Varanus komodoensis",
    status: "Endangered (Terancam)",
    statusClass: "badge-endangered",
    habitat: "Taman Nasional Komodo, Nusa Tenggara Timur (Pulau Komodo, Rinca, Padar, Flores)",
    description: "Kadal terbesar di dunia yang masih hidup di bumi, dengan panjang mencapai 3 meter dan bobot hingga 70-90 kg. Memiliki bisa mematikan dan indra penciuman tajam melalui lidahnya yang bercabang.",
    facts: "Hanya hidup di alam liar Indonesia dan tidak ditemukan di belahan bumi manapun lainnya. Fosil nenek moyang komodo telah ada sejak jutaan tahun lalu.",
    patriotMsg: "Komodo adalah ikon kebanggaan fauna nasional Indonesia. Melindungi habitat Pulau Komodo dari eksploitasi berlebihan adalah kewajiban kita sebagai bangsa berdaulat.",
    audio: "assets/audio/komodo.mp3"
  },
  badak: {
    name: "Badak Jawa Bercula Satu",
    latin: "Rhinoceros sondaicus",
    status: "Critically Endangered (Kritis)",
    statusClass: "badge-critically-endangered",
    habitat: "Taman Nasional Ujung Kulon, Banten (Ujung barat Pulau Jawa)",
    description: "Salah satu mamalia paling langka di dunia dengan populasi tersisa kurang dari 80 individu. Memiliki cula tunggal berukuran sekitar 20-25 cm dan kulit berlipat menyerupai baju baja.",
    facts: "Populasi badak Jawa sangat rentan terhadap kepunahan karena seluruh populasinya terkonsentrasi di satu lokasi tunggal yang rawan bencana alam tsunami letusan Gunung Anak Krakatau.",
    patriotMsg: "Menjaga Badak Jawa berarti menjaga benteng terakhir keanekaragaman hayati hutan hujan Pulau Jawa. Setiap individu badak yang bertahan adalah bukti martabat konservasi Indonesia.",
    audio: "assets/audio/badak.mp3"
  },
  orangutan: {
    name: "Orangutan Sumatra & Kalimantan",
    latin: "Pongo abelii / Pongo pygmaeus",
    status: "Critically Endangered (Kritis)",
    statusClass: "badge-critically-endangered",
    habitat: "Hutan Hujan Tropis Dataran Rendah Sumatra (Leuser) dan Kalimantan",
    description: "Satu-satunya kera besar (great ape) yang hidup di benua Asia. Memiliki rambut kemerahan panjang, lengan yang sangat kuat untuk berayun di kanopi pohon, dan kecerdasan setara balita manusia.",
    facts: "Orangutan dijuluki 'Petani Hutan' (Gardeners of the Rainforest) karena mereka memakan buah dan menyebarkan biji-bijian ke seluruh penjuru hutan, menjaga regenerasi pohon rimba nusantara.",
    patriotMsg: "Hutan tropis Indonesia adalah paru-paru dunia sekaligus rumah bagi Orangutan. Mencegah deforestasi dan perburuan liar adalah wujud nyata bela negara untuk kelestarian bumi nusantara.",
    audio: "assets/audio/orangutan.mp3"
  },
  cenderawasih: {
    name: "Burung Cenderawasih",
    latin: "Paradisaea apoda",
    status: "Dilindungi Penuh (Permen LHK No. P.106/2018)",
    statusClass: "badge-vulnerable",
    habitat: "Hutan Hujan Pegunungan Papua dan Kepulauan Maluku",
    description: "Dijuluki 'Bird of Paradise' (Burung dari Surga) karena keindahan bulu ekor pejantannya yang berwarna-warni cemerlang dan tarian ritualnya yang memukau untuk memikat betina.",
    facts: "Dalam mitologi masyarakat adat Papua, burung ini dipercaya sebagai titisan suci dari surga yang tidak pernah menyentuh tanah dan hanya memakan embun surga.",
    patriotMsg: "Kemegahan Cenderawasih adalah simbol mahkota tanah Papua yang tak ternilai. Tolak segala bentuk cinderamata atau aksesoris dari bulu cenderawasih asli demi kelangsungan hidupnya di alam bebas.",
    audio: "assets/audio/cenderawasih.mp3"
  }
};

// Global App State
let currentDetectedSatwa = null;
let currentAudio = null;
let isAudioPlaying = false;
let userInteracted = false;

// DOM Elements
const statusBadge = document.getElementById("status-badge");
const statusText = document.getElementById("status-text");
const quickInfo = document.getElementById("satwa-quick-info");
const quickName = document.getElementById("quick-name");
const quickLatin = document.getElementById("quick-latin");
const quickBadge = document.getElementById("quick-badge");
const btnAudio = document.getElementById("btn-audio");
const btnInfo = document.getElementById("btn-info");
const scanCrosshair = document.getElementById("scan-crosshair");

// Modal Elements
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalLatin = document.getElementById("modal-latin");
const modalStatus = document.getElementById("modal-status");
const modalHabitat = document.getElementById("modal-habitat");
const modalDesc = document.getElementById("modal-desc");
const modalFacts = document.getElementById("modal-facts");
const modalPatriot = document.getElementById("modal-patriot");

// Initialize on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  setupUserInteractionGate();
  setupMarkerListeners();
  setupUIEvents();
  console.log("NusantaraFauna AR Ready!");
});

// Unlock Audio on First User Touch/Click (Mobile Browser Audio Policy)
function setupUserInteractionGate() {
  const unlockAudio = () => {
    userInteracted = true;
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("click", unlockAudio);
    console.log("Audio Context Unlocked via user gesture.");
  };
  window.addEventListener("touchstart", unlockAudio, { once: true });
  window.addEventListener("click", unlockAudio, { once: true });
}

// Setup AR.js Marker Event Handlers
function setupMarkerListeners() {
  const markerIds = [
    { id: "marker-komodo", key: "komodo" },
    { id: "marker-badak", key: "badak" },
    { id: "marker-orangutan", key: "orangutan" },
    { id: "marker-cenderawasih", key: "cenderawasih" }
  ];

  markerIds.forEach(({ id, key }) => {
    const markerEl = document.getElementById(id);
    if (!markerEl) return;

    markerEl.addEventListener("markerFound", () => {
      onMarkerDetected(key);
    });

    markerEl.addEventListener("markerLost", () => {
      onMarkerLost(key);
    });
  });
}

// When a marker is detected by the camera
function onMarkerDetected(satwaKey) {
  const data = SATWA_DATA[satwaKey];
  if (!data) return;

  currentDetectedSatwa = satwaKey;

  // Update Status UI
  statusBadge.classList.add("detected");
  statusText.textContent = `Terdeteksi: ${data.name}`;
  if (scanCrosshair) scanCrosshair.classList.add("hidden");

  // Show Quick Info Box
  quickName.textContent = data.name;
  quickLatin.textContent = data.latin;
  quickBadge.textContent = data.status.split(" ")[0];
  quickBadge.className = `quick-badge ${data.statusClass}`;
  quickInfo.classList.add("show");

  // Enable buttons
  btnAudio.classList.remove("disabled");
  btnInfo.classList.remove("disabled");

  // Optional: Auto play sound once unlocked if not already playing
  if (userInteracted && !isAudioPlaying) {
    playSatwaAudio(satwaKey);
  }
}

// When marker leaves the camera view
function onMarkerLost(satwaKey) {
  // Only revert if lost marker is the active one
  if (currentDetectedSatwa === satwaKey) {
    statusBadge.classList.remove("detected");
    statusText.textContent = "Arahkan kamera ke kartu satwa...";
    if (scanCrosshair) scanCrosshair.classList.remove("hidden");
  }
}

// Play / Pause Sound Effect
function toggleAudio() {
  if (!currentDetectedSatwa) {
    alert("Silakan arahkan kamera ke kartu satwa terlebih dahulu.");
    return;
  }

  if (isAudioPlaying) {
    stopSatwaAudio();
  } else {
    playSatwaAudio(currentDetectedSatwa);
  }
}

function playSatwaAudio(satwaKey) {
  const data = SATWA_DATA[satwaKey];
  if (!data) return;

  stopSatwaAudio();

  // Try loading audio file, fallback to Web Audio API sound synthesizer
  try {
    currentAudio = new Audio(data.audio);
    currentAudio.play().then(() => {
      isAudioPlaying = true;
      btnAudio.classList.add("active");
      currentAudio.onended = () => {
        isAudioPlaying = false;
        btnAudio.classList.remove("active");
      };
    }).catch((err) => {
      console.warn("Audio file play failed, triggering synthesized sound:", err);
      playSynthesizedSound(satwaKey);
    });
  } catch (e) {
    playSynthesizedSound(satwaKey);
  }
}

function stopSatwaAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  isAudioPlaying = false;
  btnAudio.classList.remove("active");
}

// Web Audio API Fallback Synthesizer (Guarantees sound always works on all devices)
function playSynthesizedSound(satwaKey) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (satwaKey === "cenderawasih") {
      // High bird chirp
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (satwaKey === "komodo") {
      // Low rumble
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(70, ctx.currentTime);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } else {
      // General mammal vocalization
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }

    isAudioPlaying = true;
    btnAudio.classList.add("active");
    setTimeout(() => {
      isAudioPlaying = false;
      btnAudio.classList.remove("active");
    }, 800);
  } catch (err) {
    console.error("Web Audio API not supported", err);
  }
}

// Info Modal Handlers
function openInfoModal() {
  if (!currentDetectedSatwa) {
    // If no marker is detected, show quick selection or guide
    openHelpModal();
    return;
  }

  const data = SATWA_DATA[currentDetectedSatwa];
  if (!data) return;

  modalTitle.textContent = data.name;
  modalLatin.textContent = data.latin;
  modalStatus.textContent = data.status;
  modalStatus.className = `quick-badge ${data.statusClass}`;
  modalHabitat.textContent = data.habitat;
  modalDesc.textContent = data.description;
  modalFacts.textContent = data.facts;
  modalPatriot.textContent = data.patriotMsg;

  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

// Help / Instruction Modal
function openHelpModal() {
  modalTitle.textContent = "Panduan NusantaraFauna AR";
  modalLatin.textContent = "Media Belajar Berbasis Web Augmented Reality";
  modalStatus.textContent = "Petunjuk Penggunaan";
  modalStatus.className = "quick-badge badge-vulnerable";
  modalHabitat.textContent = "Ponsel Android / iPhone dengan kamera aktif";
  modalDesc.textContent = "1. Cetak atau tampilkan Flashcard Satwa.\n2. Berikan izin akses kamera pada peramban (Chrome/Safari).\n3. Arahkan kamera ke sisi depan kartu penanda (marker).\n4. Model 3D satwa akan muncul di atas kartu secara real-time!";
  modalFacts.textContent = "Tekan tombol speaker untuk mendengarkan suara khas satwa, dan tombol 'i' untuk membaca fakta konservasi serta status kelangkaan IUCN.";
  modalPatriot.textContent = "Proyek EAS Mata Kuliah Realitas Bercampur - Teknik Informatika Universitas 17 Agustus 1945 Surabaya.";

  modalOverlay.classList.add("active");
}

// Screenshot capture
function captureScreenshot() {
  alert("Tips Demo: Ambil tangkapan layar (screenshot) langsung melalui tombol fisik ponsel Anda (Power + Volume Down) untuk kualitas foto terbaik bersama objek 3D satwa!");
}

// Setup Click Events
function setupUIEvents() {
  btnAudio.addEventListener("click", toggleAudio);
  btnInfo.addEventListener("click", openInfoModal);
  document.getElementById("btn-help").addEventListener("click", openHelpModal);
  document.getElementById("btn-capture").addEventListener("click", captureScreenshot);
  document.getElementById("modal-close-btn").addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
