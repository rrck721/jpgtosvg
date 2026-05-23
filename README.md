# 🖼️ Image Compressor & Converter

A powerful, lightweight, and user-friendly web tool to compress and convert images directly in your browser. No backend required, 100% client-side processing.

## ✨ Features

- ✅ **Upload JPG/PNG Images** - Drag & drop or click to upload
- ✅ **Real-time Compression** - Adjust quality slider and see instant preview
- ✅ **Format Conversion** - Convert between JPEG, PNG, and WebP
- ✅ **File Size Reduction** - Shows original vs compressed size and savings percentage
- ✅ **Before/After Preview** - Compare original and compressed images side-by-side
- ✅ **100% Client-Side** - No uploads to servers, completely private
- ✅ **Mobile-Friendly** - Fully responsive design works on all devices
- ✅ **Fast Processing** - Compression happens in milliseconds
- ✅ **Error Handling** - Validates file types and handles errors gracefully
- ✅ **Download Compressed Files** - Get your optimized images instantly

## 🚀 Getting Started

### Quick Start (GitHub Pages)

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Save

2. **Access your tool at:**
   ```
   https://rrck721.github.io/jpgtosvg/
   ```

### Local Testing

Simply open `index.html` in your browser:
- No installation required
- No dependencies
- Works offline after initial load

## 🎯 How to Use

1. **Upload Image**
   - Click the upload area or drag & drop a JPG/PNG image
   - Image will display in original preview panel

2. **Adjust Quality**
   - Use the quality slider (10-100%)
   - See compressed preview update in real-time
   - Higher quality = larger file, lower quality = smaller file

3. **Choose Format**
   - Select output format: JPEG, PNG, or WebP
   - WebP provides smallest file sizes
   - PNG is lossless quality

4. **Review Results**
   - Compare file sizes (original vs compressed)
   - See savings percentage
   - View image dimensions

5. **Download**
   - Click "Download Compressed Image"
   - File saves automatically to your downloads folder

## 📊 Quality Guidelines

| Quality Level | Best For | File Size |
|---|---|---|
| 10-30% | Maximum compression | Very small |
| 40-60% | Aggressive compression | Small |
| 70-85% | Balanced | Medium |
| 90-100% | High quality | Larger |

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with modern features
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Canvas API** - Image processing
- **Blob API** - File handling

### File Structure
```
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # All functionality logic
└── README.md       # Documentation (this file)
```

### Browser Compatibility
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 💾 How It Works

1. **Image Upload** - File read via FileReader API
2. **Canvas Processing** - Image drawn on HTML5 canvas
3. **Compression** - Canvas.toBlob() applies quality compression
4. **Format Conversion** - MIME type selection enables format conversion
5. **Blob Creation** - Compressed data converted to downloadable blob
6. **File Download** - Browser native download via anchor element

## 🔒 Privacy & Security

- ✅ Images **NEVER** leave your device
- ✅ **Zero server communication**
- ✅ **No tracking** or analytics
- ✅ **No cookies** stored
- ✅ **Complete privacy** - your images are yours only
- ✅ Completely safe for confidential images

## 📈 Performance

- Lightning-fast compression in milliseconds
- No network latency
- Smooth real-time preview updates
- Optimized for all device sizes
- Minimal memory footprint

## 🐛 Troubleshooting

### Image won't upload
- Ensure file is JPG or PNG format
- Check file isn't corrupted
- Try a different image

### Preview not updating
- Refresh the page
- Try adjusting the quality slider again
- Clear browser cache and reload

### Download not working
- Ensure browser pop-ups aren't blocked
- Try a different browser
- Check available disk space

## 🌟 Format Comparison

| Format | Quality | Size | Browser Support |
|---|---|---|---|
| JPEG | Lossy | Smallest | Universal |
| PNG | Lossless | Larger | Universal |
| WebP | Lossy | Smaller than JPEG | Modern browsers |

**Recommendation:** Use WebP for web - best compression with good quality

## 📱 Mobile Optimization

- Fully responsive layout
- Touch-friendly buttons
- Optimized for smaller screens
- Smooth scrolling and interactions

## 🎨 UI/UX Features

- Gradient background design
- Real-time visual feedback
- Smooth animations
- Intuitive controls
- Clear file size information
- Error notifications
- Success toasts

## 🚀 Future Enhancements (Possible)

- Batch image processing
- Image resizing options
- Rotation/flip controls
- Watermark addition
- Multiple format export
- Advanced compression algorithms

## 📄 License

This project is open source and available for personal and commercial use.

## 💡 Tips for Best Results

1. **Choose right quality level** - 70-85% usually gives best quality/size balance
2. **Use WebP format** - Best compression for web usage
3. **Test compression** - Preview before downloading
4. **Batch processing** - Process multiple images sequentially
5. **Keep originals** - Always maintain backup of original images

## 🤝 Contributing

Found a bug or have suggestions? Feel free to contribute or report issues on GitHub.

## 📞 Support

- Check this README for common issues
- Test with different images
- Try clearing browser cache
- Restart browser if issues persist

---

Made with ❤️ for image optimization | 100% Client-Side | No Backend Required
