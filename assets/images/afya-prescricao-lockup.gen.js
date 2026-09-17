// Monta o lockup "Afya <PALAVRA>" a partir do lockup original do Whitebook.
// O simbolo Afya e recortado pixel a pixel do arquivo existente, para ficar
// identico. A palavra e composta na AfyaSans ExtraBold com os parametros
// medidos no original: caixa-alta de 81px, inclinacao de 10 graus, condensacao
// de 0.95 e entreletra de -2.19px — combinacao que reproduz o "WHITEBOOK"
// original com a largura exata de 686px.
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');

const SRC = 'C:/Users/mathe/Downloads/Site-Prescricao/assets/images/afya-whitebook-lockup.png';
const FONT = 'C:/Users/mathe/Downloads/Site-Prescricao/assets/fonts/AfyaSans-ExtraBold.ttf';

const AFYA_X1 = 353;
const GAP = 56;
const CAP_HEIGHT = 81;
const BASELINE = 113;
const SLANT = Math.tan((10 * Math.PI) / 180);
const SCALE_X = 0.95;
const CANVAS_H = 145;
const LARGURA_ORIGINAL = 686; // tinta do "WHITEBOOK" no lockup de referencia
let TRACKING = -2.19;         // ajustado abaixo ate o controle bater com o original

GlobalFonts.registerFromPath(FONT, 'AfyaSansXB');

const WORD = process.argv[2];
const OUT = process.argv[3];

const probe = createCanvas(10, 10).getContext('2d');
probe.font = '100px AfyaSansXB';
const FONT_SIZE = (CAP_HEIGHT / probe.measureText('H').actualBoundingBoxAscent) * 100;

function desenhaPalavra(ctx, x, word) {
  ctx.save();
  ctx.translate(x, BASELINE);
  ctx.transform(1, 0, -SLANT, 1, 0, 0);
  ctx.scale(SCALE_X, 1);
  ctx.font = `${FONT_SIZE}px AfyaSansXB`;
  ctx.letterSpacing = `${TRACKING}px`;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(word, 0, 0);
  ctx.restore();
}

// Largura da tinta de uma palavra, na composicao atual.
function larguraDaTinta(word) {
  const W = 2400;
  const sonda = createCanvas(W, CANVAS_H);
  const sctx = sonda.getContext('2d');
  desenhaPalavra(sctx, AFYA_X1 + 1 + GAP, word);
  const sd = sctx.getImageData(0, 0, W, CANVAS_H).data;
  let fim = 0;
  for (let y = 0; y < CANVAS_H; y++) {
    for (let x = W - 1; x > fim; x--) {
      if (sd[(y * W + x) * 4 + 3] > 60) { fim = x; break; }
    }
  }
  return { fim, largura: fim - (AFYA_X1 + GAP) };
}

(async () => {
  const src = await loadImage(fs.readFileSync(SRC));

  // Ajusta a entreletra ate o "WHITEBOOK" de controle reproduzir os 686px do
  // lockup original. So entao compoe a palavra pedida, com o mesmo ajuste.
  let lo = -12, hi = 4;
  for (let i = 0; i < 24; i++) {
    TRACKING = (lo + hi) / 2;
    if (larguraDaTinta('WHITEBOOK').largura > LARGURA_ORIGINAL) hi = TRACKING; else lo = TRACKING;
  }
  const controle = larguraDaTinta('WHITEBOOK').largura;
  console.log(`entreletra: ${TRACKING.toFixed(2)}px  |  controle WHITEBOOK: ${controle}px (original ${LARGURA_ORIGINAL}px)`);

  const width = larguraDaTinta(WORD).fim + 1;

  const canvas = createCanvas(width, CANVAS_H);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(src, 0, 0, AFYA_X1 + 1, CANVAS_H, 0, 0, AFYA_X1 + 1, CANVAS_H);
  desenhaPalavra(ctx, AFYA_X1 + 1 + GAP, WORD);

  fs.writeFileSync(OUT, canvas.toBuffer('image/png'));
  console.log(`${path.basename(OUT)}: ${width}x${CANVAS_H}  (palavra: ${width - AFYA_X1 - 1 - GAP}px)`);
})();
