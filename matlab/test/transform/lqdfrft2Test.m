img = im2double(imread('lena.bmp'));

[imgRows, imgCols, imgHeight] = size(img);

source = zeros(imgRows, imgCols, imgHeight + 1);
for n = 2 : 4
    source(:, :, n) = img(:, :, n - 1);
end
source(imgRows, :, :) = [];
source(:, imgCols, :) = [];

u = [0, 1, 0, 0];
kernel = dfrftKernel(imgRows - 1, 0.5);
iKernel = dfrftKernel(imgRows - 1, -0.5);

figure(1);
subplot(2, 2, 1);
imshow(img);

% show image after one time QDFRNT
subplot(2, 2, 2);
output = lqdfrft2(source, kernel, u);
imshow(output(:, :, [2, 3, 4]));

% show image restored from output image
subplot(2, 2, 3);
restored = lqdfrft2(output, iKernel, u);
imshow(restored(:, :, [2, 3, 4]));
