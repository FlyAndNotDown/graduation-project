set opencvJarPath = D:\Lib\OpenCV\opencv\build\java\opencv-401.jar
set opencvJavaLibPath = D:\Lib\OpenCV\opencv\build\java\x64
set opencvBinPath = D:\Lib\OpenCV\opencv\build\x64\vc15\bin

javac -cp %opencvJarPath% -Djava.library.path=%opencvJavaLibPath%;%opencvBinPath% .\src\pers\kindem\watermark\Main.java