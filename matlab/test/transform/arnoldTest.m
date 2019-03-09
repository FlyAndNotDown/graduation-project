% read image
source = rgb2gray(im2double(imread('lena.bmp')));

% show source image
figure();
subplot(2, 2, 1);
imshow(source);

% show image after one time arnold transform
subplot(2, 2, 2);
output = arnold(source, 1);
imshow(output, []);

% show image restored from output image
subplot(2, 2, 3);
imshow(iarnold(output, 1), []);