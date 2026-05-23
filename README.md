# 🖼️ Image Compressor & Converter

A **fast, responsive, and client-side image compression tool** that works entirely in your browser. No server needed, no file uploads, no tracking.

## ✨ Features

✅ **Upload JPG/PNG Images** - Drag & drop or click to upload  
✅ **Real-time Compression** - Adjust quality with a slider (10-100%)  
✅ **Format Conversion** - Convert to JPEG, PNG, or WebP  
✅ **Before/After Preview** - See the difference instantly  
✅ **File Size Comparison** - View original vs compressed size  
✅ **Savings Calculator** - Know how much space you're saving  
✅ **100% Client-Side** - No server, no database, no API calls  
✅ **Mobile-Friendly** - Works on all devices  
✅ **Dark Mode Support** - Auto-detects system theme  
✅ **Error Handling** - Validates file types and sizes  

## 🚀 How to Use

### Step 1: Open the Tool
1. Navigate to your GitHub Pages site: `https://rrck721.github.io/jpgtosvg/`
2. The tool will load instantly

### Step 2: Upload an Image
- **Drag & Drop:** Drag an image onto the upload area
- **Click to Browse:** Click the upload area to select a file

Supported formats: JPG, PNG

### Step 3: Compress
- Use the **Quality Slider** to adjust compression level
  - 10% = Maximum compression (smallest file, lowest quality)
  - 100% = No compression (largest file, best quality)
- See the compressed preview update in real-time

### Step 4: Convert Format (Optional)
- Select output format:
  - **JPEG** - Original format, great balance
  - **PNG** - Lossless format, preserves details
  - **WebP** - Modern format, best compression

### Step 5: Download
- Click the **"Download Compressed Image"** button
- File saves with a timestamp: `compressed-image-1234567890.jpg`

## 📊 What Gets Displayed

- **Original Image**
  - Dimensions: `1920×1080px`
  - File Size: `2.45 MB`

- **Compressed Image**
  - Preview with selected quality
  - New file size: `245 KB`
  - Space saved: `89.9%`

## 🔒 Privacy & Security

- ✅ **100% Local Processing** - Images never leave your computer
- ✅ **No Tracking** - No analytics, no cookies
- ✅ **No Storage** - Close the tab and everything is gone
- ✅ **Open Source** - View the code anytime

## 🛠️ Technical Details

### Files
- `index.html` - HTML structure
- `style.css` - Responsive styling with animations
- `script.js` - Image compression logic

### Technologies
- **Canvas API** - For image manipulation
- **Blob API** - For file conversion
- **File API** - For upload handling
- **Pure JavaScript** - No dependencies

### Browser Support
- ✅ Chrome/Edge 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 💡 Quality Settings Guide

| Quality | Best For | Example Output |
|---------|----------|-----------------|
| 10-30% | Maximum compression, web thumbnails | 50-100 KB |
| 40-60% | Balance between size and quality | 100-300 KB |
| 70-85% | High quality, moderate size | 300-800 KB |
| 90-100% | Maximum quality, larger files | 800 KB+ |

## ⚡ Performance

- **Compression Speed:** < 1 second for most images
- **Memory Usage:** Efficient even with large images
- **No Lag:** Smooth slider interaction
- **Instant Preview:** Real-time updates as you adjust

## 🎨 UI/UX Highlights

- **Gradient Background** - Modern purple theme
- **Smooth Animations** - Professional transitions
- **Dark Mode** - Automatically adapts to system settings
- **Responsive Grid** - Works on desktop, tablet, mobile
- **Accessible** - Keyboard navigation supported
- **Error Messages** - Clear feedback for issues

## 🐛 Troubleshooting

### Image won't upload
- Ensure file is JPG or PNG
- File size should be less than 50MB

### Quality slider not working
- Refresh the page
- Try a different browser

### Download button not working
- Check browser permissions
- Ensure pop-ups aren't blocked

### Image looks pixelated
- Increase quality slider value
- Lower compression levels preserve more detail

## 📝 File Size Limits

- **Maximum File Size:** 50 MB
- **Supported Formats:** JPG, PNG
- **Output Formats:** JPEG, PNG, WebP

## 🚀 Deploy to GitHub Pages

1. Push all files to your GitHub repository
2. Go to **Settings → Pages**
3. Select **Deploy from a branch**
4. Choose **main** branch
5. Your site is live! 🎉

## 🔄 How Compression Works

```
User selects quality (10-100%)
         ↓
Image loaded to Canvas
         ↓
Canvas renders with quality setting
         ↓
Blob created (compressed data)
         ↓
File size calculated
         ↓
Preview displayed instantly
         ↓
User can download or adjust
```

## 📱 Mobile Features

- ✅ Touch-friendly buttons
- ✅ Responsive layout
- ✅ Full-screen preview
- ✅ Optimal slider for mobile
- ✅ One-hand operation

## 🎯 Use Cases

- 📷 Compress photos before uploading to social media
- 📧 Reduce image size for email attachment
- 🌐 Optimize images for websites
- 💾 Save storage space
- 🚀 Speed up file transfers

## 📄 License

Free to use and modify. No attribution required.

## 🙋 FAQ

**Q: Is my image saved anywhere?**  
A: No! Everything happens in your browser. Your image never leaves your device.

**Q: Can I upload multiple images?**  
A: Currently, one image at a time. You can upload another after downloading.

**Q: What quality should I use?**  
A: For web: 70-80%. For personal use: 85-90%. For archives: 95-100%.

**Q: Why is WebP smaller than JPEG?**  
A: WebP is a modern format with better compression algorithms. Perfect for web.

**Q: Does it work offline?**  
A: Yes! After loading, it works completely offline (except for the initial load).

---

Made with ❤️ for fast, private image compression.
