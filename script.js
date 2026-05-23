// Image Compressor & Converter Tool
// Client-side only - No backend required
// Enhanced with proper PNG handling and smart compression

// DOM Elements
const dragDropArea = document.getElementById('dragDropArea');
const fileInput = document.getElementById('fileInput');
const mainContent = document.getElementById('mainContent');
const uploadCard = document.getElementById('uploadCard');
const warningMessage = document.getElementById('warningMessage');
const errorMessage = document.getElementById('errorMessage');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const savingsPercent = document.getElementById('savingsPercent');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const formatSelect = document.getElementById('formatSelect');
const formatNote = document.getElementById('formatNote');
const downloadBtn = document.getElementById('downloadBtn');
const uploadNewBtn = document.getElementById('uploadNewBtn');
const originalDimensions = document.getElementById('originalDimensions');
const compressedDimensions = document.getElementById('compressedDimensions');
const fileFormat = document.getElementById('fileFormat');
const compressionLevel = document.getElementById('compressionLevel');
const sizeReduction = document.getElementById('sizeReduction');
const outputFormat = document.getElementById('outputFormat');
const qualityGroup = document.getElementById('qualityGroup');
const toast = document.getElementById('toast');
const maintainRatioCheckbox = document.getElementById('maintainRatioCheckbox');

// State
let currentFile = null;
let originalCanvasData = null;
let compressedCanvasData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Drag and Drop
    dragDropArea.addEventListener('click', () => fileInput.click());
    dragDropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dragDropArea.classList.add('dragover');
    });
    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('dragover');
    });
    dragDropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // File Input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });

    // Quality Slider
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = e.target.value + '%';
        compressImage();
    });

    // Format Select
    formatSelect.addEventListener('change', () => {
        updateFormatNote();
        compressImage();
    });

    // Maintain Ratio Checkbox
    maintainRatioCheckbox.addEventListener('change', compressImage);

    // Download Button
    downloadBtn.addEventListener('click', downloadCompressedImage);

    // Upload New Button
    uploadNewBtn.addEventListener('click', resetTool);
}

function handleFileSelect(file) {
    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        showError('Please select a JPG or PNG image');
        return;
    }

    currentFile = file;
    clearMessages();

    // Read and display original image
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            originalImage.src = img.src;
            originalCanvasData = {
                width: img.width,
                height: img.height,
                src: img.src,
                file: file,
                isOriginalPng: file.type === 'image/png'
            };

            updateFileInfo();
            updateFormatNote();
            compressImage();
            showMainContent();
        };
        img.onerror = () => showError('Failed to load image');
        img.src = e.target.result;
    };
    reader.onerror = () => showError('Failed to read file');
    reader.readAsDataURL(file);
}

function updateFormatNote() {
    const format = formatSelect.value;
    const notes = {
        jpeg: 'Best for photos. Lossy compression with quality control.',
        webp: 'Modern format. Smallest file sizes with good quality.',
        png: 'Lossless format. Quality slider is disabled for PNG.'
    };
    formatNote.textContent = notes[format] || '';
    
    // Disable quality slider for PNG
    if (format === 'png') {
        qualityGroup.style.opacity = '0.6';
        qualitySlider.disabled = true;
        qualityValue.textContent = 'N/A';
    } else {
        qualityGroup.style.opacity = '1';
        qualitySlider.disabled = false;
        qualityValue.textContent = qualitySlider.value + '%';
    }
}

function compressImage() {
    if (!originalCanvasData) return;

    const quality = parseInt(qualitySlider.value) / 100;
    const format = formatSelect.value;

    // Create canvas from original image
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        // Get MIME type based on format
        let mimeType = 'image/jpeg';
        if (format === 'png') {
            mimeType = 'image/png';
        } else if (format === 'webp') {
            mimeType = 'image/webp';
        }

        // For PNG files, apply smart handling
        if (format === 'png' && originalCanvasData.isOriginalPng) {
            // Try lower quality to compress PNG
            tryCompressWithQuality(canvas, mimeType, 0.9, format);
        } else if (format === 'png') {
            // Converting from JPG to PNG - use canvas PNG export
            canvas.toBlob(
                (blob) => handleCompressedBlob(blob, format, canvas),
                mimeType
            );
        } else {
            // JPEG and WebP - use quality parameter
            canvas.toBlob(
                (blob) => handleCompressedBlob(blob, format, canvas),
                mimeType,
                quality
            );
        }
    };

    img.onerror = () => showError('Failed to process image');
    img.src = originalCanvasData.src;
}

function tryCompressWithQuality(canvas, mimeType, quality, format) {
    // For PNG, try compression with quality parameter
    canvas.toBlob(
        (blob) => {
            // If output is larger than original, suggest WebP
            if (blob.size > currentFile.size) {
                showWarning('PNG compression would increase file size. Try WebP instead.');
                // Use original file as fallback
                compressedCanvasData = {
                    blob: currentFile,
                    width: canvas.width,
                    height: canvas.height,
                    format: format,
                    mimeType: mimeType,
                    quality: 1,
                    isOriginal: true
                };
            } else {
                compressedCanvasData = {
                    blob: blob,
                    width: canvas.width,
                    height: canvas.height,
                    format: format,
                    mimeType: mimeType,
                    quality: quality,
                    isOriginal: false
                };
            }
            
            const compressedUrl = URL.createObjectURL(compressedCanvasData.blob);
            compressedImage.src = compressedUrl;
            updateCompressionInfo();
        },
        mimeType,
        quality
    );
}

function handleCompressedBlob(blob, format, canvas) {
    // Smart compression: if output is larger than original, use original
    const outputSize = blob.size;
    const originalSize = currentFile.size;
    
    if (outputSize > originalSize) {
        showWarning(`Output file would be ${formatBytes(outputSize - originalSize)} larger. Using original.`);
        compressedCanvasData = {
            blob: currentFile,
            width: canvas.width,
            height: canvas.height,
            format: currentFile.type.split('/')[1],
            mimeType: currentFile.type,
            quality: 1,
            isOriginal: true,
            exceeded: true
        };
        downloadBtn.textContent = '⚠️ Download Original';
    } else {
        clearMessages();
        compressedCanvasData = {
            blob: blob,
            width: canvas.width,
            height: canvas.height,
            format: format,
            mimeType: `image/${format}`,
            quality: parseInt(qualitySlider.value) / 100,
            isOriginal: false,
            exceeds: false
        };
        downloadBtn.textContent = '⬇️ Download';
    }

    const compressedUrl = URL.createObjectURL(compressedCanvasData.blob);
    compressedImage.src = compressedUrl;
    updateCompressionInfo();
}

function updateFileInfo() {
    originalSize.textContent = formatBytes(currentFile.size);
    originalDimensions.textContent = `${originalCanvasData.width} × ${originalCanvasData.height}`;
    fileFormat.textContent = currentFile.type.split('/')[1].toUpperCase();
    compressionLevel.textContent = 'Processing...';
}

function updateCompressionInfo() {
    if (!compressedCanvasData) return;

    const originalSizeBytes = currentFile.size;
    const compressedSizeBytes = compressedCanvasData.blob.size;
    const savingsBytes = originalSizeBytes - compressedSizeBytes;
    const savingsPercent = (savingsBytes / originalSizeBytes * 100).toFixed(1);

    compressedSize.textContent = formatBytes(compressedSizeBytes);
    compressedDimensions.textContent = `${compressedCanvasData.width} × ${compressedCanvasData.height}`;

    // Handle savings display
    if (savingsPercent < 0) {
        // File got larger
        savingsPercent.innerHTML = `<span style="color: var(--warning);">No saving — file larger by ${formatBytes(Math.abs(savingsBytes))}</span>`;
        downloadBtn.disabled = false;
        downloadBtn.style.opacity = '0.7';
    } else if (savingsPercent === 0) {
        savingsPercent.innerHTML = 'No change in file size';
        downloadBtn.disabled = false;
    } else {
        savingsPercent.innerHTML = `<span style="color: var(--success);">✓ Saved ${savingsPercent}%</span>`;
        downloadBtn.disabled = false;
        downloadBtn.style.opacity = '1';
    }

    sizeReduction.textContent = formatBytes(Math.abs(savingsBytes));

    // Update compression level label
    const quality = parseInt(qualitySlider.value);
    const format = formatSelect.value;
    
    let compressionLabel = '';
    if (format === 'png') {
        compressionLabel = 'Lossless';
    } else if (quality >= 80) {
        compressionLabel = 'Low compression';
    } else if (quality >= 60) {
        compressionLabel = 'Medium compression';
    } else if (quality >= 40) {
        compressionLabel = 'High compression';
    } else {
        compressionLabel = 'Maximum compression';
    }
    compressionLevel.textContent = compressionLabel;
    outputFormat.textContent = format.toUpperCase();
}

function downloadCompressedImage() {
    if (!compressedCanvasData) {
        showError('No image to download');
        return;
    }

    const ext = compressedCanvasData.isOriginal ? 
        currentFile.name.split('.').pop() : 
        compressedCanvasData.format;
    
    const filename = `compressed-${Date.now()}.${ext}`;
    const url = URL.createObjectURL(compressedCanvasData.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`✓ Downloaded: ${filename}`, 'success');
}

function resetTool() {
    // Reset state
    currentFile = null;
    originalCanvasData = null;
    compressedCanvasData = null;

    // Reset UI
    fileInput.value = '';
    qualitySlider.value = 80;
    qualityValue.textContent = '80%';
    formatSelect.value = 'jpeg';
    maintainRatioCheckbox.checked = true;
    downloadBtn.disabled = false;
    downloadBtn.textContent = '⬇️ Download';

    // Hide main content
    hideMainContent();
    clearMessages();
}

function showMainContent() {
    uploadCard.style.display = 'none';
    mainContent.classList.remove('hidden');
}

function hideMainContent() {
    uploadCard.style.display = 'block';
    mainContent.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    warningMessage.classList.add('hidden');
}

function showWarning(message) {
    warningMessage.textContent = message;
    warningMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function clearMessages() {
    errorMessage.classList.add('hidden');
    warningMessage.classList.add('hidden');
}

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Utility function to format bytes
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
