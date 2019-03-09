% read image
source = rgb2gray(im2double(imread('lena.bmp')));

% show source image
figure();
subplot(2, 2, 1);
imshow(source);

% show image after one time arnold transform
subplot(2, 2, 2);
imshow(arnold(source, 1));