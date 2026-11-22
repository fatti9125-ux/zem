import { KokoroTTS } from "kokoro-js"; import fs from "fs";
const [inp, out, voice, speed] = process.argv.slice(2);
const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" });
const S = JSON.parse(fs.readFileSync(inp, "utf8")); fs.mkdirSync(out, { recursive: true });
for (let i = 0; i < S.length; i++) { const f = `${out}/s${String(i).padStart(3,"0")}.wav`; if (fs.existsSync(f)) continue; const a = await tts.generate(S[i].s, { voice, speed: +speed }); await a.save(f); if (i % 10 == 0) console.log(i); }
console.log("done");
