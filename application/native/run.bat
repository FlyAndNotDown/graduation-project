set opencvJarPath=D:\Lib\OpenCV\opencv\build\java\opencv-401.jar
set opencvJavaLibPath=D:\Lib\OpenCV\opencv\build\java\x64
set opencvBinPath=D:\Lib\OpenCV\opencv\build\x64\vc15\bin
set srcLocation=D:\Code\projects\graduation-project\application\native\src\pers\kindem\watermark

cd %srcLocation%

java -Djava.library.path=%opencvJavaLibPath%;%opencvBinPath% -classpath %opencvJarPath% .\Main.java
