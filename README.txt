MOODLE ADVANCED SLIDER PACKAGE

FILES INCLUDED
1. index.html
2. style.css
3. script.js

UPLOAD METHOD
1. Create a Moodle Folder resource.
2. Upload index.html, style.css, and script.js into that folder.
3. Upload your lesson images anywhere Moodle can serve them.
4. Copy each image URL.
5. Open or embed index.html with image links as URL parameters.

BASIC EXAMPLE

index.html?img1=https://yourmoodle/pluginfile.php/.../slide1.png&img2=https://yourmoodle/pluginfile.php/.../slide2.png&img3=https://yourmoodle/pluginfile.php/.../slide3.png

IF USING AN IFRAME

<iframe
src="PASTE-YOUR-INDEX-HTML-LINK-HERE?img1=IMAGE1_URL&img2=IMAGE2_URL&img3=IMAGE3_URL&img4=IMAGE4_URL&img5=IMAGE5_URL"
width="100%"
height="650"
frameborder="0"
allowfullscreen>
</iframe>

FEATURES
- Supports img1 to img30
- Previous and Next buttons
- Auto-play
- Play/Pause button
- Fullscreen button
- Keyboard navigation
  - Left arrow: previous slide
  - Right arrow: next slide
  - Spacebar: play/pause
  - F: fullscreen
- Mobile swipe support
- Slide counter
- Progress bar
- Navigation dots
- Thumbnail navigation
- Click image to zoom

OPTIONAL SETTINGS
Add these to the URL:

delay=7000
Changes autoplay delay to 7 seconds.

autoplay=false
Stops autoplay by default.

Example:

index.html?img1=SLIDE1_URL&img2=SLIDE2_URL&delay=7000&autoplay=false

IMPORTANT MOODLE NOTE
Moodle image links should normally come from pluginfile.php URLs.
Make sure the learner has permission to view those images.
If the image opens in the browser when copied into a new tab, it should work in the slider.
