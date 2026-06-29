"use client";
// React Bits — Lightfall (WebGL, no external dependencies)
import { useEffect, useRef } from "react";

interface LightfallProps {
  className?: string;
  colors?: string[];
  backgroundColor?: string;
  speed?: number;
  streakCount?: number;
  streakWidth?: number;
  streakLength?: number;
  glow?: number;
  density?: number;
  twinkle?: number;
  zoom?: number;
  backgroundGlow?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mixBlendMode?: string;
  paused?: boolean;
}

const MAX_COLORS = 8;

const hexToRGB = (hex: string): [number, number, number] => {
  const c = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
};

const prepColors = (input: string[]) => {
  const base = (input?.length ? input : ["#A6C8FF", "#5227FF", "#FF9FFC"]).slice(0, MAX_COLORS);
  const count = base.length;
  const arr: [number, number, number][] = [];
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  const avg: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < count; i++) { avg[0] += arr[i][0]; avg[1] += arr[i][1]; avg[2] += arr[i][2]; }
  avg[0] /= count; avg[1] /= count; avg[2] /= count;
  return { arr, count, avg };
};

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform vec3  uColor0; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
uniform vec3  uColor4; uniform vec3 uColor5; uniform vec3 uColor6; uniform vec3 uColor7;
uniform int   uColorCount;
uniform vec3  uBgColor;
uniform vec3  uMouseColor;
uniform float uSpeed;
uniform int   uStreakCount;
uniform float uStreakWidth;
uniform float uStreakLength;
uniform float uGlow;
uniform float uDensity;
uniform float uTwinkle;
uniform float uZoom;
uniform float uBgGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;
varying vec2 vUv;

vec3 palette(float h) {
  int count = uColorCount; if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0; if (idx == 1) return uColor1;
  if (idx == 2) return uColor2; if (idx == 3) return uColor3;
  if (idx == 4) return uColor4; if (idx == 5) return uColor5;
  if (idx == 6) return uColor6; return uColor7;
}
vec3 tanhv(vec3 x) { vec3 e = exp(-2.0*x); return (1.0-e)/(1.0+e); }
vec2 sceneC(vec2 frag, vec2 r) {
  vec2 P = (frag+frag-r)/r.x; float z=0.0; float d=1e3; vec4 O=vec4(0.0);
  for(int k=0;k<39;k++){
    if(d<=1e-4)break;
    O=z*normalize(vec4(P,uZoom,0.0))-vec4(0.0,4.0,1.0,0.0)/4.5;
    d=1.0-sqrt(length(O*O)); z+=d;
  }
  return vec2(O.x,atan(O.z,O.y));
}
void mainImage(out vec4 o, vec2 C) {
  vec2 r=iResolution.xy;
  vec2 uv0=(C+C-r)/r.x;
  float T=0.1*iTime*uSpeed+9.0;
  float angRings=max(1.0,floor(6.28318530718*max(uDensity,0.05)+0.5));
  vec2 Y=vec2(5e-3,6.28318530718/angRings);
  vec2 c0=sceneC(C,r);
  vec2 cdx=sceneC(C+vec2(1.0,0.0),r);
  vec2 cdy=sceneC(C+vec2(0.0,1.0),r);
  vec2 dCx=cdx-c0; vec2 dCy=cdy-c0;
  dCx.y-=6.28318530718*floor(dCx.y/6.28318530718+0.5);
  dCy.y-=6.28318530718*floor(dCy.y/6.28318530718+0.5);
  vec2 fw=abs(dCx)+abs(dCy); C=c0;
  vec2 P=vec2(2.0,1.0)*uv0-(r/r.x)*vec2(0.0,1.0);
  vec4 O=vec4(uBgColor*90.0*uBgGlow/(1e3*dot(P,P)+6.0),0.0);
  float mGlow=0.0;
  if(uMouseEnabled>0.5){
    vec2 mN=(iMouse+iMouse-r)/r.x;
    float md=length(uv0-mN);
    mGlow=exp(-md*md/max(uMouseRadius*uMouseRadius,1e-4))*uMouseStrength;
    O.rgb+=uMouseColor*mGlow*0.25;
  }
  float zr=5e-4*uStreakWidth;
  vec2 rr=vec2(max(length(fw),1e-5));
  float tail=19.0/max(uStreakLength,0.05);
  for(int m=0;m<16;m++){
    if(m>=uStreakCount)break;
    float jf=float(m)+1.0;
    float ic=fract(sin(dot(vec2(jf,floor(C.x/Y.x+0.5)),vec2(7.0,11.0))*73.0));
    vec2 Pp=C-(T+T*ic)*vec2(0.0,1.0);
    Pp-=floor(Pp/Y+0.5)*Y;
    float h=fract(8663.0*ic);
    vec3 col=palette(h);
    float weight=mix(1.5,1.0+sin(T+7.0*h+4.0),uTwinkle);
    weight*=(1.0+mGlow*2.0);
    vec2 inner=vec2(length(max(Pp,vec2(-1.0,0.0))),length(Pp)-zr)-zr;
    vec2 sm=vec2(1.0)-smoothstep(-rr,rr,inner);
    O.rgb+=dot(sm,vec2(exp(tail*Pp.y),3.0))*col*weight;
    C.x+=Y.x/8.0;
  }
  vec3 colr=sqrt(tanhv(max(O.rgb*uGlow-vec3(0.04,0.08,0.02),0.0)));
  o=vec4(colr,uOpacity);
}
void main() { vec4 color; mainImage(color, vUv*iResolution.xy); gl_FragColor=color; }`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function createProgram(gl: WebGLRenderingContext) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  return prog;
}

export default function Lightfall({
  className = "",
  colors = ["#A6C8FF", "#5227FF", "#FF9FFC"],
  backgroundColor = "#0A29FF",
  speed = 0.5,
  streakCount = 2,
  streakWidth = 1,
  streakLength = 1,
  glow = 1,
  density = 0.6,
  twinkle = 1,
  zoom = 3,
  backgroundGlow = 0.5,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.5,
  mouseRadius = 1,
  mixBlendMode,
  paused = false,
}: LightfallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const mouseSmoothRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const prog = createProgram(gl);
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const locs = {
      iResolution: U("iResolution"), iMouse: U("iMouse"), iTime: U("iTime"),
      uColor0: U("uColor0"), uColor1: U("uColor1"), uColor2: U("uColor2"), uColor3: U("uColor3"),
      uColor4: U("uColor4"), uColor5: U("uColor5"), uColor6: U("uColor6"), uColor7: U("uColor7"),
      uColorCount: U("uColorCount"), uBgColor: U("uBgColor"), uMouseColor: U("uMouseColor"),
      uSpeed: U("uSpeed"), uStreakCount: U("uStreakCount"), uStreakWidth: U("uStreakWidth"),
      uStreakLength: U("uStreakLength"), uGlow: U("uGlow"), uDensity: U("uDensity"),
      uTwinkle: U("uTwinkle"), uZoom: U("uZoom"), uBgGlow: U("uBgGlow"), uOpacity: U("uOpacity"),
      uMouseEnabled: U("uMouseEnabled"), uMouseStrength: U("uMouseStrength"), uMouseRadius: U("uMouseRadius"),
    };

    const { arr, count, avg } = prepColors(colors);
    const bgRGB = hexToRGB(backgroundColor);

    gl.uniform3fv(locs.uColor0, arr[0]); gl.uniform3fv(locs.uColor1, arr[1]);
    gl.uniform3fv(locs.uColor2, arr[2]); gl.uniform3fv(locs.uColor3, arr[3]);
    gl.uniform3fv(locs.uColor4, arr[4]); gl.uniform3fv(locs.uColor5, arr[5]);
    gl.uniform3fv(locs.uColor6, arr[6]); gl.uniform3fv(locs.uColor7, arr[7]);
    gl.uniform1i(locs.uColorCount, count);
    gl.uniform3fv(locs.uBgColor, bgRGB);
    gl.uniform3fv(locs.uMouseColor, avg);
    gl.uniform1f(locs.uSpeed, speed);
    gl.uniform1i(locs.uStreakCount, Math.max(1, Math.min(16, Math.round(streakCount))));
    gl.uniform1f(locs.uStreakWidth, streakWidth);
    gl.uniform1f(locs.uStreakLength, streakLength);
    gl.uniform1f(locs.uGlow, glow);
    gl.uniform1f(locs.uDensity, density);
    gl.uniform1f(locs.uTwinkle, twinkle);
    gl.uniform1f(locs.uZoom, zoom);
    gl.uniform1f(locs.uBgGlow, backgroundGlow);
    gl.uniform1f(locs.uOpacity, opacity);
    gl.uniform1f(locs.uMouseEnabled, mouseInteraction ? 1 : 0);
    gl.uniform1f(locs.uMouseStrength, mouseStrength);
    gl.uniform1f(locs.uMouseRadius, mouseRadius);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.offsetWidth, h = container.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform3f(locs.iResolution, canvas.width, canvas.height, 1);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current = [
        (e.clientX - rect.left) * dpr,
        (rect.height - (e.clientY - rect.top)) * dpr,
      ];
    };
    if (mouseInteraction) window.addEventListener("mousemove", onMouseMove);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (paused) return;
      // Smooth mouse
      const [tx, ty] = mouseRef.current;
      const [cx, cy] = mouseSmoothRef.current;
      mouseSmoothRef.current = [cx + (tx - cx) * 0.08, cy + (ty - cy) * 0.08];
      gl.uniform2f(locs.iMouse, mouseSmoothRef.current[0], mouseSmoothRef.current[1]);
      gl.uniform1f(locs.iTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (mouseInteraction) window.removeEventListener("mousemove", onMouseMove);
      if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={mixBlendMode ? { mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"] } : {}}
      aria-hidden
    />
  );
}
