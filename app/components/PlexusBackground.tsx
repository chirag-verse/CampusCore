"use client";
import React, { useRef, useEffect } from 'react';

const PlexusBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            speedY: number;
            speedX: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Falling down with a slight drift
                this.speedY = Math.random() * 1.5 + 0.5; 
                this.speedX = Math.random() * 0.5 - 0.25;
                this.size = Math.random() * 2 + 0.5;
                
                // --- COLOR THEME CONFIGURATION ---
                
                // OPTION 1: GOLDEN DATA (Current) - Premium, Warm, Energetic
                const colors = ['#fbbf24', '#f59e0b', '#d97706', '#fffbeb']; 
                
                // OPTION 2: MATRIX CODE - Hacker Style (Uncomment to use)
                // const colors = ['#22c55e', '#4ade80', '#16a34a', '#86efac'];

                // OPTION 3: NEON CYBERPUNK - Pink/Blue/Purple (Uncomment to use)
                // const colors = ['#f472b6', '#c084fc', '#22d3ee', '#e879f9'];

                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Reset to top if it goes off bottom
                if (this.y > canvas!.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas!.width;
                }
                // Wrap around sides
                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add a glow effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
            }
        }

        const init = () => {
            particles = [];
            // Calculate number of particles based on screen size (Density)
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // TRAIL EFFECT: Leaves "trails" of movement.
            // Darker background for Gold theme (Deep Warm Black)
            ctx.fillStyle = 'rgba(15, 10, 5, 0.2)'; 
            
            // For Matrix theme use: 'rgba(0, 10, 0, 0.2)'
            // For Cyberpunk theme use: 'rgba(10, 5, 15, 0.2)'

            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connect();

            animationFrameId = requestAnimationFrame(animate);
        };

        const connect = () => {
            ctx.shadowBlur = 0; 
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 1 - (distance / 100);
                        // Gold Line Color
                        ctx.strokeStyle = `rgba(251, 191, 36, ${opacity * 0.2})`; 
                        
                        // Matrix Line: `rgba(74, 222, 128, ${opacity * 0.2})`
                        // Cyberpunk Line: `rgba(232, 121, 249, ${opacity * 0.2})`

                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            init();
        });

        resizeCanvas();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" />;
};

export default PlexusBackground;