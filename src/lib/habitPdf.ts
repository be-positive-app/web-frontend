/**
 * The printable 30-day habit sheet, drawn on a canvas in the visitor's
 * browser and wrapped in a one-page A4 PDF. Nothing is sent anywhere.
 *
 * The sheet is a picture inside the PDF: the canvas uses the page's own
 * Manrope font, so Azerbaijani, Russian and Turkish letters come out right
 * without embedding a font in the PDF.
 */
import qrcode from 'qrcode-generator'

export type SheetText = {
  kicker: string
  habit: string
  dates: string
  why: string
  reward: string
  longest: string
  days: string
  ctaTitle: string
  ctaBody: string
  url: string
}

// A4 at 150 dpi: sharp enough to print, small enough to share.
const W = 1240
const H = 1754
const NAVY = '#060d24'
const BLUE = '#4660f2'
const YELLOW = '#fff45c'
const MUTED = '#5b6478'
const LINE = '#d7ddf6'

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Shrinks the font until the text fits the width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, weight: number, size: number, max: number) {
  let s = size
  ctx.font = `${weight} ${s}px Manrope, sans-serif`
  while (s > 20 && ctx.measureText(text).width > max) {
    s -= 2
    ctx.font = `${weight} ${s}px Manrope, sans-serif`
  }
}

export function drawSheet(text: SheetText, start: Date, qrUrl: string): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)
  ctx.textBaseline = 'top'

  const pad = 88
  ctx.fillStyle = BLUE
  ctx.font = '800 24px Manrope, sans-serif'
  ctx.fillText(text.kicker.toUpperCase(), pad, pad)
  ctx.fillStyle = NAVY
  fitText(ctx, text.habit, 800, 76, W - pad * 2 - 140)
  ctx.fillText(text.habit, pad, pad + 44)
  ctx.fillStyle = MUTED
  ctx.font = '600 26px Manrope, sans-serif'
  ctx.fillText(text.dates, pad, pad + 140)

  roundRect(ctx, W - pad - 104, pad, 104, 104, 28)
  ctx.fillStyle = BLUE
  ctx.fill()
  ctx.fillStyle = YELLOW
  ctx.font = '800 44px Manrope, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('b+', W - pad - 52, pad + 28)
  ctx.textAlign = 'left'

  // 6 x 5 grid of days.
  const top = pad + 220
  const gap = 18
  const cell = (W - pad * 2 - gap * 5) / 6
  for (let i = 0; i < 30; i++) {
    const x = pad + (i % 6) * (cell + gap)
    const y = top + Math.floor(i / 6) * (cell + gap)
    roundRect(ctx, x, y, cell, cell, 24)
    ctx.lineWidth = 3
    ctx.strokeStyle = i % 7 === 6 ? BLUE : LINE
    ctx.stroke()
    ctx.fillStyle = NAVY
    ctx.font = '800 36px Manrope, sans-serif'
    ctx.fillText(String(i + 1), x + 18, y + 16)
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    ctx.fillStyle = MUTED
    ctx.font = '700 20px Manrope, sans-serif'
    ctx.fillText(
      `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`,
      x + 18,
      y + cell - 40,
    )
  }

  // Three boxes to fill in by hand.
  const boxTop = top + 5 * (cell + gap) + 24
  const boxW = (W - pad * 2 - gap * 2) / 3
  ;[text.why, text.reward, text.longest].forEach((label, i) => {
    const x = pad + i * (boxW + gap)
    roundRect(ctx, x, boxTop, boxW, 170, 24)
    ctx.fillStyle = '#f4f6fe'
    ctx.fill()
    ctx.fillStyle = BLUE
    ctx.font = '800 20px Manrope, sans-serif'
    ctx.fillText(label.toUpperCase(), x + 24, boxTop + 24)
    if (i === 2) {
      ctx.fillStyle = NAVY
      ctx.font = '800 44px Manrope, sans-serif'
      ctx.fillText(`____ ${text.days}`, x + 24, boxTop + 80)
    } else {
      ctx.fillStyle = LINE
      ctx.fillRect(x + 24, boxTop + 96, boxW - 48, 2)
      ctx.fillRect(x + 24, boxTop + 136, boxW - 48, 2)
    }
  })

  // Footer band with a QR code to the app.
  const bandH = 230
  const bandY = H - pad - bandH
  roundRect(ctx, pad, bandY, W - pad * 2, bandH, 32)
  ctx.fillStyle = NAVY
  ctx.fill()
  const qr = qrcode(0, 'M')
  qr.addData(qrUrl)
  qr.make()
  const n = qr.getModuleCount()
  const qrBox = 170
  const qx = pad + 30
  const qy = bandY + 30
  roundRect(ctx, qx, qy, qrBox, qrBox, 16)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  const m = (qrBox - 20) / n
  ctx.fillStyle = NAVY
  for (let r = 0; r < n; r++) {
    for (let col = 0; col < n; col++) {
      if (qr.isDark(r, col)) ctx.fillRect(qx + 10 + col * m, qy + 10 + r * m, Math.ceil(m), Math.ceil(m))
    }
  }
  const tx = qx + qrBox + 36
  ctx.fillStyle = '#ffffff'
  fitText(ctx, text.ctaTitle, 800, 36, W - pad - 30 - tx)
  ctx.fillText(text.ctaTitle, tx, bandY + 44)
  ctx.fillStyle = '#c9cfe3'
  ctx.font = '600 24px Manrope, sans-serif'
  wrap(ctx, text.ctaBody, tx, bandY + 100, W - pad - 30 - tx, 32, 2)
  ctx.fillStyle = YELLOW
  ctx.font = '800 24px Manrope, sans-serif'
  ctx.fillText(text.url, tx, bandY + 172)
  return c
}

function wrap(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, max: number, lh: number, lines: number) {
  const words = s.split(' ')
  let line = ''
  let n = 0
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (ctx.measureText(next).width > max && line) {
      ctx.fillText(line, x, y + n * lh)
      line = w
      if (++n >= lines) return
    } else line = next
  }
  if (line) ctx.fillText(line, x, y + n * lh)
}

/** A one-page A4 PDF whose page is the given JPEG, as a Blob. */
export function jpegToPdf(jpeg: Uint8Array, w: number, h: number): Blob {
  const pageW = 595.28
  const pageH = 841.89
  const enc = new TextEncoder()
  const parts: Uint8Array[] = []
  const offsets: number[] = []
  let size = 0
  const push = (p: Uint8Array | string) => {
    const b = typeof p === 'string' ? enc.encode(p) : p
    parts.push(b)
    size += b.length
  }
  const obj = (n: number, body: () => void) => {
    offsets[n] = size
    push(`${n} 0 obj\n`)
    body()
    push('\nendobj\n')
  }
  const content = `q ${pageW} 0 0 ${pageH} 0 0 cm /Im0 Do Q`
  push('%PDF-1.4\n')
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'))
  obj(2, () => push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'))
  obj(3, () =>
    push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
    ),
  )
  obj(4, () => {
    push(
      `<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`,
    )
    push(jpeg)
    push('\nendstream')
  })
  obj(5, () => push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream`))
  const xref = size
  push(`xref\n0 6\n0000000000 65535 f \n`)
  for (let i = 1; i <= 5; i++) push(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`)
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`)
  return new Blob(parts as BlobPart[], { type: 'application/pdf' })
}

export async function sheetPdf(text: SheetText, start: Date, qrUrl: string): Promise<Blob> {
  await document.fonts?.load('800 40px Manrope').catch(() => undefined)
  const canvas = drawSheet(text, start, qrUrl)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.92)
  const bin = atob(dataUrl.split(',')[1])
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return jpegToPdf(bytes, W, H)
}
