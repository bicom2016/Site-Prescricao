"""Create web derivatives from the client's imgs-v2 delivery, preserving the sources.

Run from any directory with Python and Pillow: python tools/prepare-images-v2.py
The allocation guide and the banner application example are references, not site assets.
"""

from hashlib import sha256
import json
from pathlib import Path
import sys
import unicodedata

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/images/imgs-v2"
OUTPUT = ROOT / "assets/images/v2"

# Source folder, client filename, published filename, maximum width, lossless.
ASSETS = [
    ("Home", "[HOME] Imagem principal da Home (médica prescrevendo)_1.png", "home-hero-1280.webp", 1280, False),
    ("Home", "[HOME] Imagem principal da Home (médica prescrevendo)_1.png", "home-hero-2560.webp", 2560, False),
    ("Home", "banner_nobva-prescricao_1063x420.png", "home-banner.webp", 1063, False),
    ("Recursos", "[RECURSOS] Imagem retangular.png", "recursos-consulta.webp", 1920, False),
    ("Recursos", "[RECURSOS] Imagem para representar Whitebook_2.png", "recursos-whitebook.webp", 1200, False),
    ("Recursos", "[RECURSOS] Imagem para representar iClinic.png", "recursos-iclinic.webp", 1200, False),
    ("RDC 1000_2025", "RDC - Imagem topo.png", "rdc-topo.webp", 1280, False),
    ("PARA QUEM", "[PARA QUEM] Medicos.png", "perfil-topo-medicos.webp", 960, False),
    ("PARA QUEM", "[PARA QUEM - Topo] Clínicas e consultórios.png", "perfil-topo-clinicas.webp", 960, False),
    ("PARA QUEM", "[PARA QUEM - Topo] Pacientes.png", "perfil-topo-pacientes.webp", 960, False),
    ("PARA QUEM", "[PARA QUEM - Topo] Farmácias.png", "perfil-topo-farmacias.webp", 960, False),
    ("PARA QUEM", "[PARA QUEM -Corpo] Médicos.png", "perfil-corpo-medicos.webp", 1200, False),
    ("PARA QUEM", "[PARA QUEM -Corpo] Clínicas e consultorios.png", "perfil-corpo-clinicas.webp", 1200, False),
    ("PARA QUEM", "[PARA QUEM -Corpo] Pacientes.png", "perfil-corpo-pacientes.webp", 1200, False),
    ("PARA QUEM", "[PARA QUEM -Corpo] farmacia.png", "perfil-corpo-farmacias.webp", 1200, False),
    ("PARA QUEM", "[PARA QUEM -Corpo] mockup-iclinic.png", "iclinic-notebook.webp", 1600, True),
    ("Parceiros", "[Parceiros] Dispensador Farmácia.png", "parceiros-dispensador.webp", 1280, False),
    ("Parceiros", "[Parceiros] Indústria farmacêutica.png", "parceiros-industria.webp", 1280, False),
]


def find_source(folder, filename):
    candidates = [
        p for p in (SOURCE / folder).iterdir()
        if unicodedata.normalize("NFC", p.name) == filename
    ]
    if len(candidates) != 1:
        raise FileNotFoundError(f"Expected one source for {folder}/{filename}")
    return candidates[0]


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    originals = {}
    for folder, filename, published, width, lossless in ASSETS:
        source = find_source(folder, filename)
        target = OUTPUT / published
        with Image.open(source) as original:
            source_size = original.size
            image = original.copy()
        if image.mode == "RGBA" and image.getextrema()[3] == (255, 255):
            image = image.convert("RGB")
        image.thumbnail((width, width * 4), Image.Resampling.LANCZOS)
        quality = 95 if published == "home-banner.webp" else 86
        image.save(target, "WEBP", quality=quality, method=6, lossless=lossless)
        originals[str(source)] = source.stat().st_size
        manifest.append({
            "source": source.relative_to(ROOT).as_posix(),
            "source_sha256": sha256(source.read_bytes()).hexdigest(),
            "source_dimensions": list(source_size),
            "output": target.relative_to(ROOT).as_posix(),
            "dimensions": list(image.size),
            "bytes": target.stat().st_size,
            "alpha_preserved": image.mode == "RGBA",
        })
    (ROOT / "docs/imagens-v2-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Prepared {len(manifest)} derivatives from {len(originals)} client images.")
    print(f"Source size: {sum(originals.values()):,} bytes; derivatives: {sum(x['bytes'] for x in manifest):,} bytes.")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
