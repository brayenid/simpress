### Super simple compression tool

I made this super simple tool to help me in compressing some images with no limit, no complex configuration, high quality, and small result. I use sharp.js to do the compression. I also put the runner.bat to run this compression to make it more easier with the default configuration (destination directory:compressed, image quality : 1200). It can also run with normal npm script, just write npm sharp.js command, it will do his job. I provide 2 arguments to set the destination directory and the image quality, just use -to and -size flags. For example, node sharp.js -to comped -size 800, it will create a new folder called "comped", and produce compressed image(s) with 800 quality. Read more about its advanced explanations in sharp.js documentation. A huge thank you sharp.js.
