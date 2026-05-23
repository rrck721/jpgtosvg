// Image Compressor & Converter Tool
// Client-side only - No backend required

// DOM Elements
const dragDropArea = document.getElementById('dragDropArea');
const fileInput = document.getElementById('fileInput');
const mainContent = document.getElementById('mainContent');
const errorMessage = document.getElementById('errorMessage');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const savingsPercent = document.getElementById('savingsPercent');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const formatSelect = document.getElementById('formatSelect');
const downloadBtn = document.getElementById('downloadBtn');
const uploadNewBtn = document.getElementById('uploadNewBtn');
const originalDimensions = document.getElementById('originalDimensions');
const compressedDimensions = document.getElementById('compressedDimensions');
const fileFormat = document.getElementById('fileFormat');
const compressionLevel = document.getElementById('compressionLevel');
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
    formatSelect.addEventListener('change', compressImage);

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
    clearError();

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
                file: file
            };

            updateFileInfo();
            compressImage();
            showMainContent();
        };
        img.onerror = () => showError('Failed to load image');
        img.src = e.target.result;
    };
    reader.onerror = () => showError('Failed to read file');
    reader.readAsDataURL(file);
}

function compressImage() {
    if (!originalCanvasData) return;

    const quality = parseInt(qualitySlider.value) / 100;
    const format = formatSelect.value;

    // Create canvas from original image
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
        // Set canvas dimensions based on maintain ratio
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

        // Convert canvas to blob with quality
        canvas.toBlob(
            (blob) => {
                compressedCanvasData = {
                    blob: blob,
                    width: canvas.width,
                    height: canvas.height,
                    format: format,
                    mimeType: mimeType,
                    quality: quality
                };

                // Display compressed image
                const compressedUrl = URL.createObjectURL(blob);
                compressedImage.src = compressedUrl;

                updateCompressionInfo();
            },
            mimeType,
            quality
        );
    };

    img.onerror = () => showError('Failed to process image');
    img.src = originalCanvasData.src;
}

function updateFileInfo() {
    originalSize.textContent = `Size: ${formatBytes(currentFile.size)}`;
    originalDimensions.textContent = `${originalCanvasData.width} × ${originalCanvasData.height} px`;
    fileFormat.textContent = currentFile.type.split('/')[1].toUpperCase();
    compressionLevel.textContent = 'Processing...';
}

function updateCompressionInfo() {
    if (!compressedCanvasData) return;

    const originalSizeBytes = currentFile.size;
    const compressedSizeBytes = compressedCanvasData.blob.size;
    const savings = ((originalSizeBytes - compressedSizeBytes) / originalSizeBytes * 100).toFixed(1);

    compressedSize.textContent = `Size: ${formatBytes(compressedSizeBytes)}`;
    savingsPercent.textContent = `Saved: ${savings}%`;
    compressedDimensions.textContent = `${compressedCanvasData.width} × ${compressedCanvasData.height} px`;

    // Update compression level label
    const quality = parseInt(qualitySlider.value);
    let compressionLabel = '';
    if (quality >= 80) {
        compressionLabel = 'Low (High Quality)';
    } else if (quality >= 60) {
        compressionLabel = 'Medium (Balanced)';
    } else if (quality >= 40) {
        compressionLabel = 'High (Lower Quality)';
    } else {
        compressionLabel = 'Maximum (Very Low Quality)';
    }
    compressionLevel.textContent = compressionLabel;
}

function downloadCompressedImage() {
    if (!compressedCanvasData) {
        showError('No image to download');
        return;
    }

    const filename = `compressed-${Date.now()}.${compressedCanvasData.format}`;
    const url = URL.createObjectURL(compressedCanvasData.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded: ${filename}`, 'success');
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

    // Hide main content
    hideMainContent();
    clearError();
}

function showMainContent() {
    mainContent.classList.remove('hidden');
}

function hideMainContent() {
    mainContent.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
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
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
