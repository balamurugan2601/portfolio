import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        canvas.width = width;
        canvas.height = height;

        const mouse = { x: -1000, y: -1000 };
        const dots: Dot[] = [];

        // Configuration
        const spacing = width < 768 ? 40 : 25;
        const dotRadius = 2;
        const mouseRadius = 70;
        const returnSpeed = 0.1;

        // Get initial color from CSS variable or default
        let color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#565656';

        class Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseRadius - distance) / mouseRadius;
                    const directionX = forceDirectionX * force * 3;
                    const directionY = forceDirectionY * force * 3;

                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.originX) {
                        this.x -= (this.x - this.originX) * returnSpeed;
                    }
                    if (this.y !== this.originY) {
                        this.y -= (this.y - this.originY) * returnSpeed;
                    }
                }

                this.draw();
            }
        }

        const init = () => {
            dots.length = 0;
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    dots.push(new Dot(x, y));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(dot => dot.update());
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            init();
        };

        const updateColor = () => {
            color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#565656';
        };

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    updateColor();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        init();
        animate();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        />
    );
}
