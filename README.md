# Tajweed-Recognition
This experiment project is to demonstrate how to extracting Arabic Characters from a document file or an image file, and generating and highlighting Tajweed Colors from extracted text using Web App.

#### This Prototype Project is inspired from:
- Tajweed Generator feature of <a href="https://quran.nu.or.id/" target="_blank" rel="noopener noreferrer">https://quran.nu.or.id</a> and <a href="https://github.com/kodepandai/colorful-quran" target="_blank" rel="noopener noreferrer">Colorful Qur'an App</a>
- <a href="https://github.com/cpfair/quran-tajweed" target="_blank" rel="noopener noreferrer">https://github.com/cpfair/quran-tajweed</a>
- <a href="https://www.researchgate.net/profile/Nuur-Wachid-Abdul-Majid/publication/332420605_Development_System_for_Recognize_Tajweed_in_Qur'an_using_Automatic_Speech_Recognition/links/5e53f7bba6fdccbebafdfec9/Development-System-for-Recognize-Tajweed-in-Quran-using-Automatic-Speech-Recognition.pdf" target="_blank" rel="noopener noreferrer">Development System for Recognize Tajweed in Quran using Automatic Speech Recognition</a>

### Web App URLs:
- <a href="https://tajweed-recognition.vercel.app">tajweed-recognition.vercel.app</a>
- <a href="https://tajweed-recognition.pages.dev">tajweed-recognition.pages.dev</a>

### Screenshots:
<p align="center">
  <img src="https://github.com/Vidi005/Tajweed-Recognition/blob/main/Screenshots/TajweedRecognitionSplitted1-ezgif.com-optimize.gif" width="100%"> 
  <img src="https://github.com/Vidi005/Tajweed-Recognition/blob/main/Screenshots/TajweedRecognitionSplitted2-ezgif.com-optimize.gif" width="100%">
  <img src="https://github.com/Vidi005/Tajweed-Recognition/blob/main/Screenshots/TajweedRecognitionSplitted3-ezgif.com-optimize.gif" width="100%">
</p>

### Features:
- Recognize Arabic Characters from captured image
- Recognize Arabic Characters from screenshot with Share Screen
- Read Arabic Text from imported image, docx, and PDF formats
- Colorize Tajweed Laws from Arabic Characters
- Show tooltip and detail info about selected Tajweed
- Show colored guidelines of generated Tajweed Laws
- Edit and Manually Input for Arabic Text
- Dark Mode
- Localization to change App Languages (English and Indonesia)
- Tajweed display settings (Colorization Mode, Waqf Setting Options, and Tajweed Setting Options)
- Change displayed font size and line spacing
- Download generated Tajweed Laws into a DOC or PDF file
- Tajweed list items with its groups
- Search Tajweed items
- Detail Tajweed item

### Tech Stacks:
- React JS Library with Vite build tool
- Tailwind CSS
- Headless UI
- Animate CSS
- i18next
- React-to-Print
- Mammoth DOCX Reader
- React Dropzone
- React PDF.js Reader
- React Slick Carousel
- React Router
- Sweet Alert 2
- Tesseract JS
- Vite Plugin PWA

### Additional Resources:
- Logo: <a href="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=undexpand" target="_blank" rel="noopener noreferrer">Bing Ai</a>
- Images Stock: <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Google Icon</a> & <a href="https://pixabay.com/id/vectors/search/mosque%20decoration" target="_blank" rel="noopener noreferrer">Pixabay</a>

### Limitations:
Beside of those avaliable features, this Tajweed Recognition Application also have some limitation as follows:
- The OCR feature for recognizing Arabic text on the image may not always accurate because of various kind of image quality, Arabic fonts, and skewness factor from the text on the image.
- If there are more than one Tajweed Laws on the same group of Tajweed Law Rule Characters, Tajweed Colorization will be colorize from the first/the higher position of Tajweed Law items array position and the others will be stacked. Therefore only the last colorized Tajweed Law that will be displayed.
- When there are more than one part of slice of Tajweed Laws on the same group of Tajweed Law Rule Characters, it only will be colorize the first occurence of Tajweed Law because the colorized characters html tags had been added some tajweed attributes.
- Some Arabic text diacritics position result which imported from PDF file might be shifted.
- This application can work quiet well form <a href="https://quran.com/" target="_blank" rel="noopener noreferrer">https://quran.com</a> with Uthmani font and from <a href="https://quran.nu.or.id/" target="_blank" rel="noopener noreferrer">https://quran.nu.or.id</a> for now and might not colorize Tajweed Laws correctly on several types of Mushaf.

## Notes:
This Tajweed Recognition App is still far from perfect and still in development. Therefore it might still contain any unknown bugs and couldn't recognize all tajweed laws. Please feel free to report in <a href="https://github.com/Vidi005/Tajweed-Recognition/issues">issues page<a/> of this repository if you found any bugs.
