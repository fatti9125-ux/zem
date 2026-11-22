import { KokoroTTS } from "kokoro-js";
import fs from "fs";
const [inp, out, voice] = process.argv.slice(2);
const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" });
const paras = fs.readFileSync(inp, "utf8").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
fs.mkdirSync(out, { recursive: true });
for (let i = 0; i < paras.length; i++) { const a = await tts.generate(paras[i], { voice: voice || "am_michael", speed: 1.08 }); await a.save(`${out}/p${String(i).padStart(2,"0")}.wav`); console.log(i, paras[i].slice(0, 40)); }
