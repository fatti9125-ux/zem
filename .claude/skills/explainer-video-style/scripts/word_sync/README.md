# Word-anchored sync (text appears on the spoken word)

1. **Voice**: use the user's VO, or, if they only sent a script, make a placeholder VO sentence by sentence with Kokoro TTS:
   `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node tts_sents.mjs sents.json out/ am_michael 1.5`
   (npm `kokoro-js` installed with `--onnxruntime-node-install-cuda=skip`; the model comes from huggingface.co). Split the script into `sents.json` = [{p: paragraph, s: sentence}].
2. **Word times**: convert each sentence to 24 kHz s16 and run `tr_many.py` (faster-whisper, word timestamps) per sentence. Then run `build_wt.py`. It concatenates the sentences with 0.12 s gaps (0.35 s between paragraphs), aligns Whisper words to the script words (difflib; unmatched words are interpolated by character position) and writes `wt.js` (`WT[sentence] = [[word, time]]`, `SST`, `END`) plus `vo_full.wav`.
3. **Scenes** (`word_anchored_helpers.js`): every element uses `A(sentence, 'word', nth)` for its start time, and a scene starts at `{at:[sentence, 'word']}`. Nothing is timed by hand, so a new VO only needs a new `wt.js`.
4. `resolve_buf.js` resolves scene and shot anchors to `scenes_resolved.json` for the footage EDL, and prints every `ANCHOR MISS`. Fix each miss before rendering.
