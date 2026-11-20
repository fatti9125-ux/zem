#!/usr/bin/env python3
"""Cut a person/object out of a frame (transparent PNG) for presenter-over-number and collage looks.

Usage: python3 -I cutout.py frame.png out.png [--model isnet-general-use|u2net_human_seg] [--feather 1.2] [--check check.jpg]
Needs: pip install "rembg[cpu]" scipy pillow   (model downloads once from github.com/danielgatis/rembg releases)
Cleans the mask: threshold 0.5 -> keep the largest connected region (drops crowd fragments / smoke) -> fill holes -> feather.
Tip: choose a frame where the subject is separated from people behind them; crop the bottom (podium) with a gradient in the edit.
"""
import argparse
import numpy as np
from PIL import Image
from scipy import ndimage
from rembg import remove, new_session

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--model", default="isnet-general-use"); ap.add_argument("--feather", type=float, default=1.2)
ap.add_argument("--check", help="also write a JPG of the cut-out over green for QC")
a = ap.parse_args()
im = Image.open(a.src).convert("RGB")
m = np.array(remove(im, session=new_session(a.model), only_mask=True)).astype(float) / 255
b = m > 0.5
lab, n = ndimage.label(b)
if n:
    b = lab == (np.argmax(ndimage.sum(b, lab, range(1, n + 1))) + 1)
b = ndimage.binary_fill_holes(b)
alpha = (ndimage.gaussian_filter(b.astype(float), a.feather) * 255).astype(np.uint8)
out = Image.fromarray(np.dstack([np.array(im), alpha]), "RGBA"); out.save(a.out)
if a.check:
    bg = Image.new("RGB", im.size, (51, 170, 85)); bg.paste(out, (0, 0), out); bg.save(a.check)
print("wrote", a.out, im.size)
