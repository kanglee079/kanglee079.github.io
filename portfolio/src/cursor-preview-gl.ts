/**
 * WebGL renderer for the desktop cursor preview.
 * Each project is pre-composited onto a 2D canvas (panel colour + first screenshot) and uploaded as a texture.
 * The shader bends the image along the cursor's velocity, splits RGB slightly, and swaps projects with a wavy wipe.
 * Returns null when WebGL is unavailable so the caller can keep the DOM preview.
 */

export interface PreviewItem { panel: string; ink: string; shot?: string; name: string }
export interface CursorPreviewGL { show(index: number): void; setVelocity(vx: number, vy: number): void; start(): void; stop(): void; destroy(): void }

const VERT = `attribute vec2 p; varying vec2 vUv;
void main(){ vUv = p * .5 + .5; vUv.y = 1. - vUv.y; gl_Position = vec4(p, 0., 1.); }`

const FRAG = `precision mediump float;
varying vec2 vUv;
uniform sampler2D uA; uniform sampler2D uB;
uniform float uMix; uniform vec2 uVel; uniform float uTime;
vec3 rgb(sampler2D t, vec2 uv, vec2 o){ return vec3(texture2D(t, uv + o).r, texture2D(t, uv).g, texture2D(t, uv - o).b); }
void main(){
  vec2 uv = vUv;
  float bend = sin(uv.y * 3.14159) * sin(uv.x * 3.14159);
  uv -= uVel * bend * .09;
  vec2 o = uVel * .012;
  float wave = sin(uv.x * 9. + uTime * 3.) * .035;
  float front = uMix * 1.25 - .12;
  float m = 1. - smoothstep(front - .07, front + .07, (1. - uv.y) + wave);
  vec3 a = rgb(uA, uv, o), b = rgb(uB, uv, o);
  gl_FragColor = vec4(mix(b, a, m), 1.);
}`

function compose(item: PreviewItem, img: HTMLImageElement | null, w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d')!
  g.fillStyle = item.panel; g.fillRect(0, 0, w, h)
  if (img && img.naturalWidth) {
    const ih = h * 0.84, iw = ih * (img.naturalWidth / img.naturalHeight)
    const x = (w - iw) / 2, y = (h - ih) / 2, r = 22 * (w / 360)
    g.save(); g.beginPath(); g.roundRect(x, y, iw, ih, r); g.clip(); g.drawImage(img, x, y, iw, ih); g.restore()
  } else {
    g.fillStyle = item.ink; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.font = `450 ${Math.round(w * 0.12)}px "Hanken Grotesk", sans-serif`
    g.fillText(item.name, w / 2, h / 2)
  }
  return c
}

const load = (src: string) => new Promise<HTMLImageElement | null>((res) => { const i = new Image(); i.decoding = 'async'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src })

export async function createCursorPreviewGL(canvas: HTMLCanvasElement, items: PreviewItem[]): Promise<CursorPreviewGL | null> {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false })
  if (!gl) return null
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const W = Math.round(canvas.clientWidth * dpr), H = Math.round(canvas.clientHeight * dpr)
  canvas.width = W; canvas.height = H

  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
  const prog = gl.createProgram()!
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u = (n: string) => gl.getUniformLocation(prog, n)
  const uA = u('uA'), uB = u('uB'), uMix = u('uMix'), uVel = u('uVel'), uTime = u('uTime')
  gl.uniform1i(uA, 0); gl.uniform1i(uB, 1)

  const imgs = await Promise.all(items.map((it) => (it.shot ? load(it.shot) : Promise.resolve(null))))
  const textures = items.map((it, i) => {
    const t = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, compose(it, imgs[i], W, H))
    return t
  })

  let cur = 0, prev = 0, mix = 1, vx = 0, vy = 0, tvx = 0, tvy = 0, raf = 0, running = false, t0 = performance.now()
  const bind = () => {
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, textures[cur])
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, textures[prev])
  }
  const frame = (now: number) => {
    mix = Math.min(1, mix + 0.045)
    vx += (tvx - vx) * 0.12; vy += (tvy - vy) * 0.12
    tvx *= 0.9; tvy *= 0.9
    gl.viewport(0, 0, W, H)
    gl.uniform1f(uMix, 1 - Math.pow(1 - mix, 3)); gl.uniform2f(uVel, vx, vy); gl.uniform1f(uTime, (now - t0) / 1000)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    if (running) raf = requestAnimationFrame(frame)
  }
  bind()
  return {
    show(i) { if (i === cur) return; prev = cur; cur = i; mix = 0; bind() },
    setVelocity(x, y) { tvx = Math.max(-1, Math.min(1, x)); tvy = Math.max(-1, Math.min(1, y)) },
    start() { if (running) return; running = true; raf = requestAnimationFrame(frame) },
    stop() { running = false; cancelAnimationFrame(raf) },
    destroy() { running = false; cancelAnimationFrame(raf); textures.forEach((t) => gl.deleteTexture(t)); gl.deleteProgram(prog); gl.getExtension('WEBGL_lose_context')?.loseContext() },
  }
}
