img = im2double(imread('lena.bmp'));

[imgRows, imgCols, imgHeight] = size(img);

source = zeros(imgRows, imgCols, imgHeight + 1);
for n = 2 : 4
    source(:, :, n) = img(:, :, n - 1);
end

u = [0, 1, 0, 0];

figure(1);
subplot(2, 2, 1);
imshow(img);

% show image after one time QDFRNT
subplot(2, 2, 2);
output = lqdfrft2(source, 512, 0.5, u, u);
imshow(output(:, :, [2, 3, 4]));

% show image restored from output image
subplot(2, 2, 3);
restored = lqdfrft2(output, 512, -0.5, u, u);
imshow(restored(:, :, [2, 3, 4]));
