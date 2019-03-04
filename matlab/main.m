source = rgb2gray(im2double(imread('lena.bmp')));

[sourceRows, sourceCols] = size(source);

figure(1);
imshow(source);

figure(2);
imshow(dfrnt2(source, 0.25, 1, rand(sourceCols, sourceCols), rand(sourceRows, sourceRows)));