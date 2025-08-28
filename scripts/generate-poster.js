const { createCanvas } = require('canvas');
const fs = require('fs');

// Create canvas
const canvas = createCanvas(1920, 1080);
const ctx = canvas.getContext('2d');

// Fill background with black
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 1920, 1080);

// Add gradient overlay
const gradient = ctx.createRadialGradient(960, 540, 100, 960, 540, 1200);
gradient.addColorStop(0, 'rgba(20, 20, 30, 0.8)');
gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1920, 1080);

// Draw abstract geometric patterns
ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
ctx.lineWidth = 1;

// Concentric circles
for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.arc(960, 540, 100 + i * 100, 0, Math.PI * 2);
    ctx.stroke();
}

// Add grid lines
ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 96, 0);
    ctx.lineTo(i * 96, 1080);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, i * 54);
    ctx.lineTo(1920, i * 54);
    ctx.stroke();
}

// Add title text
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 100px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Manually space letters for GLADIATOR
const text = 'GLADIATOR';
const letterSpacing = 35;
const totalWidth = text.length * letterSpacing;
const startX = 960 - totalWidth / 2;

for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], startX + i * letterSpacing + 35, 480);
}

// Add subtitle
ctx.font = '28px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
ctx.fillText('Form follows function. Origin unknown.', 960, 580);

// Save as JPEG
const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
fs.writeFileSync('./public/poster.jpg', buffer);

console.log('poster.jpg created successfully!');