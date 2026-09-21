import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, MessageSquare, ArrowRight, ShieldCheck, MapPin, Award, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface Hero3DProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExploreClick, onBookClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePin, setActivePin] = useState<string>('Madagascar Island');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Interactive 3D Globe & Constellation Particles
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Subtle dark emerald wireframe globe
    const sphereRadius = 8;
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 36, 36);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e3a2b,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    globeGroup.add(sphereMesh);

    // Outer stardust point cloud (Gold and Emerald embers)
    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xc6a87d);
    const emeraldColor = new THREE.Color(0x2d6a4f);
    const lightGold = new THREE.Color(0xf4f1ea);

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform planetary dust
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = sphereRadius + (Math.random() - 0.5) * 1.8;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor =
        Math.random() > 0.6 ? goldColor : Math.random() > 0.3 ? emeraldColor : lightGold;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    globeGroup.add(particles);

    // Key Madagascar coordinates highlighted on the globe
    const keyPoints = [
      { name: 'Antananarivo (HQ / Gate)', lat: -18.87, lon: 47.5, color: 0xe0ceaf },
      { name: 'Allée des Baobabs (West)', lat: -20.25, lon: 44.41, color: 0xc6a87d },
      { name: 'Grand Tsingy de Bemaraha', lat: -18.7, lon: 44.7, color: 0x52b788 },
      { name: 'Isalo Jurassic Canyons (South)', lat: -22.58, lon: 45.36, color: 0xc6a87d },
      { name: 'Sainte-Marie Whale Haven (East)', lat: -16.9, lon: 49.9, color: 0x74c69d },
    ];

    const convertGeoToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const nodeMeshes: THREE.Mesh[] = [];
    keyPoints.forEach((pt) => {
      const pos = convertGeoToVector3(pt.lat, pt.lon, sphereRadius + 0.1);
      const pinGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: pt.color,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);
      nodeMeshes.push(pinMesh);

      // Add a soft halo ring around each waypoint
      const ringGeo = new THREE.RingGeometry(0.35, 0.48, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pt.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      globeGroup.add(ring);
    });

    // Initial globe orientation tilting towards Madagascar location
    globeGroup.rotation.x = 0.35;
    globeGroup.rotation.y = 1.9;
    globeGroup.position.x = 4.5;
    globeGroup.position.y = -0.5;

    // 3. Mouse Parallax & Smooth Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 1.9;
    let targetRotationX = 0.35;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adjust globe position based on screen width
      if (width < 768) {
        globeGroup.position.x = 0;
        globeGroup.position.y = 1.8;
        camera.position.z = 28;
      } else {
        globeGroup.position.x = 4.5;
        globeGroup.position.y = -0.5;
        camera.position.z = 24;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 4. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle planetary spin
      targetRotationY += 0.0018;

      // Mouse interactive tilt dampening
      globeGroup.rotation.y += (targetRotationY + mouseX * 0.4 - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX + mouseY * 0.2 - globeGroup.rotation.x) * 0.05;

      // Pulse pin nodes
      const scale = 1 + Math.sin(elapsedTime * 3) * 0.18;
      nodeMeshes.forEach((mesh) => {
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup on Unmount (Zero memory leaks)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      sphereGeometry.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-85"
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Lighting and Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09100D] via-transparent to-[#09100D]/60 pointer-events-none z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-950/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#C6A87D]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F1E17]/90 border border-[#C6A87D]/40 backdrop-blur-md mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#C6A87D] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E0CEAF]">
              Private Bespoke Expeditions &bull; Madagascar
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium tracking-tight text-[#F4F1EA] leading-[1.1] mb-6">
            Experience the <br />
            <span className="gold-gradient-text italic font-semibold">
              Untamed Luxury
            </span>{' '}
            of Madagascar
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#9EACA3] leading-relaxed mb-8 max-w-xl font-light">
            Organizer of high-end private 4x4 safaris, Tsiribihina river expeditions,
            UNESCO Tsingy labyrinths, and secluded coral island sanctuaries. Crafted with
            pure Malagasy passion and personalized concierge stewardship.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExploreClick}
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#C6A87D] text-[#09100D] font-bold text-sm tracking-wider uppercase hover:bg-[#E0CEAF] hover:shadow-[0_0_30px_rgba(198,168,125,0.4)] transition-all flex items-center gap-2.5 group active:scale-95"
            >
              <span>Explore Private Circuits</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onBookClick}
              className="px-6 sm:px-8 py-3.5 rounded-xl glass-panel text-[#F4F1EA] font-semibold text-sm tracking-wider uppercase hover:border-[#C6A87D] hover:bg-[#1E3A2B]/60 transition-all flex items-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-[#C6A87D]" />
              <span>Instant WhatsApp Quote</span>
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#C6A87D]/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A2B]/80 flex items-center justify-center text-[#C6A87D]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F4F1EA]">100% Private 4x4</p>
                <p className="text-[11px] text-[#9EACA3]">No group strangers</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A2B]/80 flex items-center justify-center text-[#C6A87D]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F4F1EA]">Licensed Malagasy</p>
                <p className="text-[11px] text-[#9EACA3]">Antsirabe Operator</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-[#1E3A2B]/80 flex items-center justify-center text-[#C6A87D]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F4F1EA]">Complete Coverage</p>
                <p className="text-[11px] text-[#9EACA3]">West, South, East & Mixed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[#9EACA3]/60 hover:text-[#C6A87D] transition-colors cursor-pointer"
           onClick={onExploreClick}>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll to Discover</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C6A87D]" />
      </div>
    </section>
  );
};
